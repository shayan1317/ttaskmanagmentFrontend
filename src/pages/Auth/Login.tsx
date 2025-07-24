import { Input } from "@components/atoms/Inputs";
import AuthLayout from "@components/AuthLayout";
import API from "@utils/axios";
import { saveUserToLocalStorage } from "@utils/LocalStorage";
import axios from "axios";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const formData = new FormData();

  const onSubmit = async () => {
    formData.append("email", email);
    formData.append("password", password);
    try {
      let data = { email, password };
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("ress", res);
      if (res && res.data) {
        console.log("Login successful", res.data);
        const { token, ...rest } = res.data.user;
        toast.success("User login successfully");
        saveUserToLocalStorage(rest);
        saveUserToLocalStorage(token);
        navigate("/tasks");
      } else {
        console.error("signup failed with empty response.");
      }
    } catch (error: any) {
      console.log(
        "server errror:",
        error.response.data?.message || error.response.data
      );
      toast.error(error.response.data?.message);
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col w-[90%]">
        <h2 className="text-[clamp(1.2rem,2.2vw,2.1rem)] font-semibold mt-6">
          Welcome Back
        </h2>
        <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-gray-500 mb-6">
          Please enter your details to log in
        </p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="text-start">
            <label className="text-[clamp(1rem,1.7vw,1.4rem)] font-medium">
              Email Address
            </label>
            <Input
              value={email}
              handleChange={(value) => setEmail(value.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </div>

          <div className="text-start">
            <label className="text-[clamp(1rem,1.7vw,1.4rem)] font-medium">
              Password
            </label>
            <Input
              value={password}
              handleChange={(value) => setPassword(value.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md"
          >
            LOGIN
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium">
            signup
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
