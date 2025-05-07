import React from 'react'
import { motion } from 'framer-motion'

interface BreadcrumbProps {
  path: string[]
  onNavigate: (index: number) => void
}

function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  return (
    <motion.div 
      className="flex items-center text-sm py-2 px-6 bg-terminal-darkGray text-gray-300 overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {path.map((segment, index) => (
        <div key={index} className="flex items-center whitespace-nowrap">
          {index > 0 && <span className="mx-2">&gt;</span>}
          <button 
            className="breadcrumb-link"
            onClick={() => onNavigate(index)}
          >
            {segment}
          </button>
        </div>
      ))}
    </motion.div>
  )
}

export default Breadcrumb 