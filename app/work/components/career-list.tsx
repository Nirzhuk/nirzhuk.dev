'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import type { Experience } from '../types';
import type { Waypoint } from '../waypoints';
import { parseWaypointMonth, parseWaypointYear } from '../waypoints';
import { companyColors, formatDateShort, parseDateToDecimalYear } from '../utils';
import { ExperienceModal } from './experience-modal';

type CareerListProps = {
  experiences: Experience[];
  waypoints: Waypoint[];
};

/**
 * Mobile/tablet-friendly career view. The absolute timeline needs room to
 * breathe, so below md the same data is rendered as a readable log.
 */
export function CareerList({ experiences, waypoints }: CareerListProps) {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [open, setOpen] = useState(false);

  const sortedExperiences = useMemo(
    () =>
      [...experiences].sort(
        (a, b) =>
          parseDateToDecimalYear(b.metadata.startDate) -
          parseDateToDecimalYear(a.metadata.startDate)
      ),
    [experiences]
  );

  const sortedWaypoints = useMemo(
    () =>
      [...waypoints].sort((a, b) => {
        const aKey = parseWaypointYear(a.date) * 100 + parseWaypointMonth(a.date);
        const bKey = parseWaypointYear(b.date) * 100 + parseWaypointMonth(b.date);
        return bKey - aKey;
      }),
    [waypoints]
  );

  return (
    <div className="md:hidden">
      <ol className="divide-y divide-terminal/10 border-y border-terminal/15">
        {sortedExperiences.map(experience => {
          const { metadata } = experience;
          const color = companyColors[metadata.company] || '#10fb88';

          return (
            <li key={`${metadata.company}-${metadata.startDate}`}>
              <button
                type="button"
                onClick={() => {
                  setSelected(experience);
                  setOpen(true);
                }}
                className="group flex w-full cursor-pointer items-start gap-3 py-3.5 text-left transition-colors duration-200 hover:bg-terminal/[0.04]"
              >
                <span
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded text-[10px] font-bold text-black"
                  style={{ background: color }}
                >
                  {metadata.company.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-sm font-medium text-neutral-100 transition-colors group-hover:text-terminal">
                      {metadata.company}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-terminal/45">
                      {formatDateShort(metadata.startDate)} — {formatDateShort(metadata.endDate)}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-neutral-400">
                    {metadata.role}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] text-neutral-500">
                    {metadata.location} · {metadata.type}
                  </span>
                </span>
                <ArrowUpRight
                  strokeWidth={2}
                  className="mt-1 size-3.5 shrink-0 text-neutral-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-terminal"
                />
              </button>
            </li>
          );
        })}
      </ol>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Milestones
        </h2>
        <ul className="mt-3 flex flex-col gap-4">
          {sortedWaypoints.map(waypoint => (
            <li key={waypoint.id} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terminal/50"
              />
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-x-2 text-sm text-neutral-100">
                  {waypoint.icon && <span aria-hidden="true">{waypoint.icon}</span>}
                  <span>{waypoint.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-terminal/45">
                    {waypoint.date}
                  </span>
                </p>
                {waypoint.description && (
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                    {waypoint.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ExperienceModal experience={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
