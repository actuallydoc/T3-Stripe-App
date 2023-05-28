import React from 'react';

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
    return (
        <div className="relative">
            <div className="inline-block">{children}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md opacity-0 transition-opacity duration-300">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;