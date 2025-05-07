import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard.tsx'
import supabase from '../services/supabaseClient.ts'

interface Project {
  id: number
  name: string
  description: string
  techStack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        // You could fetch from Supabase here
        // const { data, error } = await supabase.from('projects').select('*')
        // if (error) throw error
        // setProjects(data)
        
        // For now, using mock data
        const mockProjects: Project[] = [
          {
            id: 1,
            name: 'AI Resume Debugger',
            description: 'An AI-powered application that analyzes resumes and provides improvement suggestions using NLP techniques.',
            techStack: ['React', 'TypeScript', 'Node.js', 'OpenAI', 'TailwindCSS'],
            githubUrl: 'https://github.com/fabricio/ai-resume-debugger',
          },
          {
            id: 2,
            name: 'Retriever Study',
            description: 'A web application for researching and comparing different retrieval mechanisms in large language model systems.',
            techStack: ['React', 'Python', 'Flask', 'LangChain', 'PostgreSQL'],
            githubUrl: 'https://github.com/fabricio/retriever-study',
          },
          {
            id: 3,
            name: 'Real Estate Analysis',
            description: 'A data analysis tool that helps investors identify promising real estate opportunities using market trends and predictive analytics.',
            techStack: ['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'FastAPI'],
            githubUrl: 'https://github.com/fabricio/real-estate-analysis',
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
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            techStack={project.techStack}
            image={project.image}
            githubUrl={project.githubUrl}
            demoUrl={project.demoUrl}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Projects 