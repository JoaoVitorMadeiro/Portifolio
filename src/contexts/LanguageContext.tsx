
"use client";
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';


type Language = "pt-BR" | "en-US";

interface Translations {
  navHome: string;
  navProjects: string;
  navSkills: string;
  navContact: string;
  footerRights: string;
  heroViewWorks: string;
  heroContactMe: string;
  projectsTitle: string;
  projectsNone: string;
  projectTech: string;
  projectLinkView: string;
  projectLinkUnavailable: string;
  skillsTitle: string;
  skillsNone: string;
  skillsCompetencies: string;
  contactTitle: string;
  contactDescription: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  contactEmailLabel: string;
  contactEmailPlaceholder: string;
  contactMessageLabel: string;
  contactMessagePlaceholder: string;
  contactSubmitButton: string;
  contactSubmittingButton: string;
  contactToastSuccessTitle: string;
  contactToastErrorTitle: string;
  alertAiErrorTitle: string;
  alertAiErrorDescription: (errorMsg: string | null) => string;
  metaTitle: (name: string) => string;
  metaDescription: (name: string) => string;
  mockProfileData: ExtractProfileInfoOutput;
  formMessages: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  toggleLanguage: () => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const MOCK_PROFILE_DATA_PT: ExtractProfileInfoOutput = {
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

const MOCK_PROFILE_DATA_EN: ExtractProfileInfoOutput = {
  name: "João Vitor Madeiro",
  title: "Back-End Developer",
  bio: "Back-End Developer focused on creating scalable and robust software solutions. Experience with Java, Spring Boot, Python, Docker, Kafka, and microservices architecture. Constantly seeking new challenges and technical growth.",
  skills: [
    "Java", "Python", "C", "Spring Boot", "JUnit", "Mockito", "Docker", "Kafka",
    "Git", "Jenkins", "PostgreSQL", "MariaDB", "RESTful APIs", "MongoDB",
    "Clean Architecture", "Spring Security", "Spring Data JPA", "JWT", "SOLID Principles", "Agile (Scrum)"
  ],
  projects: [
    {
      name: "E-commerce Online Store",
      description: "Development of an e-commerce system using microservices architecture, focusing on robustness and scalability. Includes JWT authentication and Spring Security integration.",
      technologies: ["Java", "Spring Boot", "Microservices", "Docker", "JWT", "Spring Security"],
      link: "#"
    },
    {
      name: "Class-API",
      description: "RESTful API for managing classes and students, following SOLID principles and Clean Architecture. Focus on code organization and maintainability.",
      technologies: ["Java", "Spring Boot", "REST", "SOLID", "Clean Architecture", "PostgreSQL"],
      link: "#"
    },
    {
      name: "Ranking Challenge",
      description: "Leaderboards application with microservices, using Kafka for messaging and JWT for authentication. Designed for high concurrency and real-time updates.",
      technologies: ["Java", "Spring Boot", "Kafka", "JWT", "Microservices"],
      link: "#"
    }
  ],
  contactEmail: "joao.madeirodev@gmail.com"
};

const translationsData: Record<Language, Translations> = {
  "pt-BR": {
    navHome: "Início",
    navProjects: "Projetos",
    navSkills: "Habilidades",
    navContact: "Contato",
    footerRights: "Todos os direitos reservados.",
    heroViewWorks: "Ver Meus Trabalhos",
    heroContactMe: "Entre em Contato",
    projectsTitle: "Meus Projetos",
    projectsNone: "Nenhum projeto para exibir no momento. Volte em breve!",
    projectTech: "Tecnologias:",
    projectLinkView: "Ver Projeto",
    projectLinkUnavailable: "Link Indisponível",
    skillsTitle: "Habilidades Técnicas",
    skillsNone: "Nenhuma habilidade para exibir no momento. Volte em breve!",
    skillsCompetencies: "Minhas Competências",
    contactTitle: "Entre em Contato",
    contactDescription: "Tem alguma pergunta ou quer colaborar? Envie-me uma mensagem!",
    contactNameLabel: "Nome Completo",
    contactNamePlaceholder: "Seu Nome",
    contactEmailLabel: "Endereço de Email",
    contactEmailPlaceholder: "seu.email@exemplo.com",
    contactMessageLabel: "Sua Mensagem",
    contactMessagePlaceholder: "Olá João, gostaria de discutir...",
    contactSubmitButton: "Enviar Mensagem",
    contactSubmittingButton: "Enviando...",
    contactToastSuccessTitle: "Mensagem Enviada!",
    contactToastErrorTitle: "Erro",
    alertAiErrorTitle: "Problema ao Buscar Dados da IA",
    alertAiErrorDescription: (errorMsg) => errorMsg || "Não foi possível carregar as informações do perfil via IA. Exibindo dados de exemplo.",
    metaTitle: (name) => `Portfólio Profissional - ${name}`,
    metaDescription: (name) => `Portfólio pessoal de ${name}, apresentando habilidades e projetos.`,
    mockProfileData: MOCK_PROFILE_DATA_PT,
    formMessages: {
      "contact.success": "Obrigado pela sua mensagem! Entrarei em contato em breve.",
      "contact.error.generic": "Falha ao enviar mensagem. Por favor, tente novamente mais tarde.",
      "validation.failed": "Falha na validação. Por favor, verifique os dados inseridos.",
    }
  },
  "en-US": {
    navHome: "Home",
    navProjects: "Projects",
    navSkills: "Skills",
    navContact: "Contact",
    footerRights: "All rights reserved.",
    heroViewWorks: "View My Works",
    heroContactMe: "Contact Me",
    projectsTitle: "My Projects",
    projectsNone: "No projects to display at the moment. Check back soon!",
    projectTech: "Technologies:",
    projectLinkView: "View Project",
    projectLinkUnavailable: "Link Unavailable",
    skillsTitle: "Technical Skills",
    skillsNone: "No skills to display at the moment. Check back soon!",
    skillsCompetencies: "My Competencies",
    contactTitle: "Get in Touch",
    contactDescription: "Have a question or want to collaborate? Send me a message!",
    contactNameLabel: "Full Name",
    contactNamePlaceholder: "Your Name",
    contactEmailLabel: "Email Address",
    contactEmailPlaceholder: "your.email@example.com",
    contactMessageLabel: "Your Message",
    contactMessagePlaceholder: "Hello João, I'd like to discuss...",
    contactSubmitButton: "Send Message",
    contactSubmittingButton: "Sending...",
    contactToastSuccessTitle: "Message Sent!",
    contactToastErrorTitle: "Error",
    alertAiErrorTitle: "Problem Fetching AI Data",
    alertAiErrorDescription: (errorMsg) => errorMsg || "Could not load profile information via AI. Displaying sample data.",
    metaTitle: (name) => `Professional Portfolio - ${name}`,
    metaDescription: (name) => `${name}'s personal portfolio, showcasing skills and projects.`,
    mockProfileData: MOCK_PROFILE_DATA_EN,
    formMessages: {
      "contact.success": "Thank you for your message! I will get in touch soon.",
      "contact.error.generic": "Failed to send message. Please try again later.",
      "validation.failed": "Validation failed. Please check the entered data.",
    }
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language | null;
    if (storedLang && translationsData[storedLang]) {
      setLanguage(storedLang);
    } else {
      // Fallback to browser language if available and supported, else default to pt-BR
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' && translationsData['en-US']) {
        setLanguage('en-US');
      } else {
        setLanguage('pt-BR');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "pt-BR" ? "en-US" : "pt-BR"));
  };

  const currentTranslations = translationsData[language] || translationsData["pt-BR"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
