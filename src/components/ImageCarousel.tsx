import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  height?: string; // Optional height parameter
}

function ImageCarousel({ images, alt, height = "h-48" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prevent function calls if there's only one image
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className={`${height} overflow-hidden bg-terminal-black rounded-md flex items-center justify-center`}>
        <img 
          src={images[currentIndex]} 
          alt={`${alt} screenshot ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      
      {hasMultipleImages && (
        <>
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2">
            <motion.button 
              onClick={prevImage}
              className="bg-terminal-black/80 text-terminal-green p-1 rounded-full hover:bg-terminal-darkGray"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#10094;
            </motion.button>
            <motion.button 
              onClick={nextImage}
              className="bg-terminal-black/80 text-terminal-green p-1 rounded-full hover:bg-terminal-darkGray"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#10095;
            </motion.button>
          </div>
          
          <div className="flex justify-center mt-2">
            {images.map((_, idx) => (
              <button 
                key={idx} 
                className={`h-2 w-2 mx-1 rounded-full ${
                  idx === currentIndex ? 'bg-terminal-green' : 'bg-gray-500'
                }`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel; 