import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Events from './sections/Events';
import Schedule from './sections/Schedule';
import Gallery from './sections/Gallery';
import TeamMembers from './sections/TeamMembers';
import Sponsors from './sections/Sponsors';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();

    // Parallax effect for sections
    const sections = document.querySelectorAll('.parallax-section');
    sections.forEach((section) => {
      gsap.to(section, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Events />
        <Schedule />
        <Gallery />
        <TeamMembers />
        <Sponsors />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
