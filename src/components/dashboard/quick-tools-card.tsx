'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

interface ToolItem {
  title: string;
  icon: string; // SVG path string
  href: string;
}

interface QuickToolsCardProps {
  title: string;
  icon: React.ReactNode;
  tools: ToolItem[];
  viewAllHref: string;
  animationDelay?: number;
}

const QuickToolsCard: React.FC<QuickToolsCardProps> = ({ 
  title, 
  icon, 
  tools, 
  viewAllHref, 
  animationDelay = 0
}) => {
  const { themeClasses } = useTheme();

  return (
    <FadeInWhenVisible delay={animationDelay}>
      <div className={`relative overflow-hidden group rounded-xl ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.border} shadow-lg transition-all duration-300 hover:shadow-xl ${themeClasses.hoverBorder}`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-5">
            <div className={`p-2 rounded-lg ${themeClasses.primary} transform transition-transform duration-300 group-hover:scale-110`}>
              {icon}
            </div>
            <h2 className={`text-lg ${themeClasses.heading} ${themeClasses.text}`}>{title}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool, i) => (
              <a 
                key={i} 
                href={tool.href}
                className={`${themeClasses.bg} hover:bg-[hsl(var(--primary)_/_0.1)] border ${themeClasses.border} ${themeClasses.hoverBorder} rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <svg className={`h-8 w-8 ${themeClasses.primaryText} mb-2 transition-transform duration-300 group-hover:scale-110`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                </svg>
                <span className={`text-sm ${themeClasses.uiLabel} ${themeClasses.text} text-center`}>{tool.title}</span>
              </a>
            ))}
          </div>
          
          <a href={viewAllHref} className={`block w-full mt-5 py-2.5 text-center text-sm ${themeClasses.uiLabel} ${themeClasses.primaryText} ${themeClasses.hoverText} transition-colors duration-300`}>
            Visa alla verktyg
          </a>
        </div>
      </div>
    </FadeInWhenVisible>
  );
};

export default QuickToolsCard;