import pandas as pd
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class BusinessLogic:
    def process_data(self, df_prendas: pd.DataFrame, df_pagos: pd.DataFrame):
        """
        Core logic to match payments and calculate stats.
        Follows the Hybrid Match Logic (Option C) from requirements.
        """
        if df_prendas.empty:
            return self._empty_stats()

        # Clean and standardize
        df_prendas['Codigo ECO'] = df_prendas['Codigo ECO'].astype(str).str.strip().str.upper()
        df_pagos['Codigo ECO'] = df_pagos['Codigo ECO'].astype(str).str.strip().str.upper()
        
        # Ensure numeric
        df_prendas['Precio'] = pd.to_numeric(df_prendas['Precio'], errors='coerce').fillna(0)
        df_pagos['Monto'] = pd.to_numeric(df_pagos['Monto'], errors='coerce').fillna(0)

        # 1. Match by Code
        codigos_pagados = set(df_pagos[df_pagos['Codigo ECO'] != '']['Codigo ECO'].unique())
        df_prendas['tiene_pago'] = df_prendas['Codigo ECO'].isin(codigos_pagados)

        # 2. Match by Phone (Fallback)
        # Create a copy to avoid SettingWithCopy warnings logic if needed, but direct assignment is okay here
        prendas_sin_pago = df_prendas[~df_prendas['tiene_pago']].copy()
        
        # We need to map phones. Assuming 'Telefono Cliente' in prendas and 'Telefono' in pagos
        # Standardize phones?
        
        # Iterate unique phones in pending
        for telefono in prendas_sin_pago['Telefono Cliente'].unique():
            if not telefono: continue
            
            prendas_cliente = prendas_sin_pago[prendas_sin_pago['Telefono Cliente'] == telefono]
            pagos_cliente = df_pagos[df_pagos['Telefono'] == telefono]
            
            total_reservado = prendas_cliente['Precio'].sum()
            total_pagado = pagos_cliente['Monto'].sum()
            
            if total_pagado >= total_reservado and total_reservado > 0:
                 df_prendas.loc[prendas_cliente.index, 'tiene_pago'] = True

        # 3. Calculate Stats
        stats = self._calculate_stats(df_prendas, df_pagos)
        return stats

    def _calculate_stats(self, df_prendas: pd.DataFrame, df_pagos: pd.DataFrame):
        # --- Pre-calculation ---
        # Ensure timestamp columns are datetime
        # Prendas: 'Fecha/Hora Reserva'
        # Pagos: 'Fecha Pago' (or we use 'Fecha Hora Reserva' from matched prenda for timeline?)
        
        # Helper to parse dates safely
        def parse_dates(df, col):
            return pd.to_datetime(df[col], errors='coerce')

        df_prendas['dt_reserva'] = parse_dates(df_prendas, 'Fecha/Hora Reserva')
        df_pagos['dt_pago'] = parse_dates(df_pagos, 'Fecha Pago')

        # --- General Stats ---
        total_prendas = len(df_prendas)
        total_vendido = df_prendas['Precio'].sum()
        
        # Pagos verification
        # "Monto pagado" vs "Prendas pagadas"
        # Total cobrado is sum of all payments received
        total_cobrado = df_pagos['Monto'].sum()
        
        # Prendas pagadas count (using our 'tiene_pago' flag)
        prendas_pagadas_count = df_prendas[df_prendas['tiene_pago']].shape[0]
        
        por_cobrar = total_vendido - total_cobrado
        if por_cobrar < 0: por_cobrar = 0
        
        efectividad = (prendas_pagadas_count / total_prendas * 100) if total_prendas > 0 else 0

        # --- Top Clients ---
        # Group by Telefono to aggregate
        # We need Name, Phone. 
        # Prendas has 'Nombre Cliente', 'Telefono Cliente'
        
        # Fill missing names/phones
        df_prendas['Telefono Cliente'] = df_prendas['Telefono Cliente'].fillna('Desconocido')
        df_prendas['Nombre Cliente'] = df_prendas['Nombre Cliente'].fillna('Anonimo')

        client_groups = df_prendas.groupby('Telefono Cliente')
        
        top_clients_list = []
        for telefono, group in client_groups:
            if not telefono or telefono == 'Desconocido': continue
            
            nombre = group['Nombre Cliente'].iloc[0] # Take first name found
            total_p = len(group)
            pagadas = group[group['tiene_pago']].shape[0]
            pendientes = total_p - pagadas
            monto_total = group['Precio'].sum()
            
            # Calculate collected from this client specifically using pagos df
            client_pagos = df_pagos[df_pagos['Telefono'] == telefono]
            monto_pagado = client_pagos['Monto'].sum()
            monto_pendiente = monto_total - monto_pagado
            if monto_pendiente < 0: monto_pendiente = 0
            
            pct_pago = (monto_pagado / monto_total * 100) if monto_total > 0 else 0
            
            # Badges
            badges = self._generate_badges({
                'prendas_pagadas': pagadas,
                'prendas_pendientes': pendientes,
                'monto_pendiente': monto_pendiente,
                'monto_pagado': monto_pagado
            })
            
            last_activity = group['dt_reserva'].max()

            top_clients_list.append({
                "nombre": str(nombre),
                "telefono": str(telefono),
                "total_prendas": int(total_p),
                "prendas_pagadas": int(pagadas),
                "prendas_pendientes": int(pendientes),
                "monto_total": float(monto_total),
                "monto_pagado": float(monto_pagado),
                "monto_pendiente": float(monto_pendiente),
                "ultima_actividad": last_activity.isoformat() if pd.notnull(last_activity) else None,
                "porcentaje_pago": float(pct_pago),
                "badges": badges
            })
            
        # Sort by total items or total paid? Usually "Best buyer" = most paid items or most spent
        # Let's sort by prendas_pagadas desc, then monto_pagado desc
        top_clients_list.sort(key=lambda x: (x['prendas_pagadas'], x['monto_pagado']), reverse=True)
        
        # --- Activity Feed ---
        # Combine recent reservations and payments
        # 1. Reservations
        activity = []
        for _, row in df_prendas.iterrows():
            if pd.notnull(row['dt_reserva']):
                activity.append({
                    "tipo": "reserva",
                    "codigo": row['Codigo ECO'],
                    "nombre": row['Nombre Cliente'],
                    "monto": row['Precio'],
                    "timestamp": row['dt_reserva'],
                    "hora": row['dt_reserva'].strftime('%H:%M')
                })
        
        # 2. Payments
        for _, row in df_pagos.iterrows():
            if pd.notnull(row['dt_pago']):
                 activity.append({
                    "tipo": "pago",
                    "codigo": row['Codigo ECO'], # Might be empty or match
                    "nombre": row['Nombre Destinatario'] or "Cliente", # Often name is in Prenda match, not Payment itself cleanly
                    "monto": row['Monto'],
                    "timestamp": row['dt_pago'],
                    "hora": row['dt_pago'].strftime('%H:%M')
                })

        # Sort by timestamp desc and take top 20
        activity.sort(key=lambda x: x['timestamp'], reverse=True)
        activity = activity[:20]
        # Convert timestamp to iso for json
        for a in activity:
            a['timestamp'] = a['timestamp'].isoformat()

        # --- Vendedoras Stats ---
        # Group by 'Vendedor' in Prendas
        vendedora_groups = df_prendas.groupby('Vendedor')
        vendedoras_list = []
        for vendedor, group in vendedora_groups:
            if not vendedor: continue
            
            prendas_count = len(group)
            vendido = group['Precio'].sum()
            pagadas_count = group[group['tiene_pago']].shape[0]
            eff = (pagadas_count / prendas_count * 100) if prendas_count > 0 else 0
            
            # Determine Turno (majority vote or first)
            turno = group['Turno'].mode()[0] if not group['Turno'].empty else "General"

            vendedoras_list.append({
                "nombre": str(vendedor),
                "turno": str(turno),
                "prendas": int(prendas_count),
                "vendido": float(vendido),
                "pagadas": int(pagadas_count),
                "efectividad": round(eff, 2)
            })

        return {
            "general": {
                "total_prendas": int(total_prendas),
                "total_vendido": float(total_vendido),
                "prendas_pagadas": int(prendas_pagadas_count),
                "total_cobrado": float(total_cobrado),
                "por_cobrar": float(por_cobrar),
                "efectividad": round(efectividad, 2)
            },
            "top_clientes": top_clients_list, 
            "actividad": activity,
            "vendedoras": vendedoras_list
        }

    def _generate_badges(self, stats):
        badges = []
        if stats['prendas_pagadas'] >= 5:
            badges.append({'icon': '💎', 'text': 'TOP BUYER', 'color': '#fbbf24'})
        
        if stats['prendas_pagadas'] > 0 and stats['prendas_pendientes'] == 0:
            badges.append({'icon': '✅', 'text': 'TODO PAGADO', 'color': '#22c55e'})
            
        if stats['prendas_pagadas'] > 0 and stats['prendas_pendientes'] > 0:
            badges.append({'icon': '⚡', 'text': 'ACTIVO', 'color': '#3b82f6'})
            
        if stats['monto_pendiente'] > 200:
            badges.append({'icon': '🔥', 'text': 'COMPRA GRANDE', 'color': '#f59e0b'})
            
        if stats['prendas_pendientes'] >= 3:
            badges.append({'icon': '⏰', 'text': 'PENDIENTE PAGO', 'color': '#ef4444'})
        
        return badges
