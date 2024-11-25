const API_BASE_URL = '/api';

export const fetchPhotos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const uploadPhoto = async (file: File, name: string, category: string) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('name', name);
    formData.append('category', category);

    const response = await fetch(`${API_BASE_URL}/photos`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

export const deletePhoto = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};