import { Link } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';

export function Terms() {
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

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>

          <div className="space-y-8">
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                By accessing and using the Spotify Rewards Club ("Service"), you agree to be bound by these Terms of Service. The Service is available exclusively to Spotify Premium subscribers in India, including those on trial periods and sub-accounts.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. Eligibility</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                You must be at least 18 years of age and hold an active Spotify Premium subscription to use this Service. If your Premium subscription lapses, access to new rewards will be suspended, though previously claimed vouchers remain valid until their stated expiry date.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. Rewards and Vouchers</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Discount vouchers are provided by third-party brand partners and are subject to their individual terms and conditions. Voucher codes are single-use, non-transferable, and cannot be exchanged for cash. Spotify does not guarantee the availability of any specific reward and reserves the right to modify or withdraw offers at any time.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. Events</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Event registrations are subject to availability. For contest-based events, selection is at the sole discretion of Spotify and its partners. Event details including dates, venues, and lineups are subject to change. Spotify is not liable for any event cancellations by third-party organisers.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. User Data</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Information collected during registration is used solely for the purposes described in our Privacy Policy. You may request deletion of your data at any time by contacting support or through your Account settings.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Service is provided "as is" without warranties of any kind. Spotify shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service or any third-party rewards.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. Changes to Terms</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Spotify reserves the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the revised terms. Material changes will be communicated via email or in-app notification.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-300">
                For questions about these terms, contact rewards-support@spotify.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </WireframeShell>
  );
}
