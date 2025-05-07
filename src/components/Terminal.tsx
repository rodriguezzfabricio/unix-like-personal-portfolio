import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CommandLine from './CommandLine.tsx'

interface TerminalProps {
  initialDirectory?: string
  onCommandExecuted?: (command: string, output: string) => void
}

interface TerminalOutput {
  command: string
  output: string
}

function Terminal({ initialDirectory = '~', onCommandExecuted }: TerminalProps) {
  const [history, setHistory] = useState<TerminalOutput[]>([])
  const [currentDirectory, setCurrentDirectory] = useState(initialDirectory)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  const executeCommand = (command: string) => {
    // Process the command
    let output = ''
    const parts = command.trim().split(' ')
    const cmd = parts[0]
    
    switch(cmd) {
      case 'ls':
        if (currentDirectory === '~') {
          output = 'about_me\nprojects\nexperience\nskills\neducation\ncontact\nblog'
        } else if (currentDirectory === '~/projects') {
          output = 'ai_resume_debugger\nretriever_study\nreal_estate_analysis'
        } else if (currentDirectory === '~/experience') {
          output = 'company_a.md\ncompany_b.md\ncompany_c.md'
        } else {
          output = 'No files found'
        }
        break
      case 'cd':
        if (parts.length > 1) {
          const target = parts[1]
          if (target === '~' || target === '~/') {
            setCurrentDirectory('~')
            output = ''
          } else if (target === 'projects' && currentDirectory === '~') {
            setCurrentDirectory('~/projects')
            output = ''
          } else if (target === 'experience' && currentDirectory === '~') {
            setCurrentDirectory('~/experience')
            output = ''
          } else if (target === 'skills' && currentDirectory === '~') {
            setCurrentDirectory('~/skills')
            output = ''
          } else if (target === 'education' && currentDirectory === '~') {
            setCurrentDirectory('~/education')
            output = ''
          } else if (target === 'contact' && currentDirectory === '~') {
            setCurrentDirectory('~/contact')
            output = ''
          } else if (target === 'blog' && currentDirectory === '~') {
            setCurrentDirectory('~/blog')
            output = ''
          } else if (target === '..') {
            setCurrentDirectory('~')
            output = ''
          } else {
            output = `cd: no such directory: ${target}`
          }
        }
        break
      case 'cat':
        if (parts.length > 1) {
          const file = parts[1]
          if (currentDirectory === '~/projects' && file === 'retriever_study') {
            output = '# Retriever Study\n\nA web application for studying retrieval techniques in AI systems.\n\n## Technologies\n\n- React\n- TypeScript\n- Python Flask API\n- Machine Learning'
          } else if (currentDirectory === '~/experience' && file === 'company_a.md') {
            output = '# Company A\n\nPosition: Senior Developer\nDuration: 2020-2023\n\n## Responsibilities\n\n- Led development of core product features\n- Mentored junior developers\n- Implemented CI/CD pipeline'
          } else {
            output = `cat: ${file}: No such file or directory`
          }
        } else {
          output = 'cat: missing file operand'
        }
        break
      case 'man':
        if (parts.length > 1 && parts[1] === 'help') {
          output = 'Available Commands:\n\n  about_me       - View information about me\n  projects       - Browse my projects\n  experience     - View my work experience\n  skills         - See my skills\n  education      - View my education\n  contact        - Get my contact information\n  blog           - Read my blog posts\n\nYou can also click buttons above!'
        } else {
          output = `man: no manual entry for ${parts[1] || 'command'}`
        }
        break
      case 'clear':
        setHistory([])
        output = ''
        break
      default:
        if (cmd === 'about_me' || cmd === 'projects' || cmd === 'experience' || 
            cmd === 'skills' || cmd === 'education' || cmd === 'contact' || cmd === 'blog') {
          output = `Navigating to ${cmd}...`
        } else {
          output = `${cmd}: command not found`
        }
    }
    
    if (command) {
      setHistory(prev => [...prev, { command, output }])
    }
    
    if (onCommandExecuted) {
      onCommandExecuted(command, output)
    }
  }
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])
  
  return (
    <motion.div 
      className="terminal-container w-full h-[70vh] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={terminalRef}
    >
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Welcome to Fabricio's Portfolio Terminal. Type 'man help' for available commands.</p>
      </div>
      
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <span className="terminal-prompt">fabricio@portfolio:{currentDirectory}$&nbsp;</span>
            <span className="terminal-command">{item.command}</span>
          </div>
          <div className="terminal-output whitespace-pre-wrap">{item.output}</div>
        </div>
      ))}
      
      <CommandLine 
        directory={currentDirectory} 
        onExecute={executeCommand} 
      />
    </motion.div>
  )
}

export default Terminal 