import { useAuth } from "@context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth() || {};
  console.log("user", user);
  if (!user) {
    console.log("user", user);
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
