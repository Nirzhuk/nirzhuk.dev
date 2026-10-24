import { cn } from '@/utils/cn';

type PageHeaderProps = {
  index: string;
  title: string;
  description?: string;
  meta?: string;
  className?: string;
};

export function PageHeader({ index, title, description, meta, className }: PageHeaderProps) {
  return (
    <header className={cn('mb-8 border-b border-terminal/15 pb-4', className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terminal/45">{index}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        {meta && (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            {meta}
          </p>
        )}
      </div>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">{description}</p>
      )}
    </header>
  );
}
