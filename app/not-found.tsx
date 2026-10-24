import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terminal/45">
        error 404
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-neutral-400">
        That route does not exist. The sections below are where everything lives.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
        {[
          { href: '/projects', label: 'works' },
          { href: '/work', label: 'career' },
          { href: '/journal', label: 'journal' },
          { href: '/#contact', label: 'contact' },
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-terminal/25 bg-terminal/[0.07] px-3 py-1.5 text-terminal/80 transition-colors hover:border-terminal/60 hover:text-terminal"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
