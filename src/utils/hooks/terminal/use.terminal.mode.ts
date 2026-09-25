import { useSyncExternalStore } from 'react';

let isRealTerminal = (() => {
  try {
    return localStorage.getItem('terminal_header_real') === 'true';
  } catch {
    return false;
  }
})();

const listeners = new Set<(val: boolean) => void>();

export function setRealTerminalMode(val: boolean): void {
  isRealTerminal = val;
  try {
    localStorage.setItem('terminal_header_real', String(val));
  } catch {
    // Ignore storage errors
  }
  listeners.forEach((listener) => {
    listener(isRealTerminal);
  });
}

export function getRealTerminalMode(): boolean {
  return isRealTerminal;
}

export function subscribeRealTerminalMode(listener: (val: boolean) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useRealTerminalMode(): [boolean, (val: boolean) => void] {
  const mode = useSyncExternalStore(
    subscribeRealTerminalMode,
    getRealTerminalMode,
    () => false
  );
  return [mode, setRealTerminalMode];
}
