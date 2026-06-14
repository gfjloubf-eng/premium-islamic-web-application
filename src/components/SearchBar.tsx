import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getAllAthkar } from '@/data/athkar';
import { useState, useMemo } from 'react';

export default function SearchBar() {
  const { isDarkMode, setCurrentPage } = useStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const allAthkar = useMemo(() => getAllAthkar(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allAthkar.filter(
      d => d.content.includes(query) || d.title.includes(query) || d.reference.includes(query)
    ).slice(0, 8);
  }, [query, allAthkar]);

  const getCategoryLabel = (cat: string) => {
    const map: Record<string, string> = {
      morning: 'أذكار الصباح',
      evening: 'أذكار المساء',
      sleep: 'أذكار النوم',
      prayer: 'أذكار الصلاة',
      prophets: 'أدعية الأنبياء',
      quran: 'أدعية قرآنية',
    };
    return map[cat] || cat;
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
          isDarkMode
            ? 'bg-night-light/60 border border-gold/10 text-gray-400'
            : 'bg-white/60 border border-emerald-dark/10 text-gray-500'
        }`}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <span>🔍</span>
        <span>ابحث في الأذكار والأدعية...</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            {/* Overlay */}
            <div
              className={`absolute inset-0 ${isDarkMode ? 'bg-night/90' : 'bg-ivory/90'}`}
              style={{ backdropFilter: 'blur(20px)' }}
              onClick={() => { setIsOpen(false); setQuery(''); }}
            />

            {/* Search content */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative z-10 p-4 pt-8 max-w-lg mx-auto"
            >
              {/* Search input */}
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl mb-4 ${
                isDarkMode
                  ? 'bg-night-light/80 border border-gold/20'
                  : 'bg-white/80 border border-emerald-dark/15'
              }`}>
                <span>🔍</span>
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث في الأذكار والأدعية..."
                  className={`flex-1 bg-transparent outline-none text-sm ${
                    isDarkMode ? 'text-ivory placeholder-gray-500' : 'text-night placeholder-gray-400'
                  }`}
                  dir="rtl"
                />
                <button
                  onClick={() => { setIsOpen(false); setQuery(''); }}
                  className={`text-xs px-2 py-1 rounded-lg ${
                    isDarkMode ? 'bg-gold/10 text-gold' : 'bg-emerald-dark/10 text-emerald-dark'
                  }`}
                >
                  إغلاق
                </button>
              </div>

              {/* Results */}
              <div className="space-y-2 max-h-[70vh] overflow-y-auto no-scrollbar">
                {results.map((dhikr) => (
                  <motion.button
                    key={dhikr.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentPage(dhikr.category);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`w-full text-right p-4 rounded-xl transition-all ${
                      isDarkMode
                        ? 'bg-night-light/60 border border-gold/10 hover:border-gold/25'
                        : 'bg-white/60 border border-emerald-dark/10 hover:border-emerald-dark/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className={`font-bold text-sm ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
                        {dhikr.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                        isDarkMode ? 'bg-gold/10 text-gold' : 'bg-emerald-dark/10 text-emerald-dark'
                      }`}>
                        {getCategoryLabel(dhikr.category)}
                      </span>
                    </div>
                    <p className={`text-xs line-clamp-2 font-[Amiri] ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {dhikr.content}
                    </p>
                  </motion.button>
                ))}
                {query && results.length === 0 && (
                  <div className="text-center py-12">
                    <span className="text-4xl block mb-3">🔍</span>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      لا توجد نتائج لـ "{query}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
