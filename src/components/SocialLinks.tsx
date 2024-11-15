import React from 'react';
import { Instagram, Linkedin, Mail, Video } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex space-x-8">
      <a
        href="https://vimeo.com/victorgalud"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Video className="w-8 h-8" />
      </a>
      <a
        href="https://www.instagram.com/galudboy/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Instagram className="w-8 h-8" />
      </a>
      <a
        href="https://www.linkedin.com/in/victor-galud-68159b113/?originalSubdomain=fr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Linkedin className="w-8 h-8" />
      </a>
      <a
        href="mailto:victor.galud@hotmail.fr"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <Mail className="w-8 h-8" />
      </a>
    </div>
  );
};

export default SocialLinks;