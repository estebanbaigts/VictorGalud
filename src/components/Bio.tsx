import React from 'react';
import SplitText from './SplitText';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Bio: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 flex justify-center items-center">
      <div className=" text-white p-8 rounded-lg shadow-lg text-center">
        <SplitText
          text="Welcome to the Bio section! Here you can find the latest updates and news."
          className="text-xl"
          delay={20}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeInOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
    </section>
  );
};

export default Bio;