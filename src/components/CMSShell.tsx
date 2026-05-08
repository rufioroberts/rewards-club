import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface CMSShellProps {
  children: ReactNode;
}

/**
 * CMS Admin Shell -- blue themed.
 * Clearly NOT part of the user experience.
 * This wraps all /cms/* routes.
 * Desktop only -- shows a message on mobile/tablet.
 */
export function CMSShell({ children }: CMSShellProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { path: '/cms', label: 'Dashboard', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z', exact: true },
    { path: '/cms/events', label: 'Events', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    { path: '/cms/events/new', label: 'Create Event', icon: 'M12 4.5v15m7.5-7.5h-15' },
    { path: '/cms/rewards', label: 'Rewards (API)', icon: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125' },

  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
    {/* Desktop-only gate */}
    <div className="lg:hidden min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center max-w-xs">
        <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-white mb-2">Desktop only</h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">The CMS is designed for desktop use. Please switch to a larger screen to manage content.</p>
        <Link
          to="/rewards"
          className="inline-block px-6 py-3 bg-blue-500 text-white text-sm font-bold rounded-full hover:bg-blue-400 transition-colors"
        >
          Back to site
        </Link>
      </div>
    </div>

    {/* Desktop CMS layout */}
    <div className="hidden lg:flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900 flex flex-col transition-all duration-200 shrink-0`}>
        {/* Logo area */}
        <div className="px-4 py-5 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">RC</span>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Rewards Club</div>
                <div className="text-[10px] text-slate-400">Content Manager</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"
          >
            <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive(item.path, item.exact)
                  ? 'bg-blue-500/20 text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Back to front-end */}
        <div className="px-2 py-4 border-t border-slate-700/50">
          <Link
            to="/rewards"
            className={`flex items-center gap-3 rounded-lg text-sm transition-all ${
              sidebarCollapsed
                ? 'px-2 py-2.5 justify-center bg-blue-500 hover:bg-blue-400'
                : 'px-3 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-medium'
            }`}
          >
            <svg className="w-4.5 h-4.5 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            {!sidebarCollapsed && <span>Back to front-end</span>}
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">CMS Wireframe</span>
            </div>
            <span className="text-xs text-slate-400">Not part of user experience</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">admin@spotify.com</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[10px] text-blue-600 font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
