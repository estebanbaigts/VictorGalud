import React from 'react';
import { Camera, Video, Film } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Camera },
  { id: 'numérique', label: 'Numérique', icon: Camera },
  { id: 'argentique', label: 'Argentique', icon: Film },
  { id: 'video', label: 'Vidéo', icon: Video }
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm py-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
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
      </div>
    </div>
  );
};