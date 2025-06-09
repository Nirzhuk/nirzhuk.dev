'use client';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    name: 'Adophite',
    url: 'https://adophite.com',
    description:
      'My biggest project ever created as one-man-army, one link bio solution to rule them all',
    stack: 'Next.js,Phoenix Framework, Stripe, Tailwind/Shadcn, and Supabase',
    color: '#e01818',
    colorHover: '#f71919',
  },
  {
    name: 'Monnie',
    url: 'https://monnie.nirzhuk.dev',
    description:
      'Small app to do multiple currency rates at the same time with multiple other currencies, simple and minimalism',
    stack: 'Expo, React Native, Tailwind/NativeWind, and Expo Router',
    color: '#2b3dc7',
    colorHover: '#3b4dc7',
  },
  {
    name: 'Snackies',
    url: 'https://snackies.app',
    description: 'Calories tracker app for your daily meals.',
    stack: 'React Native, Expo, Custom AI API (OpenAI), and NativeWind',
    color: '#18e083',
    colorHover: '#21f793',
  },
  {
    name: 'interlinked.love',
    url: 'https://interlinked.love',
    description: 'Calendar app synced with people you invite and share your schedule with them.',
    stack: 'Next.js, Tailwind/Shadcn, Stripe and Drizzle-ORM',
    color: '#e018c2',
    colorHover: '#f721d7',
  },
  {
    name: 'wwa-builder',
    url: 'https://wwa-builder.nirzhuk.dev',
    description: 'A simple tool to build your own WWArmies Army and share them.',
    stack: 'Next.js, Tailwind/Shadcn, Supabase',
    color: '#e0a418',
    colorHover: '#e1c369',
  },
  {
    name: 'nirzhuk-dev',
    url: 'https://nirzhuk.dev',
    description: 'My personal website, where I share my thoughts, projects, and experiences.',
    stack: 'Next.js, Tailwind/Shadcn, Supabase',
    color: '#8be169',
    colorHover: '#9be169',
  },
];

export default function Page() {
  return (
    <div>
      <ul className="flex flex-col space-y-4 list-[diamond]">
        {projects.map(project => (
          <li key={project.name}>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg flex gap-2 items-center font-semibold transition-colors"
              style={
                {
                  color: project.color,
                  '--hover-color': project.colorHover,
                } as React.CSSProperties & { '--hover-color': string }
              }
              onMouseEnter={e => (e.currentTarget.style.color = project.colorHover)}
              onMouseLeave={e => (e.currentTarget.style.color = project.color)}
            >
              {project.name}
              <ExternalLink strokeWidth={3} className="size-4" />
            </Link>
            <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4">{project.stack}</p>
            <p className="text-sm mt-1">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
51e18;
