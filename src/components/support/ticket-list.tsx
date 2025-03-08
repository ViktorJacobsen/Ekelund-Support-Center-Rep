'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { useAuth } from '@/lib/auth/auth-context';
import { SupportTicketsDB, SupportTicket, TicketStatus, TicketPriority } from '@/lib/offline/support-ticket-db';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

interface TicketListProps {
  onSelectTicket?: (ticket: SupportTicket) => void;
  filterUserTickets?: boolean;
  statusFilter?: TicketStatus[];
}

const TicketList: React.FC<TicketListProps> = ({ 
  onSelectTicket,
  filterUserTickets = false,
  statusFilter
}) => {
  const { themeClasses } = useTheme();
  const { user } = useAuth();
  
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | ''>('');
  const [selectedPriority, setSelectedPriority] = useState<TicketPriority | ''>('');
  
  // Ladda ärenden
  useEffect(() => {
    loadTickets();
  }, [filterUserTickets, statusFilter, selectedStatus, selectedPriority, searchTerm, user]);
  
  // Hämta ärenden från databasen
  const loadTickets = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Bygg upp filter baserat på props och state
      const filter: any = {};
      
      // Applicera statusfilter från props eller state
      if (statusFilter) {
        filter.status = statusFilter;
      } else if (selectedStatus) {
        filter.status = selectedStatus;
      }
      
      // Prioritetsfilter
      if (selectedPriority) {
        filter.priority = selectedPriority;
      }
      
      // Filtrera på användarens egna ärenden om det är aktiverat
      if (filterUserTickets) {
        filter.createdBy = user.id;
      }
      
      // Sökfilter
      if (searchTerm.trim()) {
        filter.search = searchTerm.trim();
      }
      
      // Hämta ärenden med filter
      const ticketData = await SupportTicketsDB.getTickets(filter);
      setTickets(ticketData);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generera statustext och styling
  const getStatusInfo = (status: TicketStatus) => {
    const statusMap: Record<TicketStatus, { label: string; bgColor: string; textColor: string }> = {
      new: { 
        label: 'Ny', 
        bgColor: 'bg-blue-100 dark:bg-blue-900/30', 
        textColor: 'text-blue-800 dark:text-blue-300' 
      },
      open: { 
        label: 'Öppen', 
        bgColor: 'bg-purple-100 dark:bg-purple-900/30', 
        textColor: 'text-purple-800 dark:text-purple-300' 
      },
      inProgress: { 
        label: 'Pågår', 
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30', 
        textColor: 'text-yellow-800 dark:text-yellow-300' 
      },
      resolved: { 
        label: 'Löst', 
        bgColor: 'bg-green-100 dark:bg-green-900/30', 
        textColor: 'text-green-800 dark:text-green-300' 
      },
      closed: { 
        label: 'Stängd', 
        bgColor: 'bg-gray-100 dark:bg-gray-800/50', 
        textColor: 'text-gray-800 dark:text-gray-400' 
      }
    };
    
    return statusMap[status];
  };
  
  // Generera prioritetstext och styling
  const getPriorityInfo = (priority: TicketPriority) => {
    const priorityMap: Record<TicketPriority, { label: string; bgColor: string; textColor: string }> = {
      low: { 
        label: 'Låg', 
        bgColor: 'bg-gray-100 dark:bg-gray-800/50', 
        textColor: 'text-gray-800 dark:text-gray-400' 
      },
      medium: { 
        label: 'Medium', 
        bgColor: 'bg-blue-100 dark:bg-blue-900/30', 
        textColor: 'text-blue-800 dark:text-blue-300' 
      },
      high: { 
        label: 'Hög', 
        bgColor: 'bg-orange-100 dark:bg-orange-900/30', 
        textColor: 'text-orange-800 dark:text-orange-300' 
      },
      critical: { 
        label: 'Kritisk', 
        bgColor: 'bg-red-100 dark:bg-red-900/30', 
        textColor: 'text-red-800 dark:text-red-300' 
      }
    };
    
    return priorityMap[priority];
  };
  
  // Formatera datum
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Visa laddningsskelett om vi laddar
  if (isLoading) {
    return (
      <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm w-full animate-pulse`}>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-4">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl p-6 shadow-sm w-full`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className={`text-xl ${themeClasses.heading} ${themeClasses.text}`}>
          {filterUserTickets ? 'Mina ärenden' : 'Supportärenden'}
          {tickets.length > 0 && <span className={`ml-2 text-sm ${themeClasses.mutedText}`}>({tickets.length})</span>}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sök ärenden..."
            className={`px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)] w-full sm:w-60`}
          />
          
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as TicketStatus | '')}
              className={`px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
            >
              <option value="">Alla statusar</option>
              <option value="new">Nya</option>
              <option value="open">Öppna</option>
              <option value="inProgress">Pågående</option>
              <option value="resolved">Lösta</option>
              <option value="closed">Stängda</option>
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as TicketPriority | '')}
              className={`px-3 py-2 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
            >
              <option value="">Alla prioriteter</option>
              <option value="low">Låg</option>
              <option value="medium">Medium</option>
              <option value="high">Hög</option>
              <option value="critical">Kritisk</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Lista över ärenden */}
      {tickets.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-12 ${themeClasses.mutedText} text-center`}>
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className={`text-lg ${themeClasses.heading} mb-2`}>Inga ärenden hittades</h3>
          <p className="max-w-sm">
            {filterUserTickets
              ? 'Du har inga aktiva supportärenden. Skapa ett nytt för att få hjälp.'
              : 'Inga ärenden matchar de valda filtren. Försök med andra sökkriterier.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket, index) => {
            const statusInfo = getStatusInfo(ticket.status);
            const priorityInfo = getPriorityInfo(ticket.priority);
            
            return (
              <FadeInWhenVisible key={ticket.id} delay={index * 0.05}>
                <div
                  onClick={() => onSelectTicket && onSelectTicket(ticket)}
                  className={`${themeClasses.bg} border ${themeClasses.border} rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${onSelectTicket ? 'cursor-pointer hover:border-[hsl(var(--primary)_/_0.5)]' : ''}`}
                >
                  <div className="flex flex-wrap justify-between mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                      <h3 className={`text-lg ${themeClasses.subheading} ${themeClasses.text}`}>{ticket.title}</h3>
                      <div className="flex gap-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {statusInfo.label}
                        </span>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${priorityInfo.bgColor} ${priorityInfo.textColor}`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs ${themeClasses.mutedText}`}>
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                  
                  <p className={`${themeClasses.bodyText} ${themeClasses.mutedText} mb-3 line-clamp-2`}>
                    {ticket.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {ticket.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className={`inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.primaryText}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {ticket.tags.length > 3 && (
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--muted))] ${themeClasses.mutedText}`}>
                          +{ticket.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <span className={`text-xs ${themeClasses.mutedText} mt-1`}>
                      {ticket.category}
                    </span>
                  </div>
                </div>
              </FadeInWhenVisible>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TicketList;