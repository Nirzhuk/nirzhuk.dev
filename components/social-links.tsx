import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/utils/cn';

const LINKS = [
  { label: 'x', href: 'https://x.com/nirzhuk' },
  { label: 'github', href: 'https://github.com/nirzhuk' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/joan-rafael-serrano-perez/' },
  { label: 'rss', href: '/rss' },
  { label: 'source', href: 'https://github.com/nirzhuk/nirzhuk.dev' },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px]', className)}>
      {LINKS.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-0.5 text-neutral-500 transition-colors hover:text-terminal"
          >
            {label}
            <ArrowUpRight strokeWidth={2} className="size-2.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
