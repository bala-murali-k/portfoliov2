export interface Social {
  label: string;
  url: string;
}

export interface AboutContent {
  summary: string;
  socials: Social[];
}

export interface About {
  hero: unknown;
  professionalTimeline: unknown;
  workProgress: unknown;
  hobbies: unknown;
}

/**
 * Fallback content, used when the active style has no content of its own
 * at content/about/<style-id>/about.<style-id>.content.ts yet.
 */
export const aboutContent: About = {
  hero: {
    title: "About Me",
    description: "This is the section for describing about me.",
    availability: "Available Now"
  },
  professionalTimeline: [],
  workProgress: [],
  hobbies: []
};