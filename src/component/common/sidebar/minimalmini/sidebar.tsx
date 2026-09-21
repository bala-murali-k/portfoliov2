import { Link, useLocation } from 'react-router-dom';
import { PanelsTopLeft, Home, NotebookTabs, Info } from 'lucide-react';
import type { ComponentType } from 'react';
import { navContent } from '@content/common/nav.content';

const ICONS: Record<string, ComponentType<any>> = {
  '/': Home,
  '/about': Info,
  '/projects': PanelsTopLeft,
  '/contact': NotebookTabs,
};

export default function MinimalMiniSidebar() {
  const location = useLocation();

  return (
    <nav>
      {navContent.map((item) => {
        const Icon = ICONS[item.to] ?? Home;
        const isActive = location.pathname === item.to;
        return (
          <Link key={item.to} to={item.to} data-active={isActive || undefined}>
            <Icon size={28} strokeWidth={2.5} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
