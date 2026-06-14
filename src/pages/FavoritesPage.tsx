import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getAllAthkar } from '@/data/athkar';
import DhikrCard from '@/components/DhikrCard';
import { useMemo } from 'react';

export default function FavoritesPage() {
  const { isDarkMode, favorites } = useStore();
  const allAthkar = useMemo(() => getAllAthkar(), []);
  const favoriteAthkar = useMemo(
    () => allAthkar.filter(d => favorites.includes(d.id)),
    [allAthkar, favorites]
  );

  return (
    <div className="min-h-screen pb-28 pt-20">
      <div className="px-4 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-5xl block mb-3">⭐</span>
          <h1 className={`text-3xl font-bold font-[Amiri] mb-1 ${
            isDarkMode ? 'text-gradient-gold' : 'text-emerald-dark'
          }`}>
            المفضلة
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {favoriteAthkar.length} ذكر محفوظ
          </p>
        </motion.div>

        {/* List */}
        {favoriteAthkar.length > 0 ? (
          favoriteAthkar.map((dhikr, index) => (
            <DhikrCard key={dhikr.id} dhikr={dhikr} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-center py-16 rounded-2xl ${
              isDarkMode
                ? 'bg-night-light/40 border border-gold/10'
                : 'bg-white/50 border border-emerald-dark/10'
            }`}
          >
            <span className="text-6xl block mb-4">📌</span>
            <p className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
              لا توجد أذكار محفوظة
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              اضغط على ⭐ في أي ذكر لحفظه هنا
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
