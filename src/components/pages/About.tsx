import React, { useState, useEffect } from 'react';
import { Navigation } from '../navbar/Navigation';
import { Link } from 'react-router-dom';

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
      <section id="about" className="bg-black container mx-auto px-4 py-16">
        <div className="bg-black text-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="text-lg">
            Welcome to the About section! Here you can find information about Victor Galud.
          </p>
        </div>  
      </section>
    </div>
  );
};

export default About;