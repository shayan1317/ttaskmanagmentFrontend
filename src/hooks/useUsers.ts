import API from "@utils/axios";
import { useState, useEffect } from "react";

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand store functions

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/users");
      return res;
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError(err.response?.data?.message || "failed to fetch tasks");
    }
  };
  const searchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/users");
      return res;
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError(err.response?.data?.message || "failed to fetch tasks");
    }
  };

  return {
    loading,
    error,
    getAllUsers,
  };
};
