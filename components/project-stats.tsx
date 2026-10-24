import { projects } from '@/app/projects/data';
import { splitStack, techLabel } from 'utils/project-tech';

function countStacks(pick: (stack: string[]) => string[], normalize: boolean) {
  const counts = new Map<string, number>();

  for (const project of projects) {
    const labels = new Set(pick(project.stack).map(item => (normalize ? techLabel(item) : item)));
    for (const label of labels) {
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }

  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 7);
}

export function ProjectStats() {
  const active = projects.filter(project => !project.deprecated);
  const topTech = countStacks(stack => splitStack(stack).tech, true);
  const topInfra = countStacks(stack => splitStack(stack).infra, false);
  const maxTech = topTech[0]?.[1] ?? 1;
  const maxInfra = topInfra[0]?.[1] ?? 1;
  const screenshots = projects.reduce(
    (total, project) =>
      total + (project.screenshots?.phone?.length ?? 0) + (project.screenshots?.web?.length ?? 0),
    0
  );

  return (
    <section
      aria-label="Project stats"
      className="mb-10 grid gap-x-10 gap-y-6 rounded-xl border border-terminal/15 bg-black/20 p-5 sm:grid-cols-2 sm:p-6"
    >
      <div>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Tech
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {topTech.map(([label, count]) => (
            <li
              key={label}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 font-mono text-[11px]"
            >
              <span className="truncate text-neutral-300">{label}</span>
              <span className="h-1 overflow-hidden rounded-full bg-terminal/10">
                <span
                  className="block h-full rounded-full bg-terminal/50"
                  style={{ width: `${(count / maxTech) * 100}%` }}
                />
              </span>
              <span className="text-right tabular-nums text-terminal/70">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Infra <span className="text-neutral-600">/ runtime</span>
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {topInfra.map(([label, count]) => (
            <li
              key={label}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 font-mono text-[11px]"
            >
              <span className="truncate text-neutral-300">{label}</span>
              <span className="h-1 overflow-hidden rounded-full bg-terminal/10">
                <span
                  className="block h-full rounded-full bg-terminal/50"
                  style={{ width: `${(count / maxInfra) * 100}%` }}
                />
              </span>
              <span className="text-right tabular-nums text-terminal/70">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="grid grid-cols-3 gap-4 border-t border-terminal/10 pt-5 font-mono sm:col-span-2">
        {[
          { label: 'projects', value: projects.length },
          { label: 'active', value: active.length },
          { label: 'screenshots', value: screenshots },
        ].map(({ label, value }) => (
          <div key={label}>
            <dt className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">{label}</dt>
            <dd className="mt-1 text-lg tabular-nums text-terminal">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
