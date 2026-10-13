import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BreadcrumbNav } from './components/layout/BreadcrumbNav';
import { ToastNotification } from './components/common/Toast';
import { DemoTour } from './components/tour/DemoTour';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { TicketsPage } from './pages/TicketsPage';
import { CreateTicketPage } from './pages/CreateTicketPage';
import { TicketDetailsPage } from './pages/TicketDetailsPage';
import { ManualReviewPage } from './pages/ManualReviewPage';
import { CustomersPage } from './pages/CustomersPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { OOPStructurePage } from './pages/OOPStructurePage';
import { AIClassificationPage } from './pages/AIClassificationPage';
import { GlyphPortalPage } from './pages/GlyphPortalPage';
import { LoginPage } from './pages/LoginPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

const AppContent: React.FC = () => {
  const { activePage, setActivePage } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tickets':
        return <TicketsPage />;
      case 'create-ticket':
        return <CreateTicketPage />;
      case 'ticket-details':
        return <TicketDetailsPage />;
      case 'manual-review':
        return <ManualReviewPage />;
      case 'customers':
        return <CustomersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'oop-structure':
        return <OOPStructurePage />;
      case 'ai-classification':
        return <AIClassificationPage />;
      case 'glyph-portal':
        return <GlyphPortalPage />;
      case 'login':
        return <LoginPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col antialiased relative selection:bg-indigo-500/30 selection:text-white">
      {/* Clean Subtle Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Sidebar Navigation (Disabled on Login Page) */}
      {activePage !== 'login' && (
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 min-h-screen ${activePage !== 'login' ? 'lg:pl-64' : 'w-full'}`}>
        <Header onMobileToggle={() => setMobileSidebarOpen(prev => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
          <BreadcrumbNav />
          {renderActivePage()}
        </main>

        {/* Professional Footer with Legal Links */}
        {activePage !== 'login' && (
          <footer className="border-t border-white/[0.06] py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl w-full mx-auto">
            <div>
              <span>Support Ticket Router v2.4</span>
              <span className="mx-2">•</span>
              <span>All Systems Operational</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActivePage('privacy')}
                className="hover:text-slate-300 transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button 
                onClick={() => setActivePage('terms')}
                className="hover:text-slate-300 transition-colors"
              >
                Terms and Conditions
              </button>
            </div>
          </footer>
        )}

        {/* Global Toast Alerts */}
        <ToastNotification />

        {/* Guided Demo Tour (Disabled on Login Page) */}
        {activePage !== 'login' && <DemoTour />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
