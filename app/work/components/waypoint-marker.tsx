'use client';

import React, { useState } from 'react';
import { parseWaypointYear, parseWaypointMonth, type Waypoint } from '../waypoints';
import { YEAR_HEIGHT, END_YEAR, parseDateToDecimalYear } from '../utils';
import { type Experience } from '../types';

interface WaypointMarkerProps {
  waypoint: Waypoint;
  index: number;
  experiences: Experience[];
}

export const WaypointMarker: React.FC<WaypointMarkerProps> = ({ waypoint, index, experiences }) => {
  const [isOpen, setIsOpen] = useState(false);

  const year = parseWaypointYear(waypoint.date);
  const month = parseWaypointMonth(waypoint.date);
  const decimalYear = year + (month - 1) / 12;
  const yearsFromTop = END_YEAR - decimalYear;
  const top = yearsFromTop * YEAR_HEIGHT;

  // Check if waypoint overlaps with any experience (excluding Freelance)
  const hasOverlap = experiences.some(exp => {
    if (exp.metadata.company === 'Freelance') return false;

    const startDecimal = parseDateToDecimalYear(exp.metadata.startDate);
    const endDecimal = parseDateToDecimalYear(exp.metadata.endDate);

    // Check if waypoint date falls within the experience period
    return decimalYear >= startDecimal && decimalYear <= endDecimal;
  });

  // Content component (reused in both cases)
  const WaypointContent = () => (
    <div className="flex flex-col gap-1">
      {/* Header with icon and title */}
      <div className="flex items-center gap-2">
        <span className="text-lg">{waypoint.icon}</span>
        <span className="font-mono font-semibold text-terminal text-sm drop-shadow-[0_0_3px_rgba(16,251,136,0.4)]">
          {waypoint.title}
        </span>
      </div>

      {/* Description */}
      {waypoint.description && (
        <p className="text-terminal/70 text-xs leading-relaxed">{waypoint.description}</p>
      )}

      {/* Date */}
      <span className="font-mono text-[0.65rem] text-terminal/50 uppercase tracking-wider">
        {waypoint.date}
      </span>
    </div>
  );

  if (!hasOverlap) {
    // No overlap - show full content directly
    return (
      <div
        className="absolute left-0 flex items-start animate-fadeInUp"
        style={{
          top,
          zIndex: 25,
          animationDelay: `${(index + 5) * 100}ms`,
        }}
      >
        <div className="w-3 h-3 bg-terminal rounded-full border-2 border-neutral-950 shadow-[0_0_8px_rgba(16,251,136,0.5)] shrink-0" />
        <div className="ml-2 p-2 px-3 bg-neutral-900/50 border border-terminal/40 rounded-lg backdrop-blur-sm shadow-[0_0_10px_rgba(16,251,136,0.15)]">
          <WaypointContent />
        </div>
      </div>
    );
  }

  // Overlaps with experience - show dot with click-to-reveal tooltip
  return (
    <div
      className="absolute left-0 animate-fadeInUp"
      style={{
        top,
        zIndex: 50,
        animationDelay: `${(index + 5) * 100}ms`,
      }}
    >
      {/* Clickable dot */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={e => e.key === 'Enter' && setIsOpen(!isOpen)}
        className="w-3 h-3 bg-terminal rounded-full border-2 border-neutral-950 shadow-[0_0_10px_rgba(16,251,136,0.6)] transition-all duration-200 hover:scale-125 hover:shadow-[0_0_15px_rgba(16,251,136,0.8)] focus:outline-none focus:scale-125"
        style={{ cursor: 'pointer' }}
        aria-label={`View waypoint: ${waypoint.title}`}
      />

      {/* Tooltip content */}
      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Content */}
          <div
            className="absolute left-8 top-0 z-50 w-auto min-w-[200px] max-w-[280px] p-3 bg-neutral-950/80 border border-terminal/50 rounded-lg backdrop-blur-md shadow-[0_0_25px_rgba(16,251,136,0.3)] animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <WaypointContent />
          </div>
        </>
      )}
    </div>
  );
};
