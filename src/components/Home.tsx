import React, { useState } from 'react';
import { Photo } from '../types';
import { Navigation } from './Navigation';
import { PhotoGallery } from './PhotoGallery';
import { VideoGallery } from './VideoGallery';
import { CategoryFilter } from './CategoryFilter';
import { Contact } from './Contact';
import { Instagram, Linkedin, Video } from 'lucide-react';

interface HomeProps {
  photos: Photo[];
}

export const Home: React.FC<HomeProps> = ({ photos }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('photos');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
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

  const handleCategoryChange = (category: string, subcategory: string | null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
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
            src="/vinyle.png"
            alt="Camera"
            className="w-3/4 sm:w-2/3 md:w-1/2 h-auto animate-spin-slow"
          />

          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Video className="w-6 h-6" />
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

      <div id="gallery" className="min-h-screen">
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={handleCategoryChange}
        />
        {renderContent()}
      </div>

      <Contact />
    </div>
  );
};

export default Home;