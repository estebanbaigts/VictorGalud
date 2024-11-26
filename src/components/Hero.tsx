import React from 'react';
import { useInView } from 'react-intersection-observer';

export const Hero: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80')] bg-cover bg-center bg-fixed"
    >
      <div className={`text-center p-8 bg-black/50 backdrop-blur-sm transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Capturing Moments</h1>
        <p className="text-xl md:text-2xl">Professional Photography by Victor Galud</p>
      </div>
    </section>
  );
};