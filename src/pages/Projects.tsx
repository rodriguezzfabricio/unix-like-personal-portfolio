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
            name: 'AI Resume Debugger',
            description: 'An AI-powered application that analyzes resumes and provides improvement suggestions using NLP techniques.',
            techStack: ['React', 'TypeScript', 'Node.js', 'OpenAI', 'TailwindCSS'],
            githubUrl: 'https://github.com/fabricio/ai-resume-debugger',
            demoUrl: 'https://ai-resume-debugger.netlify.app',
            deploymentPlatform: 'Netlify',
            metrics: [
              'Improved resume scores by 45% on average',
              'Helped 500+ users refine their resumes',
              'Identified key missing skills in 92% of analyzed resumes'
            ],
            demoGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXE2MzJxaTB3N2IwamZtMDBjNTI5dnJoeGozMjR6bjlzN2ZjanhwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs83TElTW06IwxeU/giphy.gif',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '1:45'
          },
          {
            id: 2,
            name: 'Retriever Study',
            description: 'A web application for researching and comparing different retrieval mechanisms in large language model systems.',
            techStack: ['React', 'Python', 'Flask', 'LangChain', 'PostgreSQL'],
            githubUrl: 'https://github.com/fabricio/retriever-study',
            demoUrl: 'https://retriever-study.netlify.app',
            deploymentPlatform: 'Netlify',
            metrics: [
              'Improved study group formation by 35%',
              'Reduced scheduling conflicts by 78%',
              'Served 200+ active student users'
            ],
            screenshots: [
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHg4eWo2NzMyMjE1OGRmMDlzZm41ZnB0c2JsMHA3NXk3cHV1OXVpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/077i6AULCXc0FKTj9s/giphy.gif',
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanhtNmJla25rZnY0eWF5bjhucG9rMHV6c3ZxcXY3a2ZveXRqMXRpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/B4dt6rXq6nABilHTYM/giphy.gif'
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '2:15'
          },
          {
            id: 3,
            name: 'Real Estate Analysis',
            description: 'A data analysis tool that helps investors identify promising real estate opportunities using market trends and predictive analytics.',
            techStack: ['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'FastAPI'],
            githubUrl: 'https://github.com/fabricio/real-estate-analysis',
            metrics: [
              'Predicted property values with 94% accuracy',
              'Analyzed 50,000+ property listings',
              'Reduced investment risk assessment time by 65%'
            ],
            screenshots: [
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHZ5b2lsYm1kNWJ2dXN1MTcxeno2YnNsMnIyOWE3NGF3MDBxejQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gR0YFZxWbnUPtMA/giphy.gif',
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFkbW1yd3BrdDQyaXUyeHgwamtuZG41OTNtcWl5ODZ0MGNldXd0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KbXLGsxLUXyHQLbYpW/giphy.gif'
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            videoDuration: '1:30'
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