import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Clock } from 'lucide-react';

const Hero = ({ topBuyer }) => {
    if (!topBuyer) return <div className="h-[35vh] flex items-center justify-center text-text-secondary">Esperando datos...</div>;

    return (
        <div className="h-[35vh] p-4 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gold/20 text-gold px-4 py-1 rounded-b-lg border-b border-x border-gold/30 font-bold flex items-center gap-2">
                <Trophy size={16} /> COMPRADORA TOP DEL LIVE
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={topBuyer.telefono}
                className="bg-bg-secondary rounded-2xl p-6 border border-gray-800 shadow-2xl relative z-10 max-w-4xl mx-auto w-full flex items-center gap-8"
            >
                {/* Avatar */}
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg animate-glow">
                        {topBuyer.nombre.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-bg-primary border-4 border-bg-secondary rounded-full p-2">
                        <Trophy className="text-gold w-6 h-6" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-1">{topBuyer.nombre}</h1>
                    <p className="text-text-secondary text-lg mb-6">...{topBuyer.telefono.slice(-4)}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-bg-primary/50 p-3 rounded-lg border border-gray-700">
                            <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Pagadas</div>
                            <div className="text-2xl font-bold text-success flex items-center gap-1">
                                {topBuyer.prendas_pagadas} <CheckCircle size={16} />
                            </div>
                        </div>
                        <div className="bg-bg-primary/50 p-3 rounded-lg border border-gray-700">
                            <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Pendientes</div>
                            <div className="text-2xl font-bold text-warning flex items-center gap-1">
                                {topBuyer.prendas_pendientes} <Clock size={16} />
                            </div>
                        </div>
                        <div className="bg-bg-primary/50 p-3 rounded-lg border border-gray-700">
                            <div className="text-text-secondary text-xs uppercase tracking-wider mb-1">Monto Pagado</div>
                            <div className="text-2xl font-bold text-success">
                                Bs {topBuyer.monto_pagado}
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Progreso de pago</span>
                            <span className="font-bold text-white">{Math.round(topBuyer.porcentaje_pago)}%</span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-success to-emerald-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${topBuyer.porcentaje_pago}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2">
                    {topBuyer.badges && topBuyer.badges.map((badge, idx) => (
                        <div key={idx} className="bg-bg-primary px-3 py-1 rounded-full text-xs font-bold border border-gray-700 flex items-center gap-2" style={{ borderColor: badge.color, color: badge.color }}>
                            <span>{badge.icon}</span> {badge.text}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
