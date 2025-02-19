import React, { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../../types';

interface PhotoModalProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNavigate]);

  const handlers = useSwipeable({
    onSwipedLeft: () => onNavigate('next'),
    onSwipedRight: () => onNavigate('prev'),
    trackMouse: true,
  });

  return (
    <div {...handlers} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
        <X className="w-8 h-8" />
      </button>

      <button onClick={() => onNavigate('prev')} className="absolute left-4 text-white hover:text-gray-300">
        <ChevronLeft className="w-8 h-8" />
      </button>

      <div className="max-w-7xl w-full max-h-[90vh] flex flex-col items-center">
        <img src={photo.url} alt={photo.name} className="max-w-full max-h-[80vh] object-contain mb-4" />
        <div className="text-center">
          <h3 className="text-2xl font-bold">{photo.name}</h3>
          <p className="text-gray-300">{photo.category}</p>
        </div>
      </div>

      <button onClick={() => onNavigate('next')} className="absolute right-4 text-white hover:text-gray-300">
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};
