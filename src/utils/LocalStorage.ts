import type { LocalStorageValue } from "./types";

export const saveUserToLocalStorage = ({ user, token }: LocalStorageValue) => {
  try {
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user:", error);
  }
};
export const getValueFromLocalStorage = <T = unknown>(
  key: string
): T | string | null => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return null;

    // checking if its token then dontt ned parsing
    if (
      storedValue.trim().startsWith("{") ||
      storedValue.trim().startsWith("[")
    ) {
      return JSON.parse(storedValue) as T;
    }

    return storedValue; // likely a token or plain string
  } catch (error) {
    console.error(`Error getting key "${key}" from localStorage:`, error);
    return null;
  }
};
