import type { Project } from './projects.content';
import type { MinimalProject } from './minimal/projects.content';
import { projectsContent as defaultContent } from './projects.content';
import { projectsContent as minimalContent } from './minimal/projects.content';
import { projectsContent as modernContent } from './modern/projects.content';
import { projectsContent as minimalMiniContent } from './minimalmini/projects.content';

const contentMap: Record<string, Project[]> = {
  minimal: minimalContent,
  modern: modernContent,
  minimalmini: minimalMiniContent,
};

// src/content/projects/index.ts
export function getProjectsContent<T extends Project = Project>(styleId: string): T[] {
  return (contentMap[styleId] ?? defaultContent) as T[];
}

export type { Project } from './projects.content';
