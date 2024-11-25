import React, { useState } from 'react';
import { Photo } from '../types';
import { Navigation } from './Navigation';
import { PhotoGallery } from './PhotoGallery';
import { CategoryFilter } from './CategoryFilter';
import { Contact } from './Contact';
import {Instagram, Linkedin, Video } from 'lucide-react';


interface HomeProps {
  photos: Photo[];
}

export const Home: React.FC<HomeProps> = ({ photos }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Video className="w-6 h-6" />
            </a>
          </div>

          <button
            onClick={scrollToGallery}
            className="animate-bounce cursor-pointer"
            aria-label="Scroll to gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 text-gray-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div id="gallery" className="min-h-screen">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <PhotoGallery photos={filteredPhotos} />
      </div>

      <Contact />
    </div>
  );
};