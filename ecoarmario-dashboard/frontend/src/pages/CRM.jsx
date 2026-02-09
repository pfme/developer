import React, { useState } from 'react';
import { Search, Filter, Eye, Edit } from 'lucide-react';

const CRM = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const clients = [
        { id: 1, nombre: 'María García', telefono: '78945612', ciudad: 'Santa Cruz', compras: 12, gastado: 1250, segmento: 'VIP' },
        { id: 2, nombre: 'Ana López', telefono: '65432198', ciudad: 'La Paz', compras: 3, gastado: 250, segmento: 'Nueva' },
        { id: 3, nombre: 'Carla Perez', telefono: '71234567', ciudad: 'Cochabamba', compras: 6, gastado: 600, segmento: 'Frecuente' },
    ];

    const getSegmentColor = (segment) => {
        switch (segment) {
            case 'VIP': return 'bg-gold/20 text-gold border-gold/30';
            case 'Frecuente': return 'bg-info/20 text-info border-info/30';
            case 'Nueva': return 'bg-success/20 text-success border-success/30';
            default: return 'bg-gray-700 text-gray-400';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Gestión de Clientes (CRM)</h1>
                <button className="bg-info hover:bg-info/80 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                    Exportar CSV
                </button>
            </div>

            {/* Filters */}
            <div className="bg-bg-secondary p-4 rounded-xl border border-gray-800 mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, teléfono..."
                        className="w-full bg-bg-primary border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-success"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-gray-700 rounded-lg text-text-secondary hover:text-white transition-colors">
                    <Filter size={18} /> Filtros
                </button>
            </div>

            {/* Table */}
            <div className="bg-bg-secondary rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800/50 text-text-secondary">
                        <tr>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Ciudad</th>
                            <th className="p-4 text-center">Compras</th>
                            <th className="p-4 text-right">Total Gastado</th>
                            <th className="p-4 text-center">Segmento</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {clients.map(client => (
                            <tr key={client.id} className="hover:bg-gray-800/30 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white">{client.nombre}</div>
                                    <div className="text-sm text-text-secondary">{client.telefono}</div>
                                </td>
                                <td className="p-4 text-text-secondary">{client.ciudad}</td>
                                <td className="p-4 text-center text-white">{client.compras}</td>
                                <td className="p-4 text-right text-success font-bold">Bs {client.gastado}</td>
                                <td className="p-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getSegmentColor(client.segmento)}`}>
                                        {client.segmento}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="p-2 hover:bg-gray-700 rounded-lg text-info transition-colors">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-gray-700 rounded-lg text-warning transition-colors">
                                            <Edit size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CRM;
