import { Link } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';

export function Privacy() {
  return (
    <WireframeShell>
      <section className="px-5 md:px-6 lg:px-12 xl:px-20 py-10 md:py-16">
        <div className="max-w-2xl">
          <Link to="/rewards" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </Link>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>

          <div className="space-y-8">
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">What we collect</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                When you register for Rewards Club, we collect:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  Name (first and last) -- to personalise your experience
                </li>
                <li className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  Email address -- to send voucher codes and event confirmations
                </li>
                <li className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  Phone number -- for SMS voucher delivery and event updates
                </li>
                <li className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  Date of birth -- for age verification and age-appropriate offers
                </li>
                <li className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  Gender -- to personalise brand offers (optional)
                </li>
                <li className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  City -- to show events and location-specific rewards near you
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Spotify account data</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                With your consent, we access your Spotify account data to verify your Premium subscription status, view your listening activity (for personalised event recommendations), and confirm your billing country. We do not access your payment information or modify your Spotify account in any way.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">How we use your data</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your data is used to: deliver voucher codes, match you with relevant rewards based on your location and preferences, register you for events, send transactional communications (codes, confirmations, reminders), and improve the Service. We do not sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Data sharing</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We share limited data with brand partners only when you claim a reward (e.g., your email to deliver a voucher code from Myntra). Partners receive only the minimum data required to fulfil the reward. We share anonymised, aggregated analytics with partners to improve offer relevance.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Data retention</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your profile data is retained for as long as your Rewards Club account is active. Claimed voucher history is retained for 12 months after expiry for support purposes. You may request full deletion at any time.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Your rights</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                You have the right to: access your data, correct inaccuracies, request deletion, withdraw consent for Spotify account access (via Spotify settings), and opt out of non-essential communications. To exercise these rights, visit your Account settings or contact rewards-support@spotify.com.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Security</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We use industry-standard encryption and security measures to protect your data. All data is stored on secure servers within India in compliance with applicable data protection regulations.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-300">
                For privacy-related queries, contact privacy-rewards@spotify.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </WireframeShell>
  );
}
