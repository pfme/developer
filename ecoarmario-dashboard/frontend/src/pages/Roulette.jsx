import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Roulette = () => {
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState(null);

    // Mock participants (in real app, fetch from active qualified buyers)
    const participants = [
        "María García", "Ana López", "Carla Perez", "Sofia Rodriguez", "Laura Martinez"
    ];

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setWinner(null);

        // Simulation
        setTimeout(() => {
            setSpinning(false);
            const random = Math.floor(Math.random() * participants.length);
            setWinner(participants[random]);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <h1 className="text-4xl font-bold text-white mb-8 tracking-wider">🎉 SORTEO EN VIVO</h1>

            <div className="relative w-80 h-80 mb-8">
                <motion.div
                    className="w-full h-full rounded-full border-8 border-gold bg-bg-secondary flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.2)]"
                    animate={spinning ? { rotate: 3600 } : { rotate: 0 }}
                    transition={{ duration: 3, ease: "circOut" }}
                >
                    <div className="text-6xl">🎰</div>
                </motion.div>

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-danger text-4xl">▼</div>
            </div>

            <AnimatePresence>
                {winner && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center mb-8"
                    >
                        <div className="text-gold text-sm uppercase tracking-widest font-bold mb-2">GANADORA</div>
                        <div className="text-5xl font-bold text-white break-words animate-bounce">
                            {winner}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!winner && !spinning && (
                <div className="text-text-secondary mb-8">
                    {participants.length} participantes calificados
                </div>
            )}

            <button
                onClick={spin} disabled={spinning}
                className="px-12 py-4 bg-gradient-to-r from-gold to-yellow-600 text-white font-bold text-xl rounded-full shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
            >
                {spinning ? 'GIRANDO...' : '¡GIRAR RULETA!'}
            </button>

            {/* Background confetti effect placeholder */}
        </div>
    );
};

export default Roulette;
