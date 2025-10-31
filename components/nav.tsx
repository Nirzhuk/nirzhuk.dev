'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = {
  '/': {
    name: 'home',
  },
  '/journal': {
    name: 'journal',
  },
  '/work': {
    name: 'work',
  },
  '/projects': {
    name: 'projects',
  },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="sm:-ml-[8px] mb-4 sm:mb-4 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start text-center justify-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all flex align-middle relative py-1 px-2 m-1 ${
                    isActive ? 'text-primary font-medium' : ''
                  }`}
                >
                  #{name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
