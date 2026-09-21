import type { Project } from '../projects.content';

export interface TechStack {
  index: number;
  stack: string;
  stackExpert: number;
}

export interface MinimalMiniProject extends Project {
  techStack: TechStack[];
  status: 'Completed' | 'Ongoing' | 'Abandoned';
  isOneVersion: boolean;
  featured: boolean;
  version: string;
  year: number;
  isHosted: boolean;
  isImageAvailable: boolean;
  isCodePublic: boolean;
  versions: MinimalMiniProject[];
  featuresList: string[];
  architectureList: string | null;
  hostedLink: string | null;
  imageType: 'Link' | 'Local' | null;
  imageSource: string | null;
  imageAltText: string | null;
  publicCodeLink: string | null;
  publicCodeSource: string | null;
}

export const projectsContent: MinimalMiniProject[] = [
  {
    id: '1',
    title: 'This Portfolio',
    description:
      'Portfolio designed with strict separation of concerns, ensuring maintainable architecture, reusable components, scalable systems, and consistent user experiences.',
    tags: [],
    link: 'https://bala-murali-k.github.io/portfoliov2/',
    techStack: [
      { index: 1, stack: 'React', stackExpert: 90 },
      { index: 2, stack: 'TypeScript', stackExpert: 85 },
      { index: 3, stack: 'Vite', stackExpert: 80 },
      { index: 4, stack: 'CSS3', stackExpert: 88 },
      { index: 5, stack: 'JavaScript', stackExpert: 92 },
      { index: 6, stack: 'HTML5', stackExpert: 90 },
      { index: 7, stack: 'Git', stackExpert: 75 },
      { index: 8, stack: 'Node.js', stackExpert: 70 },
    ],
    status: 'Ongoing',
    isOneVersion: false,
    featured: true,
    version: '2.0.0',
    year: 2026,
    isHosted: false,
    isImageAvailable: true,
    isCodePublic: false,
    versions: [
      {
        id: '1',
        title: 'This Portfolio',
        description:
          'Portfolio designed with strict separation of concerns, ensuring maintainable architecture, reusable components, scalable systems, and consistent user experiences.',
        tags: [],
        link: 'https://bala-murali-k.github.io/portfolio/',
        techStack: [],
        status: 'Ongoing',
        isOneVersion: false,
        featured: true,
        version: '1.0.0',
        year: 2026,
        isHosted: true,
        isImageAvailable: true,
        isCodePublic: true,
        versions: [],
        featuresList: [],
        architectureList: null,
        hostedLink: 'https://github.com/bala-murali-k/portfolio',
        imageType: 'Local',
        imageSource: 'images/projects/portfolio_v1_ss.png',
        imageAltText: 'Home page screenshot',
        publicCodeLink: null,
        publicCodeSource: null,
      },
    ],
    featuresList: [
      'Structural page containers load self-contained UI modules via an index export layer for isolated component versioning.',
      'Supports instant runtime switching between distinct visual styles via decoupled layout shells and centralized content resolvers.',
      'Context-driven palette switching across light, dark, and custom themes using dynamic CSS design tokens.',
      'Multi-column project showcases pairing truncated copy with framed media previews, tags, and direct route actions.',
      'Non-looping segmented controls dynamically swap project release histories, changelogs, tech stacks, and screenshots in place.',
      'Contextual triggers and dedicated architectural views highlight core structural paradigms and design choices.',
      'Dynamic skills breakdowns, stack expertise bar charts, and deployment specs.',
      'Tabular capability indexes featuring animated percentage progress bars and structured professional channel overviews.',
      'Optimized layout mechanics adapt cleanly to native scrolling and responsive fallback containers for mobile screens.',
      'Built with React, Vite, and TypeScript using a Core + Swappable-Children pattern and data-attribute styling isolation.',
    ],
    architectureList: 'images/projects/Portfolio-Architecture-Image.png',
    hostedLink: null,
    imageType: 'Local',
    imageSource: 'images/projects/portfolio_v2_ss.png',
    imageAltText: 'Home page screenshot',
    publicCodeLink: null,
    publicCodeSource: null,
  },
  {
    id: '2',
    title: 'This Portfolio',
    description: 'One line. That is all it needs.',
    tags: [],
    link: 'https://example.com',
    techStack: [],
    status: 'Ongoing',
    isOneVersion: false,
    featured: true,
    version: '2.0.0',
    year: 2026,
    isHosted: false,
    isImageAvailable: true,
    isCodePublic: false,
    versions: [],
    featuresList: [],
    architectureList: null,
    hostedLink: null,
    imageType: 'Local',
    imageSource: 'images/projects/portfolio_v2_ss.png',
    imageAltText: 'Home page screenshot',
    publicCodeLink: null,
    publicCodeSource: null,
  },
];
