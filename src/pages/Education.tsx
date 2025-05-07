import React from 'react'
import { motion } from 'framer-motion'

function Education() {
  const educationItems = [
    {
      id: 1,
      institution: 'University of Technology',
      degree: 'Master of Computer Science',
      period: '2014-2016',
      description: 'Specialized in artificial intelligence and machine learning algorithms. Thesis on neural network optimization techniques.',
      courses: ['Advanced Algorithms', 'Machine Learning', 'Distributed Systems', 'Advanced Database Systems'],
    },
    {
      id: 2,
      institution: 'State University',
      degree: 'Bachelor of Science in Computer Engineering',
      period: '2010-2014',
      description: 'Comprehensive program covering both hardware and software aspects of computing systems. Graduated with honors.',
      courses: ['Data Structures', 'Computer Architecture', 'Operating Systems', 'Software Engineering'],
    },
    {
      id: 3,
      institution: 'Online Learning Platforms',
      degree: 'Professional Certifications',
      period: '2017-Present',
      description: 'Continuous professional development through online courses and certifications.',
      courses: ['AWS Certified Developer', 'React Nanodegree', 'TensorFlow Developer Certificate', 'Full Stack Web Development'],
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
        <h2 className="text-3xl font-bold text-terminal-green mb-4">Education</h2>
        <p className="text-gray-400">
          My academic background and continuous learning journey.
        </p>
      </div>
      
      <div className="space-y-8">
        {educationItems.map(item => (
          <motion.div 
            key={item.id}
            className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: item.id * 0.1 }}
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h3 className="text-xl font-semibold text-terminal-green">{item.institution}</h3>
              <span className="text-gray-400">{item.period}</span>
            </div>
            <h4 className="text-lg text-white mb-2">{item.degree}</h4>
            <p className="text-gray-300 mb-4">{item.description}</p>
            
            <div className="mt-4">
              <h5 className="text-sm text-gray-400 mb-2">Key Courses:</h5>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {item.courses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-8 p-6 bg-terminal-darkGray/50 rounded-lg border border-dashed border-terminal-gray text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <p className="text-gray-300">
          <span className="text-terminal-green">Lifelong learner:</span> Always exploring new technologies and expanding my knowledge.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Education 