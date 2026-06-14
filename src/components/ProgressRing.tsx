import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 6,
  label,
  sublabel,
}: ProgressRingProps) {
  const isDarkMode = useStore((s) => s.isDarkMode);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;
  const isComplete = progress >= 100;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isDarkMode ? 'rgba(212,168,83,0.08)' : 'rgba(6,78,59,0.08)'}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isComplete ? '#10b981' : isDarkMode ? '#d4a853' : '#064e3b'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          strokeLinecap="round"
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <span className={`text-sm font-bold ${
            isComplete
              ? 'text-emerald-light'
              : isDarkMode ? 'text-gold' : 'text-emerald-dark'
          }`}>
            {label}
          </span>
        )}
        {sublabel && (
          <span className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
