import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompletedDhikr {
  id: number;
  count: number;
  date: string;
}

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Tasbih
  tasbihCount: number;
  tasbihTarget: number;
  tasbihTotal: number;
  incrementTasbih: () => void;
  resetTasbih: () => void;
  setTasbihTarget: (target: number) => void;

  // Completed Athkar
  completedAthkar: CompletedDhikr[];
  markDhikrCompleted: (id: number, count: number) => void;
  incrementDhikr: (id: number) => void;
  resetDailyProgress: () => void;
  getDhikrProgress: (id: number) => number;

  // Favorites
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  // Streak
  streak: number;
  lastActiveDate: string;
  updateStreak: () => void;

  // Stats
  totalAthkarCompleted: number;
  totalDays: number;

  // Current page
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Font size
  fontSize: number;
  setFontSize: (size: number) => void;
}

const today = () => new Date().toISOString().split('T')[0];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: true,
      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),

      // Tasbih
      tasbihCount: 0,
      tasbihTarget: 33,
      tasbihTotal: 0,
      incrementTasbih: () => set((s) => ({
        tasbihCount: s.tasbihCount + 1,
        tasbihTotal: s.tasbihTotal + 1,
      })),
      resetTasbih: () => set({ tasbihCount: 0 }),
      setTasbihTarget: (target) => set({ tasbihTarget: target }),

      // Completed Athkar
      completedAthkar: [],
      markDhikrCompleted: (id, count) => set((s) => {
        const existing = s.completedAthkar.find(d => d.id === id && d.date === today());
        if (existing) {
          return {
            completedAthkar: s.completedAthkar.map(d =>
              d.id === id && d.date === today() ? { ...d, count } : d
            ),
          };
        }
        return {
          completedAthkar: [...s.completedAthkar, { id, count, date: today() }],
          totalAthkarCompleted: s.totalAthkarCompleted + 1,
        };
      }),
      incrementDhikr: (id) => set((s) => {
        const existing = s.completedAthkar.find(d => d.id === id && d.date === today());
        if (existing) {
          return {
            completedAthkar: s.completedAthkar.map(d =>
              d.id === id && d.date === today() ? { ...d, count: d.count + 1 } : d
            ),
          };
        }
        return {
          completedAthkar: [...s.completedAthkar, { id, count: 1, date: today() }],
        };
      }),
      resetDailyProgress: () => set((s) => ({
        completedAthkar: s.completedAthkar.filter(d => d.date === today()),
      })),
      getDhikrProgress: (id) => {
        const state = get();
        const found = state.completedAthkar.find(d => d.id === id && d.date === today());
        return found ? found.count : 0;
      },

      // Favorites
      favorites: [],
      toggleFavorite: (id) => set((s) => ({
        favorites: s.favorites.includes(id)
          ? s.favorites.filter(f => f !== id)
          : [...s.favorites, id],
      })),
      isFavorite: (id) => get().favorites.includes(id),

      // Streak
      streak: 0,
      lastActiveDate: '',
      updateStreak: () => set((s) => {
        const todayStr = today();
        if (s.lastActiveDate === todayStr) return {};
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (s.lastActiveDate === yesterdayStr) {
          return { streak: s.streak + 1, lastActiveDate: todayStr, totalDays: s.totalDays + 1 };
        }
        return { streak: 1, lastActiveDate: todayStr, totalDays: s.totalDays + 1 };
      }),

      // Stats
      totalAthkarCompleted: 0,
      totalDays: 0,

      // Current page
      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Font size
      fontSize: 20,
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: 'hisn-almuslim-storage',
    }
  )
);
