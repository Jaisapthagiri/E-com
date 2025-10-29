import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = state === "login" ? "/api/user/login" : "/api/user/register";
      const payload =
        state === "register" ? { name, email, password } : { email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        toast.success(state === "login" ? "Logged in successfully" : "Account created");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow-xl p-8 py-12 w-80 sm:w-[352px]"
      >
        <p className="text-2xl font-medium text-center">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              type="text"
              required
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary-500"
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            required
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary-500"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary-500"
          />
        </div>

        {state === "register" ? (
          <p className="text-center w-full">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center w-full">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 text-black rounded-md cursor-pointer bg-primary hover:bg-primary-dull transition-all"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
