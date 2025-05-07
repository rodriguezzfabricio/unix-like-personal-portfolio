import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TechBadge from './TechBadge';
import ImageCarousel from './ImageCarousel';

interface ProjectProps {
  name: string;
  description: string;
  techStack: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  screenshots?: string[];
  demoGif?: string;
  videoUrl?: string;
  videoDuration?: string;
  metrics?: string[];
  deploymentPlatform?: string;
}

function EnhancedProjectCard({ 
  name, 
  description, 
  techStack, 
  image,
  githubUrl,
  demoUrl,
  screenshots = [],
  demoGif,
  videoUrl,
  videoDuration = "1:30",
  metrics = [],
  deploymentPlatform = "Netlify"
}: ProjectProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Combine all possible images for the carousel
  const allImages = [
    ...(screenshots.length > 0 ? screenshots : []),
    ...(demoGif ? [demoGif] : []),
    ...(image ? [image] : [])
  ];

  return (
    <motion.div 
      className="bg-terminal-darkGray rounded-lg overflow-hidden border border-terminal-gray hover:border-terminal-green transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {allImages.length > 0 && (
        <div className="overflow-hidden">
          <ImageCarousel images={allImages} alt={name} />
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-terminal-green mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <TechBadge key={index} tech={tech} />
            ))}
          </div>
        </div>
        
        {metrics && metrics.length > 0 && (
          <div className="mt-3 mb-4">
            <h4 className="text-xs text-gray-400 mb-1">Impact & Metrics</h4>
            <div className="bg-terminal-black/50 p-2 rounded border border-terminal-gray/30">
              {metrics.slice(0, 1).map((metric, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-terminal-green mr-2 text-sm">→</span>
                  <span className="text-gray-300 text-xs">{metric}</span>
                </div>
              ))}
              {metrics.length > 1 && (
                <button 
                  className="text-terminal-green text-xs mt-1 hover:underline"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide details' : `Show ${metrics.length - 1} more metrics...`}
                </button>
              )}
              {showDetails && metrics.length > 1 && (
                <div className="mt-2 border-t border-terminal-gray/30 pt-2">
                  {metrics.slice(1).map((metric, index) => (
                    <div key={index} className="flex items-center mt-1">
                      <span className="text-terminal-green mr-2 text-sm">→</span>
                      <span className="text-gray-300 text-xs">{metric}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {demoUrl && (
          <div className="mb-4">
            <h4 className="text-xs text-gray-400 mb-1">Live Demo</h4>
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green flex items-center hover:underline text-sm"
            >
              <span className="mr-1">→</span>
              Try it live
              <span className="ml-1 text-xs text-gray-400">({deploymentPlatform})</span>
            </a>
          </div>
        )}
        
        {videoUrl && (
          <div className="mt-4 mb-4">
            <h4 className="text-xs text-gray-400 mb-1">Video Walkthrough</h4>
            {!isVideoPlaying ? (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="text-terminal-green flex items-center hover:underline text-sm group"
              >
                <span className="mr-1">▶</span>
                Watch video
                <span className="ml-1 text-xs text-gray-400">({videoDuration})</span>
              </button>
            ) : (
              <div className="relative rounded-md overflow-hidden h-48">
                <iframe 
                  src={videoUrl} 
                  className="w-full h-full border-none" 
                  title={`${name} video demo`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-2 right-2 bg-terminal-black/80 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="flex space-x-3 mt-4">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-terminal-black/50 px-3 py-1 rounded text-terminal-green hover:bg-terminal-black text-sm transition-colors duration-200"
            >
              View on GitHub
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-terminal-black/50 px-3 py-1 rounded text-terminal-green hover:bg-terminal-black text-sm transition-colors duration-200"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EnhancedProjectCard; 