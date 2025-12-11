import React from 'react';

interface FreelanceBarProps {
  top: number;
  height: number;
  onClick: () => void;
}

export const FreelanceBar: React.FC<FreelanceBarProps> = ({ top, height, onClick }) => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <button
        onClick={onClick}
        className="absolute w-7 rounded flex items-center justify-center shadow-[0_0_15px_rgba(16,251,136,0.2)]"
        style={{
          top,
          height,
          background:
            'repeating-linear-gradient(-45deg, rgba(16,251,136,0.3), rgba(16,251,136,0.3) 4px, rgba(81,224,24,0.4) 4px, rgba(81,224,24,0.4) 8px)',
          border: '1px solid rgba(16,251,136,0.4)',
        }}
      >
        <span
          className="text-[0.65rem] font-bold tracking-wide text-terminal whitespace-nowrap py-3 font-mono drop-shadow-[0_0_3px_rgba(16,251,136,0.6)]"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          FREELANCE - Open to work :D
        </span>
      </button>
    </div>
  );
};
