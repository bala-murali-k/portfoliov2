import type { About } from '../about.content';

export interface MinimalMiniHeroContent {
  title: string;
  bio: string[];
  actionLabel: string;
}

export interface MinimalMiniProfessionalTimeline {
  period: string;
  role: string;
  organization: string;
  summary: string;
}

export interface MinimalMiniWorkProgressContent {
  step: string;
  title: string;
  description: string;
}

export interface MinimalMiniHobbiesContent {
  category: string;
  details: string[];
}

export interface MinimalMiniAboutContent extends About {
  hero: MinimalMiniHeroContent;
  professionalTimeline: MinimalMiniProfessionalTimeline[];
  workProgress: MinimalMiniWorkProgressContent[];
  hobbies: MinimalMiniHobbiesContent;
}

export const aboutContent: MinimalMiniAboutContent = {
  hero: {
    title: "ABOUT MYSELF",
    bio: [
      "I am a frontend engineer focused on structural paradigms and architectural insights.",
      "I specialize in building modular, theme-agnostic systems with strict separation of concerns, prioritizing performance and maintainable code over transient trends."
    ],
    actionLabel: "Timeline"
  },
  professionalTimeline: [
    {
      period: "2024 — Present",
      role: "Frontend Engineer",
      organization: "Gove Technologies",
      summary: "Architecting modular, theme-agnostic React systems with strict separation of concerns and data-attribute styling."
    }
  ],
  workProgress: [
    {
      step: "01",
      title: "Discovery",
      description: "Analyzing structural requirements and establishing decoupled schemas before writing markup."
    },
    {
      step: "02",
      title: "Execution",
      description: "Implementing core layouts and swappable UI components utilizing strict TypeScript interfaces."
    },
    {
      step: "03",
      title: "Refinement",
      description: "Optimizing viewport mechanics, accessibility, and smooth CSS entrance animations."
    }
  ],
  hobbies: {
    category: "Off-Screen (Analog)",
    details: [
      "Mechanical Keyboards",
      "Typography Design",
      "Minimalist Architecture",
      "Reading & Watching Sci-Fi"
    ]
  }
};
