import React from 'react';
import { YEAR_HEIGHT } from '../utils';

interface YearLabelsProps {
  years: number[];
}

export const YearLabels: React.FC<YearLabelsProps> = ({ years }) => {
  return (
    <div className="relative flex flex-col">
      {years.map((year, i) => (
        <div
          key={year}
          className="absolute left-0 font-mono text-xs text-terminal/50 -translate-y-1/2 select-none drop-shadow-[0_0_2px_rgba(16,251,136,0.3)]"
          style={{ top: i * YEAR_HEIGHT }}
        >
          {year}
          <span className="absolute left-full w-3 h-px bg-terminal/30" />
        </div>
      ))}
    </div>
  );
};
