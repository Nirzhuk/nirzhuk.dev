export interface BuiltWithGroup {
  label: string;
  items: string[];
}

export interface Project {
  name: string;
  url: string;
  description: string;
  source?: string;
  /**
   * Compact highlight tags for tiles, featured cards and stats.
   * The full breakdown lives in `builtWith`.
   */
  stack: string[];
  /**
   * Grouped breakdown ("Tech", "Data / storage", "Runtime", "Platforms", …)
   * rendered in the project dialog. Falls back to splitting `stack` when absent.
   */
  builtWith?: BuiltWithGroup[];
  deprecated: boolean;
  categories: string[];
  /**
   * Screenshots grouped by platform. A project can have both groups:
   * phone renders as a phone carousel, web as a full-frame gallery, and
   * tiles show a phone-over-web composite when both exist.
   */
  screenshots?: {
    phone?: string[];
    web?: string[];
  };
  journalSlug?: string;
  highlight?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Todo Remember',
    url: 'https://chromewebstore.google.com/detail/todo-remember/bnbiebhgjagjlgddcedajhmiljglblje',
    source: 'https://github.com/Nirzhuk/todo-remember',
    description:
      'Local-only Chrome extension for scheduled one-time, daily, weekly, and monthly tasks in the Chrome side panel. No server, no account, no network requests — tasks live in IndexedDB on your device, with reminders, notifications, and JSON backup export.',
    stack: ['WXT', 'React', 'TypeScript', 'Dexie/IndexedDB', 'Zustand', 'Tailwind/Shadcn'],
    builtWith: [
      {
        label: 'Tech',
        items: ['WXT', 'React', 'TypeScript', 'Zustand', 'Tailwind CSS / shadcn/ui'],
      },
      { label: 'Data / storage', items: ['Dexie', 'IndexedDB', 'Chrome Storage API'] },
      { label: 'Runtime', items: ['Chrome Extension Manifest V3', 'Background Service Worker'] },
      { label: 'Platforms', items: ['Chrome Browser Extension', 'Chrome Side Panel'] },
    ],
    deprecated: false,
    categories: ['Browser Extension'],
    screenshots: {
      web: [
        '/projects/todo-remember/screenshot-1-tasks.png',
        '/projects/todo-remember/screenshot-2-schedule.png',
        '/projects/todo-remember/screenshot-3-dark.png',
      ],
    },
  },
  {
    name: 'Alfred',
    highlight: true,
    url: 'https://github.com/Nirzhuk/alfred-workflows',
    description:
      'Local desktop app for building automations across your AI coding agents. Compose workflows as visual graphs, route them through agent CLIs like Claude Code, Codex, or Cursor with pinned skills and models, then run the sequence and keep the outputs you want. Free and open source under GPL-3.0.',
    stack: ['Tauri', 'Rust', 'React', 'TypeScript', 'React Flow'],
    builtWith: [
      {
        label: 'Tech',
        items: ['TypeScript', 'Rust', 'React', 'Tauri', 'React Flow', 'Zustand', 'CSS', 'Vite'],
      },
      { label: 'Data / storage', items: ['SQLite', 'rusqlite', 'bun:sqlite', 'Cloudflare D1'] },
      {
        label: 'Infrastructure',
        items: ['Cloudflare Workers', 'Docker', 'GitHub Actions', 'GitHub Releases'],
      },
      { label: 'Runtime', items: ['Native system WebView', 'Tokio', 'Bun'] },
      { label: 'Platforms', items: ['macOS', 'Windows', 'Linux desktop'] },
    ],
    deprecated: false,
    categories: ['Desktop App'],
  },
  {
    name: 'NetHaven',
    highlight: true,
    url: 'https://nethaven.app/',

    description:
      'Personal finance dashboard that syncs banks, brokerages, and crypto into one live net worth view, with budgets, subscriptions, debt payoff, and savings goals updating as money moves. Available on iOS, Android, and the web, with the web app on Cloudflare Workers and the API on self-hosted infrastructure.',
    stack: [
      'React Native',
      'PostgresQL',
      'Drizzle-ORM',
      'Hono',
      'TRPC',
      'Tanstack Start',
      'Cloudflare Workers',
      'Self-hosted infra',
      'React Native Reanimated',
      'Expo',
      'UniWind',
      'Expo Router',
    ],
    builtWith: [
      {
        label: 'Tech',
        items: [
          'TypeScript',
          'React',
          'TanStack Start',
          'TanStack Router',
          'React Native',
          'Expo',
          'Expo Router',
          'Tailwind CSS',
          'UniWind',
          'TanStack Query',
          'Zustand',
          'Hono',
          'tRPC',
          'Better Auth',
        ],
      },
      {
        label: 'Data / storage',
        items: ['PostgreSQL', 'Drizzle ORM', 'Redis', 'MMKV', 'Cloudflare R2'],
      },
      {
        label: 'Infrastructure',
        items: ['Cloudflare Workers', 'Docker', 'Expo Application Services'],
      },
      { label: 'Runtime', items: ['Bun', 'Cloudflare Workers (web SSR)'] },
      { label: 'Platforms', items: ['Web', 'iOS', 'Android'] },
    ],
    deprecated: false,
    categories: ['Mobile App', 'Web App'],
    journalSlug: 'nethaven',
    screenshots: {
      phone: [
        '/projects/nethaven/1.png',
        '/projects/nethaven/2.png',
        '/projects/nethaven/3.png',
        '/projects/nethaven/4.png',
        '/projects/nethaven/5.png',
        '/projects/nethaven/6.png',
        '/projects/nethaven/7.png',
      ],
    },
  },
  {
    name: 'Animalese Generator',
    url: 'https://animalese-generator-weld.vercel.app/',
    source: 'https://github.com/nirzhuk/animalese-generator',
    description:
      'Generate Animal Crossing-style speech from text. Convert any text to animalese sounds with customizable voice settings, pitch, and timing.',
    stack: ['Next.js', 'Tailwind CSS', 'Web Audio API'],
    deprecated: false,
    categories: ['Web Tool'],
  },
  {
    name: 'Monnie',
    url: 'https://monnie.nirzhuk.dev',
    description:
      'Small app to do multiple currency rates at the same time with multiple other currencies, simple and minimalism',
    stack: ['Expo', 'React Native', 'Tailwind/NativeWind', 'Expo Router'],
    builtWith: [
      {
        label: 'Tech',
        items: [
          'TypeScript',
          'React Native',
          'Expo',
          'Expo Router',
          'Zustand',
          'NativeWind',
          'Tailwind CSS',
          'React Native Reanimated',
          'Swift',
          'SwiftUI',
          'WidgetKit',
        ],
      },
      { label: 'Data / storage', items: ['MMKV', 'FloatRates API'] },
      { label: 'Services', items: ['RevenueCat', 'Vexo'] },
      { label: 'Infrastructure', items: ['EAS Build', 'EAS Update'] },
      { label: 'Runtime', items: ['Hermes'] },
      { label: 'Platforms', items: ['iOS with native home screen widgets'] },
    ],
    deprecated: false,
    categories: ['Mobile App'],
    screenshots: {
      phone: ['/projects/monnie/1.png', '/projects/monnie/2.png', '/projects/monnie/3.png'],
    },
  },
  {
    name: 'Dither tool',
    url: 'https://dither.nirzhuk.dev',
    description: 'Small tool to dither images with multiple algorithms',
    stack: ['Next.js', 'Tailwind/Shadcn'],
    deprecated: false,
    categories: ['Web Tool'],
    screenshots: {
      web: ['/projects/dither.png'],
    },
  },
  {
    name: 'Snackies',
    url: 'https://snackies.app',
    description: 'Calories tracker app for your daily meals.',
    stack: ['React Native', 'Expo', 'Custom AI API (OpenAI)', 'NativeWind'],
    deprecated: false,
    categories: ['Mobile App'],
  },
  {
    name: 'interlinked.love',
    url: 'https://interlinked.love',
    source: 'https://github.com/nirzhuk/interlinked.love',
    description: 'Calendar app synced with people you invite and share your schedule with them.',
    stack: ['Next.js', 'Tailwind/Shadcn', 'Stripe', 'Drizzle-ORM'],
    deprecated: false,
    categories: ['Web App'],
  },
  {
    name: 'wwa-builder',
    url: 'https://wwa-builder.nirzhuk.dev',
    description: 'A simple tool to build your own WWArmies Army and share them.',
    stack: ['Next.js', 'Tailwind/Shadcn', 'Supabase'],
    deprecated: true,
    categories: ['Web App'],
  },
  {
    name: 'Adophite',
    url: 'https://adophite.com',
    description:
      'My biggest project ever created as one-man-army, one link bio solution to rule them all',
    stack: ['Next.js', 'Phoenix Framework', 'Stripe', 'Tailwind/Shadcn', 'Supabase'],
    deprecated: true,
    categories: ['Web App'],
  },
];
