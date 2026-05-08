import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';
import { useApp } from '../context/AppContext';
import { mockRewards, mockEvents } from '../data/mockData';

export function History() {
  const { state } = useApp();
  const [tab, setTab] = useState<'claimed' | 'events' | 'expired'>('claimed');

  const claimedRewards = mockRewards.filter(r => state.claimedRewards.includes(r.id));
  const registeredEvents = mockEvents.filter(e => state.registeredEvents.includes(e.id));

  const expiredRewards = [
    { id: 'exp1', brand: 'BookMyShow', title: '10% off tickets', expiredDate: '12 Mar 2025' },
    { id: 'exp2', brand: 'Swiggy', title: 'Free delivery week', expiredDate: '28 Feb 2025' },
  ];

  return (
    <WireframeShell>
      <section className="px-5 md:px-6 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-6 md:pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-5 md:mb-6 tracking-tight">History</h1>

        <div className="flex gap-1 bg-gray-100 rounded-full p-1 w-fit">
          <button
            onClick={() => setTab('claimed')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              tab === 'claimed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Codes ({claimedRewards.length})
          </button>
          <button
            onClick={() => setTab('events')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              tab === 'events'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Events ({registeredEvents.length})
          </button>
          <button
            onClick={() => setTab('expired')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              tab === 'expired'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Expired ({expiredRewards.length})
          </button>
        </div>
      </section>

      <section className="px-5 md:px-6 lg:px-12 xl:px-20 pb-12 md:pb-16">
        {tab === 'claimed' && (
          <div>
            {claimedRewards.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-gray-300 text-lg">0</span>
                </div>
                <p className="text-sm text-gray-400 mb-5">Nothing here yet. Claim a reward to see it in your history.</p>
                <Link to="/rewards" className="inline-block px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full shadow-sm">Browse rewards</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {claimedRewards.map(reward => (
                  <Link
                    key={reward.id}
                    to={`/rewards/${reward.id}/claim`}
                    className="group flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-gray-400">{reward.brand.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{reward.brand} &middot; {reward.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Expires {reward.expiry}</p>
                    </div>
                    <span className="text-xs text-gray-300 group-hover:text-gray-500 transition-colors">View code &rarr;</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'events' && (
          <div>
            {registeredEvents.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-gray-300 text-lg">0</span>
                </div>
                <p className="text-sm text-gray-400 mb-5">No event registrations yet.</p>
                <Link to="/rewards" className="inline-block px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full shadow-sm">Browse events</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {registeredEvents.map(event => (
                  <div
                    key={event.id}
                    className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{event.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{event.date} &middot; {event.venue}, {event.city}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link to={`/events/${event.id}`} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">View</Link>
                      <Link to={`/events/${event.id}/cancel`} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors">Cancel</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'expired' && (
          <div className="space-y-3">
            {expiredRewards.map(reward => (
              <div
                key={reward.id}
                className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm opacity-50"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center shrink-0 opacity-50">
                  <span className="text-sm font-bold text-gray-400">{reward.brand.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-500">{reward.brand} &middot; {reward.title}</h3>
                  <p className="text-xs text-gray-300 mt-0.5">Expired {reward.expiredDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </WireframeShell>
  );
}
