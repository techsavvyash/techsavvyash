import { z } from "zod";

const projectSchema = z.object({
  repo: z.string(),
  link: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export async function getProjects(): Promise<Project[]> {
  return [
    {
      repo: "Stencil",
      link: "https://github.com/samagrax-stencil",
      description: "Opinionated javascript backend framework based on NestJS.",
    },
    {
      repo: "Registry, Credentials and Wallet (RCW)",
      link: "https://github.com/SamagraX-RCW",
      description: "Implementation of the core Verifiable Credentials services as defined by W3C, originally createed for the Unified Learner's Passbook project of the Government of Uttar Pradesh.",
    },
    {
      repo: "Konnect Odisha",
      link: "https://github.com/Konnect-Agri",
      description: "Agricultural loan application made easy using BeckN. Originally developed for the Safal portal by Government of Odisha.",
    },
    {
      repo: "SkillEd: Tranings and Courses",
      link: "https://github.com/Samagra-Development/dsep",
      description: "Reference implementation for the SkillEd protocol (adaptation of BeckN for skilling and education), to be used by the open source community during adoption of ONEST.",
    },
    {
      repo: "cQube",
      link: "https://github.com/Sunbird-cQube",
      description: "Lightning fast data ingestion and data analytics made easy.",
    }
  ];
}