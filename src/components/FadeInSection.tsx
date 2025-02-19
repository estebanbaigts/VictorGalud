import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 170 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 200, friction: 20 },
    delay,
  });

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
    <animated.div style={props} ref={ref}>
      {children}
    </animated.div>
  );
};

export default FadeInSection;