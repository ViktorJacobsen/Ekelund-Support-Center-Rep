'use client';

import React, { useState } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { useAuth } from '@/lib/auth/auth-context';
import { SupportTicketsDB, TicketPriority } from '@/lib/offline/support-ticket-db';

interface TicketFormProps {
  onSubmitSuccess?: (ticketId: string) => void;
  onCancel?: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ 
  onSubmitSuccess, 
  onCancel 
}) => {
  const { themeClasses } = useTheme();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Kategorier att välja bland
  const categories = [
    'Programvara',
    'Hårdvara',
    'Nätverk',
    'Dokumentation',
    'Felrapport',
    'Förfrågan',
    'Övrigt'
  ];
  
  // Lägg till en tagg
  const addTag = () => {
    const tag = tagInput.trim();
    
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };
  
  // Ta bort en tagg
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Hantera tag input med Enter
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Skicka in ärendet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validera formuläret
    if (!title.trim()) {
      setError('Titel måste anges');
      return;
    }
    
    if (!description.trim()) {
      setError('Beskrivning måste anges');
      return;
    }
    
    if (!category) {
      setError('Kategori måste väljas');
      return;
    }
    
    if (!user) {
      setError('Du måste vara inloggad för att skapa ett ärende');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Skapa ärendet i databasen
      const ticketId = await SupportTicketsDB.createTicket({
        title,
        description,
        status: 'new',
        priority,
        createdBy: user.id,
        category,
        tags,
        attachments: []
      });
      
      // Återställ formuläret
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('medium');
      setTags([]);
      
      // Anropa success-callback
      if (onSubmitSuccess) {
        onSubmitSuccess(ticketId);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Ett fel uppstod när ärendet skulle skapas. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm`}>
      <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-6`}>Skapa nytt supportärende</h2>
      
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Titel */}
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`} htmlFor="title">
              Titel <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="Kortfattad beskrivning av ditt ärende"
            />
          </div>
          
          {/* Beskrivning */}
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`} htmlFor="description">
              Beskrivning <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={5}
              className={`w-full px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="Beskriv ditt ärende i detalj. Vad har du försökt? Vilka felmeddelanden ser du?"
            />
          </div>
          
          {/* Kategori och Prioritet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`} htmlFor="category">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              >
                <option value="">Välj kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`} htmlFor="priority">
                Prioritet
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              >
                <option value="low">Låg</option>
                <option value="medium">Medium</option>
                <option value="high">Hög</option>
                <option value="critical">Kritisk</option>
              </select>
            </div>
          </div>
          
          {/* Taggar */}
          <div>
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`}>
              Taggar
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
                placeholder="Lägg till tagg och tryck Enter"
              />
              <button
                type="button"
                onClick={addTag}
                disabled={isSubmitting || !tagInput.trim()}
                className={`px-4 py-3 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Lägg till
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div 
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full ${themeClasses.primary} ${themeClasses.primaryFg} gap-2 text-sm`}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      disabled={isSubmitting}
                      className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Knappar */}
          <div className="flex justify-end space-x-4 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className={`px-6 py-3 ${themeClasses.secondary} ${themeClasses.secondaryText} rounded-lg hover:opacity-90 transition-opacity duration-200`}
              >
                Avbryt
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Skickar...</span>
                </>
              ) : (
                <span>Skicka ärende</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;