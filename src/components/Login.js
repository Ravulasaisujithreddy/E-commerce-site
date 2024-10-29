import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../Firebase/firebase";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loginPage, setLoginPage] = useState(true);

  const navigate = useNavigate();

  const handleGuestLogin = () => {
    onLogin("guest");
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      if (res?.user) {
        onLogin("user");
        navigate("/");
      } else {
        const message = res.toString().split("/")[1].split("-").join(" ");
        setError(message);
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login Error: ", error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, email, password);
      if (res?.user) {
        onLogin("user");
        navigate("/");
      } else {
        const message = res.toString().split("/")[1].split("-").join(" ");
        setError(message);
        console.error("Unexpected signup response:", res);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {loginPage ? "Login" : "Signup"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form
          onSubmit={loginPage ? handleLogin : handleSignup}
          className="space-y-6"
        >
          {!loginPage && (
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {loginPage ? "Login" : "Signup"}
          </button>
        </form>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <p className="text-black">Already a user?</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoginPage(!loginPage);
            }}
            className="text-blue-500 hover:underline"
          >
            {loginPage ? "Signup" : "Login"}
          </button>
        </div>

        <button
          
          onClick={(e) => {
            e.preventDefault();
            handleGuestLogin();
          }}
          className="block mt-4 text-center text-gray-500 hover:underline"
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
};

export default Login;
