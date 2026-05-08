import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface WireframeShellProps {
  children: ReactNode;
  showNav?: boolean;
}

export function WireframeShell({ children, showNav = true }: WireframeShellProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/rewards', label: 'Rewards', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
    { path: '/history', label: 'History', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/profile', label: 'Account', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Site header */}
      {showNav && (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-5 md:px-6 lg:px-12 xl:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/rewards" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gray-900" />
              <span className="text-sm font-bold text-gray-900 tracking-tight">Rewards Club</span>
            </Link>
            <nav className="hidden md:flex gap-8">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-colors ${
                    location.pathname.startsWith(item.path)
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-400 hover:text-gray-600 font-medium'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Log out - desktop */}
            <button
              onClick={() => window.location.href = '/'}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              Log out
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-9m9 0l-3-3m3 3l-3 3" />
              </svg>
            </button>
            {/* User avatar - desktop */}
            <div className="hidden md:flex w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm items-center justify-center">
              <span className="text-[10px] text-gray-500 font-semibold">PS</span>
            </div>
            {/* Hamburger - mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
              aria-label="Open menu"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Panel */}
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in">
            {/* Close */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <span className="text-sm font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User card */}
            <div className="px-6 py-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-bold">PS</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Priya Sharma</div>
                  <div className="text-xs text-gray-400">Premium member</div>
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-4">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl mb-1 transition-all ${
                    location.pathname.startsWith(item.path)
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="text-sm font-semibold">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Log out + Footer */}
            <div className="px-4 py-4 border-t border-gray-50">
              <button
                onClick={() => { setMobileMenuOpen(false); window.location.href = '/'; }}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl w-full text-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-9m9 0l-3-3m3 3l-3 3" />
                </svg>
                <span className="text-sm font-semibold">Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Site footer */}
      {showNav && (
        <footer className="mt-auto border-t border-gray-100 bg-white px-5 md:px-6 lg:px-12 xl:px-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gray-900" />
              <span className="text-xs font-bold text-gray-400 tracking-tight">Rewards Club</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/terms" className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">Privacy Policy</Link>
              <Link to="/profile" className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">Account</Link>
            </nav>
            <p className="text-xs text-gray-300">Spotify India. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
