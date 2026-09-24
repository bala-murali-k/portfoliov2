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

export default function MinimalMiniFooter() {
  const location = useLocation();

  return (
    <footer data-component="minimalmini-footer">
      <nav data-slot="footer-nav">
        {navContent.map((item) => {
          const Icon = ICONS[item.to] ?? Home;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              data-active={isActive || undefined}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
              <span data-active={isActive || undefined}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

