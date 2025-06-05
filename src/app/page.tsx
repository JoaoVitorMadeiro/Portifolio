import { extractProfileInfo, type ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';
import { ContactSection } from '@/components/sections/contact';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Dados de exemplo atualizados e traduzidos
const MOCK_PROFILE_DATA: ExtractProfileInfoOutput = {
  name: "João Vitor Madeiro",
  title: "Desenvolvedor Back-End",
  bio: "Desenvolvedor Back-End focado em criar soluções de software escaláveis e robustas. Experiência com Java, Spring Boot, Python, Docker, Kafka e arquitetura de microsserviços. Buscando constantemente novos desafios e evolução técnica.",
  skills: [
    "Java", "Python", "C", "Spring Boot", "JUnit", "Mockito", "Docker", "Kafka", 
    "Git", "Jenkins", "PostgreSQL", "MariaDB", "APIs RESTful", "MongoDB", 
    "Clean Architecture", "Spring Security", "Spring Data JPA", "JWT", "SOLID Principles", "Agile (Scrum)"
  ],
  projects: [
    {
      name: "Loja Online E-commerce",
      description: "Desenvolvimento de um sistema de e-commerce utilizando arquitetura de microsserviços, com foco em robustez e escalabilidade. Inclui autenticação com JWT e integração com Spring Security.",
      technologies: ["Java", "Spring Boot", "Microsserviços", "Docker", "JWT", "Spring Security"],
      link: "#"
    },
    {
      name: "Class-API",
      description: "API RESTful para gerenciamento de turmas e alunos, seguindo os princípios SOLID e Clean Architecture. Foco na organização e manutenibilidade do código.",
      technologies: ["Java", "Spring Boot", "REST", "SOLID", "Clean Architecture", "PostgreSQL"],
      link: "#"
    },
    {
      name: "Ranking Challenge",
      description: "Aplicação de leaderboards (placar de líderes) com microsserviços, utilizando Kafka para mensageria e JWT para autenticação. Projetado para alta concorrência e atualizações em tempo real.",
      technologies: ["Java", "Spring Boot", "Kafka", "JWT", "Microsserviços"],
      link: "#"
    }
  ],
  contactEmail: "joao.madeirodev@gmail.com"
};


export default async function PortfolioPage() {
  let profileData: ExtractProfileInfoOutput | null = null;
  let errorFetchingData: string | null = null;

  try {
    // Tenta buscar os dados reais, mas usaremos MOCK_PROFILE_DATA como fallback prioritário por enquanto
    // profileData = await extractProfileInfo({
    //   linkedInUrl: "https://www.linkedin.com/in/joaovitormadeiro/",
    //   githubUrl: "https://github.com/JoaoVitorMadeiro",
    // });
    // Forçando o uso de mock data para refletir as mudanças solicitadas imediatamente.
    // Em um cenário real, você decidiria se a IA deve ser a fonte primária ou se o mock é para desenvolvimento/fallback.
    if (true) { // Alterado para true para forçar o uso de mock data
        throw new Error("Forçando fallback para mock data para exibir informações atualizadas.");
    }
  } catch (error) {
    console.error("Falha ao buscar dados do perfil da IA:", error);
    errorFetchingData = "Não foi possível carregar as informações do perfil via IA. Exibindo dados de exemplo.";
    profileData = MOCK_PROFILE_DATA; // Usa dados de exemplo como fallback
  }

  if (!profileData) {
    profileData = MOCK_PROFILE_DATA; // Garantia adicional de que mock_profile_data é usado se tudo falhar.
    if (!errorFetchingData) {
        errorFetchingData = "Não foi possível carregar as informações do perfil. Exibindo dados de exemplo."
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {errorFetchingData && (
           <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Problema ao Buscar Dados da IA</AlertTitle>
              <AlertDescription>{errorFetchingData}</AlertDescription>
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
