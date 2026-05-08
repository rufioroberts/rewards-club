import { Link } from 'react-router-dom';
import { useState } from 'react';
import { WireframeShell } from '../components/WireframeShell';
import { Placeholder } from '../components/Placeholder';
import { useApp } from '../context/AppContext';
import { mockRewards, mockEvents } from '../data/mockData';
import { FadeUp } from '../components/Motion';
import { WelcomeGuide } from '../components/WelcomeGuide';
import { Annotation } from '../components/Annotation';

export function RewardsCatalog() {
  const { state } = useApp();
  const [filter, setFilter] = useState<'all' | 'lifestyle' | 'fandom'>('all');

  const scenario = state.scenario || 'happy';
  const isFreeUser = state.userStatus === 'free';

  // Scenario-driven data
  const visibleRewards = (scenario === 'empty-rewards' || scenario === 'empty-both') ? [] : mockRewards;
  const visibleEvents = (scenario === 'empty-events' || scenario === 'empty-both') ? [] : mockEvents;

  const claimedCount = scenario === 'all-claimed' ? visibleRewards.length : state.claimedRewards.length;
  const totalAvailable = visibleRewards.length + visibleEvents.length;

  const filters = [
    { id: 'all' as const, label: 'All' },
    { id: 'lifestyle' as const, label: 'Discounts' },
    { id: 'fandom' as const, label: 'Events' },
  ];

  return (
    <WireframeShell>
      {/* Free users are blocked at login (NotEligible screen). They never reach this page. */}

      {/* Welcome guide -- first-time users only */}
      {!state.hasSeenWelcome && (
        <section className="px-5 md:px-6 lg:px-12 xl:px-20 pt-6 md:pt-8">
          <WelcomeGuide />
        </section>
      )}

      {/* Hero section */}
      <section className="px-5 md:px-6 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-6 md:pb-10">
        <FadeUp>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight">Your Rewards</h1>
          <p className="text-sm md:text-base text-gray-400 font-medium">{claimedCount} claimed &middot; {totalAvailable - claimedCount} available</p>
        </div>
        </FadeUp>

        {/* Filters */}
        <FadeUp delay={150}>
        <div className="flex gap-2 md:gap-2.5 mt-6 md:mt-8 overflow-x-auto pb-1">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 md:px-6 py-2 md:py-2.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                filter === f.id
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                  : 'bg-white text-gray-500 shadow-sm hover:shadow-md hover:text-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        </FadeUp>
      </section>

      {/* Events */}
      {(filter === 'all' || filter === 'fandom') && (
        <section className="px-5 md:px-6 lg:px-12 xl:px-20 pb-10 md:pb-12">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 md:mb-5">Experiences</h2>

          {visibleEvents.length === 0 ? (
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-10 md:p-14 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-50 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">No events right now</h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">New experiences are added regularly. Check back soon or we'll notify you when something drops.</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {mockEvents.map((event, index) => {
              const isRegistered = state.registeredEvents.includes(event.id);
              const isSoldOut = scenario === 'all-events-full' || event.status === 'full';
              return (
                <Link
                  key={event.id}
                  to={isFreeUser ? '#' : `/events/${event.id}/register`}
                  onClick={isFreeUser ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                  className={`group bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-up stagger-${index + 1} ${isFreeUser ? 'opacity-60 cursor-not-allowed hover:shadow-sm hover:translate-y-0' : ''}`}
                >
                  {/* Event image */}
                  <div className="h-36 md:h-44 bg-gray-50 flex items-center justify-center relative">
                    <Placeholder label="IMG" description="" aspectRatio="aspect-auto" className="h-full w-full border-0 rounded-none opacity-20" />
                    {/* Date badge */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                      <span className="text-[11px] font-bold text-gray-900">{event.date.split(',')[1]?.trim() || event.date}</span>
                      <span className="text-[10px] text-gray-400 ml-1.5">{event.time}</span>
                    </div>
                    {/* Spots indicator */}
                    {event.status !== 'full' && event.spotsLeft != null && event.totalSpots != null && (
                      <div className={`absolute top-3 right-3 px-3 py-1.5 backdrop-blur-sm rounded-lg shadow-sm ${
                        event.spotsLeft <= 5
                          ? 'bg-red-50/90 border border-red-200/50'
                          : event.spotsLeft <= Math.round(event.totalSpots * 0.2)
                            ? 'bg-amber-50/90 border border-amber-200/50'
                            : 'bg-white/90'
                      }`}>
                        <span className={`text-[11px] font-semibold ${
                          event.spotsLeft <= 5
                            ? 'text-red-600'
                            : event.spotsLeft <= Math.round(event.totalSpots * 0.2)
                              ? 'text-amber-600'
                              : 'text-gray-600'
                        }`}>
                          {event.spotsLeft <= 5
                            ? `Only ${event.spotsLeft} left`
                            : `${event.spotsLeft} spots left`
                          }
                        </span>
                        <Annotation
                          id={`scarcity-${event.id}`}
                          type="info"
                          note="Scarcity thresholds: Red at 5 or fewer spots, amber at 20% capacity remaining, neutral otherwise. These are CMS-driven values -- client to confirm thresholds."
                        />
                      </div>
                    )}
                  </div>
                  {/* Event info */}
                  <div className="p-5 md:p-6">
                    {/* Registration type pill */}
                    <div className="flex items-center gap-2 mb-3">
                      {event.registrationType === 'competition' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 border border-purple-100 rounded-full">
                          <svg className="w-3 h-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.996.178-1.768.563-2.15 1.14a2.25 2.25 0 00-.233.665c-.085.39-.12.794-.12 1.209v.015c0 .628.218 1.246.648 1.735.42.477.978.82 1.605 1.001M18.75 4.236c.996.178 1.768.563 2.15 1.14.13.2.218.42.233.665.085.39.12.794.12 1.209v.015c0 .628-.218 1.246-.648 1.735-.42.477-.978.82-1.605 1.001" /></svg>
                          <span className="text-[10px] font-bold text-purple-600">Competition entry</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                          <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span className="text-[10px] font-bold text-emerald-600">Confirm and go</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors">{event.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">{event.description}</p>
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-gray-400">{event.venue}, {event.city}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-200" />
                      <span className="text-xs text-gray-400">18+</span>
                    </div>
                    {/* CTA */}
                    {isFreeUser ? (
                      <span className="inline-block px-5 py-2 bg-gray-100 text-gray-400 text-xs font-semibold rounded-full">
                        Premium only
                      </span>
                    ) : isRegistered ? (
                      <span className="inline-block px-5 py-2 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
                        Registered
                      </span>
                    ) : isSoldOut ? (
                      <span className="inline-block px-5 py-2 bg-gray-50 text-gray-300 text-xs font-semibold rounded-full">
                        Sold out
                      </span>
                    ) : (
                      <span className="inline-block px-5 py-2 bg-gray-900 text-white text-xs font-bold rounded-full shadow-sm">
                        Register
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          )}
        </section>
      )}

      {/* Discounts grid */}
      {(filter === 'all' || filter === 'lifestyle') && (
        <section className="px-5 md:px-6 lg:px-12 xl:px-20 pb-12 md:pb-16">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 md:mb-5">Discounts</h2>

          {visibleRewards.length === 0 ? (
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-10 md:p-14 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-50 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">No offers available</h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">Discount offers are temporarily unavailable. This usually resolves within a few hours. Check back soon.</p>
            </div>
          ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {visibleRewards.map((reward, index) => {
              const isClaimed = scenario === 'all-claimed' || state.claimedRewards.includes(reward.id);
              return (
                <div key={reward.id} className={`animate-scale-in stagger-${Math.min(index + 1, 8)}`}>
                    <Link
                      to={isFreeUser ? '#' : `/rewards/${reward.id}`}
                      onClick={isFreeUser ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                      className={`group block bg-white rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-300 ${
                        isFreeUser ? 'opacity-60 cursor-not-allowed' : isClaimed ? 'opacity-60' : 'hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-gray-100 flex flex-col items-center justify-center p-4 md:p-6 relative">
                        {/* Brand logo area - from Razorpay API: display_parameters.brand_logo on brand_color background */}
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                          <span className="text-lg md:text-xl font-bold text-gray-400">{reward.brand.charAt(0)}</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">API: brand_logo</span>
                        {/* Background annotation */}
                        <span className="absolute top-2 left-2 text-[8px] text-gray-300 font-mono">bg: brand_color</span>
                        {/* Discount badge */}
                        <div className="absolute bottom-2.5 left-2.5 md:bottom-3 md:left-3 px-2.5 py-1 bg-gray-900 rounded-lg shadow-md">
                          <span className="text-[11px] md:text-xs font-bold text-white">{reward.discount}</span>
                        </div>
                        {/* Last chance badge - shown when budget nearing threshold */}
                        {reward.lastChance && !isClaimed && (
                          <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 px-2.5 py-1 bg-amber-50 border border-amber-200/60 rounded-lg">
                            <span className="text-[10px] font-bold text-amber-600">Last chance</span>
                          </div>
                        )}

                      </div>
                      <div className="p-4 md:p-5">
                        <h3 className="text-sm font-bold text-gray-900 mb-0.5">{reward.brand}</h3>
                        <p className="text-xs text-gray-400 mb-3 md:mb-4 line-clamp-1">{reward.title}</p>
                        {isFreeUser ? (
                          <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 bg-gray-100 text-gray-400 text-[10px] md:text-[11px] font-semibold rounded-full">
                            Premium only
                          </span>
                        ) : isClaimed ? (
                          <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 bg-gray-100 text-gray-400 text-[10px] md:text-[11px] font-semibold rounded-full">
                            Claimed
                          </span>
                        ) : (
                          <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 bg-gray-900 text-white text-[10px] md:text-[11px] font-bold rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                            Get code
                          </span>
                        )}
                      </div>
                    </Link>
                </div>
              );
            })}
          </div>
          )}
        </section>
      )}
    </WireframeShell>
  );
}
