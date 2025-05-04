export default function DashboardPage() {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Dashboard</h1>
          <p className="text-gray-700">Welcome to your dashboard.</p>
  
          <form action="/" method="POST" className="mt-6">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </form>
        </div>
      </main>
    );
  }
  