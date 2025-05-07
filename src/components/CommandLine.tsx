import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface CommandLineProps {
  directory: string
  onExecute: (command: string) => void
}

function CommandLine({ directory, onExecute }: CommandLineProps) {
  const [command, setCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      onExecute(command)
      setCommandHistory(prev => [...prev, command])
      setCommand('')
      setHistoryIndex(-1)
    }
    
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand('')
      }
    }
    
    if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab completion
      const lastWord = command.split(' ').pop() || ''
      
      // Common commands
      const suggestions = [
        'ls', 'cd', 'cat', 'man', 'clear', 
        'about_me', 'projects', 'experience', 
        'skills', 'education', 'contact', 'blog'
      ]
      
      const matches = suggestions.filter(s => s.startsWith(lastWord))
      
      if (matches.length === 1) {
        const words = command.split(' ')
        words[words.length - 1] = matches[0]
        setCommand(words.join(' '))
      }
    }
  }
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  
  return (
    <div className="flex items-center">
      <span className="terminal-prompt">fabricio@portfolio:{directory}$&nbsp;</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none flex-grow text-white font-mono"
        autoFocus
      />
      <span className="terminal-cursor"></span>
    </div>
  )
}

export default CommandLine 