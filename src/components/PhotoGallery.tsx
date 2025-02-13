import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';
import { VideoGallery } from './VideoGallery';

interface GalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<GalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video'>('lifestyle');
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | 'voyage' | 'paris' | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = photos.filter(photo => {
    if (filter === 'lifestyle') return photo.category === 'lifestyle';
    if (filter === 'exposition' && selectedExpo) return photo.category === selectedExpo;
    return false;
  });

  // Breakpoints pour le layout Masonry
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <>
      {/* Onglets principaux */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => { setFilter('lifestyle'); setSelectedExpo(null); }}
          className={`glass-button ${filter === 'lifestyle' ? 'active' : ''}`}
        >
          Lifestyle
        </button>

        <button
          onClick={() => { setFilter('exposition'); setSelectedExpo(null); }}
          className={`glass-button ${filter === 'exposition' ? 'active' : ''}`}
        >
          Expositions
        </button>

        <button
          onClick={() => { setFilter('video'); setSelectedExpo(null); }}
          className={`glass-button ${filter === 'video' ? 'active' : ''}`}
        >
          Vidéos
        </button>
      </div>

      {/* Sous-onglets pour Expositions affichés horizontalement */}
      {filter === 'exposition' && (
        <div className="flex gap-3 mb-6 overflow-x-auto whitespace-nowrap px-4">
          <button
            onClick={() => setSelectedExpo('odorat')}
            className={`sub-tab ${selectedExpo === 'odorat' ? 'active' : ''}`}
          >
            Un regard vers l'odorat
          </button>
          <button
            onClick={() => setSelectedExpo('monde')}
            className={`sub-tab ${selectedExpo === 'monde' ? 'active' : ''}`}
          >
            Around the world portrait
          </button>
          <button
            onClick={() => setSelectedExpo('paris')}
            className={`sub-tab ${selectedExpo === 'paris' ? 'active' : ''}`}
          >
            Parisiens
          </button>
          <button
            onClick={() => setSelectedExpo('voyage')}
            className={`sub-tab ${selectedExpo === 'voyage' ? 'active' : ''}`}
          >
            Plage argentique
          </button>
        </div>
      )}

      {/* Affichage conditionnel */}
      {filter === 'video' ? (
        <VideoGallery selectedSubcategory={null} />
      ) : (
        <section className="container mx-auto px-4 py-16">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map(photo => (
                <div
                  key={photo.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="overflow-hidden rounded-lg bg-gray-900">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Aucune image trouvée pour cette catégorie.
              </p>
            )}
          </Masonry>
        </section>
      )}

      {selectedPhoto && filter !== 'video' && (
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
