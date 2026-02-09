/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#0f172a',
                    secondary: '#1e293b',
                },
                text: {
                    primary: '#e2e8f0',
                    secondary: '#94a3b8',
                },
                success: '#22c55e',
                warning: '#f59e0b',
                info: '#3b82f6',
                danger: '#ef4444',
                gold: '#fbbf24',
                silver: '#cbd5e1',
                bronze: '#fb923c',
            },
            animation: {
                'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #22c55e' },
                    '100%': { boxShadow: '0 0 20px #22c55e, 0 0 10px #22c55e' },
                }
            }
        },
    },
    plugins: [],
}
