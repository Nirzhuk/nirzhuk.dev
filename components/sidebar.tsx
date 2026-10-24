'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { AUTHOR, SITE } from 'utils/site';
import { cn } from '@/utils/cn';
import AvailableForWork from './available-for-work';
import Clock from './clock';
import { SocialLinks } from './social-links';

const NAV_ITEMS = [
  { key: 'works', label: 'works', href: '/projects' },
  { key: 'career', label: 'career', href: '/work' },
  { key: 'journal', label: 'journal', href: '/journal' },
  { key: 'contact', label: 'contact', href: '/#contact' },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  const activeKey = pathname.startsWith('/projects')
    ? 'works'
    : pathname.startsWith('/work')
      ? 'career'
      : pathname.startsWith('/journal')
        ? 'journal'
        : pathname === '/' && hash === '#contact'
          ? 'contact'
          : null;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    if (key !== 'contact' || pathname !== '/') return;

    event.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', '/#contact');
    setHash('#contact');
  };

  return (
    <aside className="terminal-scroll relative flex shrink-0 flex-col border-b border-terminal/15 bg-gradient-to-b from-terminal/[0.05] via-black/20 to-black/30 px-5 py-6 md:h-full md:min-h-0 md:overflow-y-auto md:border-r md:border-b-0 lg:px-7 lg:py-8">
      <div className="flex items-baseline justify-between gap-3 font-mono text-[11px]">
        <Link href="/" className="group inline-flex items-center gap-1.5 text-terminal">
          <span className="text-terminal/40">$</span>
          <span className="tracking-tight">nirzhuk.dev</span>
          <span className="sidebar-caret text-terminal/50">_</span>
        </Link>
        <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
          since {SITE.since}
        </span>
      </div>

      <div className="mt-6 [container-type:inline-size]">
        <AvailableForWork />
        <h1 className="mt-3 text-[clamp(1rem,7.4cqi,2.25rem)] leading-none font-semibold tracking-tight whitespace-nowrap text-white">
          {AUTHOR.name}
          <span className="sidebar-boot-caret" aria-hidden="true" />
        </h1>
        <p className="sidebar-type-line mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-terminal/60">
          {SITE.role}
        </p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-neutral-300">{SITE.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
        {SITE.stack.map(tech => (
          <li
            key={tech}
            className="rounded-md border border-terminal/20 bg-terminal/[0.07] px-1.5 py-0.5 text-terminal/70"
          >
            {tech}
          </li>
        ))}
      </ul>

      <nav aria-label="Sections" className="mt-8 border-t border-terminal/15 pt-3">
        <div className="mb-2 flex items-center justify-between px-3 font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-600">
          <span>index</span>
          <span>{String(NAV_ITEMS.length).padStart(2, '0')}</span>
        </div>
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeKey === item.key;

            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={event => handleNavClick(event, item.key)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-3 py-2 pr-2 pl-3 font-mono text-xs transition-colors duration-200',
                    isActive
                      ? 'bg-terminal/[0.08] text-terminal'
                      : 'text-neutral-400 hover:bg-terminal/[0.04] hover:text-neutral-100'
                  )}
                >
                  <span
                    className={cn(
                      'text-[10px] tabular-nums transition-colors',
                      isActive ? 'text-terminal/60' : 'text-neutral-600'
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight
                    strokeWidth={2}
                    className={cn(
                      'size-3 transition-all duration-200',
                      isActive
                        ? 'translate-x-0 opacity-70'
                        : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 border-t border-terminal/15 pt-4 md:mt-auto">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-600">contact</p>
        <a
          href="mailto:me@nirzhuk.dev"
          className="mt-2 block w-fit font-mono text-sm text-terminal transition-colors duration-200 hover:text-primary"
        >
          me@nirzhuk.dev
        </a>
        <SocialLinks className="mt-3" />
        <Clock className="mt-4" />
      </div>
    </aside>
  );
}
