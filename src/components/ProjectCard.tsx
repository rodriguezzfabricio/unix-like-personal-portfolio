import React from 'react'
import { motion } from 'framer-motion'

interface ProjectProps {
  name: string
  description: string
  techStack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
}

function ProjectCard({ name, description, techStack, image, githubUrl, demoUrl }: ProjectProps) {
  return (
    <motion.div 
      className="bg-terminal-darkGray rounded-lg overflow-hidden border border-terminal-gray hover:border-terminal-green transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-terminal-green mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span 
                key={index}
                className="bg-terminal-black px-2 py-1 rounded-md text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:underline text-sm"
            >
              View on GitHub
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:underline text-sm"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard 