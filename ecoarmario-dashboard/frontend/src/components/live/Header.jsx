import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-[5vh] flex items-center justify-between px-6 bg-bg-secondary border-b border-gray-800">
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold tracking-tight">
                    <span className="text-success">Eco</span>Armario
                </span>
            </div>

            <div className="flex items-center space-x-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-fast"></div>
                <span className="text-red-400 font-bold text-sm tracking-wider">EN VIVO</span>
            </div>

            <div className="flex items-center space-x-2 text-text-secondary">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-lg">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default Header;
