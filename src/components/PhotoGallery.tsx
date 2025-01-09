import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';

interface PhotoGalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(photo.id));
      };
    });
  }, [photos]);

  const onNavigate = (direction: 'prev' | 'next') => {
    if (selectedPhoto) {
      const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
      const nextIndex = direction === 'next'
        ? (currentIndex + 1) % photos.length
        : (currentIndex - 1 + photos.length) % photos.length;

      setSelectedPhoto(photos[nextIndex]);
    }
  };

  return (
    <>
      <section ref={ref} className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => {
            const isLoaded = loadedImages.has(photo.id);

            return (
              <div
                key={photo.id}
                className={`aspect-[4/3] group cursor-pointer ${isLoaded ? 'fade-slide-up' : 'opacity-0'}`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">{photo.name}</h3>
                      <p className="text-sm text-gray-200">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};

export default PhotoGallery;
