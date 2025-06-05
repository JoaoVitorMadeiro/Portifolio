'use server';

/**
 * @fileOverview AI-powered profile information extraction tool.
 *
 * - extractProfileInfo - A function that handles the profile information extraction process.
 * - ExtractProfileInfoInput - The input type for the extractProfileInfo function.
 * - ExtractProfileInfoOutput - The return type for the extractProfileInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractProfileInfoInputSchema = z.object({
  linkedInUrl: z
    .string()
    .describe('The URL of the LinkedIn profile to extract information from.'),
  githubUrl: z.string().describe('The URL of the GitHub profile to extract information from.'),
});
export type ExtractProfileInfoInput = z.infer<typeof ExtractProfileInfoInputSchema>;

const ExtractProfileInfoOutputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  title: z.string().describe('The title of the person.'),
  bio: z.string().describe('A short biography of the person.'),
  skills: z.array(z.string()).describe('A list of skills the person has.'),
  projects: z
    .array(
      z.object({
        name: z.string().describe('The name of the project.'),
        description: z.string().describe('A short description of the project.'),
        technologies: z.array(z.string()).describe('A list of technologies used in the project.'),
        link: z.string().describe('A link to the project.'),
      })
    )
    .describe('A list of projects the person has worked on.'),
  contactEmail: z.string().email().optional().describe('The contact email of the person.'),
});
export type ExtractProfileInfoOutput = z.infer<typeof ExtractProfileInfoOutputSchema>;

export async function extractProfileInfo(input: ExtractProfileInfoInput): Promise<ExtractProfileInfoOutput> {
  return extractProfileInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractProfileInfoPrompt',
  input: {schema: ExtractProfileInfoInputSchema},
  output: {schema: ExtractProfileInfoOutputSchema},
  prompt: `You are an expert at extracting information from LinkedIn and GitHub profiles.

  Extract the following information from the provided profiles:

  LinkedIn Profile URL: {{{linkedInUrl}}}
  GitHub Profile URL: {{{githubUrl}}}

  Output the information in the following JSON format:
  {
    "name": "The name of the person.",
    "title": "The title of the person.",
    "bio": "A short biography of the person.",
    "skills": ["A list of skills the person has."],
    "projects": [
      {
        "name": "The name of the project.",
        "description": "A short description of the project.",
        "technologies": ["A list of technologies used in the project."],
        "link": "A link to the project."
      }
    ],
    "contactEmail": "The contact email of the person."
  }`,
});

const extractProfileInfoFlow = ai.defineFlow(
  {
    name: 'extractProfileInfoFlow',
    inputSchema: ExtractProfileInfoInputSchema,
    outputSchema: ExtractProfileInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
