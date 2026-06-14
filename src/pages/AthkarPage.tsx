import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getAthkarByCategory } from '@/data/athkar';
import DhikrCard from '@/components/DhikrCard';
import { GeometricDivider } from '@/components/IslamicDecorations';
import { useMemo } from 'react';

interface AthkarPageProps {
  category: string;
}

const categoryInfo: Record<string, { title: string; icon: string; subtitle: string; verse: string; verseRef: string }> = {
  morning: {
    title: 'أذكار الصباح',
    icon: '🌅',
    subtitle: 'ابدأ يومك بذكر الله',
    verse: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    verseRef: 'سورة البقرة: 152',
  },
  evening: {
    title: 'أذكار المساء',
    icon: '🌙',
    subtitle: 'أمسِ في حفظ الله',
    verse: 'وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا',
    verseRef: 'سورة طه: 130',
  },
  sleep: {
    title: 'أذكار النوم',
    icon: '😴',
    subtitle: 'نم في أمان الله',
    verse: 'وَمِنْ آيَاتِهِ مَنَامُكُم بِاللَّيْلِ وَالنَّهَارِ',
    verseRef: 'سورة الروم: 23',
  },
  prayer: {
    title: 'أذكار الصلاة',
    icon: '🕌',
    subtitle: 'أذكار ما بعد الصلاة',
    verse: 'فَإِذَا قَضَيْتُمُ الصَّلَاةَ فَاذْكُرُوا اللَّهَ قِيَامًا وَقُعُودًا',
    verseRef: 'سورة النساء: 103',
  },
  prophets: {
    title: 'أدعية الأنبياء',
    icon: '📿',
    subtitle: 'ادعُ بدعاء الأنبياء',
    verse: 'وَزَكَرِيَّا إِذْ نَادَىٰ رَبَّهُ رَبِّ لَا تَذَرْنِي فَرْدًا',
    verseRef: 'سورة الأنبياء: 89',
  },
  quran: {
    title: 'الأدعية القرآنية',
    icon: '📖',
    subtitle: 'أدعية من القرآن الكريم',
    verse: 'وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ',
    verseRef: 'سورة غافر: 60',
  },
};

export default function AthkarPage({ category }: AthkarPageProps) {
  const isDarkMode = useStore((s) => s.isDarkMode);
  const athkar = useMemo(() => getAthkarByCategory(category), [category]);
  const info = categoryInfo[category] || categoryInfo.morning;

  const completedAthkar = useStore((s) => s.completedAthkar);
  const today = new Date().toISOString().split('T')[0];
  const completedCount = athkar.filter(d => {
    const found = completedAthkar.find(c => c.id === d.id && c.date === today);
    return found && found.count >= d.count;
  }).length;

  const progressPercent = athkar.length > 0 ? Math.round((completedCount / athkar.length) * 100) : 0;
  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen pb-28 pt-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative px-4 pt-6 pb-2"
      >
        <div className="text-center mb-6">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-5xl mb-3 block"
          >
            {info.icon}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl font-bold font-[Amiri] mb-1 ${
              isDarkMode ? 'text-gradient-gold' : 'text-emerald-dark'
            }`}
          >
            {info.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {info.subtitle}
          </motion.p>
        </div>

        {/* Verse Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`p-4 rounded-2xl text-center mb-6 ${
            isDarkMode
              ? 'bg-night-light/40 border border-gold/15'
              : 'bg-white/50 border border-emerald-dark/10'
          }`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <p className={`font-[Amiri] text-lg ${isDarkMode ? 'text-gold/80' : 'text-emerald-dark/80'}`}>
            ﴿ {info.verse} ﴾
          </p>
          <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {info.verseRef}
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center justify-between p-4 rounded-2xl mb-4 ${
            isDarkMode
              ? 'bg-night-light/40 border border-gold/10'
              : 'bg-white/50 border border-emerald-dark/10'
          }`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div>
            <p className={`font-bold text-sm ${isDarkMode ? 'text-ivory' : 'text-night'}`}>
              التقدم اليومي
            </p>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {completedCount} من {athkar.length} ذكر مكتمل
            </p>
          </div>
          <div className="relative">
            <svg width="56" height="56" className="-rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke={isDarkMode ? 'rgba(212,168,83,0.1)' : 'rgba(6,78,59,0.1)'} strokeWidth="4" />
              <motion.circle
                cx="28" cy="28" r="22" fill="none"
                stroke={progressPercent === 100 ? '#10b981' : isDarkMode ? '#d4a853' : '#064e3b'}
                strokeWidth="4"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                strokeLinecap="round"
                transition={{ duration: 1, delay: 0.8 }}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
              isDarkMode ? 'text-gold' : 'text-emerald-dark'
            }`}>
              {progressPercent}%
            </span>
          </div>
        </motion.div>
      </motion.div>

      <GeometricDivider />

      {/* Athkar List */}
      <div className="px-4">
        {athkar.map((dhikr, index) => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} index={index} />
        ))}
      </div>

      {/* Completion Message */}
      {progressPercent === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mx-4 p-6 rounded-2xl text-center ${
            isDarkMode
              ? 'bg-emerald-dark/30 border border-emerald-light/20'
              : 'bg-emerald-mid/10 border border-emerald-mid/20'
          }`}
        >
          <span className="text-4xl block mb-2">🎉</span>
          <p className={`font-bold text-lg ${isDarkMode ? 'text-emerald-light' : 'text-emerald-dark'}`}>
            ما شاء الله! أكملت جميع الأذكار
          </p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            بارك الله فيك وجعلها في ميزان حسناتك
          </p>
        </motion.div>
      )}
    </div>
  );
}
