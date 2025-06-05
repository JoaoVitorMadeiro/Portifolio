
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Award, Mail, HomeIcon, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translations } = useLanguage();

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

  const navItems = [
    { href: '#home', labelKey: 'navHome', icon: <HomeIcon className="w-4 h-4" /> },
    { href: '#projects', labelKey: 'navProjects', icon: <Briefcase className="w-4 h-4" /> },
    { href: '#skills', labelKey: 'navSkills', icon: <Award className="w-4 h-4" /> },
    { href: '#contact', labelKey: 'navContact', icon: <Mail className="w-4 h-4" /> },
  ];

  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    <nav className={`flex items-center ${inSheet ? 'flex-col space-y-2 mt-4' : 'space-x-1 md:space-x-2'}`}>
      {navItems.map((item) => (
        <Button key={item.labelKey} variant="ghost" asChild className={`transition-colors hover:text-primary ${inSheet ? 'justify-start w-full' : ''}`}>
          <Link href={item.href} className="flex items-center space-x-2">
            {item.icon}
            <span>{translations[item.labelKey as keyof typeof translations] || item.labelKey}</span>
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
        <div className="flex items-center space-x-2">
          {isMobile ? (
            <>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}>
                <Globe className="h-5 w-5" />
              </Button>
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
            </>
          ) : (
            <>
              <NavLinks />
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}>
                <Globe className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
