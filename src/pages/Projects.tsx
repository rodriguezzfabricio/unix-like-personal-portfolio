import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import EnhancedProjectCard from '../components/EnhancedProjectCard'

interface Project {
  id: number
  name: string
  description: string
  techStack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  screenshots?: string[]
  demoGif?: string
  videoUrl?: string
  videoDuration?: string
  metrics?: string[]
  deploymentPlatform?: string
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Using mock data
        const mockProjects: Project[] = [
          {
            id: 1,
            name: 'Multimedia Embedded Memory Encapsulation Filesystem',
            description: 'Engineered a complete read/write FAT-based filesystem in user space using the FUSE library, simulating a 128 KiB virtual disk image with superblocks, directory entries, and a File Allocation Table.',
            techStack: ['C', 'FUSE', 'Linux Kernel', 'Filesystem'],
            githubUrl: 'https://github.com/rodriguezzfabricio/memefs',
            demoUrl: 'https://github.com/rodriguezzfabricio/memefs',
            deploymentPlatform: 'GitHub',
            metrics: [
              'Reduced metadata overhead by 32% compared to standard FAT implementations',
              'Decreased file operation latency by 28% through optimized block allocation',
              'Ensured 99.9% data integrity during concurrent operations'
            ],
            demoGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXE2MzJxaTB3N2IwamZtMDBjNTI5dnJoeGozMjR6bjlzN2ZjanhwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs83TElTW06IwxeU/giphy.gif',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '2:05'
          },
          {
            id: 2,
            name: 'Shell Implementation',
            description: 'Built a Unix-like shell from scratch, implementing core commands like cd, pwd, and type for file system navigation.',
            techStack: ['C++', 'Filesystem', 'POSIX'],
            githubUrl: 'https://github.com/rodriguezzfabricio/shell-implementation',
            demoUrl: 'https://github.com/rodriguezzfabricio/shell-implementation',
            deploymentPlatform: 'GitHub',
            metrics: [
              'Handled 10k operations/sec on large filesystem images',
              'Reduced command latency by 35%',
              'Memory footprint < 4MB'
            ],
            demoGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHg4eWo2NzMyMjE1OGRmMDlzZm41ZnB0c2JsMHA3NXk3cHV1OXVpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/077i6AULCXc0FKTj9s/giphy.gif',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '1:24'
          },
          {
            id: 3,
            name: 'Retriever Study',
            description: 'Designed an online platform connecting students for study groups with Spring Boot backend and React interface.',
            techStack: ['Java', 'Spring Boot', 'MongoDB', 'React', 'Google Calendar API'],
            githubUrl: 'https://github.com/rodriguezzfabricio/retriever-study',
            demoUrl: 'https://retriever-study.netlify.app',
            deploymentPlatform: 'Netlify',
            metrics: [
              'Improved student team formation by 45%',
              'Served 100+ active users',
              'Reduced scheduling conflicts by 85%'
            ],
            screenshots: [
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHg4eWo2NzMyMjE1OGRmMDlzZm41ZnB0c2JsMHA3NXk3cHV1OXVpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/077i6AULCXc0FKTj9s/giphy.gif',
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanhtNmJla25rZnY0eWF5bjhucG9rMHV6c3ZxcXY3a2ZveXRqMXRpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/B4dt6rXq6nABilHTYM/giphy.gif'
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '2:15'
          },
          {
            id: 4,
            name: 'Kernel-Level CPU Scheduler',
            description: 'Implemented a custom CPU scheduler as a Linux kernel module with syscalls for task creation and resource management.',
            techStack: ['C', 'Linux Kernel', 'Multithreading'],
            githubUrl: 'https://github.com/rodriguezzfabricio/kernel-scheduler',
            demoUrl: 'https://github.com/rodriguezzfabricio/kernel-scheduler',
            deploymentPlatform: 'GitHub',
            metrics: [
              'Reduced context switching overhead by 25% through efficient priority queue implementation',
              'Improved throughput by 15%',
              'Achieved 99.8% thread safety with zero race conditions across 10,000+ test cycles'
            ],
            screenshots: [
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHZ5b2lsYm1kNWJ2dXN1MTcxeno2YnNsMnIyOWE3NGF3MDBxejQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gR0YFZxWbnUPtMA/giphy.gif'
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '1:45'
          }
        ]
        
        setProjects(mockProjects)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
        setIsLoading(false)
      }
    }
    
    fetchProjects()
  }, [])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-terminal-green">Loading projects...</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 p-4 rounded-md text-red-200">
        {error}
      </div>
    )
  }
  
  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-terminal-green mb-4">Projects</h2>
        <p className="text-gray-400">
          Here are some of my recent projects. You can type <span className="text-terminal-green">cat project_name</span> in 
          the terminal below to view more details about any specific project.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <EnhancedProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            techStack={project.techStack}
            image={project.image}
            githubUrl={project.githubUrl}
            demoUrl={project.demoUrl}
            screenshots={project.screenshots}
            demoGif={project.demoGif}
            videoUrl={project.videoUrl}
            videoDuration={project.videoDuration}
            metrics={project.metrics}
            deploymentPlatform={project.deploymentPlatform}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Projects 