import { useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Sparkle from '../effects/Sparkle';
import { Fireworks } from 'fireworks-js';
import Paper from '../components/Paper';
import ShootingStar from '../components/ShootingStar';
import NewYearCard from '../components/NewYearCard';
import { WishProvider } from '../context/WishContext';

export default function Surprise() {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);
  const [showPaperImage, setShowPaperImage] = useState(true);
  const [showNewYearCard, setShowNewYearCard] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);
  const isMobile = useRef(false);
  const fireworkIntervalRef = useRef(null);

  const stars = useMemo(() =>
    Array.from({ length: 100 }).map((_, index) => ({
      id: `star-${index}`,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      opacity: Math.random() * 0.8 + 0.2,
      delay: `${Math.random() * 3}s`
    })), []
  );

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
  }, []);

  useEffect(() => {
    if (showFireworks && containerRef.current && !fireworksRef.current) {
      const mobileConfig = {
        autoresize: true,
        opacity: 0.8,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 80, // Reduced particles for mobile
        traceLength: 2,
        traceSpeed: 10,
        explosion: 5,
        intensity: 7, // Reduced intensity for mobile
        flickering: 20,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 80, max: 100 },
        rocketsPoint: { min: 50, max: 50 },
        lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.025 },
        mouse: { click: false, move: false, max: 1 }
      };

      const desktopConfig = {
        autoresize: true,
        opacity: 0.8,
        acceleration: 1.02,
        friction: 0.97,
        gravity: 1.2,
        particles: 150,
        traceLength: 3,
        traceSpeed: 8,
        explosion: 8,
        intensity: 20,
        flickering: 30,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 30, max: 60 },
        rocketsPoint: { min: 50, max: 50 },
        lineWidth: { explosion: { min: 1, max: 5 }, trace: { min: 1, max: 2 } },
        brightness: { min: 60, max: 90 },
        decay: { min: 0.01, max: 0.02 },
        mouse: { click: true, move: false, max: 1 }
      };

      fireworksRef.current = new Fireworks(containerRef.current, 
        isMobile.current ? mobileConfig : desktopConfig
      );

      // For mobile, implement controlled firing of fireworks
      if (isMobile.current) {
        // Clear any existing interval
        if (fireworkIntervalRef.current) {
          clearInterval(fireworkIntervalRef.current);
        }

        // Start new interval for continuous firing
        fireworkIntervalRef.current = setInterval(() => {
          if (fireworksRef.current) {
            fireworksRef.current.launch(1); // Launch one firework at a time
          }
        }, 800); // Launch a new firework every 800ms
      } else {
        fireworksRef.current.start();
      }
    }

    return () => {
      if (fireworkIntervalRef.current) {
        clearInterval(fireworkIntervalRef.current);
        fireworkIntervalRef.current = null;
      }
      if (fireworksRef.current) {
        fireworksRef.current.stop();
        fireworksRef.current = null;
      }
    };
  }, [showFireworks]);

  // Additional cleanup on component unmount
  useEffect(() => {
    return () => {
      if (fireworkIntervalRef.current) {
        clearInterval(fireworkIntervalRef.current);
        fireworkIntervalRef.current = null;
      }
    };
  }, []);

  const handlePaperClick = () => {
    setShowPaper(true);
    setShowPaperImage(false);
  };

  const handlePaperClose = () => {
    setShowPaper(false);
    setShowPaperImage(true);
  };

  const handleWishSent = (wish) => {
    setShowPaper(false);
    setShowPaperImage(false);
    setShowShootingStar(true);

    setTimeout(() => {
      setShowFireworks(true);
      setShowNewYearCard(true);
      setTimeout(() => {
        setShowStar(true);
      }, 1000);
    }, 3500);
  };

  const handleCardClose = () => {
    setShowNewYearCard(false);
    setShowStar(true);
  };

  const handleStarClick = () => {
    setShowNewYearCard(true);
    setShowStar(false);
  };

  return (
    <WishProvider>
      <main className="min-h-screen w-full relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#1c2951] to-[#2a4177]">
          {/* Stars Layer */}
          <div className="absolute inset-0">
            {stars.map(star => (
              <div
                key={star.id}
                className="absolute rounded-full animate-twinkle"
                style={{
                  width: `${star.width}px`,
                  height: `${star.height}px`,
                  backgroundColor: 'white',
                  left: star.left,
                  top: star.top,
                  opacity: star.opacity,
                  animationDelay: star.delay,
                }}
              />
            ))}
          </div>

          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-900/5 to-transparent" />
        </div>

        {/* Moon */}
        <div className="absolute top-10 right-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 opacity-90"
            style={{
              boxShadow: '0 0 60px 10px rgba(255,255,255,0.4)'
            }}
          />
        </div>

        {/* Paper Image with Sparkles */}
        {showPaperImage && (
          <div className="fixed bottom-10 left-0 right-0 mx-auto w-48 md:w-56" style={{ zIndex: 50 }}>
            <div className="relative group">
              <div className="absolute -inset-1 pointer-events-none" style={{ zIndex: 2 }}>
                <Sparkle />
              </div>

              <div
                className="relative cursor-pointer paper-animation"
                onClick={handlePaperClick}
                style={{ zIndex: 1 }}
              >
                <Image
                  src="/images/paper.png"
                  alt="Surprise Paper"
                  width={200}
                  height={200}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Paper Modal */}
        <Paper 
          isOpen={showPaper}
          onClose={handlePaperClose}
          onWishSent={handleWishSent}
        />

        {/* Shooting Star */}
        {showShootingStar && (
          <ShootingStar 
            onAnimationComplete={() => setShowShootingStar(false)} 
          />
        )}

         {/* NewYearCard */}
        <AnimatePresence>
          {showNewYearCard && (
            <NewYearCard 
              onClose={handleCardClose} 
              isVisible={showNewYearCard}
            />
          )}
        </AnimatePresence>
      
        {/* Fireworks Container */}
        <div 
          ref={containerRef}
          style={{ 
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 40,
            display: showFireworks ? 'block' : 'none'
          }}
        />

  {/* Interactive Star with responsive design */}
<AnimatePresence>
  {showStar && (
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-40 md:w-6 md:h-6 w-6 h-6 hover:scale-110 transition-transform duration-300"
      onClick={handleStarClick}
    >
      <div className="relative w-full h-full">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          className="animate-twinkle"
        >
          <polygon 
            points="50 0, 60 40, 100 50, 60 60, 50 100, 40 60, 0 50, 40 40" 
            fill="white"
            className="drop-shadow-lg"
          />
        </svg>
        
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            transform: 'scale(1.5)',
            zIndex: -1
          }}
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>
      </main>
    </WishProvider>
  );
}
