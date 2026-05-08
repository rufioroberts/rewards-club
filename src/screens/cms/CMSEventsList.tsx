import { Link } from 'react-router-dom';
import { CMSShell } from '../../components/CMSShell';
import { mockEvents } from '../../data/mockData';

export function CMSEventsList() {
  return (
    <CMSShell>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Events</h1>
            <p className="text-sm text-slate-400">Manage experiences and event registrations.</p>
          </div>
          <Link
            to="/cms/events/new"
            className="px-4 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Event
          </Link>
        </div>

        {/* Events table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Event</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Venue</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map(event => {
                const fillPercent = event.totalSpots ? Math.round(((event.totalSpots - (event.spotsLeft ?? 0)) / event.totalSpots) * 100) : 0;
                return (
                  <tr key={event.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-slate-900">{event.name}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-600">{event.date}</div>
                      <div className="text-xs text-slate-400">{event.time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-600">{event.venue}</div>
                      <div className="text-xs text-slate-400">{event.city}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        18+
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              fillPercent >= 90 ? 'bg-red-400' : fillPercent >= 70 ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{event.spotsLeft}/{event.totalSpots}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        event.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {event.status === 'active' ? 'Live' : 'Full'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link to={`/cms/events/${event.id}`} className="text-xs text-blue-500 font-semibold hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CMSShell>
  );
}
