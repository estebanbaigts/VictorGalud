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
    title: 'LLORCA ET WALLACE PAR VICTOR',
    description: `Portrait de mon ami poète Philippe Llorca, interprété par Wallace. Projeté pendant le vernissage de l'exposition poétique de Philippe en symbiose avec les films d'Hugo Dos Santos.`,
    vimeoUrl: 'https://player.vimeo.com/video/824723057',
    category: 'documentary',
  },
  {
    id: '2',
    title: 'HARIF GUZMAN AT GROUND EFFECT',
    description: `Special interview with Harif Guzman in Paris at Ground Effect Gallery.`,
    vimeoUrl: 'https://player.vimeo.com/video/805284186',
    category: 'documentary',
  },
  {
    id: '3',
    title: 'BEBAR-MUTATION SOLO SHOW',
    description: `Présentation du Solo Show de BEBAR "MUTATION" exposé à la galerie Ground Effect en Mai 2018.`,
    vimeoUrl: 'https://player.vimeo.com/video/643485788',
    category: 'documentary',
  },
  {
    id: '4',
    title: 'FLIRT AVEC JAKMAN',
    description: `Portrait sur Manjak, jeune artiste peintre parisien.`,
    vimeoUrl: 'https://player.vimeo.com/video/549865864',
    category: 'documentary',
  },
  {
    id: '5',
    title: 'L’Atelier d’Hopare',
    description: `J'ai eu la chance de pouvoir suivre Alex alias Hopare une journée dans la préparation de son exposition.`,
    vimeoUrl: 'https://player.vimeo.com/video/402498159',
    category: 'documentary',
  },
  {
    id: '6',
    title: '-Weight of Faiths-',
    description: `Sculptures de Stéphanie Langard - Le Poids des Croyances.`,
    vimeoUrl: 'https://player.vimeo.com/video/394407152',
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
    title: 'BONIFACIO WITH IPHONE',
    description: `Bonifacio été 2018. Shot on iPhone.`,
    vimeoUrl: 'https://player.vimeo.com/video/358497911',
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

  const filteredVideos = selectedSubcategory
    ? videos.filter(video => video.category === selectedSubcategory)
    : videos;

  return (
    <section ref={ref} className="bg-black min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl font-bold text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Vidéographie
        </h2>

        <div className="space-y-24">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className={`transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                {/* Video Frame */}
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    src={video.vimeoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Video Description */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">{video.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{video.description}</p>
                </div>

                {/* Link to Vimeo */}
                <div className="px-8 pb-8">
                  <a
                    href={video.vimeoUrl.replace('player.', '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Voir sur Vimeo</span>
                    <svg
                      className="w-4 h-4"
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
