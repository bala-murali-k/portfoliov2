import type { HomeContent } from './home.content';
import { homeContent as defaultContent } from './home.content';
import { homeContent as minimalContent } from './minimal/home.content';
import { homeContent as modernContent } from './modern/home.content';
import { homeContent as minimalMiniContent } from './minimalmini/home.content';

const contentMap: Record<string, HomeContent> = {
  minimal: minimalContent,
  modern: modernContent,
  minimalmini: minimalMiniContent,
};

export function getHomeContent(styleId: string): HomeContent {
  return contentMap[styleId] ?? defaultContent;
}

export type { HomeContent } from './home.content';
