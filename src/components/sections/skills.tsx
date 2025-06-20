
"use client";
import type { ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillsSectionProps {
  skills: ExtractProfileInfoOutput['skills'];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { translations } = useLanguage();

  if (!skills || skills.length === 0) {
    return (
      <section id="skills" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">{translations.skillsTitle}</h2>
           <p className="text-center text-muted-foreground">{translations.skillsNone}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">{translations.skillsTitle}</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-center text-2xl text-primary">{translations.skillsCompetencies}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="px-4 py-2 text-base sm:text-lg transition-all duration-200 hover:bg-primary/80 hover:scale-105 cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
