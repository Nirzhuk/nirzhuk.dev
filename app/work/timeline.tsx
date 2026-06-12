'use client';

import React, { useState, useMemo } from 'react';
import { type Experience } from './types';
import { type Waypoint } from './waypoints';
import {
  YEAR_HEIGHT,
  TOTAL_YEARS,
  END_YEAR,
  getPositionFromDate,
  parseDateToDecimalYear,
} from './utils';
import {
  ExperienceCard,
  ExperienceModal,
  WaypointMarker,
  FreelanceBar,
  SideProjectsBar,
  YearLabels,
} from './components';

interface TimelineProps {
  experiences: Experience[];
  waypoints: Waypoint[];
}

interface PositionedExperience {
  experience: Experience;
  top: number;
  height: number;
  column: number;
  totalColumns: number;
}

const MIN_CARD_HEIGHT = 50;

// Check if two positioned cards visually overlap (pixel ranges)
function cardsVisuallyOverlap(
  aTop: number,
  aHeight: number,
  bTop: number,
  bHeight: number,
): boolean {
  return aTop + aHeight > bTop && bTop + bHeight > aTop;
}

// Group overlapping experiences and assign columns
function positionExperiences(experiences: Experience[]): PositionedExperience[] {
  const filteredExps = experiences.filter(exp => exp.metadata.company !== 'Freelance');

  const sortedExps = [...filteredExps].sort((a, b) => {
    return (
      parseDateToDecimalYear(b.metadata.startDate) - parseDateToDecimalYear(a.metadata.startDate)
    );
  });

  const positioned: PositionedExperience[] = [];

  for (const exp of sortedExps) {
    const startPos = getPositionFromDate(exp.metadata.startDate);
    const endPos = getPositionFromDate(exp.metadata.endDate);
    const height = Math.max(startPos - endPos, MIN_CARD_HEIGHT);
    const top = endPos;

    // Find all already positioned cards that visually overlap with this one
    const overlapping = positioned.filter(p =>
      cardsVisuallyOverlap(top, height, p.top, p.height),
    );

    if (overlapping.length === 0) {
      positioned.push({ experience: exp, top, height, column: 0, totalColumns: 1 });
    } else {
      const usedColumns = new Set(overlapping.map(o => o.column));
      const maxColumns = Math.max(...overlapping.map(o => o.totalColumns), 2);

      let column = 0;
      for (let i = 0; i < maxColumns; i++) {
        if (!usedColumns.has(i)) {
          column = i;
          break;
        }
        column = maxColumns;
      }

      const totalColumns = Math.max(maxColumns, column + 1);

      for (const o of overlapping) {
        o.totalColumns = totalColumns;
      }

      positioned.push({ experience: exp, top, height, column, totalColumns });
    }
  }

  return positioned;
}

export const Timeline: React.FC<TimelineProps> = ({ experiences, waypoints }) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Position experiences with bento layout
  const positionedExperiences = useMemo(() => positionExperiences(experiences), [experiences]);

  // Get freelance experience for the sidebar
  const freelanceExp = experiences.find(exp => exp.metadata.company === 'Freelance');
  const freelanceStart = freelanceExp
    ? getPositionFromDate(freelanceExp.metadata.startDate)
    : TOTAL_YEARS * YEAR_HEIGHT;
  const freelanceEnd = freelanceExp ? getPositionFromDate(freelanceExp.metadata.endDate) : 0;
  const freelanceHeight = freelanceStart - freelanceEnd;

  // Side projects bar - spans from 2016 to present (adjust as needed)
  const sideProjectsStart = getPositionFromDate('2016');
  const sideProjectsEnd = getPositionFromDate('Present');
  const sideProjectsHeight = sideProjectsStart - sideProjectsEnd;

  // Generate year labels
  const years = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => END_YEAR - i);

  const handleCardClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setModalOpen(true);
  };

  return (
    <div className="max-w-4xl w-full sm:min-w-4xl mx-auto sm:py-8 sm:px-4 ">
      <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-terminal/70 mb-8 drop-shadow-[0_0_5px_rgba(16,251,136,0.4)]">
        {'>'} Career_Journey
      </h1>

      <div
        className="relative grid grid-cols-[60px_32px_32px_1fr] md:grid-cols-[80px_40px_40px_1fr] gap-1"
        style={{ height: TOTAL_YEARS * YEAR_HEIGHT + YEAR_HEIGHT }}
      >
        {/* Year Labels */}
        <YearLabels years={years} />

        {/* Freelance Bar */}
        <FreelanceBar
          top={freelanceEnd}
          height={freelanceHeight}
          onClick={() => freelanceExp && handleCardClick(freelanceExp)}
        />

        {/* Side Projects Bar */}
        <SideProjectsBar top={sideProjectsEnd} height={sideProjectsHeight} />

        {/* Experience Cards */}
        <div className="relative pl-4">
          {positionedExperiences.map((positioned, index) => (
            <ExperienceCard
              key={positioned.experience.metadata.company}
              experience={positioned.experience}
              index={index}
              onClick={() => handleCardClick(positioned.experience)}
              top={positioned.top}
              height={positioned.height}
              column={positioned.column}
              totalColumns={positioned.totalColumns}
            />
          ))}

          {/* Waypoints */}
          {waypoints.map((waypoint, index) => (
            <WaypointMarker
              key={waypoint.id}
              waypoint={waypoint}
              index={index}
              experiences={experiences}
            />
          ))}
        </div>
      </div>

      {/* Experience Modal */}
      <ExperienceModal
        experience={selectedExperience}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};
