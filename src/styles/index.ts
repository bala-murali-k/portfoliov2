import type { StyleConfig } from './types';
import { modernConfig } from './modern/config';
import { minimalConfig } from './minimal/config';
import { minimalMiniConfig } from './minimalmini/config';

// Each style's own CSS (spacing, typography, scrollbar, etc.) is scoped to
// its [data-style='<id>'] attribute, so it's safe to load every style's
// rules up front rather than swapping stylesheets on switchStyle().
import './modern/index.css';
import './minimal/index.css';
import './minimalmini/index.css';

/**
 * Aggregates every style's own config into one lookup map. This file does
 * not define settings itself - it only imports and lists what each style's
 * own config.ts already declares. Add a new style by creating
 * styles/<id>/config.ts and registering it here.
 */
export const styleRegistry: Record<string, StyleConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  minimalmini: minimalMiniConfig,
};

export const defaultStyleId = 'minimal';

export function getStyleConfig(styleId: string): StyleConfig {
  return styleRegistry[styleId] ?? styleRegistry[defaultStyleId];
}

export function listStyleConfigs(): StyleConfig[] {
  return Object.values(styleRegistry);
}
