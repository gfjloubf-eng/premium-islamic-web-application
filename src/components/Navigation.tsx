import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

const navItems = [
  { id: 'home', label: 'الرئيسية', icon: '🏠' },
  { id: 'morning', label: 'الصباح', icon: '🌅' },
  { id: 'evening', label: 'المساء', icon: '🌙' },
  { id: 'tasbih', label: 'التسبيح', icon: '📿' },
  { id: 'favorites', label: 'المفضلة', icon: '⭐' },
];

export default function Navigation() {
  const { currentPage, setCurrentPage, isDarkMode } = useStore();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
    >
      <div
        className={`mx-auto max-w-lg rounded-2xl p-1.5 ${
          isDarkMode
            ? 'bg-night-light/80 border border-gold/20'
            : 'bg-white/80 border border-emerald-dark/10'
        }`}
        style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? isDarkMode
                      ? 'text-gold'
                      : 'text-emerald-dark'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-xl ${
                      isDarkMode
                        ? 'bg-gold/10 border border-gold/20'
                        : 'bg-emerald-dark/10 border border-emerald-dark/20'
                    }`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="text-lg relative z-10">{item.icon}</span>
                <span className="text-[10px] font-semibold relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
