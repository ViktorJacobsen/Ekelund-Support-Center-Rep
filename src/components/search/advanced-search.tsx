'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { searcher } from '@/lib/utils/search';
import { Document, db } from '@/lib/offline/dexie-db';

interface AdvancedSearchProps {
  onSearch: (results: { documents: Document[], totalResults: number, tags: string[] }) => void;
  initialQuery?: string;
  initialTags?: string[];
  initialCategories?: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  initialQuery = '',
  initialTags = [],
  initialCategories = []
}) => {
  const { themeClasses } = useTheme();
  const [query, setQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Ladda populära taggar vid initialisering
  useEffect(() => {
    loadPopularTags();
  }, []);

  // Stäng dropdown när man klickar utanför
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ladda populära taggar
  const loadPopularTags = async () => {
    try {
      const tags = await searcher.getSuggestions('', 10);
      setPopularTags(tags);
    } catch (error) {
      console.error('Error loading popular tags:', error);
    }
  };

  // Ladda sökförslag baserat på inmatning
  const loadSuggestions = async (value: string) => {
    if (!value.trim()) {
      setSuggestions(popularTags);
      return;
    }

    try {
      const suggestions = await searcher.getSuggestions(value);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  // Hantera sökinmatningsändringar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    loadSuggestions(value);

    if (!showSuggestions) {
      setShowSuggestions(true);
    }
  };

  // Hantera val av förslag
  const handleSuggestionClick = (suggestion: string) => {
    // Om förslaget är en tag, lägg till i valda taggar
    if (!selectedTags.includes(suggestion)) {
      const newTags = [...selectedTags, suggestion];
      setSelectedTags(newTags);
      setQuery(''); // Rensa sökfältet efter val
    }
    setShowSuggestions(false);
  };

  // Ta bort en tagg från urvalet
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // Utför sökningen
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setIsSearching(true);

    try {
      // Om vi har ett sökord men inga taggar, kolla om det är en befintlig tagg
      if (query.trim() && selectedTags.length === 0) {
        const suggestions = await searcher.getSuggestions(query);
        if (suggestions.includes(query.trim())) {
          setSelectedTags([query.trim()]);
          setQuery('');
        }
      }

      // Utför sökningen med aktuella filter
      const results = await searcher.search(query, {
        tags: selectedTags,
        categories: selectedCategories,
        sortBy: 'relevance',
        limit: 20
      });

      // Spara att taggen användes
      if (query.trim() && !selectedTags.includes(query.trim())) {
        const queryTag = query.trim();
        await db.table('tags').where('name').equals(queryTag).first().then(existingTag => {
          if (existingTag && existingTag.id) {
            return db.table('tags').update(existingTag.id, {
              count: (existingTag.count || 0) + 1,
              updatedAt: new Date()
            });
          } else {
            return db.table('tags').add({
              id: crypto.randomUUID(),
              name: queryTag,
              count: 1,
              updatedAt: new Date()
            });
          }
        });
      }

      onSearch(results);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex flex-col space-y-4">
          {/* Sökfält med suggestions */}
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Sök efter dokumentation, guider eller verktyg..."
              className={`w-full pl-12 pr-4 py-4 ${themeClasses.cardBg} border-2 ${themeClasses.border} ${themeClasses.hoverBorder} focus:border-[hsl(var(--primary))] rounded-xl ${themeClasses.text} text-lg placeholder:${themeClasses.mutedText}/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)] transition-all duration-300`}
            />
            
            {/* Sökikon */}
            <button 
              type="submit" 
              className="absolute left-4 top-4 bg-transparent border-none"
              disabled={isSearching}
            >
              <svg 
                className={`h-6 w-6 ${themeClasses.primaryText} transition-transform duration-300 transform ${isSearching ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isSearching ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )}
              </svg>
            </button>
            
            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div 
                ref={suggestionsRef}
                className={`absolute z-20 w-full mt-2 py-2 ${themeClasses.cardBg} border ${themeClasses.border} rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto`}
              >
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full px-4 py-2 text-left ${themeClasses.text} ${
                        selectedTags.includes(suggestion) 
                          ? `${themeClasses.primary} ${themeClasses.primaryFg} font-medium`
                          : `hover:bg-[hsl(var(--primary)_/_0.1)]`
                      } transition-colors duration-200`}
                    >
                      {suggestion}
                    </button>
                  ))
                ) : (
                  <div className={`px-4 py-2 ${themeClasses.mutedText} text-sm italic`}>
                    Inga förslag hittades
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Valda taggar */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTags.map((tag, index) => (
                <div 
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full ${themeClasses.primary} ${themeClasses.primaryFg} gap-2 text-sm`}
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className={`inline-flex items-center px-3 py-1 rounded-full ${themeClasses.bg} border ${themeClasses.border} text-sm ${themeClasses.mutedText} hover:${themeClasses.text} transition-colors duration-200`}
                >
                  Rensa alla
                </button>
              )}
            </div>
          )}
        </div>
      </form>
      
      {/* Populära taggar */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {popularTags.map((tag, i) => (
          <button 
            key={i}
            onClick={() => {
              if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag]);
                handleSearch();
              }
            }}
            className={`px-4 py-1.5 ${
              selectedTags.includes(tag) 
                ? `${themeClasses.primary} ${themeClasses.primaryFg}`
                : `bg-[hsl(var(--primary)_/_0.1)] hover:bg-[hsl(var(--primary)_/_0.2)] ${themeClasses.mutedText} hover:${themeClasses.text}`
            } rounded-full text-sm ${themeClasses.uiLabel} transition-all duration-300 hover:scale-105 hover:shadow-md`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;