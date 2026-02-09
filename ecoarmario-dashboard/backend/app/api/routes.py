from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException, Depends
from typing import List
import json
import logging
from app.services.sheets import sheet_service
from app.services.logic import logic_service

router = APIRouter()
logger = logging.getLogger(__name__)

# --- Manager for WebSockets ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                # Handle broken pipes
                pass

manager = ConnectionManager()

# --- Endpoints ---

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/live/stats")
async def get_live_stats():
    """Returns the computed stats for the live dashboard"""
    df_prendas, df_pagos = await sheet_service.get_data()
    stats = logic_service.process_data(df_prendas, df_pagos)
    return stats

@router.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Simple implementation: Wait for client 'ping' or just keep connection open
            # Real implementation would have a background task broadcasting updates
            # Here we can respond to specific requests or just serve as a channel
            # For now, we'll send an initial update immediately
            df_prendas, df_pagos = await sheet_service.get_data()
            stats = logic_service.process_data(df_prendas, df_pagos)
            await websocket.send_text(json.dumps(stats))
            
            # Wait for next request (or we could loop with sleep if we wanted server-push purely)
            # But usually client might poll or we push on change.
            # Requirement: "Connection persistent that sends JSON every 10 seconds"
            # It's better to interpret this as Client polling or Server pushing loop.
            # Best practice: Server pushes updates.
            import asyncio
            await asyncio.sleep(10) 
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)

@router.post("/form/cliente")
async def submit_client_form(data: dict):
    # Logic to save to 'Clientes' sheet 
    # Not implemented fully yet as we need Write access logic/creds
    return {"status": "success", "message": "Datos registrados (Simulation)"}
