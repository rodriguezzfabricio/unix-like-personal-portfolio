import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  onNavigate: (section: string) => void
  activeSection: string
}

function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  const sections = [
    { key: 'about_me', label: 'About Me' },
    { key: 'projects', label: 'Projects' },
    { key: 'experience', label: 'Experience' },
    { key: 'skills', label: 'Skills' },
    { key: 'education', label: 'Education' },
    { key: 'contact', label: 'Contact' },
    { key: 'blog', label: 'Blog' },
  ]

  const handleClick = (section: string) => {
    onNavigate(section)
  }
  
  return (
    <motion.nav 
      className="bg-terminal-black border-b border-terminal-darkGray py-4 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isMobile ? (
        <div className="relative">
          <button 
            className="w-full flex justify-between items-center px-4 py-2 bg-terminal-darkGray rounded-md"
            onClick={() => setIsMobile(prev => !prev)}
          >
            <span>{sections.find(s => s.key === activeSection)?.label || 'Menu'}</span>
            <span>▼</span>
          </button>
          
          {isMobile && (
            <motion.div 
              className="absolute top-full left-0 right-0 mt-2 bg-terminal-darkGray rounded-md overflow-hidden z-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              {sections.map(section => (
                <button
                  key={section.key}
                  onClick={() => handleClick(section.key)}
                  className={`w-full text-left px-4 py-2 hover:bg-terminal-darkGray/50 ${
                    activeSection === section.key ? 'text-terminal-green' : 'text-white'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex justify-center space-x-2">
          {sections.map(section => (
            <button
              key={section.key}
              onClick={() => handleClick(section.key)}
              className={`nav-link ${activeSection === section.key ? 'nav-link-active' : ''}`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  )
}

export default Navbar 