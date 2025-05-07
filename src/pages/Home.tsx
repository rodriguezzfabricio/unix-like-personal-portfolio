import React from 'react'
import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4">
          Fabricio Rodriguez
        </h1>
        <h2 className="text-xl text-gray-300 mb-6">
          Software Engineer & Developer
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Welcome to my terminal-inspired portfolio! I'm a passionate software engineer 
          specializing in full-stack development with expertise in React, TypeScript, 
          and modern web technologies.
        </p>
      </div>

      <div className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray mb-8">
        <h3 className="text-xl text-terminal-green mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-gray-300 mb-2">Location</h4>
            <p className="text-white">San Francisco, CA</p>
          </div>
          <div>
            <h4 className="text-gray-300 mb-2">Expertise</h4>
            <p className="text-white">Full-Stack Development</p>
          </div>
          <div>
            <h4 className="text-gray-300 mb-2">Languages</h4>
            <p className="text-white">TypeScript, JavaScript, Python, Java</p>
          </div>
          <div>
            <h4 className="text-gray-300 mb-2">Frameworks</h4>
            <p className="text-white">React, Next.js, Node.js, Spring Boot</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl text-terminal-green mb-4">About Me</h3>
        <p className="text-gray-400 leading-relaxed mb-4">
          I'm a detail-oriented software engineer with a passion for creating elegant, 
          efficient solutions to complex problems. With experience across the full stack,
          I enjoy building applications that provide exceptional user experiences while
          maintaining robust backend architectures.
        </p>
        <p className="text-gray-400 leading-relaxed">
          When I'm not coding, you'll find me exploring new technologies, contributing to
          open-source projects, or enjoying outdoor adventures.
        </p>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="bg-terminal-darkGray hover:bg-terminal-gray text-terminal-green py-2 px-4 rounded-md transition-colors duration-200">
          View Projects
        </button>
        <button className="bg-terminal-darkGray hover:bg-terminal-gray text-terminal-green py-2 px-4 rounded-md transition-colors duration-200">
          Contact Me
        </button>
      </div>
    </motion.div>
  )
}

export default Home 