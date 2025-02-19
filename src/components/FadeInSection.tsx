import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { useSprings, animated } from '@react-spring/web';

interface FadeInSectionProps {
  children: ReactNode[];
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 100 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  const springs = useSprings(
    children.length,
    children.map((_, i) => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      config: { tension: 200, friction: 20 },
      delay: i * delay,
    }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {springs.map((props, index) => (
        <animated.div key={index} style={props}>
          {children[index]}
        </animated.div>
      ))}
    </div>
  );
};

export default FadeInSection;