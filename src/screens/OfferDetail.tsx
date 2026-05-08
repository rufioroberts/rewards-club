import { Link, useParams, useNavigate } from 'react-router-dom';
import { WireframeShell } from '../components/WireframeShell';
import { useApp } from '../context/AppContext';
import { mockRewards } from '../data/mockData';
import { FadeUp } from '../components/Motion';
import { Annotation } from '../components/Annotation';

export function OfferDetail() {
  const { rewardId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const reward = mockRewards.find(r => r.id === rewardId);

  if (!reward) {
    return (
      <WireframeShell>
        <div className="px-6 lg:px-12 xl:px-20 py-20 text-center">
          <p className="text-sm text-gray-400">This reward is no longer available.</p>
          <Link to="/rewards" className="text-sm text-gray-900 font-semibold mt-3 inline-block hover:underline">Back to rewards</Link>
        </div>
      </WireframeShell>
    );
  }

  const isClaimed = state.claimedRewards.includes(reward.id);

  const handleClaim = () => {
    dispatch({ type: 'CLAIM_REWARD', payload: reward.id });
    navigate(`/rewards/${reward.id}/claim`);
  };

  return (
    <WireframeShell>
      <div className="px-5 md:px-6 lg:px-12 xl:px-20 pt-6 md:pt-8">
        <Link to="/rewards" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Back
        </Link>
      </div>

      <FadeUp>

      <div className="px-5 md:px-6 lg:px-12 xl:px-20 py-6 md:py-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl">
          {/* Brand visual - from Razorpay API */}
          <div className="bg-gray-100 rounded-3xl shadow-sm overflow-hidden aspect-[4/3] flex flex-col items-center justify-center relative">
            <div className="w-20 h-20 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-gray-400">{reward.brand.charAt(0)}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">API: brand_logo</span>
            <span className="text-[9px] text-gray-300 font-mono">Background: display_parameters.brand_color</span>
            <Annotation
              id="brand-image"
              type="api"
              note="Razorpay API provides 'display_parameters.brand_logo' (image URL) and 'display_parameters.brand_color' (hex). No hero image available from the API. We show the logo on the brand colour background. No manual uploads needed."
            />
          </div>

          {/* Details */}
          <div className="py-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">{reward.brand.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">{reward.brand}</h1>
                <p className="text-sm text-gray-400">{reward.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="inline-block bg-gray-900 text-white rounded-full px-6 py-2.5 text-lg font-black">
                {reward.discount}
              </div>
              {reward.lastChance && !isClaimed && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/60 rounded-full">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[11px] font-bold text-amber-600">Last chance</span>
                </div>
              )}
              <Annotation
                id="discount-value"
                type="api"
                note="Razorpay API: 'discount.discount_value' + 'discount.type' fields. We format as percentage or flat amount depending on type."
              />
            </div>

            {/* Reward type badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                reward.rewardType === 'gift_card' ? 'bg-blue-50 text-blue-600' :
                reward.rewardType === 'membership' ? 'bg-purple-50 text-purple-600' :
                'bg-gray-100 text-gray-500'
              }`}>
                {reward.rewardType === 'gift_card' ? 'Gift Card' : reward.rewardType === 'membership' ? 'Membership' : 'Offer'}
              </span>
              <Annotation
                id="reward-type"
                type="api"
                note="Razorpay API: 'type' field. Three types: gift_card, membership, offer. Each has different claim flows and data fields."
              />
              {reward.rewardType === 'offer' && reward.offerHasCode === false && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                  No code needed
                </span>
              )}
            </div>

            {/* Gift card value - fixed, pre-determined by Spotify/Razorpay config */}
            {reward.rewardType === 'gift_card' && reward.cardValue && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Card value</h2>
                  <Annotation
                    id="card-value"
                    type="api"
                    note="Razorpay API: 'eligible_fixed_denomination' - pre-configured between Spotify and Razorpay at program level. The user doesn't choose the value; it's fixed per reward listing."
                  />
                </div>
                <span className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full">
                  Rs.{reward.cardValue}
                </span>
              </div>
            )}

            {/* Membership interval */}
            {reward.rewardType === 'membership' && reward.interval && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Plan</h2>
                  <Annotation
                    id="membership-interval"
                    type="api"
                    note="Razorpay API: 'interval' field. Values: Monthly, Quarterly, Annual. Sent in the Create Order request body."
                  />
                </div>
                <span className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full">
                  {reward.interval}
                </span>
              </div>
            )}

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">About this offer</h2>
                  <Annotation
                    id="about-offer"
                    type="api"
                    note="Razorpay API: 'display_parameters.description' field. All copy is provided by the API - no manual content entry on our side."
                  />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{reward.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Where to redeem</h2>
                  <Annotation
                    id="redemption-channel"
                    type="api"
                    note="Razorpay API: 'display_parameters.redemption_channel' array. Values: 'instore', 'online'. Provided by API - not editable on our side."
                  />
                </div>
                <div className="flex gap-2">
                  {reward.channels.map(ch => (
                    <span key={ch} className="px-4 py-1.5 bg-white shadow-sm rounded-full text-xs text-gray-600 font-medium">{ch}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Valid until</h2>
                  <Annotation
                    id="valid-until"
                    type="api"
                    note="Razorpay API: 'end_date' field (unix timestamp). We convert to human-readable date. Provided by API."
                  />
                </div>
                <p className="text-sm text-gray-600 font-medium">{reward.expiry}</p>
              </div>

              <details className="group">
                <summary className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] cursor-pointer hover:text-gray-600 transition-colors">
                  Terms and conditions
                  <Annotation
                    id="tnc-detail"
                    type="api"
                    note="Razorpay API: 'display_parameters.terms' field. String managed by brand partner via Razorpay. Rendered as-is - we don't write or edit this content."
                  />
                </summary>
                <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                  Valid for single use only. Cannot be combined with other offers. Expires 30 days after claim. Minimum order value may apply. Full terms on partner website.
                </p>
              </details>
            </div>

            {/* CTA */}
            {isClaimed ? (
              <Link
                to={`/rewards/${reward.id}/claim`}
                className="inline-block px-8 py-3.5 bg-white text-gray-600 font-bold text-sm rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                View your code
              </Link>
            ) : reward.rewardType === 'offer' && reward.offerHasCode === false ? (
              <div>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); dispatch({ type: 'CLAIM_REWARD', payload: reward.id }); }}
                  className="inline-flex items-center gap-2.5 px-10 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Go to {reward.brand}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <p className="text-xs text-gray-300 mt-3">No code needed - discount applied automatically via link</p>
                <Annotation
                  id="no-code-offer"
                  type="api"
                  note="Razorpay API: 'offer_has_code' = FALSE. These offers don't generate a voucher code. User is redirected to the brand's redemption_url where the discount is applied automatically. We still track the 'claim' for history purposes."
                />
              </div>
            ) : (
              <button
                onClick={handleClaim}
                className="px-10 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {reward.rewardType === 'gift_card' ? `Claim Rs.${reward.cardValue} card` : 'Claim this offer'}
              </button>
            )}
          </div>
        </div>
      </div>
      </FadeUp>
    </WireframeShell>
  );
}
