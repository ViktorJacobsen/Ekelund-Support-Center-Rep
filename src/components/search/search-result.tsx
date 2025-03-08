'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { Document } from '@/lib/offline/dexie-db';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

interface SearchResultsProps {
  results: {
    documents: Document[];
    totalResults: number;
    tags: string[];
  };
  isLoading?: boolean;
  onTagClick?: (tag: string) => void;
  onDocumentClick?: (document: Document) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading = false,
  onTagClick,
  onDocumentClick
}) => {
  const { themeClasses } = useTheme();
  
  // Om det inte finns några resultat eller vi laddar
  if (isLoading) {
    return (
      <div className="w-full py-10 text-center">
        <div className={`${themeClasses.primary} h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse`}>
          <svg className={`h-8 w-8 ${themeClasses.primaryFg}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Söker...</h2>
        <p className={`${themeClasses.bodyText} ${themeClasses.mutedText}`}>Hämtar dokument som matchar din sökning</p>
      </div>
    );
  }
  
  // Om det inte finns några resultat
  if (results.documents.length === 0) {
    return (
      <div className="w-full py-10 text-center">
        <div className={`${themeClasses.secondary} h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <svg className={`h-8 w-8 ${themeClasses.mutedText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Inga resultat hittades</h2>
        <p className={`${themeClasses.bodyText} ${themeClasses.mutedText} mb-6`}>Prova att söka med andra sökord eller taggar</p>
        
        {results.tags.length > 0 && (
          <div>
            <h3 className={`text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-3`}>Föreslagna taggar:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {results.tags.map((tag, i) => (
                <button 
                  key={i}
                  onClick={() => onTagClick?.(tag)}
                  className={`px-3 py-1 bg-[hsl(var(--primary)_/_0.1)] hover:bg-[hsl(var(--primary)_/_0.2)] rounded-full text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} hover:${themeClasses.text} transition-all duration-300`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Visa resultat
  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`${themeClasses.heading} ${themeClasses.text}`}>
          Sökresultat <span className={`${themeClasses.mutedText} text-sm font-normal`}>({results.totalResults} träffar)</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.documents.map((doc, index) => (
          <FadeInWhenVisible key={doc.id} delay={index * 0.05} duration={0.3}>
            <div 
              onClick={() => onDocumentClick?.(doc)}
              className={`${themeClasses.cardBg} border ${themeClasses.border} ${themeClasses.hoverBorder} rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${themeClasses.primary} mr-4 shrink-0`}>
                  <svg className={`h-5 w-5 ${themeClasses.primaryFg}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {doc.type === 'pdf' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    ) : doc.type === 'manual' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className={`${themeClasses.subheading} ${themeClasses.text} mb-1`}>{doc.title}</h3>
                  <div className="flex items-center mb-3">
                    <span className={`text-xs ${themeClasses.mutedText} mr-2 capitalize`}>{doc.type}</span>
                    <span className="text-xs text-gray-400 mx-1">•</span>
                    <span className={`text-xs ${themeClasses.mutedText}`}>
                      {new Date(doc.updatedAt).toLocaleDateString('sv-SE')}
                    </span>
                  </div>
                  
                  {/* Taggar */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.slice(0, 3).map((tag, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTagClick?.(tag);
                        }}
                        className={`px-2 py-1 rounded-md bg-[hsl(var(--primary)_/_0.1)] text-xs ${themeClasses.primaryText} hover:bg-[hsl(var(--primary)_/_0.2)] transition-colors duration-200`}
                      >
                        {tag}
                      </button>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className={`px-2 py-1 rounded-md text-xs ${themeClasses.mutedText} bg-[hsl(var(--muted))]`}>
                        +{doc.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;