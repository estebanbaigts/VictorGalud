import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Upload, Trash2 } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
}

const Admin = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('portrait');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const querySnapshot = await getDocs(collection(db, 'photos'));
    const photosList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Photo));
    setPhotos(photosList);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const storageRef = ref(storage, `photos/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'photos'), {
        url,
        title,
        category,
        timestamp: new Date().toISOString()
      });

      setTitle('');
      setFile(null);
      fetchPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      try {
        await deleteDoc(doc(db, 'photos', photoId));
        fetchPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Administration</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mb-12">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="voyage">Voyage</option>
              <option value="argentique">Argentique</option>
              <option value="portrait">Portrait</option>
              <option value="exposition">Exposition</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
          >
            {uploading ? (
              'Téléchargement...'
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Télécharger
              </>
            )}
          </button>
        </div>
      </form>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="relative group">
            <img
              src={photo.url}
              alt={photo.title}
              className="rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <button
                onClick={() => handleDelete(photo.id)}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 font-medium">{photo.title}</p>
            <p className="text-sm text-gray-600">{photo.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;