'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/utils/cn';

const BlobWidget = dynamic(() => import('./BlobWidget'), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-xl bg-terminal/10" />,
});

export default function BlobLoader({ className }: { className?: string }) {
  return (
    <div className={cn('size-[200px] shrink-0 overflow-hidden rounded-xl', className)}>
      <BlobWidget />
    </div>
  );
}
