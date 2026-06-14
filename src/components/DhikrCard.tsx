import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import type { Dhikr } from '@/data/athkar';
import { useState, useCallback } from 'react';

interface DhikrCardProps {
  dhikr: Dhikr;
  index: number;
}

export default function DhikrCard({ dhikr, index }: DhikrCardProps) {
  const { isDarkMode, incrementDhikr, getDhikrProgress, toggleFavorite, fontSize } = useStore();
  const progress = getDhikrProgress(dhikr.id);
  const isCompleted = progress >= dhikr.count;
  const progressPercent = Math.min((progress / dhikr.count) * 100, 100);
  const isFav = useStore((s) => s.favorites.includes(dhikr.id));
  const [showBenefits, setShowBenefits] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  const handleCount = useCallback(() => {
    if (!isCompleted) {
      incrementDhikr(dhikr.id);
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  }, [isCompleted, dhikr.id, incrementDhikr]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`${dhikr.content}\n\n${dhikr.reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [dhikr]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: dhikr.title,
          text: `${dhikr.content}\n\n${dhikr.reference}`,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  }, [dhikr, handleCopy]);

  // Circle progress
  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl overflow-hidden card-premium mb-4 ${
        isDarkMode
          ? 'bg-night-light/60 border border-gold/10'
          : 'bg-white/80 border border-emerald-dark/10'
      } ${isCompleted ? (isDarkMode ? 'border-emerald-light/30' : 'border-emerald-mid/30') : ''}`}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* Completed overlay */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute inset-0 z-0 ${
              isDarkMode ? 'bg-emerald-dark/10' : 'bg-emerald-mid/5'
            }`}
          />
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          className={`h-full ${isCompleted ? 'bg-emerald-light' : 'bg-gold'}`}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
              isDarkMode ? 'bg-gold/10 text-gold' : 'bg-emerald-dark/10 text-emerald-dark'
            }`}>
              {dhikr.title}
            </span>
            {isCompleted && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
                className="text-emerald-light text-lg"
              >
                ✓
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => toggleFavorite(dhikr.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            >
              <motion.span
                key={isFav ? 'filled' : 'empty'}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="text-sm"
              >
                {isFav ? '⭐' : '☆'}
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <motion.p
          className={`quran-text leading-loose mb-4 ${
            isDarkMode ? 'text-ivory' : 'text-night'
          } ${isCompleted ? 'opacity-60' : ''}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {dhikr.content}
        </motion.p>

        {/* Reference */}
        <p className={`text-xs mb-4 ${isDarkMode ? 'text-gold/60' : 'text-emerald-dark/60'}`}>
          📖 {dhikr.reference}
        </p>

        {/* Benefits toggle */}
        <AnimatePresence>
          {showBenefits && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className={`p-3 rounded-xl mb-4 text-sm ${
                isDarkMode ? 'bg-gold/5 text-gold/80 border border-gold/10' : 'bg-emerald-dark/5 text-emerald-dark/80 border border-emerald-dark/10'
              }`}>
                <span className="font-bold">✨ الفضل: </span>
                {dhikr.benefits}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Count button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleCount}
              disabled={isCompleted}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isCompleted
                  ? isDarkMode
                    ? 'bg-emerald-dark/30 text-emerald-light cursor-default'
                    : 'bg-emerald-mid/20 text-emerald-dark cursor-default'
                  : isDarkMode
                  ? 'bg-gold/15 text-gold hover:bg-gold/25 active:bg-gold/30'
                  : 'bg-emerald-dark/10 text-emerald-dark hover:bg-emerald-dark/20'
              }`}
            >
              {/* Ripple */}
              <AnimatePresence>
                {showRipple && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`absolute inset-0 rounded-xl ${isDarkMode ? 'bg-gold/30' : 'bg-emerald-dark/20'}`}
                  />
                )}
              </AnimatePresence>

              {/* Progress ring */}
              <svg width="28" height="28" className="-rotate-90">
                <circle cx="14" cy="14" r="11" fill="none" stroke={isDarkMode ? 'rgba(212,168,83,0.15)' : 'rgba(6,78,59,0.15)'} strokeWidth="2.5" />
                <motion.circle
                  cx="14" cy="14" r="11" fill="none"
                  stroke={isCompleted ? '#10b981' : isDarkMode ? '#d4a853' : '#064e3b'}
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="counter-ring"
                />
              </svg>
              <span className="relative z-10">
                {isCompleted ? 'تم ✓' : `${progress} / ${dhikr.count}`}
              </span>
            </motion.button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Benefits */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowBenefits(!showBenefits)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                isDarkMode ? 'hover:bg-gold/10 text-gold/60' : 'hover:bg-emerald-dark/10 text-emerald-dark/60'
              }`}
            >
              💡
            </motion.button>

            {/* Copy */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                isDarkMode ? 'hover:bg-gold/10 text-gold/60' : 'hover:bg-emerald-dark/10 text-emerald-dark/60'
              }`}
            >
              {copied ? '✅' : '📋'}
            </motion.button>

            {/* Share */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                isDarkMode ? 'hover:bg-gold/10 text-gold/60' : 'hover:bg-emerald-dark/10 text-emerald-dark/60'
              }`}
            >
              📤
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
