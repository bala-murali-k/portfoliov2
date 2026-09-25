import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { useStyle } from '@context/global/style-context';
import { useRealTerminalMode } from '@/utils/hooks/terminal/use.terminal.mode';
import {
  handleShellCommand,
  AVAILABLE_COMMANDS,
  VIRTUAL_FS,
  PROJECTS_FS,
  type ShellContext,
} from './terminal.shell';
import styles from './terminal.emulator.module.css';

const PROMPT = '\x1b[1;32mbala\x1b[0m:\x1b[1;34m~\x1b[0m$ ';

export default function TerminalEmulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  const { themeId, theme, toggleTheme } = useStyle();
  const [, setRealTerminalMode] = useRealTerminalMode();

  // Keep ref of context functions so callbacks always see latest
  const contextRef = useRef<ShellContext>({
    themeId,
    toggleTheme,
    exitTerminal: () => setRealTerminalMode(false),
  });

  useEffect(() => {
    contextRef.current = {
      themeId,
      toggleTheme,
      exitTerminal: () => setRealTerminalMode(false),
    };
  }, [themeId, toggleTheme, setRealTerminalMode]);

  // Update terminal theme colors when theme changes
  useEffect(() => {
    if (!termRef.current) return;
    const isDark = themeId === 'dark';
    termRef.current.options.theme = {
      background: theme.colors.background || (isDark ? '#0d1117' : '#f6f8fa'),
      foreground: theme.colors.foreground || (isDark ? '#39d353' : '#1f2328'),
      cursor: theme.colors.foreground || (isDark ? '#39d353' : '#1a7f37'),
      cursorAccent: theme.colors.background || (isDark ? '#0d1117' : '#ffffff'),
      selectionBackground: isDark ? 'rgba(57, 211, 83, 0.3)' : 'rgba(26, 127, 55, 0.2)',
      black: isDark ? '#0d1117' : '#24292f',
      red: '#ff7b72',
      green: '#39d353',
      yellow: '#d29922',
      blue: '#58a6ff',
      magenta: '#bc8cff',
      cyan: '#39c5cf',
      white: isDark ? '#d0d7de' : '#57606a',
      brightBlack: '#6e7681',
      brightRed: '#ffa198',
      brightGreen: '#56d364',
      brightYellow: '#e3b341',
      brightBlue: '#79c0ff',
      brightMagenta: '#d2a8ff',
      brightCyan: '#56d4dd',
      brightWhite: '#ffffff',
    };
  }, [themeId, theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const isDark = themeId === 'dark';

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'block',
      fontFamily:
        "ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      fontSize: 14,
      lineHeight: 1.25,
      convertEol: true,
      theme: {
        background: theme.colors.background || (isDark ? '#0d1117' : '#f6f8fa'),
        foreground: theme.colors.foreground || (isDark ? '#39d353' : '#1f2328'),
        cursor: theme.colors.foreground || (isDark ? '#39d353' : '#1a7f37'),
        cursorAccent: theme.colors.background || (isDark ? '#0d1117' : '#ffffff'),
        selectionBackground: isDark ? 'rgba(57, 211, 83, 0.3)' : 'rgba(26, 127, 55, 0.2)',
        black: isDark ? '#0d1117' : '#24292f',
        red: '#ff7b72',
        green: '#39d353',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39c5cf',
        white: isDark ? '#d0d7de' : '#57606a',
        brightBlack: '#6e7681',
        brightRed: '#ffa198',
        brightGreen: '#56d364',
        brightYellow: '#e3b341',
        brightBlue: '#79c0ff',
        brightMagenta: '#d2a8ff',
        brightCyan: '#56d4dd',
        brightWhite: '#ffffff',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(containerRef.current);
    termRef.current = term;
    fitAddonRef.current = fitAddon;

    // Initial fit with rAF and setTimeout fallback
    const handleFit = () => {
      try {
        fitAddon.fit();
      } catch {
        // Ignore fit error before container has layout
      }
    };

    requestAnimationFrame(handleFit);
    const fitTimer = setTimeout(handleFit, 60);

    // Handle container and window resize
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(handleFit);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      if (containerRef.current.parentElement) {
        resizeObserver.observe(containerRef.current.parentElement);
      }
    }
    window.addEventListener('resize', handleFit);

    // Initial Welcome Message
    term.writeln('\x1b[1;32m  ____         _            __  __                  _ _   _ \x1b[0m');
    term.writeln('\x1b[1;32m | __ )   __ _| | __ _     |  \\/  |_   _ _ __ __ _ | (_) | |\x1b[0m');
    term.writeln("\x1b[1;32m |  _ \\  / _` | |/ _` |    | |\\/| | | | | '__/ _` || | | | |\x1b[0m");
    term.writeln('\x1b[1;32m | |_) | (_| | | (_| |    | |  | | |_| | | | (_| || | | |_|\x1b[0m');
    term.writeln('\x1b[1;32m |____/ \\__,_|_|\\__,_|    |_|  |_|\\__,_|_|  \\__,_||_|_| (_)\x1b[0m');
    term.writeln('');
    term.writeln(
      ' \x1b[1;37mInteractive Portfolio Terminal Shell\x1b[0m \x1b[90m(v1.0.0)\x1b[0m'
    );
    term.writeln(
      " Type \x1b[1;32m'help'\x1b[0m to list commands (\x1b[32mls\x1b[0m, \x1b[32mwhoami\x1b[0m, \x1b[32mcat\x1b[0m, \x1b[32mprojects\x1b[0m, \x1b[32mtheme\x1b[0m)."
    );
    term.writeln(
      " Type \x1b[1;32m'exit'\x1b[0m or uncheck the header box to return."
    );
    term.writeln('');
    term.write(PROMPT);

    // Shell state
    let inputBuffer = '';
    let cursorPos = 0;
    const history: string[] = [];
    let historyIndex = -1;

    const redrawLine = (buf: string, pos: number) => {
      term.write('\r\x1b[K' + PROMPT + buf);
      const diff = buf.length - pos;
      if (diff > 0) {
        term.write(`\x1b[${diff}D`);
      }
    };

    const dataDisposable = term.onData((data) => {
      // 1. Enter key
      if (data === '\r' || data === '\n') {
        term.write('\r\n');
        const trimmed = inputBuffer.trim();

        if (trimmed) {
          history.push(trimmed);
          historyIndex = -1;
          const { output, shouldClear, shouldExit } = handleShellCommand(
            trimmed,
            contextRef.current,
            history
          );

          if (shouldClear) {
            term.clear();
          } else if (output) {
            term.writeln(output);
          }

          if (shouldExit) {
            return;
          }
        }

        inputBuffer = '';
        cursorPos = 0;
        term.write(PROMPT);
        return;
      }

      // 2. Backspace
      if (data === '\x7f' || data === '\b' || data === '\x08') {
        if (cursorPos > 0) {
          inputBuffer =
            inputBuffer.slice(0, cursorPos - 1) + inputBuffer.slice(cursorPos);
          cursorPos--;
          redrawLine(inputBuffer, cursorPos);
        }
        return;
      }

      // 3. Tab Completion
      if (data === '\t') {
        const trimmed = inputBuffer.trimStart();
        const parts = trimmed.split(/\s+/);

        if (parts.length <= 1) {
          const prefix = parts[0] || '';
          const matches = AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(prefix));
          if (matches.length === 1) {
            inputBuffer = matches[0] + ' ';
            cursorPos = inputBuffer.length;
            redrawLine(inputBuffer, cursorPos);
          } else if (matches.length > 1) {
            term.writeln('\r\n' + matches.join('    '));
            redrawLine(inputBuffer, cursorPos);
          }
        } else if (parts[0] === 'cat' || parts[0] === 'ls') {
          const arg = parts[parts.length - 1];
          const files = Object.keys(VIRTUAL_FS).concat(
            Object.keys(PROJECTS_FS).map((f) => `projects/${f}`)
          );
          const matches = files.filter((f) => f.startsWith(arg));
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            inputBuffer = parts.join(' ');
            cursorPos = inputBuffer.length;
            redrawLine(inputBuffer, cursorPos);
          } else if (matches.length > 1) {
            term.writeln('\r\n' + matches.join('    '));
            redrawLine(inputBuffer, cursorPos);
          }
        }
        return;
      }

      // 4. Ctrl+C
      if (data === '\x03') {
        term.write('^C\r\n' + PROMPT);
        inputBuffer = '';
        cursorPos = 0;
        historyIndex = -1;
        return;
      }

      // 5. Ctrl+L (Clear screen)
      if (data === '\x0c') {
        term.clear();
        term.write(PROMPT + inputBuffer);
        return;
      }

      // 6. Arrow Keys and Escape Sequences
      if (data.startsWith('\x1b')) {
        // Arrow Up
        if (data === '\x1b[A') {
          if (history.length > 0) {
            if (historyIndex === -1) {
              historyIndex = history.length - 1;
            } else if (historyIndex > 0) {
              historyIndex--;
            }
            inputBuffer = history[historyIndex] || '';
            cursorPos = inputBuffer.length;
            redrawLine(inputBuffer, cursorPos);
          }
          return;
        }

        // Arrow Down
        if (data === '\x1b[B') {
          if (historyIndex !== -1) {
            if (historyIndex < history.length - 1) {
              historyIndex++;
              inputBuffer = history[historyIndex] || '';
            } else {
              historyIndex = -1;
              inputBuffer = '';
            }
            cursorPos = inputBuffer.length;
            redrawLine(inputBuffer, cursorPos);
          }
          return;
        }

        // Arrow Left
        if (data === '\x1b[D') {
          if (cursorPos > 0) {
            cursorPos--;
            term.write('\x1b[D');
          }
          return;
        }

        // Arrow Right
        if (data === '\x1b[C') {
          if (cursorPos < inputBuffer.length) {
            cursorPos++;
            term.write('\x1b[C');
          }
          return;
        }

        // Home key
        if (data === '\x1b[H' || data === '\x1b[1~' || data === '\x1bOH') {
          cursorPos = 0;
          redrawLine(inputBuffer, cursorPos);
          return;
        }

        // End key
        if (data === '\x1b[F' || data === '\x1b[4~' || data === '\x1bOF') {
          cursorPos = inputBuffer.length;
          redrawLine(inputBuffer, cursorPos);
          return;
        }

        // Delete key
        if (data === '\x1b[3~') {
          if (cursorPos < inputBuffer.length) {
            inputBuffer =
              inputBuffer.slice(0, cursorPos) + inputBuffer.slice(cursorPos + 1);
            redrawLine(inputBuffer, cursorPos);
          }
          return;
        }

        // Ignore unknown escape sequences
        return;
      }

      // 7. Printable text characters
      if (data >= ' ' || data.length > 1) {
        inputBuffer =
          inputBuffer.slice(0, cursorPos) + data + inputBuffer.slice(cursorPos);
        cursorPos += data.length;
        redrawLine(inputBuffer, cursorPos);
      }
    });

    // Auto-focus terminal on mount
    term.focus();

    return () => {
      clearTimeout(fitTimer);
      window.removeEventListener('resize', handleFit);
      dataDisposable.dispose();
      resizeObserver.disconnect();
      term.dispose();
      termRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  return (
    <div
      className={styles.container}
      onClick={() => termRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal shell"
    >
      <div ref={containerRef} className={styles.terminalView} />
    </div>
  );
}
