import type { StyleConfig } from '../types';
import { lightTheme } from '../../theme/minimal/light';
import { darkTheme } from '../../theme/minimal/dark';

export const minimalMiniConfig: StyleConfig = {
  id: 'minimalmini',
  name: 'Minimal Mini',
  followsSlotSystem: true,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
};

