import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AnnotationToggle } from './components/Annotation';
import { LoginGate } from './screens/LoginGate';
import { SpotifyLogin } from './screens/SpotifyLogin';
import { AuthPermissions } from './screens/AuthPermissions';
import { AuthCallback } from './screens/AuthCallback';
import { NotEligible } from './screens/NotEligible';
import { Onboarding } from './screens/Onboarding';
import { RewardsCatalog } from './screens/RewardsCatalog';
import { OfferDetail } from './screens/OfferDetail';
import { CodeReveal } from './screens/CodeReveal';
import { EventRegister } from './screens/EventRegister';
import { History } from './screens/History';
import { Profile } from './screens/Profile';
import { PremiumLapsed } from './screens/PremiumLapsed';
import { GeoRestricted } from './screens/GeoRestricted';
import { ErrorState } from './screens/ErrorState';
import { Terms } from './screens/Terms';
import { Privacy } from './screens/Privacy';
import { CMSDashboard } from './screens/cms/CMSDashboard';
import { CMSEventsList } from './screens/cms/CMSEventsList';
import { CMSEventEditor } from './screens/cms/CMSEventEditor';
import { CMSRewards } from './screens/cms/CMSRewards';
import { CMSLogin } from './screens/cms/CMSLogin';
import { EventCancel } from './screens/EventCancel';
import { ScenarioSwitcher } from './components/ScenarioSwitcher';


function AppRoutes() {
  const { state } = useApp();

  // If user is lapsed, they can still browse (read-only) and see history
  if (state.userStatus === 'lapsed') {
    return (
      <Routes>
        <Route path="/rewards" element={<RewardsCatalog />} />
        <Route path="/events/:eventId/cancel" element={<EventCancel />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cms/login" element={<CMSLogin />} />
        <Route path="/cms" element={<CMSDashboard />} />
        <Route path="/cms/events" element={<CMSEventsList />} />
        <Route path="/cms/events/new" element={<CMSEventEditor />} />
        <Route path="/cms/events/:eventId" element={<CMSEventEditor />} />
        <Route path="/cms/rewards" element={<CMSRewards />} />
        <Route path="*" element={<PremiumLapsed />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Public -- pre-login */}
      <Route path="/" element={<LoginGate />} />
      <Route path="/login" element={<SpotifyLogin />} />
      <Route path="/auth-permissions" element={<AuthPermissions />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/not-eligible" element={<NotEligible />} />

      {/* Authenticated -- post-login */}
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/rewards" element={<RewardsCatalog />} />
      <Route path="/rewards/:rewardId" element={<OfferDetail />} />
      <Route path="/rewards/:rewardId/claim" element={<CodeReveal />} />
      <Route path="/events/:eventId/register" element={<EventRegister />} />
      <Route path="/events/:eventId/cancel" element={<EventCancel />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />

      {/* CMS -- admin wireframes */}
      <Route path="/cms/login" element={<CMSLogin />} />
      <Route path="/cms" element={<CMSDashboard />} />
      <Route path="/cms/events" element={<CMSEventsList />} />
      <Route path="/cms/events/new" element={<CMSEventEditor />} />
      <Route path="/cms/events/:eventId" element={<CMSEventEditor />} />
      <Route path="/cms/rewards" element={<CMSRewards />} />


      {/* Utility states */}
      <Route path="/premium-lapsed" element={<PremiumLapsed />} />
      <Route path="/geo-restricted" element={<GeoRestricted />} />
      <Route path="/error" element={<ErrorState />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * Floating CMS access button -- blue, clearly not part of the user experience.
 * Only shows on front-end pages (not on /cms routes).
 */
function CMSAccessButton() {
  const location = useLocation();
  if (location.pathname.startsWith('/cms')) return null;

  return (
    <Link
      to="/cms/login"
      className="fixed bottom-4 right-4 z-[9999] px-4 py-2.5 bg-blue-500 text-white text-[11px] font-bold rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-xl transition-all flex items-center gap-2"
      title="Open CMS wireframes"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
      CMS
    </Link>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
        <AnnotationToggle />
        <ScenarioSwitcher />
        <CMSAccessButton />
      </BrowserRouter>
    </AppProvider>
  );
}
