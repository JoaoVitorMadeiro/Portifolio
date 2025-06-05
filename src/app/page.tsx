import { extractProfileInfo, type ExtractProfileInfoOutput } from '@/ai/flows/extract-profile-info';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';
import { ContactSection } from '@/components/sections/contact';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Mock data for fallback or development
const MOCK_PROFILE_DATA: ExtractProfileInfoOutput = {
  name: "João Vitor Madeiro",
  title: "Software Engineer | Full Stack Developer",
  bio: "Passionate developer with experience in creating dynamic and responsive web applications. Always eager to learn new technologies and solve challenging problems. This is mock data used when AI fetching fails.",
  skills: ["React", "Node.js", "TypeScript", "JavaScript", "HTML", "CSS", "Python", "Django", "SQL", "Git", "Next.js", "TailwindCSS"],
  projects: [
    {
      name: "Mock Project Alpha",
      description: "An innovative solution for modern web challenges, showcasing advanced frontend and backend integration. Built with a focus on performance and user experience.",
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "GraphQL"],
      link: "#"
    },
    {
      name: "Mock Project Beta",
      description: "A data visualization tool that transforms complex datasets into insightful dashboards. Features real-time updates and interactive charts.",
      technologies: ["React", "D3.js", "Node.js", "Express", "MongoDB"],
      link: "#"
    },
    {
        name: "Mock Project Gamma",
        description: "A collaborative platform designed for remote teams, enhancing productivity through seamless communication and task management features.",
        technologies: ["Vue.js", "Firebase", "WebSockets"],
        link: "#"
    }
  ],
  contactEmail: "joao.madeiro@example.com"
};


export default async function PortfolioPage() {
  let profileData: ExtractProfileInfoOutput | null = null;
  let errorFetchingData: string | null = null;

  try {
    profileData = await extractProfileInfo({
      linkedInUrl: "https://www.linkedin.com/in/joaovitormadeiro/",
      githubUrl: "https://github.com/JoaoVitorMadeiro",
    });
  } catch (error) {
    console.error("Failed to fetch profile data from AI:", error);
    errorFetchingData = "Could not load profile information from AI. Displaying mock data instead.";
    profileData = MOCK_PROFILE_DATA; // Use mock data as fallback
  }

  if (!profileData) {
    // This case should ideally not be hit if mock data is used on error,
    // but it's a safeguard.
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Portfolio</AlertTitle>
          <AlertDescription>
            We encountered an issue loading the portfolio data. Please try refreshing the page or contact support if the problem persists.
            {errorFetchingData && <p className="mt-2">{errorFetchingData}</p>}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {errorFetchingData && (
           <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>AI Data Fetching Issue</AlertTitle>
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
