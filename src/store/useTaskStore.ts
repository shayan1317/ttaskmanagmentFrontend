import type { Task } from "@utils/types";
import { create } from "zustand";

// opeartions on taskss
type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

//all crud oprations are defined here and setting states of task here
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map(
        (task) => (task.id === +id ? { ...task, ...updates } : task) //+ plus string number just like Number()
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== +id),
    })),
}));
