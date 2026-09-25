import type { StyleConfig } from '../types';
import { lightTheme } from '../../theme/terminal/light';
import { darkTheme } from '../../theme/terminal/dark';

export const terminalConfig: StyleConfig = {
  id: 'terminal',
  name: 'Terminal',
  followsSlotSystem: true,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
};

