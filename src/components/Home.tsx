import React, { useState, useEffect } from 'react';
import { Photo } from '../types';
import { PhotoGallery } from './gallery/PhotoGallery';
import { VideoGallery } from './gallery/VideoGallery';
import { Footer } from './footer/Footer';
import Bio from './style/Bio';
import { Instagram, Linkedin, Play } from 'lucide-react';
 import { Navigation } from './navbar/Navigation';


interface HomeProps {
  photos: Photo[];
}

export const Home: React.FC<HomeProps> = ({ photos }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('photos');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentImage] = useState('/profile.png');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredPhotos = selectedSubcategory
    ? photos.filter(photo => photo.category.toLowerCase() === selectedSubcategory.toLowerCase())
    : photos;

  const renderContent = () => {
    switch (selectedCategory) {
      case 'video':
        return <VideoGallery selectedSubcategory={selectedSubcategory} />;
      case 'photos':
      case 'expo':
        return <PhotoGallery photos={filteredPhotos} />;
      default:
        return <PhotoGallery photos={filteredPhotos} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrolled={scrolled} />

      <div id="home" className="h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-12 sm:space-y-16 lg:space-y-20">
          <img
            src={currentImage}
            alt="Camera"
            className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto animate-spin-slow"
          />

          <div className="flex gap-8"> {/* Augmentez `gap-8` pour plus d'espacement */}
            <a
              href="https://www.instagram.com/galudboy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Instagram className="w-8 h-8" /> {/* Augmentez `w-8 h-8` pour agrandir les icônes */}
            </a>
            <a
              href="https://www.linkedin.com/in/victor-galud-68159b113/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Linkedin className="w-8 h-8" /> {/* Augmentez `w-8 h-8` pour agrandir les icônes */}
            </a>
            <a
              href="https://vimeo.com/victorgalud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Play className="w-8 h-8" /> {/* Augmentez `w-8 h-8` pour agrandir les icônes */}
            </a>
          </div>

          <button
            onClick={scrollToGallery}
            className="animate-bounce cursor-pointer hover:text-gray-300 transition-colors"
            aria-label="Scroll to gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {/* <Bio /> */}
      <div id="gallery" className="min-h-screen">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
