import { useTaskStore } from "@store/useTaskStore";
import API from "@utils/axios";
import { useState, useEffect } from "react";

export const useTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand store functions
  const {
    setTasks,
    addTask,
    updateTask: updateStoreTask,
    deleteTask: deleteStoreTask,
  } = useTaskStore();

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data); // <-- update store
      return res.data;
    } catch (err: any) {
      console.error("Failed to fetch tasks:", err);
      setError(err.response?.data?.message || "failed to fetch tasks");
    }
  };
  const getTaskById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.get(`/tasks/${id}`);
      return res.data;
    } catch (err: any) {
      console.error("Failed to fetchhh task:", err);
      setError(err.response?.data?.error || "Failed to fetch task");
      return null;
    }
  };
  const createTask = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post("/tasks", formData);
      addTask(res.data); // <-- update store
      return res.data;
    } catch (err: any) {
      console.error("Failed to create task:", err);
      setError(err.response?.data?.message || "failed to create task");
      throw err;
    }
  };

  const updateTask = async (id: number, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.put(`/tasks/${id}`, formData);
      updateStoreTask(String(id), res.data); // <-- update store
      return res.data;
    } catch (err: any) {
      console.error("Failed to update task:", err);
      setError(err.response?.data?.message || "failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await API.delete(`/tasks/${id}`);
      deleteStoreTask(String(id)); // <-- update store
    } catch (err: any) {
      console.error("Failed to delete task:", err);
      setError(err.response?.data?.message || "failed to delete task");
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
  };
};
