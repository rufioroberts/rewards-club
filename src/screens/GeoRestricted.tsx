export function GeoRestricted() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <header className="px-6 lg:px-12 xl:px-20 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gray-900" />
          <span className="text-sm font-bold text-gray-900 tracking-tight">Rewards Club</span>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            Not available in your region
          </h1>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Rewards Club is currently available to Spotify Premium users in India only.
          </p>
          <p className="text-xs text-gray-300 mb-10 leading-relaxed">
            If you believe this is an error, check that your VPN is disabled and try again.
          </p>
          <a
            href="https://spotify.com"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Spotify
          </a>
        </div>
      </section>
    </div>
  );
}
