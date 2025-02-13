import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';
import { VideoGallery } from './VideoGallery';

interface GalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<GalleryProps> = ({ photos }) => {
  // L'état "filter" est maintenant nul au départ pour afficher les covers principales.
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video' | null>(null);
  // Pour Expositions, la sous-catégorie sélectionnée (null = non sélectionnée)
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | 'voyage' | 'paris' | null>(null);
  // Photo sélectionnée pour l'affichage en modal
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Pour obtenir les covers de sous-catégories d'expositions
  const expoCategories: Array<'odorat' | 'monde' | 'paris' | 'voyage'> = [
    'odorat',
    'monde',
    'paris',
    'voyage',
  ];
  const expoCovers = expoCategories.map(category => {
    const cover = photos.find(photo => photo.category === category);
    return {
      category,
      coverUrl: cover ? cover.url : '',
      title: getExpoTitle(category),
    };
  });
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

  // Déterminer la cover principale pour chaque catégorie
  const mainCovers = {
    lifestyle: {
      coverUrl: photos.find(photo => photo.category === 'lifestyle')?.url || '',
      title: "Lifestyle"
    },
    exposition: {
      // Pour Expositions, on prend la cover de la première sous-catégorie (ici odorat) comme représentation
      coverUrl: expoCovers[0].coverUrl || '',
      title: "Expositions"
    },
    video: {
      coverUrl: '', // Si aucune image n'est disponible pour la vidéo, un placeholder sera affiché.
      title: "Vidéos"
    }
  };

  // Filtrer les photos pour l'affichage du contenu
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

  // Si aucune catégorie n'est sélectionnée, afficher les covers principales
  if (!filter) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['lifestyle', 'exposition', 'video'] as const).map(main => (
            <div key={main} className="cursor-pointer" onClick={() => setFilter(main)}>
              <div className="overflow-hidden rounded-lg bg-gray-900 h-48">
                {mainCovers[main].coverUrl ? (
                  <img
                    src={mainCovers[main].coverUrl}
                    alt={mainCovers[main].title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white text-xl">{mainCovers[main].title}</span>
                  </div>
                )}
              </div>
              <p className="text-center mt-2 text-white text-lg">{mainCovers[main].title}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Une fois qu'une catégorie principale est sélectionnée, on affiche un bouton de retour.
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => {
            setFilter(null);
            setSelectedExpo(null);
          }}
          className="text-blue-500 underline"
        >
          Retour aux catégories
        </button>
      </div>

      {filter === 'video' ? (
        <VideoGallery selectedSubcategory={null} />
      ) : filter === 'exposition' && selectedExpo === null ? (
        // Pour Expositions, si aucune sous-catégorie n'est choisie, afficher les 4 covers des expos
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
                      <span className="text-white text-sm">{expo.title}</span>
                    </div>
                  )}
                </div>
                <p className="text-center mt-2 text-white text-sm">{expo.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        // Pour Lifestyle ou pour Expositions avec une sous-catégorie sélectionnée
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
