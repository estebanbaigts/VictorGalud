import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';
import { VideoGallery } from './VideoGallery';

interface GalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<GalleryProps> = ({ photos }) => {
  // Filtre principal : "lifestyle", "exposition" ou "video"
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video'>('lifestyle');
  // Pour "Expositions", la sous-catégorie sélectionnée (null = pas encore choisi)
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | 'voyage' | 'paris' | null>(null);
  // Photo sélectionnée pour le modal
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filtrer les photos selon le filtre principal
  let filteredPhotos: Photo[] = [];
  if (filter === 'lifestyle') {
    filteredPhotos = photos.filter(photo => photo.category === 'lifestyle');
  } else if (filter === 'exposition' && selectedExpo) {
    filteredPhotos = photos.filter(photo => photo.category === selectedExpo);
  }
  // Le cas "video" est géré par le composant VideoGallery.

  // Breakpoints pour le layout Masonry
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  // Liste des sous-catégories pour Expositions
  const expoCategories: Array<'odorat' | 'monde' | 'paris' | 'voyage'> = [
    'odorat',
    'monde',
    'paris',
    'voyage',
  ];

  // Pour chaque sous-catégorie, on recherche le premier élément comme "cover"
  const expoCovers = expoCategories.map(category => {
    const cover = photos.find(photo => photo.category === category);
    return {
      category,
      coverUrl: cover ? cover.url : '',
      title: getExpoTitle(category),
    };
  });

  // Fonction utilitaire pour retourner un titre lisible pour chaque expo
  function getExpoTitle(category: 'odorat' | 'monde' | 'paris' | 'voyage'): string {
    switch (category) {
      case 'odorat':
        return "Un regard vers l'odorat";
      case 'monde':
        return "Around the world portrait";
      case 'paris':
        return "Parisiens";
      case 'voyage':
        return "Plage argentique";
      default:
        return "";
    }
  }

  return (
    <>
      {/* Onglets principaux */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {
            setFilter('lifestyle');
            setSelectedExpo(null);
          }}
          className={`glass-button ${filter === 'lifestyle' ? 'active' : ''}`}
        >
          Lifestyle
        </button>

        <button
          onClick={() => {
            setFilter('exposition');
            setSelectedExpo(null);
          }}
          className={`glass-button ${filter === 'exposition' ? 'active' : ''}`}
        >
          Expositions
        </button>

        <button
          onClick={() => {
            setFilter('video');
            setSelectedExpo(null);
          }}
          className={`glass-button ${filter === 'video' ? 'active' : ''}`}
        >
          Vidéos
        </button>
      </div>

      {/* Pour Expositions : affichage des covers si aucune sous-catégorie n'est sélectionnée */}
      {filter === 'exposition' && selectedExpo === null ? (
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {expoCovers.map(expo => (
              <div
                key={expo.category}
                className="cursor-pointer"
                onClick={() => setSelectedExpo(expo.category)}
              >
                <div className="overflow-hidden rounded-lg bg-gray-900 h-48">
                  {expo.coverUrl ? (
                    <img
                      src={expo.coverUrl}
                      alt={expo.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white">{expo.title}</span>
                    </div>
                  )}
                </div>
                <p className="text-center mt-2 text-white">{expo.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : filter === 'video' ? (
        // Affichage de la vidéothèque
        <VideoGallery selectedSubcategory={null} />
      ) : (
        // Affichage de la grille de photos pour Lifestyle ou Exposition (avec sous-catégorie sélectionnée)
        <section className="container mx-auto px-4 py-16">
          {filter === 'exposition' && selectedExpo && (
            <div className="mb-4">
              <button
                onClick={() => setSelectedExpo(null)}
                className="text-blue-500 underline"
              >
                Retour aux expositions
              </button>
            </div>
          )}
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
