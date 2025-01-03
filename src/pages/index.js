import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      router.push({
        pathname: '/surprise',
        query: { name: name.trim() }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              🎉 New Beginnings 2025 ✨
            </h1>
            <p className="text-gray-600">
            Let's begin this new year with hope and inspiration. Enter your name to set your intentions for 2025!
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            />
            
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Let's Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}