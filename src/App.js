import React, { useState, useEffect } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [terminalInput, setTerminalInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [activeProject, setActiveProject] = useState(null);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Welcome to Fabricio\'s Portfolio Terminal. Type \'man help\' for available commands.' }
  ]);
  const [terminalOutputVisible, setTerminalOutputVisible] = useState(true);

  useEffect(() => {
    // Execute initial "ls" command on first load
    if (terminalHistory.length === 1) {
      processCommand('ls');
    }
  }, []);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const input = terminalInput.trim();
    
    if (!input) return;
    
    // Add user input to terminal output
    setTerminalHistory(prev => [...prev, { type: 'input', text: input, directory: currentDirectory }]);
    
    // Process command
    processCommand(input);
    
    // Clear input
    setTerminalInput('');
  };

  const addTerminalOutput = (output) => {
    setTerminalHistory(prev => [...prev, { type: 'output', text: output }]);
  };

  const processCommand = (command) => {
    const parts = command.toLowerCase().split(' ');
    const cmd = parts[0];
    
    switch(cmd) {
      case 'ls':
        if (currentDirectory === '~') {
          addTerminalOutput('about_me\nprojects\nexperience\nskills\neducation\ncontact');
        } else if (currentDirectory === '~/projects') {
          addTerminalOutput('memory_encapsulation_filesystem\nshell_implementation\nretriever_study\nkernel_cpu_scheduler');
        } else if (currentDirectory === '~/experience') {
          addTerminalOutput('finra.md\namerican_university.md');
        } else {
          addTerminalOutput('No files found');
        }
        break;
        
      case 'cd':
        if (parts.length > 1) {
          const target = parts[1];
          if (target === '~' || target === '/') {
            setCurrentDirectory('~');
          } else if (target === 'projects' && currentDirectory === '~') {
            setCurrentDirectory('~/projects');
            setActiveSection('projects');
          } else if (target === 'experience' && currentDirectory === '~') {
            setCurrentDirectory('~/experience');
            setActiveSection('experience');
          } else if (target === 'skills' && currentDirectory === '~') {
            setCurrentDirectory('~/skills');
            setActiveSection('skills');
          } else if (target === 'education' && currentDirectory === '~') {
            setCurrentDirectory('~/education');
            setActiveSection('education');
          } else if (target === 'contact' && currentDirectory === '~') {
            setCurrentDirectory('~/contact');
            setActiveSection('contact');
          } else if (target === '..') {
            setCurrentDirectory('~');
            setActiveSection('home');
          } else {
            addTerminalOutput(`cd: no such directory: ${target}`);
          }
        }
        break;
        
      case 'cat':
        if (parts.length > 1) {
          const file = parts[1];
          if (currentDirectory === '~/projects' && file === 'memory_encapsulation_filesystem') {
            addTerminalOutput('# Multimedia Embedded Memory Encapsulation Filesystem\n\nA complete read/write FAT-based filesystem in user space using the FUSE library, simulating a 128 KiB virtual disk image.\n\n## Technologies\n\n- C\n- FUSE\n- Linux Kernel\n- Filesystem\n\n## Key Features\n\n- Implemented file operations (getattr, readdir, open, read, create, write, unlink, truncate)\n- Designed robust endianness handling and BCD timestamp encoding\n- Engineered fault-tolerant operations with synchronized superblocks and FATs');
          } else if (currentDirectory === '~/projects' && file === 'retriever_study') {
            addTerminalOutput('# Retriever Study\n\nAn online platform connecting students for study groups using Spring Boot backend and React interface.\n\n## Technologies\n\n- Java\n- Spring Boot\n- MongoDB\n- React\n- Google Calendar API');
          } else if (currentDirectory === '~/projects' && file === 'kernel_cpu_scheduler') {
            addTerminalOutput('# Kernel-Level CPU Scheduler\n\nA custom CPU scheduler implemented as a Linux kernel module with syscalls for task creation and resource management.\n\n## Technologies\n\n- C\n- Linux Kernel\n- Multithreading\n\n## Key Features\n\n- Reduced context switching overhead by 25% through efficient priority queue implementation\n- Improved throughput by 15%\n- Achieved 99.8% thread safety with zero race conditions across 10,000+ test cycles');
          } else if (currentDirectory === '~/experience' && file === 'finra.md') {
            addTerminalOutput('# Finra\n\nPosition: Incoming Software Engineer Intern\nDuration: March 2025 - Present\nLocation: Rockville, MD');
          } else if (currentDirectory === '~/experience' && file === 'american_university.md') {
            addTerminalOutput('# American University\n\nPosition: Data Science Research Assistant\nDuration: January 2024 - September 2024\nLocation: Washington, DC\n\n## Responsibilities\n\n- Achieved 97% accuracy in predictive modeling using Python, TensorFlow, and scikit-learn\n- Created and deployed a REST API using Spring Boot and PostgreSQL\n- Developed efficient data cleaning script in Python');
          } else {
            addTerminalOutput(`cat: ${file}: No such file or directory`);
          }
        } else {
          addTerminalOutput('cat: missing file operand');
        }
        break;
        
      case 'man':
        if (parts.length > 1 && parts[1] === 'help') {
          addTerminalOutput('Available Commands:\n\n  about_me       - View information about me\n  projects       - Browse my projects\n  experience     - View my work experience\n  skills         - See my skills\n  education      - View my education\n  contact        - Get my contact information\n\nYou can also click commands above!');
        } else {
          addTerminalOutput(`man: no manual entry for ${parts[1] || 'command'}`);
        }
        break;
        
      case 'clear':
        setTerminalHistory([]);
        break;
        
      case 'about_me':
        setActiveSection('about_me');
        setCurrentDirectory('~/about_me');
        addTerminalOutput('Navigating to About Me...');
        break;
        
      case 'projects':
        setActiveSection('projects');
        setCurrentDirectory('~/projects');
        addTerminalOutput('Navigating to Projects...');
        break;
        
      case 'experience':
        setActiveSection('experience');
        setCurrentDirectory('~/experience');
        addTerminalOutput('Navigating to Experience...');
        break;
        
      case 'skills':
        setActiveSection('skills');
        setCurrentDirectory('~/skills');
        addTerminalOutput('Navigating to Skills...');
        break;
        
      case 'education':
        setActiveSection('education');
        setCurrentDirectory('~/education');
        addTerminalOutput('Navigating to Education...');
        break;
        
      case 'contact':
        setActiveSection('contact');
        setCurrentDirectory('~/contact');
        addTerminalOutput('Navigating to Contact...');
        break;
        
      default:
        addTerminalOutput(`${cmd}: command not found`);
    }
  };

  // Navigation buttons that appear inside terminal
  const NavBar = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-4 border border-terminal-gray p-2 rounded">
      {[
        { id: 'about_me', label: 'About Me' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'education', label: 'Education' },
        { id: 'contact', label: 'Contact' }
      ].map(item => (
        <button
          key={item.id}
          onClick={() => processCommand(item.id)}
          className={`px-4 py-2 rounded-md border border-gray-700 ${
            activeSection === item.id 
              ? 'bg-terminal-darkGray text-terminal-green' 
              : 'bg-terminal-black hover:bg-terminal-darkGray text-white'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  // Project data
  const projects = [
    {
      id: 'memory_encapsulation_filesystem',
      title: 'Multimedia Embedded Memory Encapsulation Filesystem',
      description: 'Engineered a complete read/write FAT-based filesystem in user space using the FUSE library, simulating a 128 KiB virtual disk image with superblocks, directory entries, and a File Allocation Table.',
      technologies: ['C', 'FUSE', 'Linux Kernel', 'Filesystem'],
      metrics: [
        'Reduced metadata overhead by 32% compared to standard FAT implementations',
        'Decreased file operation latency by 28% through optimized block allocation',
        'Ensured 99.9% data integrity during concurrent operations'
      ],
      demoUrl: 'https://github.com/rodriguezzfabricio/memefs',
      demoType: 'github',
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      videoDuration: "2:05",
      screenGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODhiMzVtcDN3MTVobmJmZWY2bjZ2Mm0zbnJrZ3FneXJ0d3ZmNXVxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif',
      deploymentPlatform: 'GitHub',
      screenshots: [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODhiMzVtcDN3MTVobmJmZWY2bjZ2Mm0zbnJrZ3FneXJ0d3ZmNXVxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDVkZ3FraWM5aXFkc2Y1eWJ3eTZhN2FwcXB0ZDc2dDFidDFpZDB3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2gxcHZkdTVqZGI0eWdwcnB2aGR2ZmY2NWtwMnlyaTgxdXNwZHBzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYNdaWCQGYELXIk/giphy.gif'
      ]
    },
    {
      id: 'shell_implementation',
      title: 'Shell Implementation',
      description: 'Built a Unix-like shell from scratch, implementing core commands like cd, pwd, and type for file system navigation.',
      technologies: ['C++', 'Filesystem', 'POSIX'],
      metrics: ['Handled 10k operations/sec on large filesystem images', 'Reduced command latency by 35%', 'Memory footprint < 4MB'],
      demoUrl: 'https://github.com/rodriguezzfabricio/shell-implementation',
      demoType: 'github', // 'github', 'video', 'live'
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      videoDuration: "1:24",
      screenGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHg4eWo2NzMyMjE1OGRmMDlzZm41ZnB0c2JsMHA3NXk3cHV1OXVpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/077i6AULCXc0FKTj9s/giphy.gif',
      deploymentPlatform: 'GitHub',
      screenshots: [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHg4eWo2NzMyMjE1OGRmMDlzZm41ZnB0c2JsMHA3NXk3cHV1OXVpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/077i6AULCXc0FKTj9s/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTlhZnlnejgyZHZ6Y2FjN2ZmaDlsaHZhMjY0ZHFlcjliMG0wZTR0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lP8xu5t2DLGG045H8F/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnptaGJqb3gwNXA5ZWgwaWN2MnJrNnQ5cTZvY25kdzRzdDU5NnNueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZSZTGDgYkpJslGVPIL/giphy-downsized-large.gif'
      ]
    },
    {
      id: 'retriever_study',
      title: 'Retriever Study',
      description: 'Designed an online platform connecting students for study groups with Spring Boot backend and React interface.',
      technologies: ['Java', 'Spring Boot', 'MongoDB', 'React', 'Google Calendar API'],
      metrics: ['Improved student team formation by 45%', 'Served 100+ active users', 'Reduced scheduling conflicts by 85%'],
      demoUrl: 'https://retriever-study.netlify.app',
      demoType: 'live',
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      videoDuration: "2:15",
      screenGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXE2MzJxaTB3N2IwamZtMDBjNTI5dnJoeGozMjR6bjlzN2ZjanhwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs83TElTW06IwxeU/giphy.gif',
      deploymentPlatform: 'Netlify',
      screenshots: [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXE2MzJxaTB3N2IwamZtMDBjNTI5dnJoeGozMjR6bjlzN2ZjanhwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs83TElTW06IwxeU/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanhtNmJla25rZnY0eWF5bjhucG9rMHV6c3ZxcXY3a2ZveXRqMXRpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/B4dt6rXq6nABilHTYM/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTY5bnptY200NDl0aWphNnl2Z2V1MTF0eXMzN29zb3BnNjliaDB4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/khjLDdK2TnhJC91Xxu/giphy.gif'
      ]
    },
    {
      id: 'kernel_cpu_scheduler',
      title: 'Kernel-Level CPU Scheduler',
      description: 'Implemented a custom CPU scheduler as a Linux kernel module with syscalls for task creation and resource management.',
      technologies: ['C', 'Linux Kernel', 'Multithreading'],
      metrics: [
        'Reduced context switching overhead by 25% through efficient priority queue implementation',
        'Improved throughput by 15%',
        'Achieved 99.8% thread safety with zero race conditions across 10,000+ test cycles'
      ],
      demoUrl: 'https://github.com/rodriguezzfabricio/kernel-scheduler',
      demoType: 'github',
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      videoDuration: "1:45",
      screenGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHZ5b2lsYm1kNWJ2dXN1MTcxeno2YnNsMnIyOWE3NGF3MDBxejQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gR0YFZxWbnUPtMA/giphy.gif',
      deploymentPlatform: 'GitHub',
      screenshots: [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHZ5b2lsYm1kNWJ2dXN1MTcxeno2YnNsMnIyOWE3NGF3MDBxejQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gR0YFZxWbnUPtMA/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFkbW1yd3BrdDQyaXUyeHgwamtuZG41OTNtcWl5ODZ0MGNldXd0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KbXLGsxLUXyHQLbYpW/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGpxZng5aWt5Y2x6aXY5OXM2dHRoZ3F0YW4ydGZzanhqdjE5aG05eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvQIqJyNBOCjK/giphy.gif'
      ]
    }
  ];

  // Helper function to get icons for technologies
  const getTechIcon = (tech) => {
    const lowerTech = tech.toLowerCase();
    
    // Return ASCII/text icons for different technologies
    if (lowerTech.includes('react')) return '⚛️ ';
    if (lowerTech.includes('node')) return '📦 ';
    if (lowerTech.includes('javascript')) return '𝙅𝙎 ';
    if (lowerTech.includes('typescript')) return '𝙏𝙎 ';
    if (lowerTech.includes('python')) return '🐍 ';
    if (lowerTech.includes('c++')) return '⊕ ';
    if (lowerTech.includes('c#')) return '# ';
    if (lowerTech.includes('java')) return '☕ ';
    if (lowerTech.includes('ruby')) return '💎 ';
    if (lowerTech.includes('php')) return '🐘 ';
    if (lowerTech.includes('html')) return '🌐 ';
    if (lowerTech.includes('css')) return '🎨 ';
    if (lowerTech.includes('git')) return '📂 ';
    if (lowerTech.includes('docker')) return '🐳 ';
    if (lowerTech.includes('aws')) return '☁️ ';
    if (lowerTech.includes('mongo')) return '🍃 ';
    if (lowerTech.includes('sql')) return '💾 ';
    if (lowerTech.includes('graphql')) return '◯ ';
    if (lowerTech.includes('redux')) return '↻ ';
    if (lowerTech.includes('next')) return '▲ ';
    if (lowerTech.includes('vue')) return '🟢 ';
    if (lowerTech.includes('angular')) return '🅰️ ';
    if (lowerTech.includes('firebase')) return '🔥 ';
    if (lowerTech.includes('bash')) return '$ ';
    if (lowerTech.includes('shell')) return '> ';
    
    // Default icon for other technologies
    return '• ';
  };

  // Project card component
  const ProjectCard = ({ project, onClick }) => (
    <div 
      className="bg-terminal-darkGray p-3 rounded-md cursor-pointer hover:bg-terminal-darkGray/80 transition-colors duration-200"
      onClick={onClick}
    >
      <h4 className="text-lg text-terminal-green">{project.title}</h4>
      <p className="text-sm text-gray-300 mt-1 mb-2">{project.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {project.technologies.map(tech => (
          <span key={tech} className="bg-terminal-black px-2 py-1 text-xs rounded-md text-gray-300 flex items-center">
            {getTechIcon(tech)}
            <span className="ml-1">{tech}</span>
          </span>
        ))}
      </div>
      
      <div className="text-xs text-gray-400 mb-3 bg-terminal-black/50 p-2 rounded border border-terminal-gray/30">
        <div className="flex items-center">
          <span className="text-terminal-green text-xs mr-1">→</span>
          <span>{project.metrics[0]}</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3 text-sm">
        <a 
          href={project.demoUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-terminal-green hover:underline cursor-pointer px-2 py-1 bg-terminal-black/50 rounded"
          onClick={(e) => e.stopPropagation()}
        >
          [{project.demoType === 'live' ? 'Live Demo' : 'Code'}]
        </a>
        {project.videoUrl && (
          <a 
            href={project.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-terminal-green hover:underline cursor-pointer px-2 py-1 bg-terminal-black/50 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            [Video {project.videoDuration}]
          </a>
        )}
        <span 
          className="text-terminal-green hover:underline cursor-pointer px-2 py-1 bg-terminal-black/50 rounded"
        >
          [Details]
        </span>
      </div>
      
      {project.demoType === 'live' && (
        <div className="mt-4 pt-3 border-t border-terminal-gray/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Deployed on {project.deploymentPlatform}</span>
            <span className="text-terminal-green">Click card for details</span>
          </div>
        </div>
      )}
    </div>
  );

  // Project detail modal component
  const ProjectDetail = ({ project, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Define available tabs
    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'demo', label: project.demoType === 'live' ? 'Live Demo' : 'Code Preview' },
      { id: 'metrics', label: 'Metrics' },
    ];
    
    if (project.videoUrl) {
      tabs.push({ id: 'video', label: 'Video' });
    }
    
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
        <div 
          className="bg-terminal-black border border-terminal-gray w-full max-w-4xl max-h-[90vh] overflow-auto rounded-md shadow-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-terminal-green font-mono">
              $ cat ./projects/{project.title.toLowerCase().replace(/\s+/g, '-')}
            </h3>
            <button 
              onClick={onClose}
              className="text-terminal-gray hover:text-white"
            >
              [X]
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex space-x-1 border-b border-terminal-gray/30 mb-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`px-3 py-1 text-sm rounded-t-md ${
                    activeTab === tab.id 
                      ? 'bg-terminal-darkGray text-terminal-green' 
                      : 'text-terminal-gray hover:text-terminal-green'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-terminal-green mb-2">Description</h4>
                  <p className="text-gray-300">{project.description}</p>
                </div>
                
                {project.screenGif && (
                  <div className="my-4 bg-terminal-darkGray p-1 rounded-md">
                    <img 
                      src={project.screenGif} 
                      alt={`${project.title} demo`} 
                      className="w-full max-h-64 object-contain rounded"
                    />
                    <p className="text-xs text-center text-gray-400 mt-1">Demo Preview</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-terminal-green mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="bg-terminal-darkGray px-3 py-1 rounded-md text-gray-300 flex items-center"
                      >
                        {getTechIcon(tech)}
                        <span className="ml-1">{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Demo Tab */}
            {activeTab === 'demo' && (
              <div className="space-y-4">
                {project.demoType === 'live' ? (
                  <div>
                    <h4 className="text-terminal-green mb-2">Live Demo</h4>
                    <div className="bg-terminal-darkGray p-1 rounded-md">
                      <iframe 
                        src={project.demoUrl}
                        title={`${project.title} demo`}
                        className="w-full h-96 border-0 rounded"
                        loading="lazy"
                      ></iframe>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      <p>If the embedded demo doesn't load correctly, you can 
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-terminal-green ml-1 hover:underline"
                        >
                          visit the demo directly
                        </a>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-terminal-green mb-2">Code Preview</h4>
                    <div className="bg-terminal-darkGray p-1 rounded-md">
                      <p className="text-gray-300 mb-4">
                        The source code for this project is available on GitHub. Click the button below to view it.
                      </p>
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-terminal-green text-terminal-black px-4 py-2 rounded inline-block hover:bg-terminal-green/80"
                      >
                        View Code Repository
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <h4 className="text-terminal-green mb-2">Project Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.metrics.map((metric, index) => (
                    <div 
                      key={index} 
                      className="bg-terminal-darkGray p-3 rounded-md border border-terminal-gray/30"
                    >
                      <div className="flex items-start">
                        <span className="text-terminal-green text-lg mr-2">→</span>
                        <span className="text-gray-300">{metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Video Tab */}
            {activeTab === 'video' && project.videoUrl && (
              <div className="space-y-4">
                <h4 className="text-terminal-green mb-2">Video Walkthrough ({project.videoDuration})</h4>
                <div className="bg-terminal-darkGray p-1 rounded-md">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src={project.videoUrl}
                      title={`${project.title} video walkthrough`}
                      className="w-full h-96 border-0 rounded"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-4 pt-3 border-t border-terminal-gray/30">
            <div className="text-sm text-gray-400">
              
            </div>
            <div className="flex space-x-3 text-sm">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.demoType === 'live' ? '[Open Demo]' : '[View Code]'}
                </a>
              )}
              {project.videoUrl && (
                <a 
                  href={project.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-terminal-green hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  [Watch Video]
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Projects section render function
  const renderProjects = () => {
    if (activeProject) {
      return <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />;
    }

    return (
      <div>
        <h2 className="text-xl font-bold text-terminal-green mb-4">$ ls -la ~/projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} onClick={() => setActiveProject(project)} />
          ))}
        </div>
      </div>
    );
  };

  // Content to display based on active section (outside the terminal history)
  const renderSectionContent = () => {
    switch(activeSection) {
      case 'about_me':
        return (
          <div className="mt-4 p-4 bg-terminal-darkGray/30 rounded-md border border-terminal-gray">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="https://rodriguezzfabricio.github.io/unix-like-personal-portfolio/assets/images/profile.jpg" 
                  alt="Fabricio Rodriguez"
                  className="w-48 h-48 rounded-full border-4 border-terminal-green shadow-lg object-cover" 
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-terminal-green mb-2">About Me</h3>
                <p className="text-gray-300 mb-2">
                  Computer Science student at UMBC with expertise spanning systems programming and full-stack development. My technical portfolio includes kernel-level CPU schedulers and custom Unix shells, as well as responsive web applications using React and Spring Boot.
                </p>
                <p className="text-gray-300 mb-2">
                  I specialize in developing efficient solutions across the entire software stack—from low-level C/C++ implementations to intuitive user interfaces. Currently preparing for my upcoming role at Finra, I continue to refine my skills in creating robust, performance-optimized applications.
                </p>
                <p className="text-gray-300">
                  Driven by technical challenges and committed to excellence in software engineering, I aim to develop innovative solutions that make a meaningful impact.
                </p>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return renderProjects();
      case 'experience':
        return (
          <div className="mt-4 p-4 bg-terminal-darkGray/30 rounded-md border border-terminal-gray">
            <h3 className="text-xl font-bold text-terminal-green mb-2">Experience</h3>
            <div className="space-y-4">
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-between">
                  <h4 className="text-lg text-terminal-green">Incoming Software Engineer Intern | Finra</h4>
                  <span className="text-gray-400">March 2025 - Present</span>
                </div>
                <p className="text-gray-300 mt-1">Rockville, MD</p>
              </div>
              
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-between">
                  <h4 className="text-lg text-terminal-green">Data Science Research Assistant | American University</h4>
                  <span className="text-gray-400">January 2024 - September 2024</span>
                </div>
                <p className="text-gray-300 mt-1">Washington, DC</p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                  <li>Achieved 97% accuracy in predictive modeling by developing a Machine Learning model using Python, TensorFlow, and scikit-learn</li>
                  <li>Created and deployed a REST API using Spring Boot and PostgreSQL to provide real-time data access for team analysis</li>
                  <li>Developed an efficient data cleaning script in Python, improving ML model training time</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="mt-4 p-4 bg-terminal-darkGray/30 rounded-md border border-terminal-gray">
            <h3 className="text-xl font-bold text-terminal-green mb-2">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <h4 className="text-terminal-green border-b border-terminal-gray pb-1 mb-2">Languages</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Python</span>
                      <span className="text-terminal-green">90%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">C/C++</span>
                      <span className="text-terminal-green">85%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Java</span>
                      <span className="text-terminal-green">80%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">JavaScript/TypeScript</span>
                      <span className="text-terminal-green">75%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <h4 className="text-terminal-green border-b border-terminal-gray pb-1 mb-2">Frameworks & Tools</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">React</span>
                      <span className="text-terminal-green">80%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Spring Boot</span>
                      <span className="text-terminal-green">75%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Docker/Git</span>
                      <span className="text-terminal-green">85%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">TensorFlow/scikit-learn</span>
                      <span className="text-terminal-green">80%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <h4 className="text-terminal-green border-b border-terminal-gray pb-1 mb-2">Databases</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">MongoDB</span>
                      <span className="text-terminal-green">80%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">PostgreSQL</span>
                      <span className="text-terminal-green">75%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">MySQL</span>
                      <span className="text-terminal-green">70%</span>
                    </div>
                    <div className="w-full bg-terminal-black rounded-full h-1.5">
                      <div className="bg-terminal-green h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <h4 className="text-terminal-green border-b border-terminal-gray pb-1 mb-2">Other</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Node.js', 'Flask', 'AWS', 'Django', 'Agile', 'Unix/Linux', 'VS Code', 'PyCharm', 'pandas', 'NumPy', 'Matplotlib'].map(skill => (
                    <span key={skill} className="bg-terminal-black px-2 py-1 text-xs rounded-md text-gray-300">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="mt-4 p-4 bg-terminal-darkGray/30 rounded-md border border-terminal-gray">
            <h3 className="text-xl font-bold text-terminal-green mb-2">Education</h3>
            <div className="space-y-4">
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-between">
                  <h4 className="text-lg text-terminal-green">University of Maryland Baltimore County</h4>
                  <span className="text-gray-400">August 2022 - May 2026</span>
                </div>
                <p className="text-gray-300">Bachelor of Science in Computer Science</p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                  <p>GPA: 3.7/4.0</p>
                  <li>Baltimore, MD</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="mt-4 p-4 bg-terminal-darkGray/30 rounded-md border border-terminal-gray">
            <h3 className="text-xl font-bold text-terminal-green mb-2">Contact</h3>
            <div className="space-y-4">
              <div className="bg-terminal-darkGray p-3 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-terminal-green mb-1">Email</h4>
                    <a href="mailto:frodrig3@umbc.edu" className="text-gray-300 hover:text-terminal-green">frodrig3@umbc.edu</a>
                  </div>
                  <div>
                    <h4 className="text-terminal-green mb-1">LinkedIn</h4>
                    <a href="https://linkedin.com/in/fabricio-rodriguez-816676255" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-terminal-green">linkedin.com/in/fabricio-rodriguez-816676255</a>
                  </div>
                  <div>
                    <h4 className="text-terminal-green mb-1">GitHub</h4>
                    <a href="https://github.com/rodriguezzfabricio" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-terminal-green">github.com/rodriguezzfabricio</a>
                  </div>
                  <div>
                    <h4 className="text-terminal-green mb-1">Location</h4>
                    <p className="text-gray-300">Baltimore, MD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-terminal-black p-4 font-mono text-white">
      <div className="max-w-6xl mx-auto border border-terminal-gray rounded-md p-4 bg-terminal-black/95 min-h-[80vh]">
        <div className="text-xl mb-2">fabricio@portfolio:~$ ls</div>
        
        {/* Terminal navigation buttons */}
        <NavBar />
        
        {/* Terminal history */}
        <div className="terminal-history overflow-y-auto max-h-[60vh]">
          {terminalHistory.map((entry, i) => (
            <div key={i} className="mb-1">
              {entry.type === 'input' ? (
                <div className="flex">
                  <span className="text-terminal-green">fabricio@portfolio:{entry.directory || currentDirectory}$&nbsp;</span>
                  <span className="text-white">{entry.text}</span>
                </div>
              ) : (
                <div className="text-gray-300 whitespace-pre-wrap ml-4">{entry.text}</div>
              )}
            </div>
          ))}
        </div>
        
        {/* Optional section content */}
        {renderSectionContent()}
        
        {/* Current terminal prompt */}
        <form onSubmit={handleTerminalSubmit} className="flex mt-4">
          <span className="text-terminal-green">fabricio@portfolio:{currentDirectory}$&nbsp;</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="bg-transparent border-none flex-grow text-white outline-none"
            autoFocus
          />
        </form>
        
        {/* Terminal footer */}
        <div className="mt-8 text-sm text-gray-500 border-t border-terminal-gray pt-2">
          <p>Type 'man help' for available commands</p>
        </div>
      </div>
    </div>
  );
}

export default App; 