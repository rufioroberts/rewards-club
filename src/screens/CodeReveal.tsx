import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';
import { mockRewards } from '../data/mockData';
import { FadeUp, ScaleIn } from '../components/Motion';
import { Annotation } from '../components/Annotation';

function CopyButton({ label, onCopy }: { label: string; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-5 py-2 text-xs font-bold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer ${
        copied
          ? 'bg-gray-100 text-gray-500 border border-gray-200'
          : 'bg-gray-900 text-white'
      }`}
    >
      {copied ? 'Copied' : label}
    </button>
  );
}

export function CodeReveal() {
  const { rewardId } = useParams();
  const reward = mockRewards.find(r => r.id === rewardId);

  // Mock: some rewards have a PIN, some don't
  const hasPin = reward?.id === 'r5'; // Only the gift card has a PIN in our mock

  if (!reward) {
    return (
      <WireframeShell>
        <div className="px-6 lg:px-12 xl:px-20 py-20 text-center">
          <p className="text-sm text-gray-400">This reward is no longer available.</p>
        </div>
      </WireframeShell>
    );
  }

  return (
    <WireframeShell>
      <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-8 md:py-12">
        <div className="max-w-lg mx-auto">
          {/* Success */}
          <ScaleIn>
          <div className="text-center mb-8 md:mb-10">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-900 mx-auto mb-4 md:mb-5 flex items-center justify-center shadow-lg shadow-gray-900/20">
              <span className="text-white text-xl md:text-2xl">&#10003;</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">Code claimed</h1>
            <p className="text-sm text-gray-400">{reward.brand} &middot; {reward.title}</p>
            {reward.rewardType === 'gift_card' && (
              <p className="text-sm text-gray-500 font-semibold mt-1">Rs.500 gift card</p>
            )}
            {reward.rewardType === 'membership' && reward.interval && (
              <p className="text-sm text-gray-500 font-semibold mt-1">{reward.interval} plan</p>
            )}
          </div>
          </ScaleIn>

          {/* Voucher code - always present */}
          <FadeUp delay={200}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Your voucher code</span>
              <Annotation
                id="voucher-code"
                type="api"
                note="Razorpay API: Create Order response returns 'vouchers[].code'. One voucher per order item. Status must be 'complete' for voucher to exist."
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <code className="text-lg md:text-2xl font-black text-gray-900 tracking-widest">ARVG-FSZX-2694</code>
              <CopyButton label="Copy code" onCopy={() => {}} />
            </div>
          </div>
          </FadeUp>

          {/* PIN - separate card, only shown when API returns a pin */}
          {hasPin && (
            <FadeUp delay={300}>
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">PIN</span>
                <Annotation
                  id="pin-field"
                  type="api"
                  note="Razorpay API: 'vouchers[].pin' field. Not all vouchers have a PIN - this entire card is conditionally rendered only when 'pin' is present in the response."
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <code className="text-lg md:text-xl font-black text-gray-900 tracking-widest">csdc123</code>
                <CopyButton label="Copy PIN" onCopy={() => {}} />
              </div>
            </div>
            </FadeUp>
          )}

          {/* Expires - its own row */}
          <FadeUp delay={hasPin ? 400 : 300}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Expires</span>
              <Annotation
                id="expiry-field"
                type="api"
                note="Razorpay API: 'vouchers[].validity' field. Unix timestamp - we convert to human-readable date on the client."
              />
            </div>
            <div className="font-bold text-gray-900">{reward.expiry}</div>
          </div>
          </FadeUp>

          {/* Redemption channels */}
          <FadeUp delay={hasPin ? 500 : 400}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Where to redeem</span>
              <Annotation
                id="channels"
                type="api"
                note="Razorpay API: 'display_parameters.redemption_channel' array. Values: 'online', 'instore'. We display as pills."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {reward.channels.map(ch => (
                <span key={ch} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 font-medium">{ch}</span>
              ))}
            </div>
          </div>
          </FadeUp>

          {/* Terms and conditions */}
          <FadeUp delay={hasPin ? 600 : 500}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Terms and conditions</span>
              <Annotation
                id="tnc"
                type="api"
                note="Razorpay API: 'tnc' field. HTML string from the API -- rendered as-is. Content managed by brand partner, not us."
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Valid for single use only. Cannot be combined with other offers or promotions. Minimum order value of Rs.999 applies. Not valid on select brands. Discount capped at Rs.500. Code expires 30 days from date of issue. Non-transferable.
            </p>
          </div>
          </FadeUp>

          {/* Redemption URL */}
          <FadeUp delay={hasPin ? 700 : 600}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Redeem now</span>
              <Annotation
                id="redemption-url"
                type="api"
                note="Razorpay API: 'display_parameters.redemption_url' field. Direct link to the brand's redemption page. Always present in the response."
              />
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to {reward.brand}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
          </FadeUp>

          {/* Email confirmation note */}
          <FadeUp delay={hasPin ? 800 : 700}>
          <div className="flex items-center gap-2 mb-8">
            <p className="text-xs text-gray-300">
              This code has also been sent to your registered email.
            </p>
            <Annotation
              id="email-confirm"
              type="question"
              note="Does Razorpay handle email delivery of the voucher, or do we need to trigger this ourselves via our own email service?"
            />
          </div>

          <Link
            to="/rewards"
            className="block text-center px-8 py-3.5 bg-white text-gray-600 font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            Back to rewards
          </Link>
          </FadeUp>
        </div>
      </div>
    </WireframeShell>
  );
}
