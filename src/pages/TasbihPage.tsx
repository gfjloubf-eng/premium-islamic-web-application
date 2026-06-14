import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState, useCallback } from 'react';
import { GeometricDivider } from '@/components/IslamicDecorations';

const tasbihOptions = [
  { text: 'سُبْحَانَ اللَّهِ', label: 'سبحان الله' },
  { text: 'الْحَمْدُ لِلَّهِ', label: 'الحمد لله' },
  { text: 'اللَّهُ أَكْبَرُ', label: 'الله أكبر' },
  { text: 'لَا إِلَهَ إِلَّا اللَّهُ', label: 'لا إله إلا الله' },
  { text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', label: 'لا حول ولا قوة إلا بالله' },
  { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', label: 'سبحان الله وبحمده' },
  { text: 'أَسْتَغْفِرُ اللَّهَ', label: 'أستغفر الله' },
  { text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', label: 'الصلاة على النبي ﷺ' },
];

const targets = [33, 34, 50, 100, 500, 1000];

export default function TasbihPage() {
  const {
    isDarkMode, tasbihCount, tasbihTarget, tasbihTotal,
    incrementTasbih, resetTasbih, setTasbihTarget
  } = useStore();

  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [showTargetPicker, setShowTargetPicker] = useState(false);

  const isCompleted = tasbihCount >= tasbihTarget;
  const progressPercent = Math.min((tasbihCount / tasbihTarget) * 100, 100);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleTap = useCallback(() => {
    if (!isCompleted) {
      incrementTasbih();
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 300);

      if (navigator.vibrate) {
        navigator.vibrate(15);
      }
    }
  }, [isCompleted, incrementTasbih]);

  return (
    <div className="min-h-screen pb-28 pt-20">
      <div className="px-4 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-5xl block mb-3">📿</span>
          <h1 className={`text-3xl font-bold font-[Amiri] mb-1 ${
            isDarkMode ? 'text-gradient-gold' : 'text-emerald-dark'
          }`}>
            التسبيح الإلكتروني
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            سبّح واذكر الله
          </p>
        </motion.div>

        {/* Dhikr Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {tasbihOptions.map((opt, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedDhikr(i); resetTasbih(); }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedDhikr === i
                    ? isDarkMode
                      ? 'bg-gold/20 text-gold border border-gold/30'
                      : 'bg-emerald-dark/15 text-emerald-dark border border-emerald-dark/30'
                    : isDarkMode
                    ? 'bg-night-light/60 text-gray-400 border border-gold/5 hover:border-gold/15'
                    : 'bg-white/60 text-gray-500 border border-emerald-dark/5 hover:border-emerald-dark/15'
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center mb-8"
        >
          {/* Dhikr Text */}
          <motion.p
            key={selectedDhikr}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-[Amiri] text-2xl mb-8 text-center ${
              isDarkMode ? 'text-gold/80' : 'text-emerald-dark/80'
            }`}
          >
            {tasbihOptions[selectedDhikr].text}
          </motion.p>

          {/* Counter Circle */}
          <div className="relative">
            {/* Pulse effect */}
            <AnimatePresence>
              {showPulse && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 rounded-full ${
                    isDarkMode ? 'bg-gold/20' : 'bg-emerald-dark/15'
                  }`}
                />
              )}
            </AnimatePresence>

            {/* Completion burst */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.3 }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
                  className="absolute inset-0 rounded-full bg-emerald-light/20"
                />
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleTap}
              className="relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer"
            >
              {/* Background ring */}
              <svg width="192" height="192" className="absolute -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none"
                  stroke={isDarkMode ? 'rgba(212,168,83,0.08)' : 'rgba(6,78,59,0.08)'} strokeWidth="6" />
                <motion.circle
                  cx="96" cy="96" r="80" fill="none"
                  stroke={isCompleted ? '#10b981' : isDarkMode ? '#d4a853' : '#064e3b'}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  strokeLinecap="round"
                  transition={{ duration: 0.3 }}
                />
              </svg>

              {/* Inner circle */}
              <div className={`w-36 h-36 rounded-full flex flex-col items-center justify-center ${
                isDarkMode
                  ? 'bg-night-light/80 border border-gold/20'
                  : 'bg-white/80 border border-emerald-dark/15'
              }`}
              style={{ backdropFilter: 'blur(10px)' }}
              >
                <motion.span
                  key={tasbihCount}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-4xl font-bold ${
                    isCompleted
                      ? 'text-emerald-light'
                      : isDarkMode ? 'text-gold' : 'text-emerald-dark'
                  }`}
                >
                  {tasbihCount}
                </motion.span>
                <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  من {tasbihTarget}
                </span>
              </div>
            </motion.button>
          </div>

          {/* Tap instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
          >
            {isCompleted ? '🎉 ما شاء الله! أكملت العدد' : 'اضغط على الدائرة للتسبيح'}
          </motion.p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={resetTasbih}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              isDarkMode
                ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                : 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
            }`}
          >
            🔄 إعادة تعيين
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowTargetPicker(!showTargetPicker)}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              isDarkMode
                ? 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'
                : 'bg-emerald-dark/10 text-emerald-dark border border-emerald-dark/20 hover:bg-emerald-dark/15'
            }`}
          >
            🎯 الهدف: {tasbihTarget}
          </motion.button>
        </div>

        {/* Target Picker */}
        <AnimatePresence>
          {showTargetPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {targets.map((t) => (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setTasbihTarget(t); resetTasbih(); setShowTargetPicker(false); }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      tasbihTarget === t
                        ? isDarkMode
                          ? 'bg-gold/20 text-gold border border-gold/30'
                          : 'bg-emerald-dark/15 text-emerald-dark border border-emerald-dark/30'
                        : isDarkMode
                        ? 'bg-night-light/60 text-gray-400 border border-gold/5'
                        : 'bg-white/60 text-gray-500 border border-emerald-dark/5'
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <GeometricDivider />

        {/* Total Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`p-5 rounded-2xl text-center ${
            isDarkMode
              ? 'bg-night-light/40 border border-gold/10'
              : 'bg-white/50 border border-emerald-dark/10'
          }`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            إجمالي التسبيحات
          </p>
          <p className={`text-3xl font-bold ${isDarkMode ? 'text-gold' : 'text-emerald-dark'}`}>
            {tasbihTotal.toLocaleString('ar-SA')}
          </p>
          <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            تسبيحة منذ بدء الاستخدام
          </p>
        </motion.div>
      </div>
    </div>
  );
}
