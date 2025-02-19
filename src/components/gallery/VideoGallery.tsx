import React from 'react';
import { useInView } from 'react-intersection-observer';

interface Video {
  id: string;
  title: string;
  description: string;
  vimeoUrl: string;
  category: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: '-Weight of Faiths-',
    description: `Sculptures de Stéphanie Langard - Le Poids des Croyances.`,
    vimeoUrl: 'https://player.vimeo.com/video/394407152',
    category: 'documentary',
  },
  {
    id: '2',
    title: 'FLIRT AVEC JAKMAN',
    description: `Portrait sur Manjak, jeune artiste peintre parisien.`,
    vimeoUrl: 'https://player.vimeo.com/video/549865864',
    category: 'documentary',
  },
  {
    id: '3',
    title: 'HARIF GUZMAN AT GROUND EFFECT',
    description: `Special interview with Harif Guzman in Paris at Ground Effect Gallery.`,
    vimeoUrl: 'https://player.vimeo.com/video/805284186',
    category: 'documentary',
  },
  {
    id: '4',
    title: 'L’Atelier d’Hopare',
    description: `J'ai eu la chance de pouvoir suivre Alex alias Hopare une journée dans la préparation de son exposition.`,
    vimeoUrl: 'https://player.vimeo.com/video/402498159',
    category: 'documentary',
  },
  {
    id: '5',
    title: 'BONIFACIO WITH IPHONE',
    description: `Bonifacio été 2018. Shot on iPhone.`,
    vimeoUrl: 'https://player.vimeo.com/video/358497911',
    category: 'documentary',
  },
  {
    id: '6',
    title: 'LLORCA ET WALLACE PAR VICTOR',
    description: `Portrait de mon ami poète Philippe Llorca, interprété par Wallace. Projeté pendant le vernissage de l'exposition poétique de Philippe en symbiose avec les films d'Hugo Dos Santos.`,
    vimeoUrl: 'https://player.vimeo.com/video/824723057',
    category: 'documentary',
  },
  {
    id: '7',
    title: 'WOM ON RIDE',
    description: `Collaboration de ces 2 artistes sur ce vélo-sculpture, urbain et contemporain.`,
    vimeoUrl: 'https://player.vimeo.com/video/360517544',
    category: 'documentary',
  },
  {
    id: '8',
    title: 'BEBAR-MUTATION SOLO SHOW',
    description: `Présentation du Solo Show de BEBAR "MUTATION" exposé à la galerie Ground Effect en Mai 2018.`,
    vimeoUrl: 'https://player.vimeo.com/video/643485788',
    category: 'documentary',
  },
  {
    id: '9',
    title: 'MESSAC(S) BY VICTOR GALUD',
    description: `MESSAC(S) est le fruit d’une amitié entre un jeune homme de vingt ans, Victor Galud, et un artiste de soixante-dix ans, Ivan Messac.`,
    vimeoUrl: 'https://player.vimeo.com/video/789937535',
    category: 'documentary',
  },
  {
    id: '10',
    title: 'LIV BRANDBERG BY VICTOR GALUD',
    description: `Liv Brandberg making a piece in her workshop in Pantin.`,
    vimeoUrl: 'https://www.youtube.com/watch?v=IemaCpEZcfs',
    category: 'documentary',
  },
];

interface VideoGalleryProps {
  selectedSubcategory: string | null;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ selectedSubcategory }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filtrer les vidéos selon la sous-catégorie (si spécifiée)
  const filteredVideos = selectedSubcategory
    ? videos.filter(video => video.category === selectedSubcategory)
    : videos;

  // Fonction pour convertir une URL YouTube en URL d'embed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com')) {
      try {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (error) {
        console.error('Erreur lors du parsing de l\'URL YouTube:', error);
      }
    }
    // Pour Vimeo ou les autres, on renvoie l'URL telle quelle
    return url;
  };

  return (
    <section ref={ref} className="bg-black min-h-screen py-10">
      <div className="container mx-auto px-2">
        <h2
          className={`text-2xl font-semibold text-center mb-8 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Vidéographie
        </h2>

        <div className="space-y-12">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className={`transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                {/* Video Frame */}
                <div className="relative pb-[40%] h-0">
                  <iframe
                    src={getEmbedUrl(video.vimeoUrl)}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Description */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-white">{video.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{video.description}</p>
                </div>

                {/* Lien vers la plateforme */}
                <div className="px-4 pb-4 text-center">
                  <a
                    href={
                      video.vimeoUrl.includes('youtube.com')
                        ? video.vimeoUrl
                        : video.vimeoUrl.replace('player.', '')
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors text-sm"
                  >
                    <span>Voir sur {video.vimeoUrl.includes('youtube.com') ? 'YouTube' : 'Vimeo'}</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
