import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <div className=" text-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="text-lg">
          Welcome to the About section! Here you can find information about Victor Galud.
        </p>
      </div>
    </section>
  );
};

export default About;