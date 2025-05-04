'use client';

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
   
    alert("Register logic to be added");
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4 p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold">Register</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-green-600 text-white py-2">Register</button>
      </form>
    </main>
  );
}
