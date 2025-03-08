'use client';

import React, { useState } from 'react';
import { useTheme } from '@/styles/theme/theme-context';

interface SearchProps {
  placeholder?: string;
  tags?: string[];
  onSearch?: (query: string) => void;
}

export default function Search({ 
  placeholder = "Sök efter dokumentation, guider eller verktyg...",
  tags = ["Installation", "Felsökning", "Konfiguration", "Manualer"],
  onSearch 
}: SearchProps) {
  const { themeClasses } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    if (onSearch) {
      onSearch(tag);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className={`${themeClasses.displayMedium} ${themeClasses.text} mb-5 transition-all duration-500 ease-in-out transform hover:scale-105`}>
        Hitta information du behöver
      </h1>
      <p className={`${themeClasses.bodyText} ${themeClasses.mutedText} mb-10 text-lg max-w-2xl mx-auto`}>
        Sök i manualer, how-to guider och dokument i Ekelund Support Center
      </p>
      
      <form onSubmit={handleSearch}>
        <div className="relative max-w-2xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
          <input 
            type="text" 
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} ${themeClasses.hoverBorder} focus:border-[hsl(var(--primary))] rounded-xl ${themeClasses.text} text-lg placeholder:${themeClasses.mutedText}/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)] transition-all duration-300`}
          />
          <button type="submit" className="absolute left-4 top-4 bg-transparent border-none">
            <svg className={`h-6 w-6 ${themeClasses.primaryText} transition-transform duration-300 transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {tags.map((tag, i) => (
          <button 
            key={i}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-1.5 bg-[hsl(var(--primary)_/_0.1)] hover:bg-[hsl(var(--primary)_/_0.2)] rounded-full text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} hover:${themeClasses.text} transition-all duration-300 hover:scale-105 hover:shadow-md`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}