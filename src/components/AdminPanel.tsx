import React, { useState } from 'react';
import { Upload, Trash2, ArrowLeft } from 'lucide-react';
import { Photo } from '../types';
import * as api from '../services/api';

const categories = [
  {
    id: 'photos',
    label: 'Lifestyle', // Pas de sous-catégorie pour Lifestyle
  },
  {
    id: 'expo',
    label: 'Exposition',
    subcategories: [
      { id: 'odorat', label: 'Un regard vers l\'odorat' },
      { id: 'monde', label: 'Around the world portrait' },
      { id: 'voyage', label: 'Plage argentique' },
      { id: 'paris', label: 'Parisiens' },
    ]
  },
];

interface AdminPanelProps {
  photos: Photo[];
  onPhotoChange: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ photos, onPhotoChange }) => {
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || (!selectedSubcategory && selectedMainCategory === 'expo')) return;

    try {
      setError(null);
      setUploading(true);
      // Uploading to API
      if (selectedMainCategory === 'expo' && selectedSubcategory) {
        await api.uploadPhoto(file, name, selectedSubcategory); // Expo photos with subcategory
      } else if (selectedMainCategory === 'photos') {
        await api.uploadPhoto(file, name, 'lifestyle'); // Lifestyle photos without subcategory
      }
      onPhotoChange();
      setName('');
      setSelectedSubcategory('');
    } catch (error) {
      setError('Failed to upload photo. Please try again.');
      console.error('Failed to upload photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await api.deletePhoto(id);
      onPhotoChange();
    } catch (error) {
      setError('Failed to delete photo. Please try again.');
      console.error('Failed to delete photo:', error);
    }
  };


  const currentCategory = categories.find(cat => cat.id === selectedMainCategory);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to site
          </a>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6">Upload New Content</h2>

          <div className="space-y-4">
            {/* Main Category Selection */}
            <div className="flex gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedMainCategory(category.id);
                    setSelectedSubcategory(''); // Reset subcategory when switching categories
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${selectedMainCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Subcategory Selection (only for Exposition category) */}
            {currentCategory && currentCategory.subcategories && selectedMainCategory === 'expo' && (
              <div className="flex gap-3">
                {currentCategory.subcategories.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedSubcategory === sub.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input for photo name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Content name"
              className="w-full px-4 py-2 bg-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Upload Button */}
            <label className="block">
              <span className="bg-blue-600 px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                <Upload className="w-5 h-5" />
                {uploading ? 'Uploading...' : 'Upload Content'}
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleUpload}
                disabled={uploading || (selectedMainCategory === 'expo' && !selectedSubcategory)}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Display the uploaded photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos
            .filter(photo =>
              // Display all photos if no category is selected
              !selectedMainCategory ||
              // Display photos from the selected category
              photo.category === selectedMainCategory ||
              // Also check if subcategory matches for expo category
              (selectedMainCategory === 'expo' && photo.category === selectedSubcategory)
            )
            .map((photo) => (
              <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{photo.name}</h3>
                  <p className="text-gray-400">{photo.category}</p>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="mt-2 text-red-500 hover:text-red-400 inline-flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
