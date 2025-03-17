import React, { useState, useEffect } from 'react';
import { Navigation } from '../navbar/Navigation';

const About: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrolled={scrolled} />
      <section
        id="about"
        className="bg-black container mx-auto px-4 py-16 flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 64px)' }} // Ajuste la hauteur pour centrer verticalement
      >
        <div className="bg-black text-white p-8 rounded-lg shadow-lg text-center max-w-2xl">
          <p className="text-lg mb-4">
            Victor Galud is a French photographer/director born in Paris in 1996.
          </p>
          <p className="text-lg mb-4">
            After studying cinema school in Paris, he worked on photo shootings, cinema productions, galleries, and fashion events.
          </p>
          <p className="text-lg mb-4">
            As an independent artist, he continues to develop his own artistic universe with street film photography and multiple captations (sports, stages, reporting).
          </p>
          <p className="text-lg">
            Since 2016, he has also been creating video portraits of plastic artists by himself.
          </p>
        </div>
      </section>
      <footer className="bg-black/90 py-6 text-center text-white">
      <p>© All rights reserved by Victor Galud 2025</p>
    </footer>
    </div>
  );
};

export default About;