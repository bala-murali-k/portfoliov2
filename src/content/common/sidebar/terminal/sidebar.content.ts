import { navContent } from '../../nav.content';

export interface SidebarContent {
  navItems: typeof navContent;
}

export const sidebarContent: SidebarContent = {
  navItems: navContent,
};

