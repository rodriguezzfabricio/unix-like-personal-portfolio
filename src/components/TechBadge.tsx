import React from 'react';

interface TechBadgeProps {
  tech: string;
  className?: string;
}

function TechBadge({ tech, className = '' }: TechBadgeProps) {
  // Get tech icon
  const getTechIcon = (tech: string): string => {
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
    if (lowerTech.includes('flask')) return '🧪 ';
    if (lowerTech.includes('django')) return '🎸 ';
    if (lowerTech.includes('spring')) return '🍃 ';
    if (lowerTech.includes('tailwind')) return '💨 ';
    if (lowerTech.includes('bootstrap')) return '🅱️ ';
    
    // Default icon for other technologies
    return '• ';
  };

  return (
    <span 
      className={`bg-terminal-black px-2 py-1 rounded-md text-xs text-gray-300 flex items-center ${className}`}
    >
      <span className="mr-1">{getTechIcon(tech)}</span>
      <span>{tech}</span>
    </span>
  );
}

export default TechBadge; 