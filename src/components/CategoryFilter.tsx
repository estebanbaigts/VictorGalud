import React from 'react';
import { Camera, Film, Video, Image } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: React.FC;
  subcategories?: { id: string; label: string }[];
}

const categories: Category[] = [
  {
    id: 'photos',
    label: 'Photos',
    icon: Camera,
    subcategories: [
      { id: 'numerique', label: 'Numérique' },
      { id: 'argentique', label: 'Argentique' }
    ]
  },
  {
    id: 'expo',
    label: 'Expo',
    icon: Image,
    subcategories: [
      { id: 'odorat', label: 'Un regard vers l\'odorat' },
      { id: 'around-world', label: 'Around the world portrait' }
    ]
  },
  {
    id: 'video',
    label: 'Vidéo',
    icon: Video,
    subcategories: [
      { id: 'documentary', label: 'Documentary on Artist' }
    ]
  }
];

interface CategoryFilterProps {
  selectedCategory: string;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string, subcategory: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4">
        {/* Main Categories */}
        <div className="flex justify-center gap-4 mb-4">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id, null)}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedCategory === id
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory && (
          <div className="flex justify-center gap-4 mt-2">
            {categories
              .find(cat => cat.id === selectedCategory)
              ?.subcategories?.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => onCategoryChange(selectedCategory, sub.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedSubcategory === sub.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};