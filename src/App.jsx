import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.tsx'
import Terminal from './components/Terminal.tsx'
import Breadcrumb from './components/Breadcrumb.tsx'
import Home from './pages/Home.tsx'
import Projects from './pages/Projects.tsx'
import Experience from './pages/Experience.tsx'
import Skills from './pages/Skills.tsx'
import Education from './pages/Education.tsx'
import Contact from './pages/Contact.tsx'

function App() {
  const [activeSection, setActiveSection] = useState('about_me')
  const [currentPath, setCurrentPath] = useState(['Home'])
  const [terminalDirectory, setTerminalDirectory] = useState('~')
  
  useEffect(() => {
    // Update terminal directory based on active section
    switch(activeSection) {
      case 'about_me':
        setTerminalDirectory('~')
        setCurrentPath(['Home'])
        break
      case 'projects':
        setTerminalDirectory('~/projects')
        setCurrentPath(['Home', 'Projects'])
        break
      case 'experience':
        setTerminalDirectory('~/experience')
        setCurrentPath(['Home', 'Experience'])
        break
      case 'skills':
        setTerminalDirectory('~/skills')
        setCurrentPath(['Home', 'Skills'])
        break
      case 'education':
        setTerminalDirectory('~/education')
        setCurrentPath(['Home', 'Education'])
        break
      case 'contact':
        setTerminalDirectory('~/contact')
        setCurrentPath(['Home', 'Contact'])
        break
      case 'blog':
        setTerminalDirectory('~/blog')
        setCurrentPath(['Home', 'Blog'])
        break
      default:
        setTerminalDirectory('~')
        setCurrentPath(['Home'])
    }
  }, [activeSection])
  
  const handleNavigate = (section) => {
    setActiveSection(section)
  }
  
  const handleBreadcrumbNavigate = (index) => {
    // Navigate to the clicked breadcrumb level
    if (index === 0) {
      setActiveSection('about_me')
    } else if (currentPath[index]) {
      const section = currentPath[index].toLowerCase().replace(' ', '_')
      setActiveSection(section)
    }
  }
  
  const handleCommandExecuted = (command, output) => {
    // Process terminal commands to update the UI state
    const parts = command.trim().split(' ')
    if (parts[0] === 'cd') {
      const target = parts[1]
      if (target === 'projects' || target === '~/projects') {
        setActiveSection('projects')
      } else if (target === 'experience' || target === '~/experience') {
        setActiveSection('experience')
      } else if (target === 'skills' || target === '~/skills') {
        setActiveSection('skills')
      } else if (target === 'education' || target === '~/education') {
        setActiveSection('education')
      } else if (target === 'contact' || target === '~/contact') {
        setActiveSection('contact')
      } else if (target === 'blog' || target === '~/blog') {
        setActiveSection('blog')
      } else if (target === '~' || target === '~/') {
        setActiveSection('about_me')
      }
    } else if (parts[0] === 'about_me') {
      setActiveSection('about_me')
    } else if (parts[0] === 'projects') {
      setActiveSection('projects')
    } else if (parts[0] === 'experience') {
      setActiveSection('experience')
    } else if (parts[0] === 'skills') {
      setActiveSection('skills')
    } else if (parts[0] === 'education') {
      setActiveSection('education')
    } else if (parts[0] === 'contact') {
      setActiveSection('contact')
    } else if (parts[0] === 'blog') {
      setActiveSection('blog')
    }
  }
  
  // Render the appropriate content based on the active section
  const renderContent = () => {
    switch(activeSection) {
      case 'about_me':
        return <Home />
      case 'projects':
        return <Projects />
      case 'experience':
        return <Experience />
      case 'skills':
        return <Skills />
      case 'education':
        return <Education />
      case 'contact':
        return <Contact />
      case 'blog':
        return <div className="p-6">Blog content coming soon!</div>
      default:
        return <Home />
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
      />
      
      <Breadcrumb 
        path={currentPath} 
        onNavigate={handleBreadcrumbNavigate} 
      />
      
      <div className="flex-grow p-6">
        {renderContent()}
      </div>
      
      <div className="border-t border-terminal-darkGray">
        <Terminal 
          initialDirectory={terminalDirectory} 
          onCommandExecuted={handleCommandExecuted} 
        />
      </div>
    </div>
  )
}

export default App 