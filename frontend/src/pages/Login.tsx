import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
         
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      const user = await res.json();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', user.username);
      navigate(`/profile/${user.username}`);
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login error');
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-500">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-400 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-pink-500 hover:underline">Join now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
