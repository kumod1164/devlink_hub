// app/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-white p-6">
      <h1 className="text-4xl font-extrabold text-green-700 mb-4 text-center">
        Welcome to DevLink Hub
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
        Connect with top developers, collaborate on ideas, and build your dream tech team.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/auth")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/auth")}
          className="border border-green-600 text-green-700 px-6 py-2 rounded-lg hover:bg-green-50 transition"
        >
          Register
        </button>
      </div>
    </main>
  );
}
