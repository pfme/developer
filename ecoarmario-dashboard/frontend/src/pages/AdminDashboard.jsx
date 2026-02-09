import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, AlertTriangle, TrendingUp, DollarSign, Package } from 'lucide-react';
// import { getLiveStats } from '../services/api'; // Reuse logic or new admin endpoint

const AdminDashboard = () => {
    // Mock data for UI development
    const stats = {
        total_prendas: 150,
        monto_sugerido: 15000,
        total_cobrado: 12450,
        diferencia: 2550,
        alertas: {
            clientes: 34,
            lives: 4,
            prendas: 61
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-gray-700 rounded-lg text-text-secondary hover:text-white transition-colors">
                        <RefreshCw size={18} /> Actualizar
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors font-bold shadow-lg shadow-success/20">
                        <Download size={18} /> Descargar Excel
                    </button>
                </div>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 flex items-start gap-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg text-orange-500">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-orange-500 font-bold text-lg mb-1">Atención Requerida</h3>
                        <p className="text-text-secondary text-sm">
                            <span className="font-bold text-white">{stats.alertas.clientes}</span> clientes con diferencia
                        </p>
                        <p className="text-text-secondary text-sm">
                            <span className="font-bold text-white">{stats.alertas.prendas}</span> prendas sin pagar
                        </p>
                    </div>
                </div>
                {/* More cards... */}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-bg-secondary rounded-xl p-6 border border-gray-800">
                    <div className="text-text-secondary text-sm uppercase mb-2">Total Prendas</div>
                    <div className="text-3xl font-bold text-white flex items-center gap-2">
                        {stats.total_prendas} <Package className="text-gray-600" size={24} />
                    </div>
                </div>
                <div className="bg-bg-secondary rounded-xl p-6 border border-gray-800">
                    <div className="text-text-secondary text-sm uppercase mb-2">Monto Sugerido</div>
                    <div className="text-3xl font-bold text-white">Bs {stats.monto_sugerido}</div>
                </div>
                <div className="bg-bg-secondary rounded-xl p-6 border border-gray-800">
                    <div className="text-text-secondary text-sm uppercase mb-2">Total Cobrado</div>
                    <div className="text-3xl font-bold text-success">Bs {stats.total_cobrado}</div>
                </div>
                <div className="bg-bg-secondary rounded-xl p-6 border border-gray-800">
                    <div className="text-text-secondary text-sm uppercase mb-2">Diferencia</div>
                    <div className="text-3xl font-bold text-danger">Bs {stats.diferencia}</div>
                </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-bg-secondary rounded-xl p-6 border border-gray-800 h-80 flex items-center justify-center text-text-secondary">
                    Gráfico de Ventas por Vendedora (Proximamente)
                </div>
                <div className="bg-bg-secondary rounded-xl p-6 border border-gray-800 h-80 flex items-center justify-center text-text-secondary">
                    Evolución de Pagos (Proximamente)
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
