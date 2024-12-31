import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWish } from '../context/WishContext';
import { useRouter } from 'next/router';
import ModalSparkle from '../effects/ModalSparkle';

const NewYearCard = ({ onClose, isVisible }) => {
  const router = useRouter();
  const { wishData, setReceiverName } = useWish();
  const { receiverName, message, yearMessage } = wishData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (router.query.name && !receiverName) {
      setReceiverName(router.query.name);
    }
  }, [router.query.name, setReceiverName, receiverName]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const peopleWithImages = {
    aizel: 'aizel',
    janna: 'janna',
    mica: 'mica',
    'loren may': 'loren',
    glenndely: 'glenn',
    riya: 'riya',
    askia: 'askia',
    rj: 'rj',
    francis: 'francis',
    keshier: 'keshier',
    jeff: 'jeff'
  };

  const formattedName = receiverName?.toLowerCase();
  const hasImages = formattedName in peopleWithImages;
  const imagePrefix = hasImages ? peopleWithImages[formattedName] : null;

  const handleImageTransition = (newIndex) => {
    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextImage = () => {
    handleImageTransition((currentImageIndex + 1) % 4);
  };

  const previousImage = () => {
    handleImageTransition((currentImageIndex - 1 + 4) % 4);
  };

  const ImageHeader = () => {
    if (currentImageIndex === 0) {
      return (
        <div className="absolute top-0 left-0 right-0 p-2 z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-full py-2 px-4 mx-auto w-fit">
            <h3 className="text-sm md:text-xl font-semibold text-white text-center">
              Your Best Photos of 2024
            </h3>
          </div>
        </div>
      );
    }
    return null;
  };

  const NoImageLayout = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-8">
        <span className="rounded-full bg-indigo-600/80 py-1 px-3 text-sm text-white animate-reveal">
          NEW YEAR 2025
        </span>
        <h2 
          className="text-5xl font-bold text-white animate-reveal mt-4"
          style={{ fontFamily: "'Satisfy', cursive" }}
        >
          Happy New Year, {receiverName}! 🎆
        </h2>
        <div className="space-y-6 mt-8">
          <p 
            className="text-2xl text-gray-200 animate-reveal delay-500 leading-relaxed"
            style={{ fontFamily: "'Delius', cursive" }}
          >
            {yearMessage}
          </p>
          <p 
            className="text-2xl text-gray-200 animate-reveal delay-1000 leading-relaxed"
            style={{ fontFamily: "'Delius', cursive" }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[60] "
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ 
          scale: 0.5,
          opacity: 0,
          transition: {
            type: "spring",
            duration: 0.5
          }
        }}
        transition={{ type: "spring", duration: 0.5 }}
        className={`
          relative 
          rounded-xl overflow-hidden
          w-[90vw] ${hasImages ? 'md:w-[1024px]' : 'md:w-[800px]'}
          max-h-[90vh] md:h-[500px]
          bg-transparent backdrop-blur-sm
        `}
      >
        {hasImages ? (
          <>
            {/* Mobile Layout with Images */}
            <div className="block md:hidden p-4 space-y-4 overflow-y-auto">
              <div className="relative w-full h-64 bg-black/5 overflow-hidden shadow-lg backdrop-blur-sm rounded-lg">
                <div className="absolute inset-0 rounded-md overflow-hidden">
                  <ImageHeader />
                  <img
                    src={`/persons/${imagePrefix}${currentImageIndex + 1}.png`}
                    alt={`${receiverName} ${currentImageIndex + 1}`}
                    className={`w-full h-full object-scale-down transition-opacity duration-300 ${
                      isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full shadow-md hover:bg-black/10"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-400" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full shadow-md hover:bg-black/10"
                >
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                <span className="rounded-full bg-indigo-600/80 py-0.5 px-2.5 text-xs text-white animate-reveal backdrop-blur-sm">
                  NEW YEAR 2025
                </span>
                <h2 
                  className="text-2xl font-bold text-white animate-reveal"
                  style={{ fontFamily: "'Berkshire Swash', static" }}
                >
                  Happy New Year, {receiverName}! 🎊
                </h2>
                <p 
                  className="text-base text-gray-200 animate-reveal delay-500"
                  style={{ fontFamily: "'Delius', cursive" }}
                >
                  {yearMessage}
                </p>
                <p 
                  className="text-base text-gray-200 animate-reveal delay-1000"
                  style={{ fontFamily: "'Delius', cursive" }}
                >
                  {message}
                </p>
              </div>
            </div>

            {/* Desktop Layout with Images */}
            <div className="hidden md:flex flex-row h-full">
              <div className="w-1/2 p-6 flex items-center justify-center">
                <div className="relative w-full h-[400px] bg-black/5 shadow-lg backdrop-blur-sm rounded-lg">
                  <div className="absolute inset-0 rounded-md overflow-hidden">
                    <ImageHeader />
                    <img
                      src={`/persons/${imagePrefix}${currentImageIndex + 1}.png`}
                      alt={`${receiverName} ${currentImageIndex + 1}`}
                      className={`w-full h-full object-scale-down transition-opacity duration-300 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  </div>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 p-1 rounded-full shadow-md hover:bg-black/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 p-1 rounded-full shadow-md hover:bg-black/30"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {[0, 1, 2, 3].map((index) => (
                      <button
                        key={index}
                        onClick={() => handleImageTransition(index)}
                        className={`w-2 h-2 rounded-full ${
                          currentImageIndex === index ? 'bg-white' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-8 mt-14 flex flex-col justify-start space-y-6">
                <div className="space-y-6">
                  <span className="rounded-full bg-indigo-600/80 py-0.5 px-2.5 text-xs text-white animate-reveal backdrop-blur-sm">
                    NEW YEAR 2025
                  </span>
                  <h2 
                    className="text-4xl font-bold text-white animate-reveal"
                    style={{ fontFamily: "'Berkshire Swash', static" }}
                  >
                    Happy New Year, {receiverName}! 🎊
                  </h2>
                  <p 
                    className="text-xl text-gray-200 animate-reveal delay-500"
                    style={{ fontFamily: "'Delius', cursive" }}
                  >
                    {yearMessage}
                  </p>
                  <p 
                    className="text-xl text-gray-200 animate-reveal delay-1000"
                    style={{ fontFamily: "'Delius', cursive" }}
                  >
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <NoImageLayout />
        )}
      </motion.div>
    </motion.div>
  );
};

export default NewYearCard;