import { Route, Routes, useLocation } from 'react-router-dom';
import { useStyle } from '@context/global/style-context';
import Layout from '@layout/core.layout';
import Header from '@component/common/header';
import Footer from '@component/common/footer';
import Sidebar from '@component/common/sidebar';
import HomePage from '@pages/home';
import ProjectsPage from '@pages/projects';
import AboutPage from '@pages/about';
import ContactPage from '@pages/contact';
import NotFoundPage from '@pages/404';
import { useEffect } from 'react';
import { setMousePosition } from './utils/hooks/common/mouse.position';

export default function App() {
  const { styleId } = useStyle();
  const location = useLocation();

  // Slot content is assembled here. Layout itself resolves which style's
  // layout to mount internally (see layout/core.layout.tsx) - App only
  // decides what goes into each slot. Sidebar navigation is currently a
  // minimal-only concept - modern keeps its nav inline in the header.
  const slots = {
    header: <Header />,
    footer: <Footer />,
    ...(styleId === 'minimal' ? { sidebar: <Sidebar /> } : {}),
  };

  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition(e.clientX, e.clientY);
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

  return (
    <Layout pageKey={location.pathname} slots={slots}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
