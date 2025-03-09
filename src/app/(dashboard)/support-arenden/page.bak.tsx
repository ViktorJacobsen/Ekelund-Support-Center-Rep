'use client';

import React, { useState } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import TicketList from '@/components/support/ticket-list';
import TicketForm from '@/components/support/ticket-form';
import { SupportTicket } from '@/lib/offline/support-ticket-db';

export default function SupportTicketsPage() {
  const { themeClasses } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  
  // Omdirigera om användaren inte är inloggad
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Hantera skapande av nytt ärende
  const handleTicketCreated = (ticketId: string) => {
    setShowNewTicketForm(false);
    // Här kan vi ladda om listan eller visa det nya ärendet
  };
  
  // Växla till att visa formulär för nytt ärende
  const toggleNewTicketForm = () => {
    setShowNewTicketForm(!showNewTicketForm);
    setSelectedTicket(null);
  };
  
  // Hantera val av ärende
  const handleSelectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowNewTicketForm(false);
    // Här skulle vi kunna navigera till en detaljvy för ärendet
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
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Supportärenden</h1>
          <p className={`${themeClasses.bodyText} ${themeClasses.mutedText}`}>
            Hantera supportärenden och få hjälp med tekniska problem.
          </p>
        </div>
        
        <button
          onClick={toggleNewTicketForm}
          className={`px-4 py-2 ${themeClasses.primary} ${themeClasses.primaryFg} rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{showNewTicketForm ? 'Avbryt' : 'Nytt ärende'}</span>
        </button>
      </div>
      
      {/* Visa antingen formulär för nytt ärende eller listan över ärenden */}
      {showNewTicketForm ? (
        <TicketForm
          onSubmitSuccess={handleTicketCreated}
          onCancel={toggleNewTicketForm}
        />
      ) : selectedTicket ? (
        <div className="mb-6">
          <button
            onClick={() => setSelectedTicket(null)}
            className={`mb-4 inline-flex items-center py-2 px-4 ${themeClasses.secondary} ${themeClasses.secondaryText} rounded-lg hover:opacity-90 transition-opacity duration-200`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Tillbaka till listan</span>
          </button>
          
          <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm`}>
            <div className="flex flex-wrap justify-between mb-4">
              <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>{selectedTicket.title}</h2>
              <div className={`text-sm ${themeClasses.mutedText}`}>
                Skapad: {new Date(selectedTicket.createdAt).toLocaleDateString('sv-SE')}
              </div>
            </div>
            
            <p className={`${themeClasses.bodyText} ${themeClasses.text} whitespace-pre-line mb-6`}>
              {selectedTicket.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
            {selectedTicket.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className={`inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.primaryText}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ${themeClasses.bg} rounded-lg border ${themeClasses.border}`}>
              <div>
                <span className={`block text-xs ${themeClasses.mutedText} mb-1`}>Status</span>
                <span className={`block ${themeClasses.uiLabel} ${themeClasses.text}`}>
                  {selectedTicket.status === 'new' ? 'Ny' : 
                   selectedTicket.status === 'open' ? 'Öppen' : 
                   selectedTicket.status === 'inProgress' ? 'Pågår' : 
                   selectedTicket.status === 'resolved' ? 'Löst' : 'Stängd'}
                </span>
              </div>
              <div>
                <span className={`block text-xs ${themeClasses.mutedText} mb-1`}>Prioritet</span>
                <span className={`block ${themeClasses.uiLabel} ${themeClasses.text}`}>
                  {selectedTicket.priority === 'low' ? 'Låg' : 
                   selectedTicket.priority === 'medium' ? 'Medium' : 
                   selectedTicket.priority === 'high' ? 'Hög' : 'Kritisk'}
                </span>
              </div>
              <div>
                <span className={`block text-xs ${themeClasses.mutedText} mb-1`}>Kategori</span>
                <span className={`block ${themeClasses.uiLabel} ${themeClasses.text}`}>{selectedTicket.category}</span>
              </div>
            </div>
            
            {/* Här skulle vi kunna visa kommentarer och kommentarsformulär */}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TicketList 
              onSelectTicket={handleSelectTicket}
              filterUserTickets={user?.role !== 'admin'} // Filtrera på användarens egna ärenden om inte admin
            />
          </div>
          
          <div>
            <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm sticky top-20`}>
              <h2 className={`text-lg ${themeClasses.heading} ${themeClasses.text} mb-4`}>Mina ärenden</h2>
              
              <TicketList 
                onSelectTicket={handleSelectTicket}
                filterUserTickets={true} // Visa alltid användarens egna ärenden här
                statusFilter={['new', 'open', 'inProgress']} // Visa bara aktiva ärenden
              />
              
              <div className="mt-6 pt-6 border-t border-dashed border-gray-200 dark:border-gray-700">
                <h3 className={`text-md ${themeClasses.subheading} ${themeClasses.text} mb-3`}>Snabbhjälp</h3>
                <ul className={`space-y-2 text-sm ${themeClasses.bodyText} ${themeClasses.mutedText}`}>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Skapa ett nytt ärende med knappen ovan</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Beskriv ditt problem så detaljerat som möjligt</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Du får ett svar inom 24 timmar</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}