
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Award, Mail, HomeIcon } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Início', icon: <HomeIcon className="w-4 h-4" /> },
  { href: '#projects', label: 'Projetos', icon: <Briefcase className="w-4 h-4" /> },
  { href: '#skills', label: 'Habilidades', icon: <Award className="w-4 h-4" /> },
  { href: '#contact', label: 'Contato', icon: <Mail className="w-4 h-4" /> },
];

export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    <nav className={`flex ${inSheet ? 'flex-col space-y-2' : 'space-x-2 md:space-x-4'}`}>
      {navItems.map((item) => (
        <Button key={item.label} variant="ghost" asChild className={`transition-colors hover:text-primary ${inSheet ? 'justify-start' : ''}`}>
          <Link href={item.href} className="flex items-center space-x-2">
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-card shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="text-2xl font-headline font-bold text-primary transition-transform hover:scale-105">
          JVM
        </Link>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] pt-10">
              <NavLinks inSheet={true} />
            </SheetContent>
          </Sheet>
        ) : (
          <NavLinks />
        )}
      </div>
    </header>
  );
}
