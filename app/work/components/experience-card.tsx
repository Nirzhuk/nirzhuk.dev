import React from 'react';
import { type Experience } from '../types';
import { formatDateShort, companyColors } from '../utils';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onClick: () => void;
  // Bento layout props
  top: number;
  height: number;
  column?: number;
  totalColumns?: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  onClick,
  top,
  height,
  column = 0,
  totalColumns = 1,
}) => {
  const { metadata } = experience;
  const color = companyColors[metadata.company] || '#10fb88';

  // Skip freelance as it's shown in the sidebar
  if (metadata.company === 'Freelance') return null;

  // Calculate width and left position based on column
  const getPositionStyles = (): React.CSSProperties => {
    const padding = 16; // left padding
    const gap = 8; // gap between columns

    if (totalColumns === 1) {
      return {
        left: padding,
        right: padding,
      };
    }

    // Calculate percentage width for each column
    const totalGapWidth = gap * (totalColumns - 1);
    const availableWidth = `calc(100% - ${padding * 2}px - ${totalGapWidth}px)`;
    const columnWidth = `calc(${availableWidth} / ${totalColumns})`;

    // Calculate left offset
    const leftOffset =
      column === 0
        ? padding
        : `calc(${padding}px + ${column} * (${availableWidth} / ${totalColumns} + ${gap}px))`;

    return {
      left: leftOffset,
      width: columnWidth,
    };
  };

  const positionStyles = getPositionStyles();

  return (
    <button
      onClick={onClick}
      className="absolute z-10 py-2.5 px-3 flex items-start gap-2 rounded-lg border border-terminal/30 backdrop-blur-sm transition-all duration-300 hover:border-terminal/60 hover:translate-x-1 overflow-hidden animate-fadeInUp cursor-pointer text-left bg-gradient-to-br from-terminal/10 to-primary/5 hover:from-terminal/20 hover:to-primary/10 hover:shadow-[0_0_15px_rgba(16,251,136,0.15)]"
      style={{
        top,
        height: Math.max(height - 8, 42),
        ...positionStyles,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Logo */}
      <div
        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-black shrink-0 shadow-[0_0_10px_rgba(16,251,136,0.3)]"
        style={{ background: color }}
      >
        {metadata.company.charAt(0)}
      </div>

      {/* Company & Role */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-terminal truncate drop-shadow-[0_0_3px_rgba(16,251,136,0.5)]">
          {metadata.company}
        </p>
        <p className="text-xs text-primary/70 truncate">{metadata.role}</p>
      </div>

      {/* Duration - only show if there's enough space */}
      {totalColumns === 1 && (
        <span className="font-mono text-[0.65rem] text-terminal/60 uppercase tracking-wide shrink-0 hidden sm:block">
          {formatDateShort(metadata.startDate)} — {formatDateShort(metadata.endDate)}
        </span>
      )}
    </button>
  );
};
