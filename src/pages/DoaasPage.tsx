import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { prophetsDoaas, quranDoaas } from '@/data/athkar';
import DhikrCard from '@/components/DhikrCard';
import { GeometricDivider } from '@/components/IslamicDecorations';
import { useState, useMemo } from 'react';

export default function DoaasPage() {
  const isDarkMode = useStore((s) => s.isDarkMode);
  const [activeTab, setActiveTab] = useState<'prophets' | 'quran'>('prophets');

  const tabs = [
    { id: 'prophets' as const, label: 'أدعية الأنبياء', icon: '📿' },
    { id: 'quran' as const, label: 'الأدعية القرآنية', icon: '📖' },
  ];

  const doaas = useMemo(() => 
    activeTab === 'prophets' ? prophetsDoaas : quranDoaas,
    [activeTab]
  );

  return (
    <div className="min-h-screen pb-28 pt-20">
      <div className="px-4 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="text-5xl block mb-3">🤲</span>
          <h1 className={`text-3xl font-bold font-[Amiri] mb-1 ${
            isDarkMode ? 'text-gradient-gold' : 'text-emerald-dark'
          }`}>
            الأدعية
          </h1>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? isDarkMode
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'bg-emerald-dark/15 text-emerald-dark border border-emerald-dark/30'
                  : isDarkMode
                  ? 'bg-night-light/60 text-gray-400 border border-gold/5'
                  : 'bg-white/60 text-gray-500 border border-emerald-dark/5'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <GeometricDivider />

        {/* List */}
        {doaas.map((dhikr, index) => (
          <DhikrCard key={dhikr.id} dhikr={dhikr} index={index} />
        ))}
      </div>
    </div>
  );
}
