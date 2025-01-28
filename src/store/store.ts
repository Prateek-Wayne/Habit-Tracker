import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
  createdAt: string;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (name: string, frequency: 'daily' | 'weekly') => void;
  deleteHabit: (id: string) => void;
  updateHabit: (id: string, date: string) => void;
  fetchHabits: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) 
      return {
        habits: [],
        isLoading: false,
        error: null,
        addHabit: (name, frequency) => {
          set((state) => {
            return {
              habits: [
                ...state.habits,
                {
                  id: Date.now().toString(),
                  name,
                  frequency,
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
              ],
            };
          });
        },
        deleteHabit: (id) => {
          set((state) => {
            return {
              habits: state.habits.filter((habit) => habit.id !== id),
            };
          });
        },
        updateHabit: (id, date) => {
          set((state) => {
            return {
              habits: state.habits.map((habit) =>
                habit.id === id
                  ? {
                      ...habit,
                      completedDates: habit.completedDates.includes(date)
                        ? habit.completedDates.filter((d) => d !== date)
                        : [...habit.completedDates, date],
                    }
                  : habit
              ),
            };
          });
        },
        fetchHabits: async () => {
          set({ isLoading: true });
          try {
            const currentHabit = get().habits;
            if (currentHabit.length > 0) {
              set({
                isLoading: false,
              });
              return;
            }

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const mockHabits: Habit[] = [
              {
                id: '1',
                name: 'Leetcode',
                frequency: 'daily',
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
              {
                id: '2',
                name: 'Jogging',
                frequency: 'daily',
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ];

            set({ habits: mockHabits, isLoading: false });
          } catch (error) {
            set({ error: 'Failed to fetch habits', isLoading: false });
          }
        },
      };
    },
    {
      name: 'habit-tracker',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useHabitStore;
