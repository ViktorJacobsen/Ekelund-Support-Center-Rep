'use client';

import { useState, useEffect, useRef } from 'react';

export function useScrollHeader() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollTop = useRef(0);

  // Hantera scroll-events för att dölja/visa header vid scrollning
  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop.current && st > 100) {
        // Scrollar nedåt
        setIsHeaderVisible(false);
      } else {
        // Scrollar uppåt
        setIsHeaderVisible(true);
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isHeaderVisible };
}