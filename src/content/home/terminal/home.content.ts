import type { HomeContent } from '../home.content';

export const homeContent: HomeContent = {
  hero: {
    name: 'Bala Murali',
    title: 'Software Developer',
  },
  intro: {
    summary: 'terminal@bala:~$ cat bio.txt',
  },
  expertise: [
    {
      number: '01',
      title: 'Frontend',
      description: 'Interfaces, interactions & design systems',
      level: 90,
    },
    {
      number: '02',
      title: 'Backend',
      description: 'APIs, databases & application architecture',
      level: 80,
    },
    {
      number: '03',
      title: 'UI / UX',
      description: 'Visual systems, usability & interaction',
      level: 75,
    },
    {
      number: '04',
      title: 'Full-Stack',
      description: 'Turning ideas into complete products',
      level: 85,
    },
  ],
  spotlight: {
    number: '01',
    title: 'This Portfolio',
    highlights: [
      'Terminal interface.',
      'Monospace design language.',
      'Built from scratch.',
    ],
    preview: {
      label: 'Preview',
    },
    cta: {
      label: 'Explore',
      href: '/projects',
    },
  },
  connect: {
    heading: 'CONNECT',
    questions: [
      'Got an idea, a project,',
      'or just want to say hello?',
    ],
    statement: 'My inbox is always open.',
    cta: {
      label: 'Say hello',
      href: 'mailto:hello@example.com',
    },
  },
};

