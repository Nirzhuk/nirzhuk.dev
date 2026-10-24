'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * The pre-paint script in the root layout handles the first hard load of the
 * home page. This covers the other entry path: landing elsewhere first, then
 * navigating to home during the same session.
 */
export function BootTrigger() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname !== '/' ||
      sessionStorage.getItem('nirzhuk:booted') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    sessionStorage.setItem('nirzhuk:booted', '1');
    document.documentElement.classList.add('crt-boot');
    const timer = setTimeout(() => document.documentElement.classList.remove('crt-boot'), 1700);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('crt-boot');
    };
  }, [pathname]);

  return null;
}
