import React, { useState } from 'react';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';
import { VideoGallery } from './VideoGallery';

interface GalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<GalleryProps> = ({ photos }) => {
  // Le filtre peut être 'lifestyle', 'exposition' ou 'video'
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video'>('lifestyle');
  // Pour les expositions, sélection d'une sous-catégorie (par exemple 'odorat' ou 'monde')
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | null>(null);
  // Pour le modal photo
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filtrer uniquement les photos pour les filtres photo (lifestyle ou exposition)
  const filteredPhotos = photos.filter(photo => {
    if (filter === 'lifestyle') return photo.category === 'lifestyle';
    if (filter === 'exposition' && selectedExpo) return photo.category === selectedExpo;
    return false;
  });

  return (
    <>
      {/* Boutons Glassmorphism */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => { setFilter('lifestyle'); setSelectedExpo(null); }}
          className={`glass-button ${filter === 'lifestyle' ? 'active' : ''}`}
        >
          Lifestyle
        </button>

        <div className="relative">
          <button
            onClick={() => { setFilter('exposition'); }}
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

      {/* Affichage conditionnel en fonction du filtre */}
      {filter === 'video' ? (
        // Utilisation du composant VideoGallery que tu as fourni
        <VideoGallery selectedSubcategory={null} />
      ) : (
        // Affichage de la grille de photos pour lifestyle et expositions
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  // Suppression de l'aspect ratio fixe pour laisser l'image prendre sa taille réelle
                  className="group cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="overflow-hidden rounded-lg bg-gray-900">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">
                Aucune image trouvée pour cette catégorie.
              </p>
            )}
          </div>
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
