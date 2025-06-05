import type { ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { ProjectCard } from '@/components/project-card';

interface ProjectsSectionProps {
  projects: ExtractProfileInfoOutput['projects'];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">Meus Projetos</h2>
          <p className="text-center text-muted-foreground">Nenhum projeto para exibir no momento. Volte em breve!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">Meus Projetos</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.name + index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
