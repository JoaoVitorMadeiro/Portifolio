
"use client"; 

import { useEffect, useState } from 'react';
import { extractProfileInfo, type ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';
import { ContactSection } from '@/components/sections/contact';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

export default function PortfolioPage() {
  const { language, translations } = useLanguage();
  const [profileData, setProfileData] = useState<ExtractProfileInfoOutput>(translations.mockProfileData);
  const [errorFetchingData, setErrorFetchingData] = useState<string | null>(null);

  useEffect(() => {
    setProfileData(translations.mockProfileData);
  }, [language, translations.mockProfileData]);
  
  useEffect(() => {
    document.title = translations.metaTitle(profileData.name);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", translations.metaDescription(profileData.name));
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = "description";
      newMetaDesc.content = translations.metaDescription(profileData.name);
      document.head.appendChild(newMetaDesc);
    }
  }, [language, profileData.name, translations]);


  // AI data fetching logic (currently commented out to prioritize mock data)
  /*
  useEffect(() => {
    async function fetchData() {
      try {
        // Forcing error for now to show mock data
        // const data = await extractProfileInfo({
        //   linkedInUrl: "https://www.linkedin.com/in/joaovitormadeiro/",
        //   githubUrl: "https://github.com/JoaoVitorMadeiro",
        // });
        // setProfileData(data);
        // setErrorFetchingData(null);
        throw new Error("Forcing fallback to mock data to display translated information.");
      } catch (error) {
        console.error("Falha ao buscar dados do perfil da IA:", error);
        setErrorFetchingData(language === "pt-BR" ? "Não foi possível carregar as informações do perfil via IA. Exibindo dados de exemplo." : "Could not load profile information via AI. Displaying sample data.");
        setProfileData(translations.mockProfileData);
      }
    }
    // fetchData(); // Uncomment to enable AI fetching
    
    // Force mock data for now
    setErrorFetchingData(language === "pt-BR" ? "Não foi possível carregar as informações do perfil via IA. Exibindo dados de exemplo." : "Could not load profile information via AI. Displaying sample data.");
    setProfileData(translations.mockProfileData);

  }, [language, translations.mockProfileData]);
  */
   // Simplified setup to always use mock data and show the "error" message for demonstration
   useEffect(() => {
    const mockErrorMsg = language === "pt-BR" 
        ? "Exibindo dados de exemplo. A busca de dados da IA está desabilitada para demonstração."
        : "Displaying sample data. AI data fetching is disabled for demonstration.";
    setErrorFetchingData(mockErrorMsg);
    setProfileData(translations.mockProfileData);
  }, [language, translations.mockProfileData]);


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {errorFetchingData && (
           <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>{translations.alertAiErrorTitle}</AlertTitle>
              <AlertDescription>{translations.alertAiErrorDescription(errorFetchingData)}</AlertDescription>
            </Alert>
          </div>
        )}
        <HeroSection name={profileData.name} title={profileData.title} bio={profileData.bio} />
        <ProjectsSection projects={profileData.projects} />
        <SkillsSection skills={profileData.skills} />
        <ContactSection contactEmail={profileData.contactEmail} />
      </main>
      <Footer />
    </div>
  );
}
