import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Video } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Biography Section */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative w-48 md:w-64 flex-shrink-0">
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg transform rotate-3"></div>
                <img
                  src="./profile.jpeg"
                  alt="Victor Galud"
                  className="relative w-full aspect-square object-cover rounded-lg shadow-2xl transform -rotate-3 transition-transform duration-300 hover:rotate-0"
                />
              </div>
              <div className="lg:pl-12">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-bold mb-4">About Me</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    With over a decade of experience capturing life's most precious moments,
                    I've developed a unique style that blends traditional photography techniques
                    with modern artistic vision.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://vimeo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                    >
                      <Video className="w-5 h-5" />
                    </a>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:pl-12">

                <div className="space-y-6">
                  <div className="group p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600/80 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <a
                          href="mailto:contact@victorgalud.com"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          contact@victorgalud.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600/80 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <a
                          href="tel:+33123456789"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600/80 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Location</h3>
                        <p className="text-gray-300">Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </section>
  );
};

export default Contact;