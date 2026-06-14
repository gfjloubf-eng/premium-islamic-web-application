import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { categories } from '@/data/athkar';
import { GeometricDivider, CrescentMoon } from '@/components/IslamicDecorations';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';

function HijriDate() {
  const [hijriDate, setHijriDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setGregorianDate(now.toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));
      setTime(now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
      }));

      try {
        setHijriDate(now.toLocaleDateString('ar-SA-u-ca-islamic', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }));
      } catch {
        setHijriDate('');
      }
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDarkMode = useStore((s) => s.isDarkMode);

  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`text-3xl font-bold font-[Amiri] mb-1 ${isDarkMode ? 'text-gold' : 'text-emerald-dark'}`}
      >
        {time}
      </motion.p>
      {hijriDate && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className={`text-sm mb-0.5 ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}
        >
          {hijriDate}
        </motion.p>
      )}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
      >
        {gregorianDate}
      </motion.p>
    </div>
  );
}

function StatsCards() {
  const { isDarkMode, streak, totalAthkarCompleted, tasbihTotal, totalDays } = useStore();

  const stats = [
    { label: 'أيام متتالية', value: streak, icon: '🔥', color: 'from-orange-500/20 to-red-500/20' },
    { label: 'أذكار مكتملة', value: totalAthkarCompleted, icon: '✅', color: 'from-emerald-500/20 to-green-500/20' },
    { label: 'تسبيحات', value: tasbihTotal, icon: '📿', color: 'from-blue-500/20 to-indigo-500/20' },
    { label: 'أيام نشاط', value: totalDays, icon: '📅', color: 'from-purple-500/20 to-pink-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.1 }}
          className={`relative p-4 rounded-2xl overflow-hidden ${
            isDarkMode
              ? 'bg-night-light/60 border border-gold/10'
              : 'bg-white/60 border border-emerald-dark/10'
          }`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-30`} />
          <div className="relative z-10">
            <span className="text-2xl">{stat.icon}</span>
            <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
              {stat.value}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AiSuggestion() {
  const isDarkMode = useStore((s) => s.isDarkMode);
  const hour = new Date().getHours();

  const getSuggestion = () => {
    if (hour >= 4 && hour < 7) return { text: 'وقت صلاة الفجر وأذكار الصباح 🌅', action: 'morning', label: 'ابدأ أذكار الصباح' };
    if (hour >= 7 && hour < 12) return { text: 'لا تنسَ أذكار الصباح 🌤️', action: 'morning', label: 'أذكار الصباح' };
    if (hour >= 12 && hour < 15) return { text: 'وقت صلاة الظهر، لا تنسَ أذكار ما بعد الصلاة 🕌', action: 'prayer', label: 'أذكار الصلاة' };
    if (hour >= 15 && hour < 17) return { text: 'وقت العصر، سبّح الله واذكره 📿', action: 'tasbih', label: 'ابدأ التسبيح' };
    if (hour >= 17 && hour < 20) return { text: 'حان وقت أذكار المساء 🌙', action: 'evening', label: 'ابدأ أذكار المساء' };
    if (hour >= 20 && hour < 23) return { text: 'ادعُ الله من الأدعية القرآنية 📖', action: 'quran', label: 'الأدعية القرآنية' };
    return { text: 'لا تنسَ أذكار النوم قبل النوم 😴', action: 'sleep', label: 'أذكار النوم' };
  };

  const suggestion = getSuggestion();
  const setCurrentPage = useStore((s) => s.setCurrentPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className={`p-4 rounded-2xl ${
        isDarkMode
          ? 'bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20'
          : 'bg-gradient-to-r from-emerald-dark/10 to-emerald-dark/5 border border-emerald-dark/20'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🤖</span>
        <span className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-emerald-dark'}`}>
          المساعد الروحاني
        </span>
      </div>
      <p className={`text-sm mb-3 ${isDarkMode ? 'text-ivory/80' : 'text-night/80'}`}>
        {suggestion.text}
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentPage(suggestion.action)}
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
          isDarkMode
            ? 'bg-gold/20 text-gold hover:bg-gold/30'
            : 'bg-emerald-dark/15 text-emerald-dark hover:bg-emerald-dark/25'
        }`}
      >
        {suggestion.label}
      </motion.button>
    </motion.div>
  );
}

export default function HomePage() {
  const { isDarkMode, setCurrentPage, updateStreak } = useStore();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const verse = "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ";

  // Daily greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'صباح الخير' : hour < 17 ? 'مساء النور' : 'مساء الخير';

  return (
    <div className="min-h-screen pb-28 pt-20">
      {/* Hero Section */}
      <div className="relative px-4 pt-6 pb-4">
        {/* Floating Crescent */}
        <div className="absolute top-4 left-4 opacity-30">
          <CrescentMoon size={50} />
        </div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-sm mb-2 ${isDarkMode ? 'text-gold/50' : 'text-emerald-dark/50'}`}
          >
            {greeting} 👋
          </motion.p>
          <motion.h1
            className={`text-4xl font-bold font-[Amiri] mb-2 ${
              isDarkMode ? 'text-gradient-gold' : 'text-emerald-dark'
            }`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            حصن المسلم
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-sm ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}
          >
            أذكار · أدعية · تسبيح
          </motion.p>
        </motion.div>

        {/* Quranic Verse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`relative text-center p-6 rounded-2xl mb-6 overflow-hidden ${
            isDarkMode
              ? 'bg-night-light/40 border border-gold/15'
              : 'bg-white/50 border border-emerald-dark/10'
          }`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          {/* Decorative corners */}
          <div className={`absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg ${isDarkMode ? 'border-gold/30' : 'border-emerald-dark/20'}`} />
          <div className={`absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg ${isDarkMode ? 'border-gold/30' : 'border-emerald-dark/20'}`} />
          <div className={`absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-lg ${isDarkMode ? 'border-gold/30' : 'border-emerald-dark/20'}`} />
          <div className={`absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg ${isDarkMode ? 'border-gold/30' : 'border-emerald-dark/20'}`} />

          <p className={`font-[Amiri] text-2xl leading-relaxed ${isDarkMode ? 'text-gold' : 'text-emerald-dark'}`}>
            ﴿ {verse} ﴾
          </p>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            سورة الرعد - آية 28
          </p>
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <HijriDate />
        </motion.div>
      </div>

      <GeometricDivider />

      {/* Search */}
      <div className="px-4 mb-6">
        <SearchBar />
      </div>

      {/* AI Suggestion */}
      <div className="px-4 mb-6">
        <AiSuggestion />
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-ivory' : 'text-night'}`}
        >
          📊 إحصائياتك
        </motion.h2>
        <StatsCards />
      </div>

      <GeometricDivider />

      {/* Categories Grid */}
      <div className="px-4 mb-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-ivory' : 'text-night'}`}
        >
          📂 الأقسام
        </motion.h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentPage(cat.id)}
              className={`relative p-5 rounded-2xl text-right overflow-hidden card-premium ${
                isDarkMode
                  ? 'bg-night-light/60 border border-gold/10 hover:border-gold/25'
                  : 'bg-white/60 border border-emerald-dark/10 hover:border-emerald-dark/20'
              }`}
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10`} />
              <div className="relative z-10">
                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <p className={`font-bold text-sm ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
                  {cat.name}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <GeometricDivider />

      {/* Quick Access Buttons */}
      <div className="px-4 mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-ivory' : 'text-night'}`}
        >
          ⚡ وصول سريع
        </motion.h2>
        <div className="space-y-3">
          {[
            { id: 'morning', label: 'ابدأ أذكار الصباح', icon: '🌅', desc: 'أذكار للحفظ والبركة' },
            { id: 'evening', label: 'ابدأ أذكار المساء', icon: '🌙', desc: 'أذكار للحماية الربانية' },
            { id: 'tasbih', label: 'التسبيح الإلكتروني', icon: '📿', desc: 'سبّح بسهولة وعدّ بدقة' },
          ].map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1 + i * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isDarkMode
                  ? 'bg-night-light/40 border border-gold/10 hover:border-gold/25'
                  : 'bg-white/50 border border-emerald-dark/10 hover:border-emerald-dark/20'
              }`}
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <span className="text-3xl">{item.icon}</span>
              <div className="text-right flex-1">
                <p className={`font-bold text-sm ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
                  {item.label}
                </p>
                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.desc}
                </p>
              </div>
              <span className={`text-lg ${isDarkMode ? 'text-gold/40' : 'text-emerald-dark/40'}`}>←</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className={`text-center py-6 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
      >
        <p>حصن المسلم ❤️ اللهم انفعنا بما علمتنا</p>
        <p className="mt-1">جميع الأحاديث من مصادر صحيحة</p>
      </motion.div>
    </div>
  );
}
