import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, DollarSign } from 'lucide-react';

const Timeline = ({ activities }) => {
    return (
        <div className="h-[20vh] px-4 mb-4">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                Actividad en Tiempo Real
            </h3>
            <div className="h-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/0 via-bg-primary/0 to-bg-primary pointer-events-none z-10"></div>
                <div className="space-y-2">
                    <AnimatePresence>
                        {activities && activities.map((item, idx) => (
                            <motion.div
                                key={`${item.timestamp}-${idx}`}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0 }}
                                className={`flex items-center gap-3 p-2 rounded-r-lg border-l-4 ${item.tipo === 'pago' ? 'border-success bg-success/5' : 'border-info bg-info/5'}`}
                            >
                                <span className="text-xs font-mono text-text-secondary w-10">{item.hora}</span>
                                <div className={`p-1.5 rounded-full ${item.tipo === 'pago' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>
                                    {item.tipo === 'pago' ? <DollarSign size={14} /> : <ShoppingBag size={14} />}
                                </div>
                                <div className="flex-1">
                                    <span className="font-bold text-text-primary mr-2">{item.nombre}</span>
                                    <span className="text-text-secondary text-sm">
                                        {item.tipo === 'pago' ? `pagó Bs ${item.monto}` : `reservó prendas (Bs ${item.monto})`}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
