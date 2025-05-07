const Login = () => {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-500">Welcome Back!</h2>
        <form action="/login" method="POST" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
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
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
            <a href="/signup" className="text-pink-500 hover:underline">
            Join now
            </a>
        </p>
      </div>
    </div>
  );
};

export default Login;