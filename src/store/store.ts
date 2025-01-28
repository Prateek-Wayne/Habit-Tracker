import { create } from "zustand";

export interface Habit{
    id:string,
    name:string,
    frequency:"daily"|"weekly",
    completedDates:string[],
    createdAt:string

}

interface HabitStore{
    habits:Habit[]
}

const useHabitStore=create<HabitStore>()((set,get)=>{
return {
    habits:[]
}
})

export default useHabitStore;