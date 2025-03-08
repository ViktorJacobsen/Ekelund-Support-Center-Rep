'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { DocumentMetadata, DocumentContent, DocumentsDB } from '@/lib/offline/document-db';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

interface DocumentViewerProps {
  documentId: string;
  onClose?: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentId,
  onClose
}) => {
  const { themeClasses } = useTheme();
  
  const [document, setDocument] = useState<DocumentMetadata | null>(null);
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ladda dokumentet när komponenten monteras
  useEffect(() => {
    loadDocument();
  }, [documentId]);
  
  // Ladda dokumentmetadata och innehåll
  const loadDocument = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Hämta dokumentmetadata
      const metadata = await DocumentsDB.getDocumentMetadata(documentId);
      
      if (!metadata) {
        throw new Error(`Document with ID ${documentId} not found`);
      }
      
      setDocument(metadata);
      
      // Öka visningsräknaren
      await DocumentsDB.viewDocument(documentId);
      
      // Hämta dokumentinnehåll
      const documentContent = await DocumentsDB.getDocumentContent(documentId);
      
      if (documentContent) {
        setContent(documentContent.content);
      }
    } catch (error) {
      console.error('Error loading document:', error);
      setError('Kunde inte ladda dokumentet. Försök igen senare.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Formatera datum
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Okänt datum';
    return new Date(date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Konvertera bytes till läsbart format
  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'Okänd storlek';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };
  
  // Visa innehållet baserat på dokumenttyp
  const renderContent = () => {
    if (!content) {
      return (
        <div className={`p-8 text-center ${themeClasses.mutedText}`}>
          <p>Inget innehåll tillgängligt för detta dokument.</p>
        </div>
      );
    }
    
    if (document?.type === 'pdf' || (document?.fileType && document.fileType.includes('pdf'))) {
      // För PDF visar vi PDF-visare eller nedladdningslänk
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <svg className="w-16 h-16 mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11h-6a1 1 0 00-1 1v5a1 1 0 001 1h6a1 1 0 001-1v-5a1 1 0 00-1-1z" />
          </svg>
          <p className={`${themeClasses.bodyText} ${themeClasses.text} mb-4`}>PDF-dokument</p>
          
          <div className="flex space-x-4">
            <button className={`px-4 py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Ladda ner</span>
            </button>
            
            <button className={`px-4 py-2 ${themeClasses.secondary} ${themeClasses.secondaryText} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Visa</span>
            </button>
          </div>
        </div>
      );
    }
    
    // För textbaserade dokument
    if (typeof content === 'string') {
      if (document?.type === 'guide' || document?.type === 'manual') {
        // Markdown eller HTML-innehåll
        return (
          <div className={`p-6 prose dark:prose-invert max-w-none ${themeClasses.bodyText} ${themeClasses.text}`}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      }
      
      // Vanligt textinnehåll
      return (
        <div className={`p-6 ${themeClasses.bodyText} ${themeClasses.text} whitespace-pre-wrap`}>
          {content}
        </div>
      );
    }
    
    // För binära dokument som vi inte kan visa
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <svg className="w-16 h-16 mb-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className={`${themeClasses.bodyText} ${themeClasses.text} mb-4`}>Det här dokumentet kan inte visas i webbläsaren.</p>
        
        <button className={`px-4 py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Ladda ner</span>
        </button>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className={`rounded-xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-lg p-6 animate-pulse`}>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }
  
  if (error || !document) {
    return (
      <div className={`rounded-xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-lg p-6`}>
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <svg className="w-16 h-16 mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Fel vid inläsning</h3>
          <p className={`${themeClasses.bodyText} ${themeClasses.mutedText} mb-6`}>{error || 'Dokumentet kunde inte hittas.'}</p>
          
          {onClose && (
            <button
              onClick={onClose}
              className={`px-4 py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200`}
            >
              Tillbaka
            </button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <FadeInWhenVisible>
      <div className={`rounded-xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-lg overflow-hidden`}>
        {/* Header med dokumentinfo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-2xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>{document.title}</h2>
              {document.description && (
                <p className={`${themeClasses.bodyText} ${themeClasses.mutedText} mb-4`}>{document.description}</p>
              )}
              
              <div className="flex flex-wrap gap-1 mb-4">
                {document.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.primaryText}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {onClose && (
              <button
                onClick={onClose}
                className={`p-2 ${themeClasses.mutedText} hover:${themeClasses.text} rounded-full transition-colors duration-200`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
            <div className={`${themeClasses.mutedText}`}>
              <span className="font-medium">Typ:</span> {document.type === 'pdf' ? 'PDF' : 
                                                        document.type === 'manual' ? 'Manual' : 
                                                        document.type === 'guide' ? 'Guide' : 
                                                        document.type === 'datasheet' ? 'Datablad' : 
                                                        document.type === 'installation' ? 'Installation' : 'Dokument'}
            </div>
            <div className={`${themeClasses.mutedText}`}>
              <span className="font-medium">Datum:</span> {formatDate(document.updatedAt)}
            </div>
            {document.fileSize && (
              <div className={`${themeClasses.mutedText}`}>
                <span className="font-medium">Storlek:</span> {formatFileSize(document.fileSize)}
              </div>
            )}
            <div className={`${themeClasses.mutedText}`}>
              <span className="font-medium">Visningar:</span> {document.views}
            </div>
          </div>
        </div>
        
        {/* Dokument innehåll */}
        <div className={`bg-white dark:bg-gray-800 overflow-auto max-h-screen`}>
          {renderContent()}
        </div>
      </div>
    </FadeInWhenVisible>
  );
};

export default DocumentViewer;