import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';

interface GalleryProps {
  photos: Photo[];
}

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <>
      <section
        id="gallery"
        ref={ref}
        className="container mx-auto px-4 py-16"
      >
        <h2 className={`text-4xl font-bold text-center mb-12 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold">{photo.name}</h3>
                <p className="text-sm text-gray-300">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </>
  );
};