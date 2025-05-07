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
      </div>

      <div className="flex flex-col md:flex-row gap-6 bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray mb-8">
        <div className="md:w-1/3 flex justify-center">
          <img 
            src="https://rodriguezzfabricio.github.io/unix-like-personal-portfolio/assets/images/profile.jpg" 
            alt="Fabricio Rodriguez"
            className="w-48 h-48 rounded-full border-4 border-terminal-green shadow-lg object-cover" 
          />
        </div>
        <div className="md:w-2/3">
          <h3 className="text-xl text-terminal-green mb-4">About Me</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            Computer Science student at UMBC with expertise spanning systems programming and full-stack development. My technical portfolio includes kernel-level CPU schedulers and custom Unix shells, as well as responsive web applications using React and Spring Boot.
          </p>
          <p className="text-gray-400 leading-relaxed">
            I specialize in developing efficient solutions across the entire software stack—from low-level C/C++ implementations to intuitive user interfaces. Currently preparing for my upcoming role at Finra, I continue to refine my skills in creating robust, performance-optimized applications.
          </p>
        </div>
      </div>

      <div className="bg-terminal-darkGray p-6 rounded-lg border border-terminal-gray mb-8">
        <h3 className="text-xl text-terminal-green mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-gray-300 mb-2">Location</h4>
            <p className="text-white">Baltimore, MD</p>
          </div>
          <div>
            <h4 className="text-gray-300 mb-2">Expertise</h4>
            <p className="text-white">Systems Programming & Full-Stack Development</p>
          </div>
          <div>
            <h4 className="text-gray-300 mb-2">Languages</h4>
            <p className="text-white">C/C++, Java, Python, JavaScript/TypeScript</p>
          </div>
          <div>
            <h4 className="text-gray-300 mb-2">Frameworks</h4>
            <p className="text-white">React, Spring Boot, TensorFlow</p>
          </div>
        </div>
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