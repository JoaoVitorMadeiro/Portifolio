
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import type { ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { useLanguage } from '@/contexts/LanguageContext';

type Project = ExtractProfileInfoOutput['projects'][number];

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { translations } = useLanguage();
  const placeholderImage = `https://placehold.co/400x250.png`;
  const aiHint = project.name.split(' ').slice(0, 2).join(' ').toLowerCase() || "codigo abstrato";

  return (
    <Card className="flex h-full transform flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <CardHeader>
        <div className="aspect-[16/10] w-full overflow-hidden rounded-t-lg">
           <Image
            src={placeholderImage}
            alt={`Placeholder for ${project.name}`}
            width={400}
            height={250}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={aiHint}
          />
        </div>
        <CardTitle className="font-headline mt-4 text-2xl">{project.name}</CardTitle>
        <CardDescription className="h-20 overflow-y-auto text-sm">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold text-muted-foreground">{translations.projectTech}</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="transition-colors hover:bg-primary/20">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {project.link && project.link !== "#" ? (
          <Button asChild variant="outline" className="w-full transition-colors hover:bg-accent hover:text-accent-foreground">
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              {translations.projectLinkView} <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            {translations.projectLinkUnavailable}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
