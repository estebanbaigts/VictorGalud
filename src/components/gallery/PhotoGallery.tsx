import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Photo } from '../../types';
import { PhotoModal } from './PhotoModal';
import { VideoGallery } from './VideoGallery';
import FadeInSection from '../style/FadeInSection';

interface GalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<GalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState<'lifestyle' | 'exposition' | 'video' | 'artist' | 'capture' | null>(null);
  const [selectedExpo, setSelectedExpo] = useState<'odorat' | 'monde' | 'voyage' | 'paris' | null>(null);
  const [selectedCapture, setSelectedCapture] = useState<'fefe-drink' | 'stage' | 'interbev-bts' | 'worlds' | 'skate' | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const expoCategories: Array<'odorat' | 'monde' | 'paris' | 'voyage'> = [
    'odorat',
    'monde',
    'voyage',
    'paris',
  ];
  const captureCategories: Array<'fefe-drink' | 'stage' | 'interbev-bts' | 'worlds' | 'skate'> = [
    'fefe-drink',
    'stage',
    'interbev-bts',
    'worlds',
    'skate',
  ];

  const expoCovers = expoCategories.map(category => {
    const cover = photos.find(photo => photo.category === category);
    return {
      category,
      coverUrl: cover ? cover.url : '',
      title: getExpoTitle(category),
    };
  });

  const captureCovers = captureCategories.map(category => {
    const cover = photos.find(photo => photo.category === category);
    return {
      category,
      coverUrl: cover ? cover.url : '',
      title: getCaptureTitle(category),
    };
  });

  function getExpoTitle(category: 'odorat' | 'monde' | 'paris' | 'voyage'): string {
    switch (category) {
      case 'odorat':
        return "UN REGARD VERS L'ODORAT";
      case 'monde':
        return "MONDE";
      case 'paris':
        return "PARISIENS";
      case 'voyage':
        return "PLAGES ARGENTIQUES";
      default:
        return "";
    }
  }

  function getCaptureTitle(category: 'fefe-drink' | 'stage' | 'interbev-bts' | 'worlds' | 'skate'): string {
    switch (category) {
      case 'fefe-drink':
        return "Fefe Drink";
      case 'stage':
        return "Stage";
      case 'interbev-bts':
        return "Interbev BTS";
      case 'worlds':
        return "Worlds";
      case 'skate':
        return "Skate";
      default:
        return "";
    }
  }

  const mainCovers = {
    lifestyle: {
      coverUrl: 'lifestyle.jpeg',
      title: "Lifestyle"
    },
    exposition: {
      coverUrl: 'SURF.jpeg',
      title: "Exhibitons"
    },
    video: {
      coverUrl: 'movie.png',
      title: "Movies"
    },
    artist: {
      coverUrl:  'artist.jpg',
      title: "Artists"
    },
    capture: {
      coverUrl:  'captures.jpg',
      title: "Captures"
    }
  };

  let filteredPhotos: Photo[] = [];
  if (filter === 'lifestyle') {
    filteredPhotos = photos.filter(photo => photo.category === 'lifestyle');
  } else if (filter === 'exposition' && selectedExpo) {
    filteredPhotos = photos.filter(photo => photo.category === selectedExpo);
  } else if (filter === 'capture' && selectedCapture) {
    filteredPhotos = photos.filter(photo => photo.category === selectedCapture);
  }

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;

    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0) newIndex = filteredPhotos.length - 1;
    if (newIndex >= filteredPhotos.length) newIndex = 0;

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  const renderSubcategories = (covers: { category: string; coverUrl: string; title: string }[], setSelected: (category: string) => void) => (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {covers.map(cover => (
          <div key={cover.category} className="cursor-pointer" onClick={() => setSelected(cover.category)}>
            <div className="overflow-hidden rounded-lg bg-gray-900 h-64 w-full md:h-80 lg:h-96">
              {cover.coverUrl ? (
                <img
                  src={cover.coverUrl}
                  alt={cover.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-white text-xl">{cover.title}</span>
                </div>
              )}
            </div>
            <p className="text-center mt-2 text-white text-lg">{cover.title}</p>
          </div>
        ))}
      </div>
    </section>
  );

  if (!filter) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(['artist', 'lifestyle', 'exposition', 'capture', 'video'] as const).map(main => (
            <div key={main} className="cursor-pointer" onClick={() => setFilter(main)}>
              <div className="overflow-hidden rounded-lg bg-gray-900 h-64 w-full md:h-80 lg:h-96">
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
    <div className="sticky top-20 left-4 sm:left-6 md:left-10 z-50"> {/* Ajustez les positions pour mobile et desktop */}
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-700 transition"
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
      <BackButton
        onClick={() => {
          if (selectedExpo) {
            setSelectedExpo(null); // Retour à la liste des expositions
          } else if (selectedCapture) {
            setSelectedCapture(null); // Retour à la liste des captures
          } else {
            setFilter(null); // Retour aux catégories principales
          }
        }}
        label="Retour"
      />

      {filter === 'video' ? (
        <VideoGallery selectedSubcategory={null} />
      ) : filter === 'exposition' && selectedExpo === null ? (
        renderSubcategories(expoCovers, setSelectedExpo)
      ) : filter === 'capture' && selectedCapture === null ? (
        renderSubcategories(captureCovers, setSelectedCapture)
      ) : (
        <section className="container mx-auto px-4 py-16">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo, index) => (
                <FadeInSection key={photo.id} delay={index * 100}>
                  <div
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
                </FadeInSection>
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
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
};

export default PhotoGallery;
