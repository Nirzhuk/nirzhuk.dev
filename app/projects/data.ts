export interface Project {
  name: string;
  url: string;
  description: string;
  source?: string;
  stack: string[];
  color: string;
  colorHover: string;
  deprecated: boolean;
  categories: string[];
  images?: string[];
}

export const projects: Project[] = [
  {
    name: 'Monnie',
    url: 'https://monnie.nirzhuk.dev',
    description:
      'Small app to do multiple currency rates at the same time with multiple other currencies, simple and minimalism',
    stack: ['Expo', 'React Native', 'Tailwind/NativeWind', 'Expo Router'],
    color: '#2b3dc7',
    colorHover: '#3b4dc7',
    deprecated: false,
    categories: ['Mobile App', 'All'],
    images: ['/projects/monnie/1.png', '/projects/monnie/2.png', '/projects/monnie/3.png'],
  },
  {
    name: 'Dither tool',
    url: 'https://dither.nirzhuk.dev',
    description: 'Small tool to dither images with multiple algorithms',
    stack: ['Next.js', 'Tailwind/Shadcn'],
    color: '#383838',
    colorHover: '#484848',
    deprecated: false,
    categories: ['Web Tool', 'All'],
    images: ['projects/dither.png'],
  },
  {
    name: 'Snackies',
    url: 'https://snackies.app',
    description: 'Calories tracker app for your daily meals.',
    stack: ['React Native', 'Expo', 'Custom AI API (OpenAI)', 'NativeWind'],
    color: '#18e083',
    colorHover: '#21f793',
    deprecated: false,
    categories: ['Mobile App', 'All'],
  },
  {
    name: 'interlinked.love',
    url: 'https://interlinked.love',
    source: 'https://github.com/nirzhuk/interlinked.love',
    description: 'Calendar app synced with people you invite and share your schedule with them.',
    stack: ['Next.js', 'Tailwind/Shadcn', 'Stripe', 'Drizzle-ORM'],
    color: '#e018c2',
    colorHover: '#f721d7',
    deprecated: false,
    categories: ['Web App', 'All'],
  },
  {
    name: 'wwa-builder',
    url: 'https://wwa-builder.nirzhuk.dev',
    description: 'A simple tool to build your own WWArmies Army and share them.',
    stack: ['Next.js', 'Tailwind/Shadcn', 'Supabase'],
    color: '#e0a418',
    colorHover: '#e1c369',
    deprecated: true,
    categories: ['Web App', 'All'],
  },
  {
    name: 'Adophite',
    url: 'https://adophite.com',
    description:
      'My biggest project ever created as one-man-army, one link bio solution to rule them all',
    stack: ['Next.js', 'Phoenix Framework', 'Stripe', 'Tailwind/Shadcn', 'Supabase'],
    color: '#e01818',
    colorHover: '#f71919',
    deprecated: true,
    categories: ['Web App', 'All'],
  },
];
