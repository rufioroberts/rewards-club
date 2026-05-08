import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function AuthCallback() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handlePremiumFirstTime = () => {
    dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
    navigate('/onboarding');
  };

  const handlePremiumReturning = () => {
    dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: {
        firstName: 'Raj',
        lastName: 'Singh',
        email: 'raj.singh@gmail.com',
        phone: '+91 81694 45897',
        dob: '1997-03-15',
        gender: 'male',
        city: 'Mumbai',
      },
    });
    navigate('/rewards');
  };

  const handleFreeUser = () => {
    dispatch({ type: 'SET_USER_STATUS', payload: 'free' });
    navigate('/not-eligible');
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-[1280px] mx-auto bg-white shadow-sm min-h-screen flex flex-col items-center justify-center px-6">
        {/* Prototype-only screen */}
        <div className="max-w-sm w-full">
          <div className="inline-block border border-gray-400 rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600 mb-4">
            Prototype only
          </div>
          <h1 className="text-xl font-black text-gray-900 mb-2">Simulate OAuth response</h1>
          <p className="text-xs text-gray-500 mb-8">
            In production, this screen doesn't exist. The Spotify OAuth callback determines the user type automatically.
          </p>

          <div className="space-y-3">
            <button
              onClick={handlePremiumFirstTime}
              className="w-full px-6 py-3.5 bg-gray-900 text-white font-bold text-sm rounded border border-gray-900 hover:bg-gray-700 transition-colors text-left"
            >
              <span className="block">Premium user (first time)</span>
              <span className="block text-[10px] text-gray-400 font-normal mt-0.5">Goes to onboarding</span>
            </button>
            <button
              onClick={handlePremiumReturning}
              className="w-full px-6 py-3.5 bg-gray-900 text-white font-bold text-sm rounded border border-gray-900 hover:bg-gray-700 transition-colors text-left"
            >
              <span className="block">Premium user (returning)</span>
              <span className="block text-[10px] text-gray-400 font-normal mt-0.5">Goes straight to rewards</span>
            </button>
            <button
              onClick={handleFreeUser}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold text-sm rounded hover:bg-gray-50 transition-colors text-left"
            >
              <span className="block">Free user</span>
              <span className="block text-[10px] text-gray-400 font-normal mt-0.5">Goes to not-eligible page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
