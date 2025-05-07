import React from 'react'
import { motion } from 'framer-motion'

function Skills() {
  const skillCategories = [
    {
      id: 1,
      name: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 85 },
        { name: 'TailwindCSS', level: 80 },
        { name: 'Next.js', level: 75 },
      ],
    },
    {
      id: 2,
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express', level: 75 },
        { name: 'Python', level: 70 },
        { name: 'Java', level: 65 },
        { name: 'Spring Boot', level: 60 },
        { name: 'RESTful APIs', level: 85 },
      ],
    },
    {
      id: 3,
      name: 'Database',
      skills: [
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'Supabase', level: 65 },
        { name: 'SQL', level: 80 },
      ],
    },
    {
      id: 4,
      name: 'DevOps & Tools',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'CI/CD', level: 70 },
        { name: 'Testing', level: 75 },
      ],
    },
  ]
  
  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-terminal-green">{level}%</span>
      </div>
      <div className="w-full bg-terminal-black rounded-full h-2.5">
        <div 
          className="bg-terminal-green h-2.5 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  )

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-terminal-green mb-4">Skills</h2>
        <p className="text-gray-400">
          My technical skills and proficiency levels. These represent the technologies 
          I've worked with professionally and on personal projects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map(category => (
          <motion.div 
            key={category.id}
            className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: category.id * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-terminal-green mb-4">{category.name}</h3>
            <div>
              {category.skills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Skills 