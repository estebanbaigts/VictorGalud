import { useState, useEffect } from 'react';
import { Photo } from '../types';
import * as api from '../services/api';

export const usePhotos = (category?: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const data = await api.fetchPhotos();
      
      const filteredPhotos = category ? data.filter((photo: Photo) => photo.category === category) : data;

      setPhotos(filteredPhotos);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [category]);

  return { photos, fetchPhotos };
};
