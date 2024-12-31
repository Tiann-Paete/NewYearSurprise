import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


const ShootingStar = ({ onAnimationComplete }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth <= 768);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const DesktopStar = () => (
    <div className="fixed inset-0 w-[150vw] h-[150vh] z-30" style={{
      transform: 'translate3d(-35vw, 0vh, 1px) rotate(235deg) scale(0.9)',
      transformOrigin: 'center'
    }}>
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          y: '-200%'
        }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1],
          y: ['200%', '0%']
        }}
        transition={{ 
          duration: 3,
          ease: "easeInOut",
        }}
        onAnimationComplete={onAnimationComplete}
        className="absolute top-1/2 left-1/2"
        style={{
          width: '3px',
          height: '55vh',
          background: 'linear-gradient(#fff, transparent)'
        }}
      />
    </div>
  );

  const MobileStar = () => (
    <div className="fixed inset-0 w-[150vw] h-[150vh] z-30" style={{
      transform: 'translate3d(-45vw, -10vh, 1px) rotate(225deg) scale(0.6)',
      transformOrigin: 'center'
    }}>
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          y: '-200%'
        }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1],
          y: ['200%', '0%']
        }}
        transition={{ 
          duration: 2.5, // Slightly faster animation for mobile
          ease: "easeInOut",
        }}
        onAnimationComplete={onAnimationComplete}
        className="absolute top-1/2 left-1/2"
        style={{
          width: '2px', // Slightly thinner line for mobile
          height: '45vh', // Shorter trail for mobile
          background: 'linear-gradient(#fff, transparent)'
        }}
      />
    </div>
  );

  return isMobile ? <MobileStar /> : <DesktopStar />;
};

export default ShootingStar;