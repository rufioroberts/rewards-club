import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  city: string;
}

interface AppState {
  userStatus: 'premium' | 'free' | 'lapsed' | null;
  hasCompletedOnboarding: boolean;
  hasSeenWelcome: boolean;
  profile: Profile | null;
  claimedRewards: string[];
  registeredEvents: string[];
  scenario: string;
}

type Action =
  | { type: 'SET_USER_STATUS'; payload: 'premium' | 'free' | 'lapsed' | null }
  | { type: 'COMPLETE_ONBOARDING'; payload: Profile }
  | { type: 'DISMISS_WELCOME' }
  | { type: 'CLAIM_REWARD'; payload: string }
  | { type: 'REGISTER_EVENT'; payload: string }
  | { type: 'CANCEL_EVENT'; payload: string }
  | { type: 'SET_SCENARIO'; payload: string }
  | { type: 'RESET' };

const initialState: AppState = {
  userStatus: null,
  hasCompletedOnboarding: false,
  hasSeenWelcome: false,
  profile: null,
  claimedRewards: [],
  registeredEvents: [],
  scenario: 'happy',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER_STATUS':
      return { ...state, userStatus: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, hasCompletedOnboarding: true, profile: action.payload };
    case 'DISMISS_WELCOME':
      return { ...state, hasSeenWelcome: true };
    case 'CLAIM_REWARD':
      if (state.claimedRewards.includes(action.payload)) return state;
      return { ...state, claimedRewards: [...state.claimedRewards, action.payload] };
    case 'REGISTER_EVENT':
      if (state.registeredEvents.includes(action.payload)) return state;
      return { ...state, registeredEvents: [...state.registeredEvents, action.payload] };
    case 'CANCEL_EVENT':
      return { ...state, registeredEvents: state.registeredEvents.filter(id => id !== action.payload) };
    case 'SET_SCENARIO':
      return { ...state, scenario: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
