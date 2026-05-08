import { useNavigate } from 'react-router-dom';

export function LoginGate() {
  const navigate = useNavigate();

  function handleSpotifyLogin() {
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-900 relative flex flex-col">
      {/* Full bleed background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-full border-[3px] border-dashed border-gray-500 m-8 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-medium tracking-wide">IMG</span>
          </div>
        </div>
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header - just Spotify logo in the corner */}
        <header className="px-8 lg:px-12 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white" />
            <span className="text-sm font-bold text-white tracking-tight">Spotify</span>
          </div>
        </header>

        {/* Hero content - vertically centred */}
        <section className="flex-1 flex items-center px-8 lg:px-12 xl:px-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.05] animate-fade-up">
              Rewards Club
            </h1>
            <p className="text-base lg:text-lg text-gray-300 mb-10 max-w-md leading-relaxed animate-fade-up" style={{ animationDelay: '120ms' }}>
              Discounts on brands you already use. Early access to gigs, meet and greets, and listening parties. Part of your Premium membership.
            </p>
            <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
            <button
              onClick={handleSpotifyLogin}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold text-sm rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-gray-900" />
              Log in with your Spotify account
            </button>
            </div>
          </div>
        </section>

        {/* Footer line */}
        <footer className="px-8 lg:px-12 py-6">
          <p className="text-xs text-gray-600">
            Available to Spotify Premium subscribers in India.
          </p>
        </footer>
      </div>
    </div>
  );
}
