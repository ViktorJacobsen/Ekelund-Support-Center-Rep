'use client';

import React, { useState } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import Sidebar from '@/components/layout/sidebar/sidebar';
import Header from '@/components/layout/header/header';
import Search from '@/components/layout/header/search';
import TabNavigation from '@/components/layout/tab-navigation';
import DocumentCard from '@/components/dashboard/document-card';
import GuideCard from '@/components/dashboard/guide-card';
import QuickToolsCard from '@/components/dashboard/quick-tools-card';
import CategoryCard from '@/components/dashboard/category-card';
import FadeInWhenVisible from '@/components/animations/fade-in-when-visible';

export default function DashboardPage() {
  const { themeClasses } = useTheme();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('popular');

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Exempel på dokumentdata
  const recentDocuments = [
    { title: 'Installationsguide - Ny Panel v2.4', type: 'PDF', date: 'Idag 10:24' },
    { title: 'Felsökningsschema - Värmepump', type: 'PDF', date: 'Igår 15:30' },
  ];

  // Exempel på guidesdata
  const popularGuides = [
    { title: 'Hur man konfigurerar en ny styrenhet', views: 123, time: '5 min' },
    { title: 'Felsökning av kommunikationsfel', views: 98, time: '8 min' },
  ];

  // Exempel på verktygsdata
  const quickTools = [
    { 
      title: 'Mätinsamling', 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      href: '/verktyg/matarinsamling'
    },
    { 
      title: 'Egenprovning', 
      icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z',
      href: '/verktyg/egenprovning'
    },
  ];

  // Exempel på kategoridata
  const categories = [
    { 
      title: 'Installationsguider', 
      count: 24, 
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      href: '/dokumentation/installationsguider'
    },
    { 
      title: 'Tekniska manualer', 
      count: 35, 
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      href: '/dokumentation/manualer'
    },
    { 
      title: 'Felsökning', 
      count: 18, 
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      href: '/dokumentation/felsökning'
    },
    { 
      title: 'Produktdokument', 
      count: 42, 
      icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
      href: '/dokumentation/produktdokument'
    },
  ];

  // Exempel på uppdateringsdata
  const recentActivities = [
    { 
      type: 'document', 
      title: 'Uppdaterad manual för Panel v2.4', 
      description: 'Ny sektion om felsökning och uppdaterad firmware-guide.', 
      user: 'Maria K', 
      time: '2 timmar sedan' 
    },
    { 
      type: 'guide', 
      title: 'Ny how-to guide för uppkoppling mot molntjänst', 
      description: 'Steg-för-steg instruktioner för att konfigurera molnanslutningen.', 
      user: 'Anders S', 
      time: '4 timmar sedan' 
    },
  ];

  // Renderar innehåll baserat på aktiv flik
  const renderTabContent = () => {
    switch (activeSection) {
      case 'popular':
        return (
          <div className="space-y-8">
            {/* Quick Access Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Dokument */}
              <DocumentCard
                title="Senaste dokument"
                icon={
                  <svg className={`h-6 w-6 ${themeClasses.primaryFg}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                documents={recentDocuments}
                viewAllHref="/dokumentation/alla"
                animationDelay={0.1}
              />
              
              {/* Guider */}
              <GuideCard
                title="Populära guider"
                icon={
                  <svg className={`h-6 w-6 ${themeClasses.primaryFg}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
                guides={popularGuides}
                viewAllHref="/guider"
                animationDelay={0.2}
              />
              
              {/* Verktyg */}
              <QuickToolsCard
                title="Snabbverktyg"
                icon={
                  <svg className={`h-6 w-6 ${themeClasses.primaryFg}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                }
                tools={quickTools}
                viewAllHref="/verktyg"
                animationDelay={0.3}
              />
            </div>
          </div>
        );
      
      case 'categories':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, i) => (
                <CategoryCard
                  key={i}
                  title={category.title}
                  icon={category.icon}
                  count={category.count}
                  href={category.href}
                  animationDelay={i * 0.1}
                />
              ))}
            </div>
          </div>
        );
      
      case 'updates':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeInWhenVisible delay={0.1}>
                <div className={`${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.border} rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${themeClasses.hoverBorder}`}>
                  <h3 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-5`}>Senaste aktiviteter</h3>
                  <div className="space-y-5">
                    {recentActivities.map((update, i) => (
                      <div key={i} className={`p-4 rounded-lg ${themeClasses.bg} border ${themeClasses.border} ${themeClasses.hoverBorder} group/item cursor-pointer transition-all duration-300 hover:translate-x-1`}>
                        <div className="flex items-start">
                          <div className={`p-2 rounded-lg ${themeClasses.primary} ${themeClasses.primaryFg} mr-4 transition-transform duration-300 group-hover/item:scale-110`}>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={update.type === 'document' ? 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' : 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'} />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className={`${themeClasses.subheading} ${themeClasses.text} group-hover/item:${themeClasses.primaryText} transition-colors duration-300`}>{update.title}</h3>
                              <span className={`text-xs ${themeClasses.mutedText}`}>{update.time}</span>
                            </div>
                            <p className={`text-sm ${themeClasses.bodyText} ${themeClasses.mutedText} mt-1`}>{update.description}</p>
                            <div className={`mt-3 flex items-center text-xs ${themeClasses.primaryText}`}>
                              <span>Uppdaterad av {update.user}</span>
                              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInWhenVisible>
              
              <FadeInWhenVisible delay={0.2}>
                <div className={`${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.border} rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${themeClasses.hoverBorder}`}>
                  <h3 className={`text-xl ${themeClasses.heading} ${themeClasses.text} mb-5`}>Kommande uppdateringar</h3>
                  
                  <div className={`p-5 rounded-lg bg-gradient-to-br from-[hsl(var(--primary)_/_0.2)] to-[hsl(var(--primary)_/_0.1)] border ${themeClasses.border} mb-5 relative overflow-hidden group/update transition-all duration-500 hover:shadow-lg`}>
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-[hsl(var(--primary)_/_0.2)] to-transparent rounded-full transition-transform duration-500 group-hover/update:scale-150"></div>
                    <span className={`inline-block px-3 py-1 ${themeClasses.primary}/20 ${themeClasses.primaryText} rounded-full text-xs mb-3`}>Planerad: 15 juni</span>
                    <h4 className={`text-lg ${themeClasses.subheading} ${themeClasses.text} transition-colors duration-300 group-hover/update:${themeClasses.primaryText}`}>Nytt supportcenter</h4>
                    <p className={`text-sm ${themeClasses.bodyText} ${themeClasses.mutedText} mb-4`}>Komplett uppdatering av supportcentret med nya funktioner och förbättrad sökning.</p>
                    <div className="w-full bg-[hsl(var(--secondary))] h-2.5 rounded-full overflow-hidden">
                      <div className={`${themeClasses.primary} h-2.5 rounded-full transition-all duration-1000 ease-in-out`} style={{width: '75%'}}></div>
                    </div>
                    <span className={`text-xs ${themeClasses.mutedText} mt-2 inline-block`}>75% färdigt</span>
                  </div>
                  
                  <div className={`p-4 mb-3 border-b ${themeClasses.border} transition-all duration-300 ${themeClasses.hoverBorder}`}>
                    <div className="flex justify-between">
                      <div>
                        <h4 className={`${themeClasses.subheading} ${themeClasses.text}`}>Senaste versionen: v2.4.1</h4>
                        <p className={`text-sm ${themeClasses.mutedText}`}>Släppt 28 maj, 2024</p>
                      </div>
                      <a href="#" className={`${themeClasses.primaryText} ${themeClasses.hoverText} text-sm transition-colors duration-300`}>Release notes</a>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        );
      
      default:
        return <div>Välj en sektion att visa</div>;
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.bodyText} ${themeClasses.bg} ${themeClasses.text}`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
        
        {/* Huvudinnehåll */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarExpanded ? 'ml-64' : 'ml-16'
        } pt-0`}>
          {/* Header */}
          <Header />
          
          {/* Hero Section with Search */}
          <div className={`${themeClasses.bg} border-b ${themeClasses.border}`}>
            <Search 
              placeholder="Sök efter dokumentation, guider eller verktyg..."
              tags={["Installation", "Felsökning", "Konfiguration", "Manualer"]}
              onSearch={(query) => console.log('Sökning:', query)}
            />
          </div>
          
          {/* Content Section with Tab Navigation */}
          <div className="px-6 py-10">
            {/* Tab Navigation */}
            <TabNavigation 
              tabs={[
                { id: 'popular', label: 'Populärt innehåll' },
                { id: 'categories', label: 'Kategorier' },
                { id: 'updates', label: 'Uppdateringar' },
              ]}
              defaultTab="popular"
              onChange={setActiveSection}
            />
            
            {/* Section Content */}
            <div className="max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}