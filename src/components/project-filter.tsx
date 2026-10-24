'use client';
import { useState } from 'react';
import type { Project } from '@/lib/types';
import { ProjectRow } from './project-row';
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('all');
  const categories = ['all', ...new Set(projects.map((project) => project.category))];
  const visible =
    category === 'all' ? projects : projects.filter((project) => project.category === category);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item === 'iot' ? 'IoT' : item === 'ai' ? 'AI' : item}
          </button>
        ))}
      </div>
      <p className="filter-summary" role="status">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>
      <div>
        {visible.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} headingLevel={2} />
        ))}
      </div>
    </>
  );
}
