import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Masonry from 'react-masonry-css';

interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'voyage', 'argentique', 'portrait', 'exposition', 'video'];

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

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Galerie</h1>
      
      {/* Categories Filter */}
      <div className="flex justify-center space-x-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="mb-4">
            <img
              src={photo.url}
              alt={photo.title}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default Gallery;