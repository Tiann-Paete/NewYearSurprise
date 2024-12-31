import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalSparkle from '../effects/ModalSparkle';
import { useWish } from '../context/WishContext';

const Paper = ({ isOpen, onClose, onWishSent }) => {
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setWishMessage } = useWish();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const wish = inputRef.current.value.trim();
    if (wish) {
      setIsSubmitting(true);
      setWishMessage(wish);
      onWishSent(wish);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[60] bg-black/50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={isSubmitting ? {
              scale: 1.5,
              z: 100,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeIn"
              }
            } : {
              scale: 0.5,
              opacity: 0,
              transition: {
                type: "spring",
                duration: 0.5
              }
            }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[80%] max-w-lg aspect-[3/4] bg-white rounded-sm p-8 shadow-xl"
          >
            <div className="absolute -inset-4 md:-inset-10 pointer-events-none">
              <ModalSparkle />
            </div>
            
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <textarea
                ref={inputRef}
                placeholder="Write your wish in 2025..."
                className="flex-1 w-full resize-none bg-transparent text-gray-800 text-lg focus:outline-none font-handwriting leading-relaxed"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)',
                  lineHeight: '32px',
                  padding: '0',
                  border: 'none'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-2.5 border border-gray-300 rounded-full mx-auto
                          text-gray-700 text-sm tracking-wide uppercase
                          bg-transparent hover:bg-gray-50 
                          shadow-sm hover:shadow
                          transition-all duration-200
                          font-medium"
                type="submit"
              >
                Make a Wish
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Paper;