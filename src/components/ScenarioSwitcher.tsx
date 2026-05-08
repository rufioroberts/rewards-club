import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

interface Scenario {
  id: string;
  label: string;
  description: string;
  category: 'user-state' | 'data-state' | 'edge-case';
}

const scenarios: Scenario[] = [
  // User states
  { id: 'happy', label: 'Happy path (Premium)', description: 'Logged-in Premium user, full catalog, events available', category: 'user-state' },
  { id: 'free-user', label: 'Free user', description: 'Logged in but not Premium - can browse but cannot claim or register', category: 'user-state' },
  { id: 'lapsed', label: 'Lapsed Premium', description: 'Was Premium, subscription ended - can see history but new actions locked', category: 'user-state' },
  // Data states
  { id: 'empty-rewards', label: 'Empty rewards (API down)', description: 'Razorpay API returns no offers - maintenance or budget exhausted', category: 'data-state' },
  { id: 'empty-events', label: 'No live events', description: 'No events currently scheduled - between event cycles', category: 'data-state' },
  { id: 'empty-both', label: 'Completely empty', description: 'No rewards AND no events - worst case empty state', category: 'data-state' },
  // Edge cases
  { id: 'all-claimed', label: 'All rewards claimed', description: 'User has claimed every available offer - what next?', category: 'edge-case' },
  { id: 'all-events-full', label: 'All events sold out', description: 'Every event is at capacity - nothing to register for', category: 'edge-case' },
];

const categoryLabels = {
  'user-state': 'User states',
  'data-state': 'Data states',
  'edge-case': 'Edge cases',
};

export function ScenarioSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useApp();
  const location = useLocation();
  const [activeScenario, setActiveScenario] = useState<string>('happy');

  // Don't show on CMS pages
  if (location.pathname.startsWith('/cms')) return null;

  const applyScenario = (scenarioId: string) => {
    setActiveScenario(scenarioId);

    switch (scenarioId) {
      case 'happy':
        dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
        dispatch({ type: 'SET_SCENARIO', payload: 'happy' });
        break;
      case 'free-user':
        dispatch({ type: 'SET_USER_STATUS', payload: 'free' });
        dispatch({ type: 'SET_SCENARIO', payload: 'free-user' });
        break;
      case 'lapsed':
        dispatch({ type: 'SET_USER_STATUS', payload: 'lapsed' });
        dispatch({ type: 'SET_SCENARIO', payload: 'lapsed' });
        break;
      case 'empty-rewards':
        dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
        dispatch({ type: 'SET_SCENARIO', payload: 'empty-rewards' });
        break;
      case 'empty-events':
        dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
        dispatch({ type: 'SET_SCENARIO', payload: 'empty-events' });
        break;
      case 'empty-both':
        dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
        dispatch({ type: 'SET_SCENARIO', payload: 'empty-both' });
        break;
      case 'all-claimed':
        dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
        dispatch({ type: 'SET_SCENARIO', payload: 'all-claimed' });
        break;
      case 'all-events-full':
        dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
        dispatch({ type: 'SET_SCENARIO', payload: 'all-events-full' });
        break;
    }
  };

  const currentScenario = scenarios.find(s => s.id === activeScenario);

  return (
    <>
      {/* Floating trigger pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-44 z-[9999] px-4 py-2.5 bg-violet-500 text-white text-[11px] font-bold rounded-full shadow-lg shadow-violet-500/30 hover:bg-violet-600 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
        title="Switch between edge case scenarios"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
        Scenarios
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-44 z-[9999] w-80 bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 bg-violet-50 border-b border-violet-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-violet-900">Edge Case Scenarios</h3>
              <button onClick={() => setIsOpen(false)} className="text-violet-400 hover:text-violet-600 cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {currentScenario && (
              <p className="text-[11px] text-violet-600 mt-1">Active: {currentScenario.label}</p>
            )}
          </div>

          {/* Scenario list */}
          <div className="max-h-80 overflow-y-auto p-3">
            {(['user-state', 'data-state', 'edge-case'] as const).map(category => (
              <div key={category} className="mb-3 last:mb-0">
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] px-2 mb-1.5">
                  {categoryLabels[category]}
                </div>
                <div className="space-y-1">
                  {scenarios.filter(s => s.category === category).map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => applyScenario(scenario.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        activeScenario === scenario.id
                          ? 'bg-violet-50 border border-violet-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                          activeScenario === scenario.id ? 'bg-violet-500' : 'bg-gray-200'
                        }`} />
                        <span className={`text-xs font-semibold ${
                          activeScenario === scenario.id ? 'text-violet-900' : 'text-gray-700'
                        }`}>
                          {scenario.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 ml-4 leading-relaxed">
                        {scenario.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Switching scenarios changes the app state. Navigate to /rewards to see the effect.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
