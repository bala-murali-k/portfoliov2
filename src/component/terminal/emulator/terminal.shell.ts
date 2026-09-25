export interface ShellContext {
  toggleTheme: () => void;
  switchTheme?: (themeName: 'light' | 'dark') => void;
  exitTerminal: () => void;
  themeId: string;
}

export interface VirtualFile {
  name: string;
  type: 'file' | 'dir';
  size: number;
  content?: string;
  permissions?: string;
}

export const VIRTUAL_FS: Record<string, VirtualFile> = {
  'bio.txt': {
    name: 'bio.txt',
    type: 'file',
    size: 348,
    permissions: '-rw-r--r--',
    content: [
      'Name:        Bala Murali',
      'Role:        Software Developer',
      'Location:    India',
      'Focus:       Frontend & Full-Stack Web Architecture',
      'Bio:         Crafting responsive, maintainable digital experiences with strict',
      '             separation of concerns and elegant component design systems.',
    ].join('\r\n'),
  },
  'about.txt': {
    name: 'about.txt',
    type: 'file',
    size: 420,
    permissions: '-rw-r--r--',
    content: [
      'About Me:',
      '  Software developer focused on scalable React/TypeScript applications.',
      '  Specialized in modular component architectures, CSS design systems,',
      '  and interactive terminal-inspired & minimalist layouts.',
    ].join('\r\n'),
  },
  'skills.txt': {
    name: 'skills.txt',
    type: 'file',
    size: 512,
    permissions: '-rw-r--r--',
    content: [
      '[Languages & Core]',
      '  • TypeScript, JavaScript (ESNext), HTML5, CSS3, SQL',
      '',
      '[Frontend Ecosystem]',
      '  • React 18, Vite, React Router, Design Systems, State Management',
      '',
      '[Backend & Tooling]',
      '  • Node.js, Express, SQLite, Git, pnpm, REST APIs, xterm.js',
    ].join('\r\n'),
  },
  'contact.txt': {
    name: 'contact.txt',
    type: 'file',
    size: 280,
    permissions: '-rw-r--r--',
    content: [
      'Contact & Profiles:',
      '  • Email:    k.balamurali0701@gmail.com',
      '  • GitHub:   https://github.com/bala-murali-k',
      '  • LinkedIn: https://www.linkedin.com/in/bala-murali-k',
      '  • Web:      https://bala-murali-k.github.io/portfoliov2/',
    ].join('\r\n'),
  },
  'experience.txt': {
    name: 'experience.txt',
    type: 'file',
    size: 410,
    permissions: '-rw-r--r--',
    content: [
      'Experience:',
      '  • Software Developer (Jul 2026 - Present)',
      '    - Architected multi-style responsive portfolio system.',
      '    - Built interactive xterm.js CLI simulation and modular layout shells.',
      '  • Portfolio Project (Oct 2025 - Jun 2026)',
      '    - Developed client-side routed portfolio with MUI theming & EmailJS.',
    ].join('\r\n'),
  },
  'projects': {
    name: 'projects',
    type: 'dir',
    size: 4096,
    permissions: 'drwxr-xr-x',
  },
};

export const PROJECTS_FS: Record<string, VirtualFile> = {
  'this-portfolio.txt': {
    name: 'this-portfolio.txt',
    type: 'file',
    size: 390,
    permissions: '-rw-r--r--',
    content: [
      'Project:     This Portfolio (v2.0.0)',
      'Status:      Ongoing',
      'Stack:       React, TypeScript, Vite, CSS3, JavaScript, Node.js',
      'Link:        https://bala-murali-k.github.io/portfoliov2/',
      'Highlights:  Multiple runtime swappable styles (Modern, Minimal, MinimalMini, Terminal)',
      '             Interactive xterm.js shell, drawers, gesture version switcher.',
    ].join('\r\n'),
  },
  'my-portfolio.txt': {
    name: 'my-portfolio.txt',
    type: 'file',
    size: 320,
    permissions: '-rw-r--r--',
    content: [
      'Project:     My Portfolio (v1.0.0)',
      'Status:      Completed',
      'Stack:       React, TypeScript, Vite, React Router, MUI, Emotion, EmailJS',
      'Link:        https://bala-murali-k.github.io/portfolio/',
      'Highlights:  Multi-page portfolio with theme switching and EmailJS contact form.',
    ].join('\r\n'),
  },
  'jobtracker.txt': {
    name: 'jobtracker.txt',
    type: 'file',
    size: 310,
    permissions: '-rw-r--r--',
    content: [
      'Project:     Jobtracker (v1.0.2)',
      'Status:      Ongoing',
      'Stack:       TypeScript, Node.js, Express, EJS, SQLite, Commander.js',
      'Link:        https://jobtracker-8ywo.onrender.com/',
      'Highlights:  Job application tracking system with SQLite persistence.',
    ].join('\r\n'),
  },
};

export const AVAILABLE_COMMANDS = [
  'whoami',
  'ls',
  'cat',
  'pwd',
  'projects',
  'contact',
  'skills',
  'date',
  'echo',
  'clear',
  'theme',
  'history',
  'uname',
  'exit',
  'help',
];

export function handleShellCommand(
  rawInput: string,
  context: ShellContext,
  commandHistory: string[]
): { output: string; shouldClear?: boolean; shouldExit?: boolean } {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'whoami': {
      return { output: 'bala' };
    }

    case 'pwd': {
      return { output: '/home/bala' };
    }

    case 'date': {
      return { output: new Date().toString() };
    }

    case 'echo': {
      return { output: args.join(' ') };
    }

    case 'uname': {
      if (args.includes('-a')) {
        return {
          output: 'Linux bala-portfolio 6.6.0-xterm #1 SMP PREEMPT x86_64 GNU/Linux',
        };
      }
      return { output: 'Linux' };
    }

    case 'ls': {
      const isLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
      const isAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const targetDir = args.find((a) => !a.startsWith('-')) || '';

      const normalizedDir = targetDir.replace(/\/$/, '');

      if (normalizedDir === 'projects') {
        const files = Object.values(PROJECTS_FS);
        if (isLong) {
          const lines = [
            `total ${files.length}`,
            ...files.map(
              (f) =>
                `${f.permissions} 1 bala bala ${f.size.toString().padStart(5, ' ')} Sep 25 12:00 \x1b[32m${f.name}\x1b[0m`
            ),
          ];
          return { output: lines.join('\r\n') };
        }
        return {
          output: files.map((f) => `\x1b[32m${f.name}\x1b[0m`).join('    '),
        };
      }

      if (targetDir && targetDir !== '.' && targetDir !== './') {
        if (VIRTUAL_FS[targetDir]?.type === 'file') {
          return { output: targetDir };
        }
        return { output: `ls: cannot access '${targetDir}': No such file or directory` };
      }

      const files = Object.values(VIRTUAL_FS);
      if (isLong) {
        const prefixLines = isAll
          ? [
              'drwxr-xr-x 4 bala bala  4096 Sep 25 12:00 \x1b[1;34m.\x1b[0m',
              'drwxr-xr-x 3 root root  4096 Sep 25 12:00 \x1b[1;34m..\x1b[0m',
            ]
          : [];
        const fileLines = files.map((f) => {
          const nameColor = f.type === 'dir' ? `\x1b[1;34m${f.name}/\x1b[0m` : `\x1b[32m${f.name}\x1b[0m`;
          return `${f.permissions} 1 bala bala ${f.size.toString().padStart(5, ' ')} Sep 25 12:00 ${nameColor}`;
        });
        const lines = [`total ${files.length + prefixLines.length}`, ...prefixLines, ...fileLines];
        return { output: lines.join('\r\n') };
      }

      const fileNames = files.map((f) =>
        f.type === 'dir' ? `\x1b[1;34m${f.name}/\x1b[0m` : `\x1b[32m${f.name}\x1b[0m`
      );
      if (isAll) {
        fileNames.unshift('\x1b[1;34m.\x1b[0m', '\x1b[1;34m..\x1b[0m');
      }
      return { output: fileNames.join('    ') };
    }

    case 'cat': {
      if (args.length === 0) {
        return { output: 'cat: missing file operand\r\nTry \'help\' for more information.' };
      }

      const filename = args[0].replace(/^\.\//, '');

      if (filename.startsWith('projects/')) {
        const subFile = filename.replace(/^projects\//, '');
        const file = PROJECTS_FS[subFile];
        if (!file) {
          return { output: `cat: ${filename}: No such file or directory` };
        }
        return { output: file.content || '' };
      }

      if (filename === 'projects') {
        return { output: 'cat: projects: Is a directory (try: ls projects)' };
      }

      const file = VIRTUAL_FS[filename];
      if (!file) {
        return { output: `cat: ${filename}: No such file or directory` };
      }

      if (file.type === 'dir') {
        return { output: `cat: ${filename}: Is a directory` };
      }

      return { output: file.content || '' };
    }

    case 'projects': {
      const p1 = PROJECTS_FS['this-portfolio.txt'].content;
      const p2 = PROJECTS_FS['my-portfolio.txt'].content;
      const p3 = PROJECTS_FS['jobtracker.txt'].content;
      return {
        output: [
          '\x1b[1;36m=== Projects ===\x1b[0m',
          p1,
          '--------------------------------------------------',
          p2,
          '--------------------------------------------------',
          p3,
        ].join('\r\n'),
      };
    }

    case 'contact': {
      return { output: VIRTUAL_FS['contact.txt'].content || '' };
    }

    case 'skills': {
      return { output: VIRTUAL_FS['skills.txt'].content || '' };
    }

    case 'theme': {
      const sub = args[0]?.toLowerCase();
      if (sub === 'dark') {
        if (context.themeId !== 'dark') context.toggleTheme();
        return { output: 'Theme set to \x1b[1;32mdark\x1b[0m' };
      }
      if (sub === 'light') {
        if (context.themeId !== 'light') context.toggleTheme();
        return { output: 'Theme set to \x1b[1;32mlight\x1b[0m' };
      }
      if (sub === 'toggle') {
        context.toggleTheme();
        return { output: 'Toggled theme' };
      }
      return {
        output: `Current theme: \x1b[1;32m${context.themeId}\x1b[0m\r\nUsage: theme [dark | light | toggle]`,
      };
    }

    case 'clear': {
      return { output: '', shouldClear: true };
    }

    case 'history': {
      const lines = commandHistory.map((cmd, idx) => `  ${idx + 1}  ${cmd}`);
      return { output: lines.join('\r\n') };
    }

    case 'exit':
    case 'quit':
    case 'close': {
      context.exitTerminal();
      return { output: 'Exiting terminal session...', shouldExit: true };
    }

    case 'sudo': {
      return { output: 'bala is not in the sudoers file. This incident will be reported.' };
    }

    case 'help': {
      return {
        output: [
          '\x1b[1;36m=== Available Commands ===\x1b[0m',
          '  \x1b[1;32mls\x1b[0m [-l, -a] [dir]    List directory contents',
          '  \x1b[1;32mwhoami\x1b[0m              Display current user identity',
          '  \x1b[1;32mcat\x1b[0m <filename>      Display file contents (e.g. cat bio.txt)',
          '  \x1b[1;32mpwd\x1b[0m                 Print current working directory',
          '  \x1b[1;32mprojects\x1b[0m            Quick list of portfolio projects',
          '  \x1b[1;32mskills\x1b[0m              View technical skills breakdown',
          '  \x1b[1;32mcontact\x1b[0m             Display contact details and channels',
          '  \x1b[1;32mtheme\x1b[0m [dark|light]  View or switch color theme',
          '  \x1b[1;32mecho\x1b[0m [text]         Print arguments to terminal',
          '  \x1b[1;32mdate\x1b[0m                Display current system date and time',
          '  \x1b[1;32muname\x1b[0m [-a]          Print system and kernel info',
          '  \x1b[1;32mhistory\x1b[0m             Display command line history',
          '  \x1b[1;32mclear\x1b[0m               Clear terminal screen buffer',
          '  \x1b[1;32mexit\x1b[0m                Return to standard web navigation',
          '  \x1b[1;32mhelp\x1b[0m                Show this help menu',
          '',
          '\x1b[90mTip: Use Tab for autocomplete, and Up/Down arrows for command history.\x1b[0m',
        ].join('\r\n'),
      };
    }

    default: {
      return {
        output: `command not found: \x1b[31m${command}\x1b[0m. Type \'\x1b[1;32mhelp\x1b[0m\' for a list of commands.`,
      };
    }
  }
}
