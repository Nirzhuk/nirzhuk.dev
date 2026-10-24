import type { BuiltWithGroup, Project } from '@/app/projects/data';

const INFRA_TECHS: Record<string, true> = {
  'Cloudflare Workers': true,
  'Custom AI API (OpenAI)': true,
  'Dexie/IndexedDB': true,
  'Drizzle-ORM': true,
  Hono: true,
  'Phoenix Framework': true,
  PostgresQL: true,
  'Self-hosted infra': true,
  Stripe: true,
  Supabase: true,
  TRPC: true,
};

export function splitStack(stack: string[]) {
  const tech: string[] = [];
  const infra: string[] = [];

  for (const item of stack) {
    (INFRA_TECHS[item] ? infra : tech).push(item);
  }

  return { tech, infra };
}

export function builtWithGroups(project: Pick<Project, 'stack' | 'builtWith'>): BuiltWithGroup[] {
  if (project.builtWith && project.builtWith.length > 0) return project.builtWith;

  const { tech, infra } = splitStack(project.stack);

  return [
    { label: 'Tech', items: tech },
    ...(infra.length > 0 ? [{ label: 'Infra / runtime', items: infra }] : []),
  ];
}

export function techLabel(raw: string) {
  if (raw.startsWith('Tailwind')) return 'Tailwind';
  if (raw.startsWith('Expo')) return 'Expo';
  if (raw.startsWith('React Native')) return 'React Native';
  if (raw === 'ReactJS') return 'React';
  return raw;
}
