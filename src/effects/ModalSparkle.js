import { useState, useEffect, useCallback } from 'react';

const ModalSparkle = () => {
  const [sparkles, setSparkles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const createSparkle = useCallback(() => {
    const mobileSize = Math.random() * 12 + 10; // Smaller size for mobile (8-18px)
    const desktopSize = Math.random() * 20 + 15; // Original size (15-35px)
    
    return {
      id: Math.random(),
      size: isMobile ? mobileSize : desktopSize,
      style: {
        top: Math.random() * (isMobile ? 120 : 140) - (isMobile ? 10 : 20) + '%',
        left: Math.random() * (isMobile ? 120 : 140) - (isMobile ? 10 : 20) + '%',
        animationDelay: Math.random() * 2 + 's'
      },
      color: [
        '#FFD700', // Gold
        '#FFF4BD', // Light gold
        '#ffd000', // Warm white
        '#FFE55C'  // Yellow gold
      ][Math.floor(Math.random() * 4)]
    };
  }, [isMobile]);

  useEffect(() => {
    // Create initial sparkles
    setSparkles(Array.from({ 
      length: isMobile ? 15 : 25 // Fewer sparkles on mobile
    }, createSparkle));

    const interval = setInterval(() => {
      setSparkles(prev => [
        ...prev.slice(1),
        createSparkle()
      ]);
    }, isMobile ? 1000 : 800); // Slightly slower refresh on mobile

    return () => clearInterval(interval);
  }, [createSparkle, isMobile]);

  return (
    <>
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            ...sparkle.style
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill={sparkle.color}
          >
            <polygon points="50 0, 60 40, 100 50, 60 60, 50 100, 40 60, 0 50, 40 40" />
          </svg>
        </div>
      ))}
    </>
  );
};

export default ModalSparkle;