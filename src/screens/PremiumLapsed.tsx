import { Link } from 'react-router-dom';

export function PremiumLapsed() {
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
            <span className="text-xl text-gray-300 font-bold">!</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            Your subscription has ended
          </h1>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Your Spotify Premium plan is no longer active. Rewards Club requires an active Premium subscription.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-10 text-left">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1.5">Legal disclaimer</p>
            <p className="text-xs text-gray-400 leading-relaxed italic">[Client to provide legal disclaimer text regarding access termination upon subscription lapse]</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="px-8 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Resubscribe to Premium
            </a>
            <Link
              to="/"
              className="px-8 py-3 text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors"
            >
              Go back
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
