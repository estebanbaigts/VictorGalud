import { useState, useEffect } from 'react';
import { Photo } from '../types';
import * as api from '../services/api';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const data = await api.fetchPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return { photos, fetchPhotos };
};