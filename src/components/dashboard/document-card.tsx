'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

interface DocumentItem {
  title: string;
  type: string;
  date: string;
}

interface DocumentCardProps {
  title: string;
  icon: React.ReactNode;
  documents: DocumentItem[];
  viewAllHref: string;
  animationDelay?: number;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ 
  title, 
  icon, 
  documents, 
  viewAllHref, 
  animationDelay = 0
}) => {
  const { themeClasses } = useTheme();

  // Funktion för att få rätt ikon baserat på dokumenttyp
  const getTypeIcon = (type: string) => {
    if (type === 'PDF') return '📄';
    if (type === 'XML') return '⚙️';
    return '📝';
  };

  return (
    <FadeInWhenVisible delay={animationDelay}>
      <div className={`relative overflow-hidden group rounded-xl ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.border} shadow-lg transition-all duration-300 hover:shadow-xl ${themeClasses.hoverBorder}`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-5">
            <div className={`p-2 rounded-lg ${themeClasses.primaryGradient} transform transition-transform duration-300 group-hover:scale-110`}>
              {icon}
            </div>
            <h2 className={`text-lg ${themeClasses.heading} ${themeClasses.text}`}>{title}</h2>
          </div>
          
          <div className="space-y-4">
            {documents.map((doc, i) => (
              <div key={i} 
                className={`flex items-center justify-between p-4 rounded-lg ${themeClasses.bg} border ${themeClasses.border} ${themeClasses.hoverBorder} group/item cursor-pointer transition-all duration-300 hover:translate-x-1`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`${themeClasses.primaryText} text-xl transition-transform duration-300 group-hover/item:scale-110`}>
                    {getTypeIcon(doc.type)}
                  </span>
                  <div>
                    <p className={`text-sm ${themeClasses.uiLabel} ${themeClasses.text} group-hover/item:${themeClasses.primaryText} transition-colors duration-300`}>{doc.title}</p>
                    <p className={`text-xs ${themeClasses.mutedText}`}>{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <svg className={`h-5 w-5 ${themeClasses.primaryText} opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-x-0 group-hover/item:translate-x-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
          
          <a href={viewAllHref} className={`block w-full mt-5 py-2.5 text-center text-sm ${themeClasses.uiLabel} ${themeClasses.primaryText} ${themeClasses.hoverText} transition-colors duration-300`}>
            Visa alla dokument
          </a>
        </div>
      </div>
    </FadeInWhenVisible>
  );
};

export default DocumentCard;