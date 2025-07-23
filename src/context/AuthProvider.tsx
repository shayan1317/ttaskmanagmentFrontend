import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "utils/types";
type AuthContextType = {
  user: User;
};
const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      let user = localStorage.getItem("user") || "";
      let parsedUser = user ? JSON.parse(user) : {};
      if (parsedUser) {
        setUser(parsedUser);
        navigate("/tasks");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={user ? { user } : null}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
