import React from 'react';
import { Mail, Phone, MapPin} from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Biography Section */}
          <div className="space-y-6">
            <div className="flex gap-8 items-start">
              <div className="relative w-1/2">
                <img
                  src="./profile.jpeg"
                  alt="Victor Galud"
                  className="w-full aspect-square object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-lg" />
              </div>
              
              <div className="w-1/2">
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  With over a decade of experience capturing life's most precious moments, 
                  I've developed a unique style that blends traditional photography techniques 
                  with modern artistic vision.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-12">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-gray-300 mb-12">
                Whether you're looking to capture special moments or collaborate on a creative project,
                I'm always excited to discuss new opportunities and ideas.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
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

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
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

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
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