import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SettingsPage() {
  const {
    isDarkMode, toggleDarkMode, fontSize, setFontSize,
    streak, totalAthkarCompleted, tasbihTotal, totalDays,
  } = useStore();

  return (
    <div className="min-h-screen pb-28 pt-20">
      <div className="px-4 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-5xl block mb-3">⚙️</span>
          <h1 className={`text-3xl font-bold font-[Amiri] mb-1 ${
            isDarkMode ? 'text-gradient-gold' : 'text-emerald-dark'
          }`}>
            الإعدادات
          </h1>
        </motion.div>

        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}>
            المظهر
          </h3>
          <div className={`p-4 rounded-2xl ${
            isDarkMode
              ? 'bg-night-light/60 border border-gold/10'
              : 'bg-white/60 border border-emerald-dark/10'
          }`} style={{ backdropFilter: 'blur(10px)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{isDarkMode ? '🌙' : '☀️'}</span>
                <div>
                  <p className={`font-bold text-sm ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
                    الوضع الليلي
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDarkMode ? 'مفعّل' : 'غير مفعّل'}
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${
                  isDarkMode ? 'bg-gold/30' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  layout
                  className={`w-6 h-6 rounded-full absolute top-1 transition-colors duration-300 ${
                    isDarkMode ? 'bg-gold right-1' : 'bg-white left-1'
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Font Size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}>
            حجم الخط
          </h3>
          <div className={`p-4 rounded-2xl ${
            isDarkMode
              ? 'bg-night-light/60 border border-gold/10'
              : 'bg-white/60 border border-emerald-dark/10'
          }`} style={{ backdropFilter: 'blur(10px)' }}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                  isDarkMode ? 'bg-gold/10 text-gold' : 'bg-emerald-dark/10 text-emerald-dark'
                }`}
              >
                أ
              </button>
              <div className="flex-1">
                <input
                  type="range"
                  min="14"
                  max="32"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-gold"
                />
              </div>
              <button
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold ${
                  isDarkMode ? 'bg-gold/10 text-gold' : 'bg-emerald-dark/10 text-emerald-dark'
                }`}
              >
                أ
              </button>
            </div>
            <p className={`font-[Amiri] text-center mt-3 ${isDarkMode ? 'text-ivory' : 'text-night'}`}
               style={{ fontSize: `${fontSize}px` }}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}>
            الإحصائيات
          </h3>
          <div className={`p-4 rounded-2xl space-y-4 ${
            isDarkMode
              ? 'bg-night-light/60 border border-gold/10'
              : 'bg-white/60 border border-emerald-dark/10'
          }`} style={{ backdropFilter: 'blur(10px)' }}>
            {[
              { label: 'أيام متتالية', value: streak, icon: '🔥' },
              { label: 'أذكار مكتملة', value: totalAthkarCompleted, icon: '✅' },
              { label: 'إجمالي التسبيحات', value: tasbihTotal, icon: '📿' },
              { label: 'أيام النشاط', value: totalDays, icon: '📅' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{stat.icon}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
                    {stat.label}
                  </span>
                </div>
                <span className={`font-bold ${isDarkMode ? 'text-gold' : 'text-emerald-dark'}`}>
                  {stat.value.toLocaleString('ar-SA')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}>
            عن التطبيق
          </h3>
          <div className={`p-5 rounded-2xl text-center ${
            isDarkMode
              ? 'bg-night-light/60 border border-gold/10'
              : 'bg-white/60 border border-emerald-dark/10'
          }`} style={{ backdropFilter: 'blur(10px)' }}>
            <span className="text-4xl block mb-3">🕌</span>
            <p className={`font-bold text-lg font-[Amiri] mb-1 ${isDarkMode ? 'text-gold' : 'text-emerald-dark'}`}>
              حصن المسلم
            </p>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              أذكار الصباح والمساء
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              الإصدار 1.0.0
            </p>
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              جميع الأحاديث والأذكار من مصادر صحيحة ومعتمدة
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
