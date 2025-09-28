
import React from 'react';

const KaiburrLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0L95.11 27.5V82.5L50 110L4.89 82.5V27.5L50 0Z" fill="url(#paint0_linear_1_2)"/>
        <path d="M50 12.5L87.5 35V80L50 102.5L12.5 80V35L50 12.5Z" fill="#111827"/>
        <path d="M50 20L81.25 38.75V76.25L50 95L18.75 76.25V38.75L50 20Z" fill="url(#paint1_linear_1_2)"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="50" y1="0" x2="50" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A485E0"/>
                <stop offset="1" stopColor="#5E27C6"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_2" x1="50" y1="20" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A485E0"/>
                <stop offset="1" stopColor="#3C108A"/>
            </linearGradient>
        </defs>
    </svg>
);


const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center sm:justify-start h-20">
                    <div className="flex items-center space-x-4">
                        <KaiburrLogo />
                        <span className="text-2xl font-bold tracking-wider text-white">
                            KAIBURR
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
