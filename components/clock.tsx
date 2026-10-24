'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

export default function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn('font-mono text-[11px] tabular-nums text-terminal/50', className)}>
      {time ? (
        <div className="flex flex-wrap gap-x-1.5">
          <span suppressHydrationWarning>
            {time.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
          <span className="text-terminal/25">/</span>
          <span suppressHydrationWarning>
            {time.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
        </div>
      ) : (
        <div className="h-[1.35em]" aria-hidden="true" />
      )}
    </div>
  );
}
