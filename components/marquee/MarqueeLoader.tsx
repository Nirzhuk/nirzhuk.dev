'use client';

import dynamic from 'next/dynamic';

const MarqueeWidget = dynamic(() => import('./MarqueeWidget'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60px] border-y border-terminal/20 bg-terminal/5 animate-pulse" />
  ),
});

export default function MarqueeLoader() {
  return <MarqueeWidget />;
}
