'use client';

import React from 'react';
import Link from 'next/link';

interface SideProjectsBarProps {
  top: number;
  height: number;
}

export const SideProjectsBar: React.FC<SideProjectsBarProps> = ({ top, height }) => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Link
        href="/projects"
        className="absolute w-7 rounded flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        style={{
          top,
          height,
          background:
            'repeating-linear-gradient(-45deg, rgba(99,102,241,0.3), rgba(99,102,241,0.3) 4px, rgba(129,140,248,0.4) 4px, rgba(129,140,248,0.4) 8px)',
          border: '1px solid rgba(99,102,241,0.4)',
        }}
      >
        <span
          className="text-[0.65rem] font-bold tracking-wide text-indigo-300 whitespace-nowrap py-3 font-mono drop-shadow-[0_0_3px_rgba(99,102,241,0.6)]"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          PROJECTS
        </span>
      </Link>
    </div>
  );
};

