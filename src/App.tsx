import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";
import Home from "@pages/Dashboard/Home";
import AuthProvider from "@context/AuthProvider";
import ProtectedRoute from "@components/ProtectedRoute";
import AddTask from "@pages/Dashboard/AddTask";
import EditTask from "@pages/Dashboard/EditTask";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addTask"
              element={
                <ProtectedRoute>
                  <AddTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editTask/:id"
              element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
