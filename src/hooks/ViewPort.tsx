import { useState, useEffect } from 'react';

export const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {

      const ratio = window.innerWidth / window.innerHeight;
      setIsMobile(ratio < 1.2 || window.innerWidth < 800);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};