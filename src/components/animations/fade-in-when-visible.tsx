'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Animerad komponent för fade-in effekt när element kommer in i viewport.
 * Använder IntersectionObserver för bättre prestanda.
 */
const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.3,
  className = ''
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const currentRef = domRef.current;
    const observer = new IntersectionObserver(entries => {
      // När elementet blir synligt
      if (entries[0]?.isIntersecting) {
        setIsVisible(true);
        if (currentRef) observer.unobserve(currentRef);
      }
    });
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`
  };
  
  return (
    <div ref={domRef} style={animationStyle} className={className}>
      {children}
    </div>
  );
};

export default FadeInWhenVisible;