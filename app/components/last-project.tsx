import { projects } from '../projects/data';

export const LastProject = () => {
  const lastProject = projects[0];
  return (
    <div className="flex flex-col gap-2 justify-end items-end">
      <h2 className="text-neutral-900 dark:text-neutral-100 tracking-tight">Last Project</h2>
      <a href={`/projects#${lastProject.name}`}>${lastProject.name}</a>
    </div>
  );
};
