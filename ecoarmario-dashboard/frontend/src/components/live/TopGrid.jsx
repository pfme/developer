import React from 'react';
import { motion } from 'framer-motion';

const TopGrid = ({ players }) => {
    // Take top 2-6 (since 1 is Hero) 
    // Wait, requirement says "Top 5 Compradoras" section. 
    // Usually Hero is #1, and this grid is #2-#6 or #1-#5 if Hero is just a highlight?
    // "C. Top 5 Compradoras (30% altura)" distinct from "B. Hero".
    // Let's assume Hero highlights #1, and this grid shows 2,3,4 or 1-5 again?
    // Usually it's better to show #2, #3, #4 if #1 is already huge.
    // Or users want to see the full leaderboard. 
    // Let's show #2, #3, #4, #5, #6 in the grid? 
    // Design requirement: "3 columnas desktop". So 3 cards.
    // Maybe positions 2, 3, 4.

    // Let's show top 3 excluding the first if passed correctly, or show top 3 there.
    // The prompt says "Posiciones 1-3 con medallas". 
    // This implies the grid might contain #1 too but in a smaller card, OR the Hero IS #1 and we show 2-4.
    // "Hero - Compradora Top" is separate.
    // "Top 5 Compradoras" section.
    // I will show clients 1, 2, 3 in the grid if they match the "Posiciones 1-3 con medallas" requirement description.
    // But since #1 is in Hero, repeating might be redundant but useful for comparison.
    // I'll show 2, 3, 4 to save space and make it complementary.

    const displayPlayers = players ? players.slice(1, 4) : [];

    const getMedalColor = (idx) => {
        // idx 0 here is actually Rank 2
        // If we want 1,2,3 logic:
        // Rank 1: Gold (Hero)
        // Rank 2: Silver
        // Rank 3: Bronze
        if (idx === 0) return 'border-silver text-silver'; // Rank 2
        if (idx === 1) return 'border-bronze text-bronze'; // Rank 3
        return 'border-gray-700 text-gray-500';
    };

    const getRank = (idx) => idx + 2;

    return (
        <div className="h-[30vh] px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPlayers.map((player, idx) => (
                <motion.div
                    key={player.telefono}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-bg-secondary rounded-xl p-4 border-2 ${getMedalColor(idx)} hover:-translate-y-1 transition-transform duration-300 relative flex flex-col justify-between`}
                >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-bg-primary border-2 inherit flex items-center justify-center font-bold" style={{ borderColor: 'inherit', color: 'inherit' }}>
                        #{getRank(idx)}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center font-bold text-sm">
                            {player.nombre.charAt(0)}
                        </div>
                        <div className="truncate">
                            <h3 className="font-bold text-white truncate">{player.nombre}</h3>
                            <p className="text-xs text-text-secondary">{player.prendas_pagadas} pagadas</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-success font-bold">Bs {player.monto_pagado}</span>
                            <span className="text-warning font-bold">Bs {player.monto_pendiente}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-success" style={{ width: `${player.porcentaje_pago}%` }}></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default TopGrid;
