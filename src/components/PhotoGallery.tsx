import React from 'react';
import Masonry from 'react-masonry-css';

interface Photo {
  id: string;
  url: string;
  category: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const PhotoGallery = ({ photos, selectedCategory, onCategoryChange }: PhotoGalleryProps) => {
  const categories = ['all', 'voyage', 'argentique', 'profil', 'expo', 'video'];
  
  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div id="gallery" className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredPhotos.map(photo => (
            <div key={photo.id} className="mb-4">
              <img
                src={photo.url}
                alt={photo.category}
                className="rounded-lg hover:opacity-75 transition-opacity duration-200"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default PhotoGallery;