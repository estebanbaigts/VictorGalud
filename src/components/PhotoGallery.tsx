import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Photo } from '../types';
import { PhotoModal } from './PhotoModal';
import { VideoGallery } from './VideoGallery';

interface GalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<GalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video' | null>(null);
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | 'voyage' | 'paris' | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const expoCategories: Array<'odorat' | 'monde' | 'paris' | 'voyage'> = [
    'odorat',
    'monde',
    'voyage',
    'paris',
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
        return "Hiver parisien";
      case 'voyage':
        return "Plage argentique";
      default:
        return "";
    }
  }

  const mainCovers = {
    lifestyle: {
      coverUrl: photos.find(photo => photo.category === 'lifestyle')?.url || '',
      title: "Lifestyle"
    },
    exposition: {
      coverUrl: expoCovers[0].coverUrl || '',
      title: "Expositions"
    },
    video: {
      coverUrl: '',
      title: "Movies"
    }
  };

  let filteredPhotos: Photo[] = [];
  if (filter === 'lifestyle') {
    filteredPhotos = photos.filter(photo => photo.category === 'lifestyle');
  } else if (filter === 'exposition' && selectedExpo) {
    filteredPhotos = photos.filter(photo => photo.category === selectedExpo);
  }

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  if (!filter) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-col gap-4">
          {(['lifestyle', 'exposition', 'video'] as const).map(main => (
            <div key={main} className="cursor-pointer" onClick={() => setFilter(main)}>
              <div className="overflow-hidden rounded-lg bg-gray-900 h-64">
                {mainCovers[main].coverUrl ? (
                  <img
                    src={mainCovers[main].coverUrl}
                    alt={mainCovers[main].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
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

  const BackButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <div className="container mx-auto px-4 py-4">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>{label}</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Bouton de retour aux catégories */}
      <BackButton
        onClick={() => {
          setFilter(null);
          setSelectedExpo(null);
        }}
        label="Retour aux catégories"
      />

      {filter === 'video' ? (
        <VideoGallery selectedSubcategory={null} />
      ) : filter === 'exposition' && selectedExpo === null ? (
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {expoCovers.map(expo => (
              <div
                key={expo.category}
                className="cursor-pointer"
                onClick={() => setSelectedExpo(expo.category)}
              >
                <div className="overflow-hidden rounded-lg bg-gray-900 h-64">
                  {expo.coverUrl ? (
                    <img
                      src={expo.coverUrl}
                      alt={expo.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-lg">{expo.title}</span>
                    </div>
                  )}
                </div>
                <p className="text-center mt-2 text-white text-sm">{expo.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16">
          {filter === 'exposition' && selectedExpo && (
            <BackButton onClick={() => setSelectedExpo(null)} label="Retour aux expositions" />
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
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
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
