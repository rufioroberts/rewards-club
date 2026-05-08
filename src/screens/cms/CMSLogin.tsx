import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CMSLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@spotify.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    // Wireframe: any valid-looking credentials pass
    setError('');
    navigate('/cms');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-bold">RC</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Rewards Club CMS</h1>
          <p className="text-sm text-slate-400">Sign in to manage content</p>
        </div>

        {/* Login card */}
        <div className="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-xs text-red-400 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                placeholder="admin@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-medium">{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-8 py-3.5 bg-blue-500 text-white font-bold text-sm rounded-full hover:bg-blue-400 transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
          >
            Sign in
          </button>

          <p className="text-center text-xs text-slate-500 mt-5">
            Access restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
