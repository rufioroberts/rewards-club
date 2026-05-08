import { Link } from 'react-router-dom';
import { CMSShell } from '../../components/CMSShell';
import { mockEvents, rewards } from '../../data/mockData';

export function CMSDashboard() {
  const activeEvents = mockEvents.filter(e => e.status === 'active');
  const totalSpots = mockEvents.reduce((acc, e) => acc + (e.totalSpots ?? 0), 0);
  const filledSpots = mockEvents.reduce((acc, e) => acc + ((e.totalSpots ?? 0) - (e.spotsLeft ?? 0)), 0);

  return (
    <CMSShell>
      <div className="max-w-6xl">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Dashboard</h1>
        <p className="text-sm text-slate-400 mb-8">Overview of Rewards Club content and activity.</p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Events</div>
            <div className="text-2xl font-black text-slate-900">{activeEvents.length}</div>
            <div className="text-xs text-slate-400 mt-1">{mockEvents.length} total</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Registrations</div>
            <div className="text-2xl font-black text-slate-900">{filledSpots}</div>
            <div className="text-xs text-slate-400 mt-1">of {totalSpots} total capacity</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Rewards (API)</div>
            <div className="text-2xl font-black text-slate-900">{rewards.length}</div>
            <div className="text-xs text-slate-400 mt-1">Pulled from Razorpay</div>
          </div>
        </div>

        {/* Recent events */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Recent Events</h2>
            <Link to="/cms/events" className="text-xs text-blue-500 font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {mockEvents.slice(0, 3).map(event => (
              <Link key={event.id} to={`/cms/events/${event.id}`} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors">
                <div>
                  <div className="text-sm text-slate-900 font-medium">{event.name}</div>
                  <div className="text-xs text-slate-400">{event.date} -- {event.venue}, {event.city}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  event.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {event.status === 'active' ? 'Live' : 'Full'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CMSShell>
  );
}
