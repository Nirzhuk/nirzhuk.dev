'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Fades the page content on route changes. The outer shell (sidebar, CRT
 * chrome) stays put, so only the scrolling column animates.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ block: 'start' });
        });
        return;
      }

      // The shell scrolls inside <main> on desktop and inside the outer wrapper
      // on mobile, so reset both; window scrolling never applies.
      document.querySelector('main')?.scrollTo({ top: 0 });
      document.querySelector('.crt-safe')?.scrollTo({ top: 0 });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
