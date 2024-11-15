import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import SocialLinks from '../components/SocialLinks';
import PhotoGallery from '../components/PhotoGallery';

interface Photo {
  id: string;
  url: string;
  category: string;
}

const Home = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPhotos = async () => {
      const querySnapshot = await getDocs(collection(db, 'photos'));
      const photosList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Photo));
      setPhotos(photosList);
    };

    fetchPhotos();
  }, []);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-20">
          <img
            src="https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&q=80"
            alt="Camera"
            className="w-1/2 h-auto animate-spin-slow"
          />

          <SocialLinks />

          <div className="animate-bounce cursor-pointer" onClick={scrollToGallery}>
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
          </div>
        </div>
      </div>

      <PhotoGallery 
        photos={photos}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </>
  );
}

export default Home;