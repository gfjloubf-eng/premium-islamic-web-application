import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState, useCallback } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import AthkarPage from '@/pages/AthkarPage';
import TasbihPage from '@/pages/TasbihPage';
import FavoritesPage from '@/pages/FavoritesPage';
import SettingsPage from '@/pages/SettingsPage';
import DoaasPage from '@/pages/DoaasPage';

function PageRouter() {
  const currentPage = useStore((s) => s.currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'morning':
        return <AthkarPage category="morning" />;
      case 'evening':
        return <AthkarPage category="evening" />;
      case 'sleep':
        return <AthkarPage category="sleep" />;
      case 'prayer':
        return <AthkarPage category="prayer" />;
      case 'prophets':
        return <AthkarPage category="prophets" />;
      case 'quran':
        return <AthkarPage category="quran" />;
      case 'tasbih':
        return <TasbihPage />;
      case 'doaas':
        return <DoaasPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: currentPage === 'home' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: currentPage === 'home' ? 20 : -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const isDarkMode = useStore((s) => s.isDarkMode);
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        isDarkMode
          ? 'bg-night text-ivory islamic-pattern-dark'
          : 'bg-ivory text-night islamic-pattern'
      }`}
    >
      {/* Golden gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? 'bg-gold/5' : 'bg-emerald-dark/5'
          }`}
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? 'bg-emerald-dark/10' : 'bg-gold/5'
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl ${
            isDarkMode ? 'bg-gold/5' : 'bg-emerald-mid/5'
          }`}
        />
      </div>

      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-lg mx-auto">
        <PageRouter />
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}
