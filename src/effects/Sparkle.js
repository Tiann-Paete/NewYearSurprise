import { useState, useEffect } from 'react';

export default function Sparkle() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const createSparkle = () => ({
      id: Math.random(),
      size: Math.random() * 12 + 8,
      style: {
        // Increased spread range
        top: Math.random() * 120 - 10 + '%',  // More vertical spread
        left: Math.random() * 120 - 10 + '%', // More horizontal spread
        opacity: Math.random(),
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDuration: Math.random() * 2 + 1.5 + 's',
        animationDelay: Math.random() * 1 + 's'
      }
    });

    setSparkles(Array.from({ length: 15 }, createSparkle));

    const interval = setInterval(() => {
      setSparkles(prev => [
        ...prev.slice(1),
        createSparkle()
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
            fill="#FFD700"
          >
            {/* Slim 4-pointed star shape */}
            <polygon points="50 0, 60 40, 100 50, 60 60, 50 100, 40 60, 0 50, 40 40" />
          </svg>
        </div>
      ))}
    </>
  );
}