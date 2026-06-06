import { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Mail,
  Sliders,
  Briefcase,
  Cpu,
  User,
  DollarSign,
  MessageSquare,
  Settings,
  Eye,
  LogOut,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

// Sub components
import DashboardHome from './DashboardHome';
import Inbox from './Inbox';
import HeroManager from './HeroManager';
import ProjectsManager from './ProjectsManager';
import ServicesManager from './ServicesManager';
import AboutManager from './AboutManager';
import TestimonialsManager from './TestimonialsManager';
import PricingManager from './PricingManager';
import SettingsManager from './SettingsManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { data } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unreadInquiries = data.inquiries.filter((inq) => !inq.isRead).length;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inquiries Inbox', icon: Mail, badge: unreadInquiries },
    { id: 'hero', label: 'Hero & Contact Info', icon: Sliders },
    { id: 'projects', label: 'Projects Grid', icon: Briefcase },
    { id: 'services', label: 'Services List', icon: Cpu },
    { id: 'about', label: 'Bio & Credentials', icon: User },
    { id: 'testimonials', label: 'Reviews & Metrics', icon: MessageSquare },
    { id: 'pricing', label: 'Pricing Plans', icon: DollarSign },
    { id: 'settings', label: 'Security & Backup', icon: Settings }
  ];

  const handlePreview = () => {
    window.location.hash = '#home';
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />;
      case 'inbox':
        return <Inbox />;
      case 'hero':
        return <HeroManager showToast={showToast} />;
      case 'projects':
        return <ProjectsManager showToast={showToast} />;
      case 'services':
        return <ServicesManager showToast={showToast} />;
      case 'about':
        return <AboutManager showToast={showToast} />;
      case 'testimonials':
        return <TestimonialsManager showToast={showToast} />;
      case 'pricing':
        return <PricingManager showToast={showToast} />;
      case 'settings':
        return <SettingsManager showToast={showToast} />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0]/40 flex relative font-sans">
      {/* Toast Alert Notice */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[200] bg-dark-800 text-cream px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-accent/20 animate-fade-in text-sm font-semibold select-none">
          <CheckCircle2 size={18} className="text-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar - Desktop Layout */}
      <aside className="hidden lg:flex flex-col w-64 bg-dark-800 text-cream/80 h-screen sticky top-0 flex-shrink-0 border-r border-dark-700 select-none">
        {/* Brand/Title */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-dark-700 bg-dark-800">
          <span className="font-heading text-lg font-extrabold text-cream tracking-tight">
            CMS Panel<span className="text-accent">.</span>
          </span>
          <span className="text-[10px] font-bold bg-accent/20 text-accent px-2 py-0.5 rounded-full uppercase leading-none">
            v1.0
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-accent text-cream font-bold shadow-md shadow-accent/15'
                    : 'hover:bg-cream/5 hover:text-cream text-cream/60'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-cream' : 'text-cream/40'} />
                <span className="flex-grow text-left truncate">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 bg-accent text-cream rounded-full text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer controls */}
        <div className="p-4 border-t border-dark-700 space-y-2">
          <button
            onClick={handlePreview}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-cream/5 hover:bg-cream/10 text-cream/90 rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-cream/5"
          >
            <Eye size={16} /> Preview Site
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/15 hover:bg-red-500/25 text-red-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Topbar navigation panel */}
        <header className="h-16 bg-white border-b border-dark/5 flex items-center justify-between px-6 sticky top-0 z-40 select-none">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-dark/5 rounded-lg text-dark transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-dark font-heading capitalize">
              {activeTab.replace('-', ' ')} Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePreview}
              className="px-4 py-2 border border-dark/15 text-dark/70 hover:bg-cream/20 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all bg-white"
            >
              <Eye size={15} /> Preview
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-red-100"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </header>

        {/* Dynamic Manager viewport */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderActiveContent()}
        </main>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden select-none">
          {/* Backdrop click closer */}
          <div
            className="fixed inset-0 bg-dark/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="relative flex flex-col w-64 max-w-xs bg-dark-800 text-cream/80 h-full border-r border-dark-700 animate-slide-in-left shadow-2xl">
            {/* Header / Brand */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-dark-700 bg-dark-800">
              <span className="font-heading text-base font-extrabold text-cream">
                CMS Panel<span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 hover:bg-cream/5 rounded text-cream/70"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation list */}
            <nav className="flex-grow py-4 px-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-accent text-cream font-bold shadow-md shadow-accent/15'
                        : 'hover:bg-cream/5 hover:text-cream text-cream/60'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-cream' : 'text-cream/40'} />
                    <span className="flex-grow text-left truncate">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 bg-accent text-cream rounded-full text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-dark-700 space-y-2">
              <button
                onClick={() => {
                  handlePreview();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-cream/5 hover:bg-cream/10 text-cream/90 rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-cream/5"
              >
                <Eye size={16} /> Preview Site
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/15 hover:bg-red-500/25 text-red-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
