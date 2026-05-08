import { useParams, Link } from 'react-router-dom';
import { CMSShell } from '../../components/CMSShell';
import { mockEvents } from '../../data/mockData';
import { Annotation } from '../../components/Annotation';

export function CMSEventEditor() {
  const { eventId } = useParams();
  const event = eventId ? mockEvents.find(e => e.id === eventId) : null;
  const isNew = !eventId || eventId === 'new';

  return (
    <CMSShell>
      <div className="max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/cms/events" className="text-xs text-slate-400 hover:text-blue-500 transition-colors">Events</Link>
          <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-xs text-slate-600 font-medium">{isNew ? 'New Event' : event?.name || 'Edit Event'}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-slate-900">{isNew ? 'Create Event' : 'Edit Event'}</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-slate-500 font-medium hover:text-slate-700 transition-colors cursor-pointer">Save as draft</button>
            <button className="px-4 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
              {isNew ? 'Publish event' : 'Update event'}
            </button>
          </div>
        </div>

        {/* Form sections */}
        <div className="space-y-6">
          {/* Basic info */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Event name *</label>
                <input
                  type="text"
                  defaultValue={event?.name || ''}
                  placeholder="e.g. Arijit Singh meet and greet"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Description *</label>
                <textarea
                  defaultValue={event?.description || ''}
                  placeholder="Describe the event for users..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Status</label>
                  <select defaultValue={event?.status || 'active'} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="active">Live</option>
                    <option value="draft">Draft</option>
                    <option value="full">Full / Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Total spots *</label>
                  <input
                    type="number"
                    defaultValue={event?.totalSpots || ''}
                    placeholder="50"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Date and time */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Date and Time</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date *</label>
                <input
                  type="text"
                  defaultValue={event?.date || ''}
                  placeholder="Saturday, 14 June 2025"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Event start time *</label>
                <input
                  type="text"
                  defaultValue={event?.time || ''}
                  placeholder="6:00 PM IST"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Doors open</label>
                <input
                  type="text"
                  defaultValue={event?.doorsOpen || ''}
                  placeholder="5:30 PM"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Duration</label>
                <input
                  type="text"
                  defaultValue={event?.duration || ''}
                  placeholder="2 hours"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Cancellation deadline */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-1.5">
                <label className="block text-xs font-semibold text-slate-500">Cancellation deadline</label>
                <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium">Per event</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">Users cannot cancel after this date/time. Leave blank to allow cancellations anytime up to the event start.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Date</label>
                  <input
                    type="text"
                    defaultValue={event?.cancellationDeadline ? '11 June 2025' : ''}
                    placeholder="e.g. 11 June 2025"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Time</label>
                  <input
                    type="text"
                    defaultValue={event?.cancellationDeadline ? '6:00 PM IST' : ''}
                    placeholder="e.g. 6:00 PM IST"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-3 bg-slate-50 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  <span className="font-bold">Examples:</span> For a "no cancellations within 24 hours" policy, set this to the day before at the same time as the event. For "1 week before", set it 7 days prior. If left blank, users can cancel right up until the event starts.
                </p>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Location</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Venue name *</label>
                  <input
                    type="text"
                    defaultValue={event?.venue || ''}
                    placeholder="NSCI Dome"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="block text-xs font-semibold text-slate-500">City *</label>
                    <Annotation
                      id="city-field"
                      type="question"
                      note="CMS: Should city be a fixed dropdown of cities where Spotify runs events, or free text? This field is for CMS filtering only, not shown to users during registration."
                    />
                  </div>
                  <select defaultValue={event?.city || ''} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="">Select city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Goa">Goa</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full address * <span className="text-slate-400 font-normal">(must be Google Maps searchable)</span></label>
                <input
                  type="text"
                  defaultValue={event?.address || ''}
                  placeholder="NSCI SVP Stadium, Lala Lajpatrai Marg, Haji Ali, Worli, Mumbai 400018"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="block text-xs font-semibold text-slate-500">Google Maps URL *</label>
                  <Annotation
                    id="maps-url-cms"
                    type="question"
                    note="Google Maps URL works for known venues. What about events in parks or open spaces where we need a pin drop? Options: (1) Maps URL with lat/lng for exact pin, (2) Place ID for verified venues, (3) Plus Codes for unmarked spots. Lat/lng handles all cases."
                  />
                </div>
                <input
                  type="url"
                  defaultValue={event?.mapUrl || ''}
                  placeholder="https://maps.google.com/?q=... or pin-drop URL with lat/lng"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">Tip: For exact pin locations, use maps.google.com/?q=LAT,LNG format</p>
              </div>
            </div>
          </section>

          {/* Registration type */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Registration Type</h2>
            <div className="space-y-5">
              {/* Type selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">How do users register? *</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    (event?.registrationType || 'fcfs') === 'fcfs' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input type="radio" name="regType" value="fcfs" defaultChecked={(event?.registrationType || 'fcfs') === 'fcfs'} className="sr-only" />
                    <span className="text-sm font-bold text-slate-900 mb-1">First come, first served</span>
                    <span className="text-[10px] text-slate-500 leading-relaxed">One-click registration. User confirms pre-filled details and gets a spot instantly. No questions asked.</span>
                    {(event?.registrationType || 'fcfs') === 'fcfs' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                    )}
                  </label>
                  <label className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    event?.registrationType === 'competition' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input type="radio" name="regType" value="competition" defaultChecked={event?.registrationType === 'competition'} className="sr-only" />
                    <span className="text-sm font-bold text-slate-900 mb-1">Competition entry</span>
                    <span className="text-[10px] text-slate-500 leading-relaxed">Users answer 2-3 questions. Winners selected by admin. Use for limited-capacity, high-demand events.</span>
                    {event?.registrationType === 'competition' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Competition questions builder -- only shown when competition is selected */}
              {event?.registrationType === 'competition' && (
                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-700">Competition Questions</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">2-3 multiple choice + 1 descriptive. Shown to users during registration.</p>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">+ Add question</button>
                  </div>

                  <div className="space-y-4">
                    {/* Question 1 -- multiple choice */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded">Q1</span>
                          <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-medium">Multiple choice</span>
                        </div>
                        <button className="text-[10px] text-red-400 hover:text-red-600 cursor-pointer">Remove</button>
                      </div>
                      <input
                        type="text"
                        defaultValue="Which song would you most want to hear live?"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          <input type="text" defaultValue="Tum Hi Ho" className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                          <button className="text-slate-300 hover:text-red-400 cursor-pointer"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          <input type="text" defaultValue="Kesariya" className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                          <button className="text-slate-300 hover:text-red-400 cursor-pointer"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          <input type="text" defaultValue="Channa Mereya" className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                          <button className="text-slate-300 hover:text-red-400 cursor-pointer"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <button className="text-[10px] text-blue-500 font-medium hover:text-blue-600 cursor-pointer mt-1">+ Add option</button>
                      </div>
                    </div>

                    {/* Question 2 -- multiple choice */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded">Q2</span>
                          <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-medium">Multiple choice</span>
                        </div>
                        <button className="text-[10px] text-red-400 hover:text-red-600 cursor-pointer">Remove</button>
                      </div>
                      <input
                        type="text"
                        defaultValue="How long have you been a Spotify Premium member?"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          <input type="text" defaultValue="Less than 6 months" className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          <input type="text" defaultValue="6 months to 1 year" className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          <input type="text" defaultValue="Over 1 year" className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                      </div>
                    </div>

                    {/* Question 3 -- descriptive */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded">Q3</span>
                          <span className="text-[10px] text-purple-500 bg-purple-50 px-2 py-0.5 rounded font-medium">Free text</span>
                        </div>
                        <button className="text-[10px] text-red-400 hover:text-red-600 cursor-pointer">Remove</button>
                      </div>
                      <input
                        type="text"
                        defaultValue="Why should you win a spot at this event? (50-200 words)"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-slate-500">Min words</label>
                          <input type="number" defaultValue="50" className="w-14 px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-700 text-center" />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-slate-500">Max words</label>
                          <input type="number" defaultValue="200" className="w-14 px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-700 text-center" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Winner selection note */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <p className="text-[10px] text-blue-700 leading-relaxed">
                      <span className="font-bold">How winners are selected:</span> After the registration deadline, review entries in the Registrations tab below. Mark winners manually -- they'll receive a confirmation email. Non-winners receive a "not selected" notification.
                    </p>
                  </div>
                </div>
              )}

              {/* FCFS note */}
              {(event?.registrationType || 'fcfs') === 'fcfs' && (
                <div className="border-t border-slate-100 pt-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      <span className="font-bold">FCFS flow:</span> Users see their pre-filled details (name, email, phone from their profile) and tap one button to confirm. No questions, no selection process. Spots are allocated instantly on a first-come basis until capacity is reached.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Access and logistics */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Access and Logistics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Access / entry instructions</label>
                <textarea
                  defaultValue={event?.accessNotes || ''}
                  placeholder="Which gate to enter, what to show at security, how to find the venue inside a complex..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Parking and transport</label>
                <textarea
                  defaultValue={event?.parking || ''}
                  placeholder="Parking availability, cost, nearest metro, recommended transport..."
                  rows={2}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Age restriction</label>
                  <div className="px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-900 font-medium">18+</span>
                    <span className="text-xs text-slate-400 ml-2">(all events)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Fixed - all Rewards Club events are 18+</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Dress code</label>
                  <input
                    type="text"
                    defaultValue={event?.dressCode || ''}
                    placeholder="e.g. Smart casual"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>


          {/* Lists -- what to bring, included, not allowed */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Event Details (Lists)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">What to bring * <span className="text-slate-400 font-normal">(one item per line)</span></label>
                <textarea
                  defaultValue={event?.whatToBring?.join('\n') || ''}
                  placeholder={"Government-issued photo ID\nConfirmation email\nComfortable shoes"}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">What's included <span className="text-slate-400 font-normal">(one item per line)</span></label>
                <textarea
                  defaultValue={event?.included?.join('\n') || ''}
                  placeholder={"Complimentary drinks\nSigned poster\nPhoto opportunity"}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Not allowed <span className="text-slate-400 font-normal">(one item per line)</span></label>
                <textarea
                  defaultValue={event?.notAllowed?.join('\n') || ''}
                  placeholder={"Professional cameras\nOutside food or beverages"}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Day-of Contact</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">WhatsApp helpline</label>
              <input
                type="tel"
                defaultValue={event?.contactWhatsApp || ''}
                placeholder="+91 98200 12345"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Shown to registered users on event day</p>
            </div>
          </section>

          {/* Event images */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-900">Event Images</h2>
              <span className="text-[10px] text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">2 placements, 2 breakpoints each</span>
            </div>

            {/* Hero image -- detail page banner */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold text-slate-700">Hero banner</h3>
                <span className="text-[10px] text-slate-400">Shown on event detail page</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Desktop hero */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Desktop (16:9)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center aspect-video flex flex-col items-center justify-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <svg className="w-6 h-6 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
                    </svg>
                    <p className="text-[10px] text-slate-400 font-medium">1920 x 1080px</p>
                    <p className="text-[10px] text-slate-300">Max 5MB</p>
                  </div>
                </div>
                {/* Mobile hero */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Mobile (4:3)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center aspect-video flex flex-col items-center justify-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <svg className="w-6 h-6 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
                    </svg>
                    <p className="text-[10px] text-slate-400 font-medium">1200 x 900px</p>
                    <p className="text-[10px] text-slate-300">Max 5MB</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Desktop shows full width on detail page. Mobile version is a tighter crop optimised for smaller screens.</p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-6" />

            {/* Card thumbnail -- catalog grid */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold text-slate-700">Card thumbnail</h3>
                <span className="text-[10px] text-slate-400">Shown on rewards catalog grid</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Desktop card */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Desktop (16:9)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center aspect-video flex flex-col items-center justify-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <svg className="w-6 h-6 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
                    </svg>
                    <p className="text-[10px] text-slate-400 font-medium">800 x 450px</p>
                    <p className="text-[10px] text-slate-300">Max 2MB</p>
                  </div>
                </div>
                {/* Mobile card */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Mobile (1:1)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center aspect-video flex flex-col items-center justify-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <svg className="w-6 h-6 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
                    </svg>
                    <p className="text-[10px] text-slate-400 font-medium">600 x 600px</p>
                    <p className="text-[10px] text-slate-300">Max 2MB</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Card image can be a different crop or entirely different asset from the hero. Square works best on mobile grid.</p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-6" />

            {/* Focal point */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold text-slate-700">Focal point (fallback crop anchor)</h3>
                <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-medium">Optional</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">If only one image is uploaded per slot, the focal point determines where the crop centres at different aspect ratios. Click on the image to set.</p>
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="aspect-video bg-slate-200 rounded-lg relative overflow-hidden">
                  {/* Simulated focal point indicator */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 rounded-full border-2 border-white shadow-lg bg-blue-500/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white shadow" />
                    </div>
                  </div>
                  {/* Crop overlay guides */}
                  <div className="absolute inset-x-0 top-0 h-[15%] bg-black/20" />
                  <div className="absolute inset-x-0 bottom-0 h-[15%] bg-black/20" />
                  <p className="absolute bottom-2 right-3 text-[9px] text-white/70 font-mono">focal: 50%, 33%</p>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-slate-500 font-medium">X</label>
                    <input type="text" defaultValue="50%" className="w-14 px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-700 text-center" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-slate-500 font-medium">Y</label>
                    <input type="text" defaultValue="33%" className="w-14 px-2 py-1 border border-slate-200 rounded text-[10px] text-slate-700 text-center" />
                  </div>
                  <button className="text-[10px] text-blue-500 font-medium hover:text-blue-600 cursor-pointer">Reset to centre</button>
                </div>
              </div>
            </div>

            {/* Summary note */}
            <div className="mt-5 bg-slate-50 rounded-lg p-4">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                <span className="font-bold">How it works:</span> Upload separate assets for desktop and mobile per placement for maximum control. If you only upload the desktop version, the mobile slot will use the same image with object-fit:cover, anchored at the focal point. The card thumbnail can be a completely different image from the hero (e.g. a tighter artist portrait vs a wide stage shot).
              </p>
            </div>
          </section>

          {/* Registrations section - only shown for existing events */}
          {!isNew && (
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Registrations</h2>
                <p className="text-xs text-slate-400 mt-0.5">{event?.totalSpots ? (event.totalSpots - (event.spotsLeft ?? 0)) : 0} registered of {event?.totalSpots ?? 0} capacity</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>

            {/* Capacity bar */}
            <div className="mb-5">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${event?.totalSpots ? Math.round(((event.totalSpots - (event.spotsLeft ?? 0)) / event.totalSpots) * 100) : 0}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                  {event?.spotsLeft ?? 0} spots remaining
                </span>
              </div>
            </div>

            {/* Registrations table */}
            <div className="border border-slate-100 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mock registration data */}
                  {[
                    { name: 'Priya Sharma', email: 'priya.s@gmail.com', phone: '+91 98765 43210', date: '2 May 2025', status: 'confirmed' },
                    { name: 'Rahul Mehta', email: 'rahul.m@outlook.com', phone: '+91 87654 32109', date: '3 May 2025', status: 'confirmed' },
                    { name: 'Ananya Gupta', email: 'ananya.g@yahoo.com', phone: '+91 76543 21098', date: '3 May 2025', status: 'cancelled' },
                    { name: 'Vikram Singh', email: 'vikram.s@gmail.com', phone: '+91 65432 10987', date: '4 May 2025', status: 'confirmed' },
                    { name: 'Neha Patel', email: 'neha.p@gmail.com', phone: '+91 54321 09876', date: '5 May 2025', status: 'confirmed' },
                  ].map((reg, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0">
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-900 font-medium">{reg.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-600">{reg.email}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-600">{reg.phone}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-400">{reg.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          reg.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                        }`}>
                          {reg.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cancellation note */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
              <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-[10px] text-amber-700 leading-relaxed">
                <span className="font-bold">Cancellation policy:</span> When a user cancels, their spot is released back into the available pool immediately. The event becomes bookable again if it was previously full. Cancelled registrations remain in this list for records but don't count toward capacity.
              </p>
            </div>
          </section>
          )}
        </div>
      </div>
    </CMSShell>
  );
}
