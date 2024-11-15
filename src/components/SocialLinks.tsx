import React from 'react';
import { Instagram, Linkedin, Mail, Video } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex space-x-8">
      <a
        href="https://vimeo.com/username"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Video className="w-8 h-8" />
      </a>
      <a
        href="https://instagram.com/username"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Instagram className="w-8 h-8" />
      </a>
      <a
        href="https://linkedin.com/in/username"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Linkedin className="w-8 h-8" />
      </a>
      <a
        href="mailto:contact@photostudio.com"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Mail className="w-8 h-8" />
      </a>
    </div>
  );
};

export default SocialLinks;