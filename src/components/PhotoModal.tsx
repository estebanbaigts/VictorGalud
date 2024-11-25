import React from 'react';
import { X } from 'lucide-react';
import { Photo } from '../types';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div className="max-w-7xl w-full max-h-[90vh] flex flex-col items-center">
        <img
          src={photo.url}
          alt={photo.name}
          className="max-w-full max-h-[80vh] object-contain mb-4"
        />
        <div className="text-center">
          <h3 className="text-2xl font-bold">{photo.name}</h3>
          <p className="text-gray-300">{photo.category}</p>
        </div>
      </div>
    </div>
  );
};