import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import TechBadge from './TechBadge';

interface ProjectDetailProps {
  project: {
    id: number;
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
    codeSnippet?: string;
    challenges?: string;
    createdAt?: string;
  };
  onClose: () => void;
}

function ProjectDetailModal({ project, onClose }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Define available tabs
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'demo', label: project.demoUrl ? 'Live Demo' : 'Code Preview' },
    { id: 'metrics', label: 'Metrics' },
  ];
  
  if (project.videoUrl) {
    tabs.push({ id: 'video', label: 'Video' });
  }

  // Combine all images for the gallery
  const allImages = [
    ...(project.screenshots || []),
    ...(project.demoGif ? [project.demoGif] : []),
    ...(project.image ? [project.image] : [])
  ];
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-terminal-black border border-terminal-gray w-full max-w-4xl max-h-[90vh] overflow-auto rounded-md shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-terminal-green font-mono">
            $ cat ./projects/{project.name.toLowerCase().replace(/\s+/g, '-')}
          </h3>
          <button 
            onClick={onClose}
            className="text-terminal-gray hover:text-white"
          >
            [X]
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex space-x-1 border-b border-terminal-gray/30 mb-4 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-3 py-1 text-sm rounded-t-md whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-terminal-darkGray text-terminal-green' 
                    : 'text-terminal-gray hover:text-terminal-green'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-terminal-green mb-2">Description</h4>
                <p className="text-gray-300">{project.description}</p>
              </div>
              
              {allImages.length > 0 && (
                <div className="my-4">
                  <h4 className="text-terminal-green mb-2">Project Gallery</h4>
                  <ImageCarousel 
                    images={allImages} 
                    alt={project.name} 
                    height="h-64" 
                  />
                </div>
              )}
              
              <div>
                <h4 className="text-terminal-green mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <TechBadge 
                      key={tech} 
                      tech={tech}
                      className="bg-terminal-darkGray" 
                    />
                  ))}
                </div>
              </div>
              
              {project.challenges && (
                <div>
                  <h4 className="text-terminal-green mb-2">Challenges & Solutions</h4>
                  <p className="text-gray-300">{project.challenges}</p>
                </div>
              )}
              
              {project.codeSnippet && (
                <div>
                  <h4 className="text-terminal-green mb-2">Key Code Snippet</h4>
                  <pre className="bg-terminal-darkGray p-3 rounded overflow-x-auto text-gray-300 text-sm">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
          
          {/* Tab content will go here */}
          
        </div>
        
        <div className="flex justify-between mt-4 pt-3 border-t border-terminal-gray/30">
          <div className="text-sm text-gray-400">
            <span>Project created: {project.createdAt || '2023'}</span>
          </div>
          <div className="flex space-x-3 text-sm">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:underline"
              >
                [View Code]
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:underline"
              >
                [Open Demo]
              </a>
            )}
            {project.videoUrl && (
              <a 
                href={project.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:underline"
              >
                [Watch Video]
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectDetailModal; 