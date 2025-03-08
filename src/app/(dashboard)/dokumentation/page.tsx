'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';
import { DocumentMetadata, DocumentType, DocumentsDB } from '@/lib/offline/document-db';
import DocumentViewer from '@/components/documents/document-viewer';

export default function DocumentationPage() {
  const { themeClasses } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; parentId?: string }[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedType, setSelectedType] = useState<DocumentType | ''>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  // Hämta initial dokumentparameter
  const docIdParam = searchParams?.get('id');
  
  // Omdirigera om användaren inte är inloggad
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    // Sätt selectedDocument från URL-parameter
    if (docIdParam) {
      setSelectedDocument(docIdParam);
    }
  }, [isAuthenticated, isLoading, router, docIdParam]);
  
  // Ladda data
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, selectedType, selectedCategoryId, searchTerm]);
  
  // Hämta dokument och kategorier
  const loadData = async () => {
    setIsLoadingData(true);
    
    try {
      // Hämta kategorier
      const categoriesData = await DocumentsDB.getCategories();
      setCategories(categoriesData);
      
      // Bygg upp filter för dokument
      const filter: any = {};
      
      if (selectedType) {
        filter.type = selectedType;
      }
      
      if (selectedCategoryId) {
        filter.categoryId = selectedCategoryId;
      }
      
      if (searchTerm) {
        filter.search = searchTerm.trim();
      }
      
      // Hämta dokument
      const documentsData = await DocumentsDB.getDocuments(filter);
      setDocuments(documentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };
  
  // Formatera datum
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Hantera klick på dokument
  const handleDocumentClick = (docId: string) => {
    setSelectedDocument(docId);
    
    // Uppdatera URL utan page reload
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('id', docId);
    router.push(`/dokumentation?${params.toString()}`);
  };
  
  // Stäng dokumentvisaren
  const handleCloseViewer = () => {
    setSelectedDocument(null);
    
    // Uppdatera URL utan page reload
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('id');
    router.push(`/dokumentation?${params.toString()}`);
  };
  
  // Visa laddningsindikator om vi kontrollerar autentisering
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    );
  }
  
  // Om användaren inte är autentiserad, visa ingenting (redirect hanteras av useEffect)
  if (!isAuthenticated) {
    return null;
  }
  
  // Om ett dokument är valt, visa dokumentvisaren
  if (selectedDocument) {
    return (
      <div className="container mx-auto py-8 px-4">
        <button
          onClick={handleCloseViewer}
          className={`mb-4 inline-flex items-center py-2 px-4 ${themeClasses.secondary} ${themeClasses.secondaryText} rounded-lg hover:opacity-90 transition-opacity duration-200`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Tillbaka till dokumentlistan</span>
        </button>
        
        <DocumentViewer
          documentId={selectedDocument}
          onClose={handleCloseViewer}
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className={`text-3xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Dokumentation</h1>
        <p className={`${themeClasses.bodyText} ${themeClasses.mutedText}`}>
          Bläddra och sök i vår dokumentation, manualer och guider.
        </p>
      </div>
      
      {/* Filter och sökning */}
      <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 mb-8 shadow-sm`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sökfält */}
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`}>
              Sök
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök i dokumentation..."
                className={`w-full pl-10 pr-4 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              />
              <svg 
                className={`absolute left-3 top-2.5 h-5 w-5 ${themeClasses.mutedText}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Dokumenttyp filter */}
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`}>
              Dokumenttyp
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as DocumentType | '')}
              className={`w-full px-4 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
            >
              <option value="">Alla typer</option>
              <option value="pdf">PDF</option>
              <option value="manual">Manualer</option>
              <option value="guide">Guider</option>
              <option value="datasheet">Datablad</option>
              <option value="installation">Installation</option>
              <option value="other">Övrigt</option>
            </select>
          </div>
          
          {/* Kategori filter */}
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`}>
              Kategori
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className={`w-full px-4 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
            >
              <option value="">Alla kategorier</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Dokumentlista */}
      <div className="mb-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text}`}>
            Dokument {documents.length > 0 && <span className="text-sm font-normal ml-2 text-gray-500 dark:text-gray-400">({documents.length})</span>}
          </h2>
          
          <button className={`px-4 py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nytt dokument</span>
          </button>
        </div>
        
        {isLoadingData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm animate-pulse`}>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="flex space-x-2 mb-4">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-8 shadow-sm text-center`}>
            <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className={`text-lg ${themeClasses.heading} ${themeClasses.text} mb-2`}>Inga dokument hittades</h3>
            <p className={`${themeClasses.bodyText} ${themeClasses.mutedText}`}>
              {searchTerm || selectedType || selectedCategoryId 
                ? 'Inga dokument matchar dina filterkriterier. Försök med andra inställningar.'
                : 'Det finns ännu inga dokument i systemet. Klicka på "Nytt dokument" för att lägga till ett.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <FadeInWhenVisible key={doc.id} delay={index * 0.05}>
                <div 
                  className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 hover:border-[hsl(var(--primary)_/_0.5)] h-full flex flex-col`}
                  onClick={() => handleDocumentClick(doc.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <svg className={`h-5 w-5 ${themeClasses.primaryText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {doc.type === 'pdf' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          ) : doc.type === 'manual' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          ) : doc.type === 'guide' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          )}
                        </svg>
                        <div className={`text-xs px-2 py-0.5 bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.primaryText} rounded-full`}>
                          {doc.type === 'pdf' ? 'PDF' : 
                          doc.type === 'manual' ? 'Manual' : 
                          doc.type === 'guide' ? 'Guide' : 
                          doc.type === 'datasheet' ? 'Datablad' : 
                          doc.type === 'installation' ? 'Installation' : 'Övrigt'}
                        </div>
                      </div>
                      
                      <div className={`text-xs ${themeClasses.mutedText}`}>
                        {formatDate(doc.updatedAt)}
                      </div>
                    </div>
                    
                    <h3 className={`text-lg ${themeClasses.subheading} ${themeClasses.text} mb-2 line-clamp-2`}>
                      {doc.title}
                    </h3>
                    
                    {doc.description && (
                      <p className={`text-sm ${themeClasses.bodyText} ${themeClasses.mutedText} mb-4 line-clamp-2`}>
                        {doc.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doc.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className={`inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.primaryText}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--muted))] ${themeClasses.mutedText}`}>
                          +{doc.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-between text-xs mt-auto pt-3 border-t ${themeClasses.border}`}>
                    <div className={`${themeClasses.mutedText}`}>
                      <span className={`${themeClasses.primaryText}`}>{doc.views}</span> visningar
                    </div>
                    <div className={`${themeClasses.mutedText}`}>
                      {doc.categoryName || 'Okategoriserad'}
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}