import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SpotifyLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('priya.sharma@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    // Simulate login -- go to auth permissions screen
    navigate('/auth-permissions');
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Spotify branding header */}
      <header className="px-8 py-8 animate-fade-in">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white" />
          <span className="text-sm font-bold text-white tracking-tight">Spotify</span>
        </div>
      </header>

      {/* Login form -- centred */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 text-center">
            Log in to Spotify
          </h1>
          <p className="text-sm text-gray-400 text-center mb-10">
            To continue to Rewards Club
          </p>

          {/* Divider with social options hint */}
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center gap-3 px-5 py-3.5 border border-gray-600 rounded-full text-sm font-semibold text-white hover:border-gray-400 transition-colors cursor-pointer">
              <div className="w-5 h-5 rounded bg-gray-600" />
              Continue with Google
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-3.5 border border-gray-600 rounded-full text-sm font-semibold text-white hover:border-gray-400 transition-colors cursor-pointer">
              <div className="w-5 h-5 rounded bg-gray-600" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-xs text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Email/password form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Email or username</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-transparent border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 bg-transparent border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors pr-12"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-3 mt-5 cursor-pointer">
            <div className="w-4 h-4 border border-gray-600 rounded" />
            <span className="text-sm text-gray-300">Remember me</span>
          </label>

          {/* Submit */}
          <button
            onClick={handleLogin}
            className="mt-8 w-full py-4 bg-[#1ED760] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Log In
          </button>

          {/* Forgot password */}
          <p className="text-center mt-6">
            <span className="text-sm text-gray-400 underline decoration-gray-600 hover:text-white transition-colors cursor-pointer">
              Forgot your password?
            </span>
          </p>

          {/* Sign up link */}
          <div className="mt-10 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <span className="text-white font-semibold underline cursor-pointer">Sign up for Spotify</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
