import React, { useState } from 'react';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';

interface PhotoGalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video'>('lifestyle');
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // 🔥 Filtrage des photos selon la catégorie sélectionnée
  const filteredPhotos = photos.filter(photo => {
    if (filter === 'lifestyle') return photo.category === 'lifestyle';
    if (filter === 'video') return photo.category === 'video';
    if (filter === 'exposition' && selectedExpo) return photo.category === selectedExpo;
    return false;
  });

  return (
    <>
      {/* 🔥 Boutons Glassmorphism */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => { setFilter('lifestyle'); setSelectedExpo(null); }}
          className={`glass-button ${filter === 'lifestyle' ? 'active' : ''}`}
        >
          Lifestyle
        </button>

        <div className="relative">
          <button
            onClick={() => setFilter('exposition')}
            className={`glass-button ${filter === 'exposition' ? 'active' : ''}`}
          >
            Expositions
          </button>
          {filter === 'exposition' && (
            <div className="absolute left-0 mt-2 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-2">
              <button
                onClick={() => setSelectedExpo('odorat')}
                className={`dropdown-item ${selectedExpo === 'odorat' ? 'active' : ''}`}
              >
                Un regard vers l'odorat
              </button>
              <button
                onClick={() => setSelectedExpo('monde')}
                className={`dropdown-item ${selectedExpo === 'monde' ? 'active' : ''}`}
              >
                Around the world portrait
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => { setFilter('video'); setSelectedExpo(null); }}
          className={`glass-button ${filter === 'video' ? 'active' : ''}`}
        >
          Vidéos
        </button>
      </div>

      {/* 🔥 Affichage des photos filtrées */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-[4/3] group cursor-pointer"
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
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">Aucune image trouvée pour cette catégorie.</p>
          )}
        </div>
      </section>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          photos={filteredPhotos}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};

export default PhotoGallery;
