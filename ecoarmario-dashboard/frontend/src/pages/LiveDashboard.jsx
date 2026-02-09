import React, { useEffect, useState } from 'react';
import Header from '../components/live/Header';
import Hero from '../components/live/Hero';
import TopGrid from '../components/live/TopGrid';
import Timeline from '../components/live/Timeline';
import Footer from '../components/live/Footer';
import { useWebSocket } from '../context/WebSocketContext';
import { getLiveStats } from '../services/api';

const LiveDashboard = () => {
    const { lastMessage, isConnected } = useWebSocket();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Initial fetch
        const fetchData = async () => {
            const data = await getLiveStats();
            if (data) setStats(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (lastMessage) {
            setStats(lastMessage);
        }
    }, [lastMessage]);

    if (!stats) {
        return (
            <div className="min-h-screen bg-bg-primary text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    // Top client is index 0 of top_clientes
    const topBuyer = stats.top_clientes && stats.top_clientes.length > 0 ? stats.top_clientes[0] : null;

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary overflow-hidden flex flex-col">
            <Header />

            <div className="flex-1 flex flex-col">
                {/* Upper Section: Hero + Grid */}
                <div className="flex flex-col lg:flex-row h-auto lg:h-[65vh]">
                    <div className="lg:w-1/2">
                        <Hero topBuyer={topBuyer} />
                    </div>
                    <div className="lg:w-1/2 pt-4">
                        <TopGrid players={stats.top_clientes} />
                        {/* Timeline fits here in desktop layout? 
                             Design:
                             B. Hero - Compradora Top (35% total height? No, prompt says 35%)
                             C. Top 5 Compradoras (30%)
                             D. Timeline (20%)
                             E. Footer (10%)
                             
                             Hero and Top 5 are likely side-by-side or stacked?
                             "Responsive: 3 columnas desktop". 
                             This suggests a Grid layout where Hero might take 2 cols and Top 5 takes 1 col?
                             Or "Hero (Row 1), Top 5 (Row 2)".
                             
                             Let's interpret heights:
                             Header: 5%
                             Hero: 35%
                             Top 5: 30%
                             Timeline: 20%
                             Footer: 10%
                             Sum = 100%. This implies a vertical stack.
                             
                             However, on widescreen TV, vertical stack might look empty.
                             But "stack" logic matches the percentage breakdown.
                             Let's strictly follow vertical stack for simplicity unless it looks bad.
                             
                             Actually, 35+30+20+10+5 = 100.
                             So it is a full screen vertical stack.
                          */}
                    </div>
                </div>

                {/* If vertical stack is required, I should restructure.
                    The prompt implies sections A, B, C, D, E vertical stack based on % height.
                    Let's refactor to vertical stack.
                    
                    Wait, "Grid responsive de tarjetas (3 columnas desktop)". This refers to the inner grid of Top 5.
                    
                    So:
                    Header (5vh)
                    Hero (35vh)
                    Top 5 (30vh)
                    Timeline (20vh)
                    Footer (10vh)
                */}
            </div>

            {/* Re-implementing layout strictly based on percentages */}
            <div className="fixed inset-0 flex flex-col z-50 bg-bg-primary">
                <Header />
                <Hero topBuyer={topBuyer} />
                <TopGrid players={stats.top_clientes} />
                <Timeline activities={stats.actividad} />
                <Footer stats={stats.general} />
            </div>
        </div>
    );
};

export default LiveDashboard;
