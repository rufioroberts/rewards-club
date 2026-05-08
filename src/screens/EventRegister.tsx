import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';
import { Placeholder } from '../components/Placeholder';
import { useApp } from '../context/AppContext';
import { mockEvents } from '../data/mockData';
import { FadeUp } from '../components/Motion';
import { Annotation } from '../components/Annotation';

export function EventRegister() {
  const { eventId } = useParams();
  const { state, dispatch } = useApp();
  const [step, setStep] = useState<'form' | 'confirmation' | 'cancel-confirm'>('form');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Pre-fill from profile if available, otherwise use default persona
  const defaultName = state.profile ? `${state.profile.firstName} ${state.profile.lastName}` : 'Priya Sharma';
  const defaultEmail = state.profile?.email || 'priya.sharma@gmail.com';
  const defaultPhone = state.profile?.phone || '+91 98765 43210';

  const [formValues, setFormValues] = useState({
    name: defaultName,
    email: defaultEmail,
    phone: defaultPhone,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-20 text-center">
          <p className="text-sm text-gray-400">This event is no longer available.</p>
          <Link to="/rewards" className="text-sm text-gray-900 font-semibold mt-3 inline-block hover:underline">Back to rewards</Link>
        </div>
      </WireframeShell>
    );
  }

  const isRegistered = state.registeredEvents.includes(event.id);

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formValues.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formValues.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(formValues.phone.replace(/\s/g, ''))) {
      errors.phone = 'Enter a valid phone number';
    }
    if (!agreedToTerms) {
      errors.terms = 'You must agree to the terms';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Cancel confirmation
  if (step === 'cancel-confirm') {
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-14 md:py-20">
          <FadeUp>
          <div className="max-w-md mx-auto text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 mx-auto mb-4 md:mb-5 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">Registration cancelled</h1>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">Your registration for {event.name} has been cancelled. Your spot has been released.</p>
            <Link to="/rewards" className="inline-block px-8 py-3.5 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Back to rewards
            </Link>
          </div>
          </FadeUp>
        </div>
      </WireframeShell>
    );
  }

  // Already registered -- show status with cancel option
  if (isRegistered && step === 'form') {
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 pt-6 md:pt-8">
          <Link to="/rewards" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            Back
          </Link>
        </div>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-12 md:py-16">
          <FadeUp>
          <div className="max-w-md mx-auto text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-900 mx-auto mb-4 md:mb-5 flex items-center justify-center shadow-lg shadow-gray-900/20">
              <span className="text-white text-xl md:text-2xl">&#10003;</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">You're registered</h1>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">Your spot for {event.name} is confirmed. Event details will be sent to your email.</p>

            {/* Event summary card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 text-left mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Date</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Time</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.time}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Venue</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.venue}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{event.address}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/rewards" className="px-8 py-3.5 bg-white text-gray-600 font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-shadow">
                Back to rewards
              </Link>
              <button
                onClick={() => {
                  dispatch({ type: 'CANCEL_EVENT', payload: event.id });
                  setStep('cancel-confirm');
                }}
                className="px-8 py-3.5 text-red-400 hover:text-red-600 font-semibold text-sm rounded-full transition-colors cursor-pointer"
              >
                Cancel registration
              </button>
              <Annotation
                id="cancel-policy"
                type="question"
                note="Open question for client: Can users cancel registrations? Is there a cut-off window (e.g. 24hrs before event)? Does cancelling release the spot back to the pool or is it forfeited?"
              />
            </div>
          </div>
          </FadeUp>
        </div>
      </WireframeShell>
    );
  }

  // Sold out
  if (event.status === 'full') {
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 pt-6 md:pt-8">
          <Link to="/rewards" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            Back
          </Link>
        </div>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-12 md:py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 mx-auto mb-4 md:mb-5 flex items-center justify-center">
              <span className="text-gray-300 text-xl md:text-2xl font-bold">X</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">This event is full</h1>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">All spots for {event.name} have been taken. New events are added regularly.</p>
            <Link to="/rewards" className="inline-block px-8 py-3.5 bg-white text-gray-600 font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-shadow">
              Back to rewards
            </Link>
          </div>
        </div>
      </WireframeShell>
    );
  }

  // Confirmation -- full post-registration screen
  if (step === 'confirmation') {
    const refNumber = `RC-${event.id.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-10 md:py-14">
          <div className="max-w-lg mx-auto">
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-900 mx-auto mb-4 md:mb-5 flex items-center justify-center shadow-lg shadow-gray-900/20">
                <span className="text-white text-xl md:text-2xl">&#10003;</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">
                {event.registrationType === 'fcfs' ? "You're in" : 'Entry submitted'}
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                {event.registrationType === 'fcfs'
                  ? `Your spot for ${event.name} is confirmed. Check your email for the full details.`
                  : `We've got your entry for ${event.name}. Winners will be notified by email before the event.`
                }
              </p>
            </div>

            {/* Confirmation card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
              {/* Reference number */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-0.5">Reference</div>
                  <div className="text-sm text-gray-900 font-mono font-bold">{refNumber}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  event.registrationType === 'fcfs'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600'
                }`}>
                  {event.registrationType === 'fcfs' ? 'Confirmed' : 'Pending selection'}
                </span>
              </div>

              {/* Event details grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Date</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Doors open</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.doorsOpen}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Venue</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.venue}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{event.city}</div>
                </div>
              </div>

              {/* Add to calendar */}
              <button className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 font-semibold transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Add to calendar
              </button>
            </div>

            {/* What to bring reminder */}
            {event.whatToBring && event.whatToBring.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">What to bring</h3>
                <ul className="space-y-2">
                  {event.whatToBring.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cancellation info */}
            {event.cancellationDeadline && event.registrationType === 'fcfs' && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-500">
                  Need to cancel? You can do so until {event.cancellationDeadline} from your History page.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link to="/rewards" className="px-8 py-3.5 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Back to rewards
              </Link>
              <Link to="/history" className="px-8 py-3.5 text-gray-500 hover:text-gray-700 font-semibold text-sm transition-colors">
                View in history
              </Link>
            </div>
          </div>
        </div>
      </WireframeShell>
    );
  }

  // Registration form
  const handleSubmit = () => {
    if (!validateForm()) return;
    dispatch({ type: 'REGISTER_EVENT', payload: event.id });
    setStep('confirmation');
  };

  return (
    <WireframeShell>
      <div className="px-5 md:px-6 lg:px-12 xl:px-20 pt-6 md:pt-8">
        <Link to="/rewards" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Back
        </Link>
      </div>

      <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-6 md:py-10">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 max-w-6xl">
          {/* Event detail -- left column (3/5 width) */}
          <div className="md:col-span-3">
            {/* Hero image */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm overflow-hidden mb-6">
              <Placeholder
                label="IMG"
                description=""
                aspectRatio="aspect-[16/9]"
                className="rounded-none border-0"
              />
            </div>

            {/* Title and description */}
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">{event.name}</h1>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">{event.description}</p>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 md:px-4 py-1.5 bg-white shadow-sm rounded-full text-xs text-gray-500 font-medium">
                18+
              </span>
              {event.dressCode && (
                <span className="px-3 md:px-4 py-1.5 bg-white shadow-sm rounded-full text-xs text-gray-500 font-medium">
                  {event.dressCode}
                </span>
              )}
              {event.spotsLeft != null && event.spotsLeft > 0 && (
                <span className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold ${
                  event.spotsLeft <= 5
                    ? 'bg-red-50 text-red-600'
                    : event.spotsLeft <= Math.round((event.totalSpots ?? 0) * 0.2)
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-white shadow-sm text-gray-500'
                }`}>
                  {event.spotsLeft} spots remaining
                </span>
              )}
            </div>

            {/* Date and time */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Date and time</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Date</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Event starts</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.time}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Doors open</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.doorsOpen}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Duration</div>
                  <div className="text-sm text-gray-900 font-semibold">{event.duration}</div>
                </div>
              </div>
            </div>

            {/* Location and map */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Location</h2>
                <Annotation
                  id="map-integration"
                  type="question"
                  note="Google Maps URL works for known venues, but what about events in parks or open spaces where we need a precise pin drop? Options: (1) Google Maps URL with lat/lng coordinates for exact pin, (2) Google Maps Place ID for verified venues, (3) Plus Codes for unmarked locations. Recommend lat/lng approach as it handles all cases."
                />
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-900 font-semibold mb-1">{event.venue}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{event.address}</div>
              </div>
              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden mb-4">
                <Placeholder
                  label="MAP"
                  description="Google Maps embed"
                  aspectRatio="aspect-[16/7]"
                  className="border-0"
                />
              </div>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-700 font-semibold transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Open in Google Maps
              </a>
            </div>

            {/* Access and entry */}
            {event.accessNotes && (
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Access and entry</h2>
                  <Annotation
                    id="access-notes"
                    type="info"
                    note="CMS field. Event managers fill this in per event. Matters for venues with multiple entrances or non-obvious access."
                  />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{event.accessNotes}</p>
              </div>
            )}

            {/* Parking */}
            {event.parking && (
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Parking and transport</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{event.parking}</p>
              </div>
            )}

            {/* What's included */}
            {event.included && event.included.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">What's included</h2>
                </div>
                <ul className="space-y-2">
                  {event.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to bring */}
            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">What to bring</h2>
              </div>
              <ul className="space-y-2">
                {event.whatToBring.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not allowed */}
            {event.notAllowed && event.notAllowed.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Not allowed</h2>
                </div>
                <ul className="space-y-2">
                  {event.notAllowed.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Event day contact */}
            {event.contactWhatsApp && (
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Day-of contact</h2>
                  <Annotation
                    id="whatsapp-contact"
                    type="question"
                    note="WhatsApp is standard in India. Should this be a dedicated event helpline or the general Rewards Club support number? Staffed only on event day?"
                  />
                </div>
                <p className="text-sm text-gray-600">WhatsApp: {event.contactWhatsApp}</p>
                <p className="text-xs text-gray-400 mt-1">Available on event day for access issues or questions</p>
              </div>
            )}
          </div>

          {/* Registration form -- right column (2/5 width) */}
          <div className="md:col-span-2">
            <div className="md:sticky md:top-24">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-6 md:p-8">
                {/* Registration type badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    event.registrationType === 'fcfs'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {event.registrationType === 'fcfs' ? 'Instant booking' : 'Competition entry'}
                  </span>
                </div>

                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  {event.registrationType === 'fcfs' ? 'Confirm your spot' : 'Enter the competition'}
                </h2>
                <p className="text-xs text-gray-400 mb-5 md:mb-6">
                  {event.registrationType === 'fcfs'
                    ? 'Your details are pre-filled. One tap and you\'re in.'
                    : 'Answer the questions below. Winners will be selected and notified by email.'
                  }
                </p>

                {/* === FCFS FLOW === */}
                {event.registrationType === 'fcfs' && (
                  <>
                    {/* Pre-filled details (read-only look) */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Your details</div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Name</span>
                          <span className="text-sm text-gray-900 font-medium">{formValues.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Email</span>
                          <span className="text-sm text-gray-900 font-medium">{formValues.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Phone</span>
                          <span className="text-sm text-gray-900 font-medium">{formValues.phone}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setAgreedToTerms(true); handleSubmit(); }}
                      className="text-[10px] text-gray-400 mb-4 block"
                    >
                      Need to edit? <span className="text-gray-600 font-medium underline cursor-pointer">Update profile</span>
                    </button>

                    <label className="flex items-start gap-3 mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => { setAgreedToTerms(e.target.checked); setFormErrors(err => ({ ...err, terms: '' })); }}
                        className="mt-0.5 w-4 h-4 rounded"
                      />
                      <span className={`text-xs leading-relaxed ${formErrors.terms ? 'text-red-500' : 'text-gray-400'}`}>I agree to the event terms and confirm I'm 18+.</span>
                    </label>
                    {formErrors.terms && <p className="text-xs text-red-500 -mt-3 mb-4 font-medium">{formErrors.terms}</p>}

                    <button
                      onClick={handleSubmit}
                      className="w-full px-8 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      Confirm registration
                    </button>
                    <p className="text-[10px] text-gray-300 text-center mt-3">Your spot is secured instantly</p>
                  </>
                )}

                {/* === COMPETITION FLOW === */}
                {event.registrationType === 'competition' && (
                  <>
                    {/* Personal details (editable) */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name</label>
                        <input
                          type="text"
                          value={formValues.name}
                          onChange={(e) => { setFormValues(v => ({ ...v, name: e.target.value })); setFormErrors(err => ({ ...err, name: '' })); }}
                          className={`w-full px-4 md:px-5 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                            formErrors.name ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                          }`}
                        />
                        {formErrors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                        <input
                          type="email"
                          value={formValues.email}
                          onChange={(e) => { setFormValues(v => ({ ...v, email: e.target.value })); setFormErrors(err => ({ ...err, email: '' })); }}
                          className={`w-full px-4 md:px-5 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                            formErrors.email ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                          }`}
                        />
                        {formErrors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={formValues.phone}
                          onChange={(e) => { setFormValues(v => ({ ...v, phone: e.target.value })); setFormErrors(err => ({ ...err, phone: '' })); }}
                          className={`w-full px-4 md:px-5 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                            formErrors.phone ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                          }`}
                        />
                        {formErrors.phone && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.phone}</p>}
                      </div>
                    </div>

                    {/* Competition questions */}
                    <div className="border-t border-gray-100 pt-5 mb-6">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">Competition questions</h3>
                      <p className="text-[10px] text-gray-300 mb-4">Your answers help us select winners. Be genuine.</p>
                      <div className="space-y-5">
                        {/* Q1 - Multiple choice */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2">1. Which song would you most want to hear live?</label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="radio" name="q1" className="w-4 h-4 accent-gray-900" />
                              <span className="text-sm text-gray-700">Tum Hi Ho</span>
                            </label>
                            <label className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="radio" name="q1" className="w-4 h-4 accent-gray-900" />
                              <span className="text-sm text-gray-700">Kesariya</span>
                            </label>
                            <label className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="radio" name="q1" className="w-4 h-4 accent-gray-900" />
                              <span className="text-sm text-gray-700">Channa Mereya</span>
                            </label>
                          </div>
                        </div>

                        {/* Q2 - Multiple choice */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2">2. How long have you been a Spotify Premium member?</label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="radio" name="q2" className="w-4 h-4 accent-gray-900" />
                              <span className="text-sm text-gray-700">Less than 6 months</span>
                            </label>
                            <label className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="radio" name="q2" className="w-4 h-4 accent-gray-900" />
                              <span className="text-sm text-gray-700">6 months to 1 year</span>
                            </label>
                            <label className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="radio" name="q2" className="w-4 h-4 accent-gray-900" />
                              <span className="text-sm text-gray-700">Over 1 year</span>
                            </label>
                          </div>
                        </div>

                        {/* Q3 - Free text */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2">3. Why should you win a spot at this event? (50-200 words)</label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 resize-none"
                            placeholder="Tell us what this event means to you..."
                          />
                          <p className="text-[10px] text-gray-300 mt-1.5">0 / 200 words</p>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => { setAgreedToTerms(e.target.checked); setFormErrors(err => ({ ...err, terms: '' })); }}
                        className="mt-0.5 w-4 h-4 rounded"
                      />
                      <span className={`text-xs leading-relaxed ${formErrors.terms ? 'text-red-500' : 'text-gray-400'}`}>I agree to the event terms and conditions and confirm I meet the age requirement (18+).</span>
                    </label>
                    {formErrors.terms && <p className="text-xs text-red-500 -mt-3 mb-4 font-medium">{formErrors.terms}</p>}

                    <button
                      onClick={handleSubmit}
                      className="w-full px-8 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      Submit entry
                    </button>
                    <p className="text-[10px] text-gray-300 text-center mt-3">Winners notified by email within 48 hours</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WireframeShell>
  );
}
