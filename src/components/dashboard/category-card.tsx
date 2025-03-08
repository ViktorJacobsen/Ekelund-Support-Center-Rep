'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

interface CategoryProps {
  title: string;
  icon: string; // SVG path string
  count: number;
  href: string;
  animationDelay?: number;
}

const CategoryCard: React.FC<CategoryProps> = ({ 
  title, 
  icon, 
  count, 
  href, 
  animationDelay = 0
}) => {
  const { themeClasses } = useTheme();

  return (
    <FadeInWhenVisible delay={animationDelay}>
      <a 
        href={href}
        className={`${themeClasses.cardBg} border ${themeClasses.border} ${themeClasses.hoverBorder} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer group block`}
      >
        <div className={`mb-5 w-14 h-14 rounded-full ${themeClasses.primary} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <svg className={`h-7 w-7 ${themeClasses.primaryFg} transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <h3 className={`text-lg ${themeClasses.subheading} ${themeClasses.text} group-hover:${themeClasses.primaryText} transition-colors duration-300`}>{title}</h3>
        <p className={`text-sm ${themeClasses.mutedText} mt-1`}>{count} dokument</p>
      </a>
    </FadeInWhenVisible>
  );
};

export default CategoryCard;