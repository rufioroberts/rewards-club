import { useParams, Link, useNavigate } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';
import { useApp } from '../context/AppContext';
import { mockEvents } from '../data/mockData';
import { useState } from 'react';

export function EventCancel() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const event = mockEvents.find(e => e.id === eventId);
  const [cancelled, setCancelled] = useState(false);

  // Check if cancellation deadline has passed
  // In production: compare event.cancellationDeadline to Date.now()
  // For prototype: we'll keep it open (deadlinePassed = false)
  const deadlinePassed = false;

  if (!event) {
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-20 text-center">
          <p className="text-sm text-gray-400">Event not found.</p>
          <Link to="/rewards" className="text-sm text-gray-900 font-semibold mt-3 inline-block">Back to rewards</Link>
        </div>
      </WireframeShell>
    );
  }

  const handleCancel = () => {
    dispatch({ type: 'CANCEL_EVENT', payload: event.id });
    setCancelled(true);
  };

  if (cancelled) {
    return (
      <WireframeShell>
        <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            {/* Success state */}
            <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Registration cancelled</h1>
            <p className="text-sm text-gray-400 mb-2">{event.name}</p>
            <p className="text-xs text-gray-300 mb-8">Your spot has been released and is now available for others.</p>

            <div className="flex flex-col gap-3">
              <Link
                to="/rewards"
                className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-full shadow-sm"
              >
                Back to rewards
              </Link>
              <Link
                to="/history"
                className="inline-block px-6 py-3 text-gray-400 text-sm font-medium"
              >
                View history
              </Link>
            </div>
          </div>
        </div>
      </WireframeShell>
    );
  }

  return (
    <WireframeShell>
      <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          {/* Back link */}
          <Link to="/history" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-8">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to history
          </Link>

          {/* Deadline passed - can't cancel */}
          {deadlinePassed ? (
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-black text-gray-900 mb-2">Cancellation window closed</h1>
              <p className="text-sm text-gray-400 mb-2">{event.name}</p>
              <p className="text-xs text-gray-300 mb-6">The cancellation deadline for this event has passed. You can no longer cancel your registration.</p>
              {event.cancellationDeadline && (
                <div className="bg-gray-50 rounded-xl p-3 mb-6">
                  <p className="text-xs text-gray-500">Deadline was: <span className="font-semibold">{event.cancellationDeadline}</span></p>
                </div>
              )}
              <Link
                to="/history"
                className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-full shadow-sm"
              >
                Back to history
              </Link>
            </div>
          ) : (
            /* Confirmation card - can still cancel */
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div className="w-12 h-12 rounded-full bg-red-50 mx-auto mb-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>

              <h1 className="text-xl font-black text-gray-900 text-center mb-2">Cancel registration?</h1>
              <p className="text-sm text-gray-400 text-center mb-6">This will release your spot for someone else.</p>

              {/* Event summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-1">{event.name}</h3>
                <p className="text-xs text-gray-400">{event.date} &middot; {event.time}</p>
                <p className="text-xs text-gray-400">{event.venue}, {event.city}</p>
              </div>

              {/* What happens */}
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-500">Your spot will be released immediately</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-500">You can re-register if spots are still available</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-500">This action cannot be undone</p>
                </div>
              </div>

              {/* Deadline warning if one exists */}
              {event.cancellationDeadline && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
                  <p className="text-xs text-amber-700">
                    <span className="font-semibold">Note:</span> Cancellations for this event close on {event.cancellationDeadline}. After that, your registration is final.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCancel}
                  className="w-full px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-full shadow-sm hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Yes, cancel my registration
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="w-full px-6 py-3 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Keep my registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </WireframeShell>
  );
}
