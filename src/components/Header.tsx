import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function Header() {
  const { isDarkMode, toggleDarkMode, currentPage, setCurrentPage } = useStore();

  const getTitle = () => {
    switch (currentPage) {
      case 'home': return 'حصن المسلم';
      case 'morning': return 'أذكار الصباح';
      case 'evening': return 'أذكار المساء';
      case 'tasbih': return 'التسبيح الإلكتروني';
      case 'favorites': return 'المفضلة';
      case 'doaas': return 'الأدعية';
      case 'settings': return 'الإعدادات';
      case 'sleep': return 'أذكار النوم';
      case 'prayer': return 'أذكار الصلاة';
      case 'prophets': return 'أدعية الأنبياء';
      case 'quran': return 'الأدعية القرآنية';
      default: return 'حصن المسلم';
    }
  };

  const showBack = currentPage !== 'home';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2 ${
        isDarkMode
          ? 'bg-night/70 border-b border-gold/10'
          : 'bg-ivory/70 border-b border-emerald-dark/10'
      }`}
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setCurrentPage('home')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors text-base ${
                isDarkMode
                  ? 'bg-gold/10 hover:bg-gold/20 text-gold'
                  : 'bg-emerald-dark/10 hover:bg-emerald-dark/20 text-emerald-dark'
              }`}
            >
              ←
            </motion.button>
          )}
          <div>
            <motion.h1
              key={currentPage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-lg font-bold font-[Amiri] ${
                isDarkMode ? 'text-gold' : 'text-emerald-dark'
              }`}
            >
              {getTitle()}
            </motion.h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage('settings')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-colors ${
              isDarkMode
                ? 'bg-gold/10 hover:bg-gold/20 text-gold'
                : 'bg-emerald-dark/10 hover:bg-emerald-dark/20 text-emerald-dark'
            }`}
          >
            ⚙️
          </motion.button>

          {/* Dark mode toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-500 ${
              isDarkMode
                ? 'bg-gold/10 hover:bg-gold/20'
                : 'bg-emerald-dark/10 hover:bg-emerald-dark/20'
            }`}
          >
            <motion.span
              key={isDarkMode ? 'dark' : 'light'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
