import { motion } from 'framer-motion';

export function OttomanArch() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto opacity-20" fill="none">
      <path
        d="M20 200 L20 80 Q20 10 200 10 Q380 10 380 80 L380 200"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gold"
      />
      <path
        d="M40 200 L40 90 Q40 30 200 30 Q360 30 360 90 L360 200"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/50"
      />
    </svg>
  );
}

export function IslamicStar({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      <polygon
        points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/30"
      />
      <polygon
        points="50,15 57,40 82,40 62,55 69,80 50,65 31,80 38,55 18,40 43,40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-gold/20"
      />
    </motion.svg>
  );
}

export function GeometricDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="3" y="3" width="14" height="14" transform="rotate(45 10 10)" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold/50" />
          <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold/30" />
        </svg>
      </motion.div>
      <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
    </div>
  );
}

export function MosqueDome({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={`w-32 ${className}`} fill="none">
      <path
        d="M100 10 Q100 10 140 50 Q160 70 160 90 L40 90 Q40 70 60 50 Q100 10 100 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gold/40"
      />
      <line x1="100" y1="0" x2="100" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-gold/40" />
      <circle cx="100" cy="0" r="3" fill="currentColor" className="text-gold/40" />
      <line x1="40" y1="90" x2="40" y2="110" stroke="currentColor" strokeWidth="1" className="text-gold/30" />
      <line x1="160" y1="90" x2="160" y2="110" stroke="currentColor" strokeWidth="1" className="text-gold/30" />
      <line x1="30" y1="110" x2="170" y2="110" stroke="currentColor" strokeWidth="1" className="text-gold/30" />
    </svg>
  );
}

export function CrescentMoon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M60 10 A40 40 0 1 0 60 90 A30 30 0 1 1 60 10"
        fill="currentColor"
        className="text-gold/30"
      />
      <circle cx="68" cy="18" r="4" fill="currentColor" className="text-gold/20" />
    </motion.svg>
  );
}
