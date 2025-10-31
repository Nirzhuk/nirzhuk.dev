'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute sm:flex hidden bottom-16 right-8 md:right-14 md:bottom-auto md:top-10 flex-row items-center justify-center">
      <div className="text-sm text-terminal text-right">
        <div suppressHydrationWarning>{time.getFullYear()}</div>
        <div suppressHydrationWarning>
          {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div suppressHydrationWarning>
          {time.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
