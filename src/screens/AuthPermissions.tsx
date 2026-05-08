import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function AuthPermissions() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  function handleApprove() {
    dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
    if (state.hasCompletedOnboarding) {
      navigate('/rewards');
    } else {
      navigate('/onboarding');
    }
  }

  function handleDeny() {
    navigate('/');
  }

  const permissions = [
    { label: 'View your Spotify account data', detail: 'Name, email, subscription plan' },
    { label: 'View your activity on Spotify', detail: 'Listening history, top artists' },
    { label: 'View your subscription details', detail: 'Plan type, billing country' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="px-8 py-8 animate-fade-in">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white" />
          <span className="text-sm font-bold text-white tracking-tight">Spotify</span>
        </div>
      </header>

      {/* Auth card -- centred */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md animate-fade-up">
          <div className="bg-gray-800 rounded-3xl p-8 md:p-10">
            {/* App identity */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gray-700 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Rewards Club</h2>
                <p className="text-xs text-gray-400">by Spotify India</p>
              </div>
            </div>

            {/* Explanation */}
            <h1 className="text-xl md:text-2xl font-black text-white mb-2">
              Rewards Club wants to access your Spotify account
            </h1>
            <p className="text-sm text-gray-400 mb-8">
              This lets us verify your Premium membership and personalise your rewards.
            </p>

            {/* Permissions list */}
            <div className="space-y-4 mb-10">
              {permissions.map((perm, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#1ED760]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#1ED760]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{perm.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{perm.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleApprove}
                className="w-full py-4 bg-[#1ED760] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Agree
              </button>
              <button
                onClick={handleDeny}
                className="w-full py-4 bg-transparent border border-gray-600 text-white font-semibold text-sm rounded-full hover:border-gray-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Fine print */}
            <p className="text-[11px] text-gray-500 mt-6 text-center leading-relaxed">
              By agreeing, you allow Rewards Club to access the data listed above. You can revoke access at any time from your Spotify account settings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
