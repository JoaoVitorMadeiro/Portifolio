import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted py-8 text-muted-foreground">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} João Vitor Madeiro. All rights reserved.
        </p>
        <div className="mt-4 flex space-x-4 sm:mt-0">
          <Link href="https://github.com/JoaoVitorMadeiro" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Github className="h-6 w-6 transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.linkedin.com/in/joaovitormadeiro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <Linkedin className="h-6 w-6 transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
