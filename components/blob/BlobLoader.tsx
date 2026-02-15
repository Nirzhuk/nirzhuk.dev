'use client';

import dynamic from 'next/dynamic';

const BlobWidget = dynamic(() => import('./BlobWidget'), {
  ssr: false,
  loading: () => <div className="w-[200px] h-[200px] rounded-xl bg-terminal/10 animate-pulse" />,
});

export default function BlobLoader() {
  return <BlobWidget />;
}
