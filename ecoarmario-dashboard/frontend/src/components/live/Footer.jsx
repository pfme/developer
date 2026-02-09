import React from 'react';

const Footer = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="h-[10vh] border-t border-gray-800 bg-bg-secondary flex items-center justify-around px-8">
            <div className="text-center">
                <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Total Prendas</div>
                <div className="text-3xl font-bold text-white">{stats.total_prendas}</div>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="text-center">
                <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Total Cobrado</div>
                <div className="text-3xl font-bold text-success">Bs {stats.total_cobrado}</div>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="text-center">
                <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Por Cobrar</div>
                <div className="text-3xl font-bold text-warning">Bs {stats.por_cobrar}</div>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="text-center">
                <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Efectividad</div>
                <div className="text-3xl font-bold text-info">{stats.efectividad}%</div>
            </div>
        </div>
    );
};

export default Footer;
