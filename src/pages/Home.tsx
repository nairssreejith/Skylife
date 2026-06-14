import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/sections/Hero';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import { scrollToId } from '@/lib/scroll';

/**
 * Single-page Home — Hero → Projects → About → Services → Contact.
 * Each section owns a stable `id` for hash-anchor navigation.
 * Listens for `location.hash` changes (e.g. /#about) and scrolls smoothly.
 */
export default function Home() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') return;
    if (!hash) {
      // No hash: ensure we're at the top on first mount
      window.__lenis?.scrollTo(0, { immediate: true });
      return;
    }
    const id = hash.replace('#', '');
    // Let layout settle before scrolling
    const t = window.setTimeout(() => scrollToId(id), 80);
    return () => window.clearTimeout(t);
  }, [hash, pathname]);

  return (
    <>
      {/* Hero is its own anchored landing */}
      <div id="home">
        <Hero />
      </div>
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
