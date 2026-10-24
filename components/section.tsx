import Link from 'next/link';

import { cn } from '@/utils/cn';

type SectionProps = {
  id: string;
  index: string;
  title: string;
  meta?: string;
  action?: { href: string; label: string };
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, meta, action, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-5', className)}>
      <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-terminal/15 pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-terminal/40">{index}</span>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h2>
        </div>
        <div className="flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          {meta && <span className="text-neutral-500">{meta}</span>}
          {action && (
            <Link
              href={action.href}
              className="text-primary normal-case tracking-normal transition-colors hover:text-terminal"
            >
              {action.label} →
            </Link>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}
