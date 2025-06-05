import type { ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  name: ExtractProfileInfoOutput['name'];
  title: ExtractProfileInfoOutput['title'];
  bio: ExtractProfileInfoOutput['bio'];
}

export function HeroSection({ name, title, bio }: HeroSectionProps) {
  return (
    <section id="home" className="flex min-h-screen items-center justify-center bg-background py-20">
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {name || "Seu Nome"}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
          {title || "Seu Título Profissional"}
        </p>
        <p className="mt-8 max-w-2xl mx-auto text-lg text-foreground/80">
          {bio || "Uma biografia breve e envolvente sobre você, suas paixões e o que você faz."}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="transition-transform hover:scale-105">
            <Link href="#projects">Ver Meus Trabalhos</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
            <Link href="#contact">Entre em Contato <ArrowDown className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
