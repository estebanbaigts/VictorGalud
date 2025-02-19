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
      coverUrl: photos.find(photo => photo.category === 'lifestyle')?.url || '',
      title: "Lifestyle"
    },
    exposition: {
      coverUrl: expoCovers[0].coverUrl || '',
      title: "Expositions"
    },
    video: {
      coverUrl: 'couv.png',
      title: "Movies"
    },
    artist: {
      coverUrl: photos.find(photo => photo.category === 'artist')?.url || '',
      title: "Artist"
    },
    capture: {
      coverUrl: captureCovers[0].coverUrl || '',
      title: "Capture"
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

  if (!filter) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-4">
          {(['lifestyle', 'exposition', 'video', 'artist', 'capture'] as const).map(main => (
            <div key={main} className="cursor-pointer" onClick={() => setFilter(main)}>
              <div className="overflow-hidden rounded-lg bg-gray-900 h-64 w-full">
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
          setSelectedCapture(null);
        }}
        label="Retour aux catégories"
      />

      {filter === 'video' ? (
        <VideoGallery selectedSubcategory={null} />
      ) : filter === 'exposition' && selectedExpo === null ? (
        <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col gap-4">
            {expoCovers.map(expo => (
              <div
                key={expo.category}
                className="cursor-pointer"
                onClick={() => setSelectedExpo(expo.category)}
              >
                <div className="overflow-hidden rounded-lg bg-gray-900 h-64 w-full">
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
      ) : filter === 'capture' && selectedCapture === null ? (
        <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col gap-4">
            {captureCovers.map(capture => (
              <div
                key={capture.category}
                className="cursor-pointer"
                onClick={() => setSelectedCapture(capture.category)}
              >
                <div className="overflow-hidden rounded-lg bg-gray-900 h-64 w-full">
                  {capture.coverUrl ? (
                    <img
                      src={capture.coverUrl}
                      alt={capture.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-lg">{capture.title}</span>
                    </div>
                  )}
                </div>
                <p className="text-center mt-2 text-white text-sm">{capture.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16">
          {filter === 'exposition' && selectedExpo && (
            <BackButton onClick={() => setSelectedExpo(null)} label="Retour aux expositions" />
          )}
          {filter === 'capture' && selectedCapture && (
            <BackButton onClick={() => setSelectedCapture(null)} label="Retour aux captures" />
          )}
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
