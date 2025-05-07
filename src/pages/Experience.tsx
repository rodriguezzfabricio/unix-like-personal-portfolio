import React from 'react'
import { motion } from 'framer-motion'

function Experience() {
  const experiences = [
    {
      id: 1,
      company: 'Company A',
      position: 'Senior Developer',
      period: '2020-2023',
      description: 'Led development of core product features, mentored junior developers, and implemented CI/CD pipeline.',
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
    {
      id: 2,
      company: 'Company B',
      position: 'Full Stack Developer',
      period: '2018-2020',
      description: 'Developed and maintained web applications, collaborated with cross-functional teams, and optimized database performance.',
      technologies: ['JavaScript', 'Vue.js', 'Express', 'MongoDB'],
    },
    {
      id: 3,
      company: 'Company C',
      position: 'Junior Developer',
      period: '2016-2018',
      description: 'Built responsive UI components, fixed bugs, and contributed to agile development process.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    },
  ]

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-terminal-green mb-4">Experience</h2>
        <p className="text-gray-400">
          My professional journey and work experience. You can type <span className="text-terminal-green">cat company_name.md</span> in 
          the terminal below to view more details about any specific role.
        </p>
      </div>
      
      <div className="space-y-8">
        {experiences.map(exp => (
          <motion.div 
            key={exp.id}
            className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: exp.id * 0.1 }}
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h3 className="text-xl font-semibold text-terminal-green">{exp.company}</h3>
              <span className="text-gray-400">{exp.period}</span>
            </div>
            <h4 className="text-lg text-white mb-2">{exp.position}</h4>
            <p className="text-gray-300 mb-4">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="bg-terminal-black px-2 py-1 rounded-md text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Experience 