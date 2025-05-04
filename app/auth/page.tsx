"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isLogin) {
      // Login
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/console",
      });
      if (res?.ok) {
        setMessage("Login successful. Redirecting...");
        window.location.href = res.url || "/console";
      } else {
        setMessage("Invalid email or password.");
      }
    } else {
      // Register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully. Logging you in...");
        setTimeout(() => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/console",
          });
        }, 2000);
      }
       else {
        setMessage(data.error || "Something went wrong.");
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">
          {isLogin ? "Login to DevLink Hub" : "Register to DevLink Hub"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}
        </form>

        <div className="text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMessage("");
              setIsLogin(!isLogin);
            }}
            className="text-green-700 hover:underline ml-1"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>
      </div>
    </main>
  );
}
