import { create } from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware';

export interface Habit{
    id:string,
    name:string,
    frequency:"daily"|"weekly",
    completedDates:string[],
    createdAt:string
}

interface HabitStore{
    habits:Habit[];
    addHabit:(name:string,frequency:"daily"|"weekly")=>void;
    deleteHabit:(id:string)=>void;
    updateHabit:(id:string,date:string)=>void
}

const useHabitStore=create<HabitStore>()(persist(((set,get)=>{
    return {
        habits:[],
        addHabit:(name,frequency)=>{
            set((state)=>{
                return{
                habits:[
                  ...state.habits,
                  {
                    id:Date.now().toString(),
                    name,
                    frequency,
                    completedDates:[],
                    createdAt:new Date().toISOString(),
                }
                ]
                }
    
            })
        },
        deleteHabit:(id)=>{
            set((state)=>{
                return{
                    habits:state.habits.filter((habit)=>habit.id!==id)
                }
            })
        },
        updateHabit:(id,date)=>{
            set((state)=>{
                return{
                    habits:state.habits.map((habit)=>
                    habit.id===id?{...habit,completedDates:habit.completedDates.includes(date)?habit.completedDates.filter((d)=>d!==date):[...habit.completedDates,date]}  :habit)
                }
            })
        }
    }
    }),{
        name: 'habit-tracker',
        storage: createJSONStorage(() => sessionStorage),
      }))



export default useHabitStore;