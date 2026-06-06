import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { DataProvider } from './context/DataContext';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import { Settings, LogOut } from 'lucide-react';

function AppContent() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });

  useEffect(() => {
    const handleHash = () => {
      setIsAdminRoute(window.location.hash.startsWith('#/admin'));
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Hidden admin keyboard shortcut: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.hash = '#/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('admin_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
    window.location.hash = '#home';
  };

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="bg-cream text-dark min-h-screen relative">
      {/* Floating Admin Bar */}
      {isLoggedIn && (
        <div className="bg-dark-800 text-cream/90 py-2.5 px-4 sticky top-0 z-[100] flex justify-between items-center text-xs sm:text-sm shadow-md border-b border-accent/20">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 bg-olive rounded-full animate-pulse" />
            <span>Admin mode active</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#/admin"
              className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 hover:bg-accent/30 text-accent hover:text-accent-dark rounded-md font-semibold transition-all"
            >
              <Settings size={14} /> Manage Website
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-cream/70 rounded-md font-medium transition-all"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      )}

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Services />
        <SocialProof />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;

