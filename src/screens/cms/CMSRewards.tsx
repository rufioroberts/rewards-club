import { CMSShell } from '../../components/CMSShell';
import { rewards } from '../../data/mockData';

export function CMSRewards() {
  return (
    <CMSShell>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Rewards (API)</h1>
            <p className="text-sm text-slate-400">Vouchers pulled from Razorpay Rewards Marketplace v2.0 API. Read-only - managed externally.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">API Connected</span>
            </div>
            <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Sync now
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Rewards are managed via Razorpay Engage</p>
            <p className="text-xs text-blue-600 mt-0.5">Voucher codes, brands, discounts, and expiry dates are all pulled from the Razorpay Rewards Marketplace API (v2.0). To add or modify rewards, use the Razorpay Engage dashboard. Rewards are scoped to a Program ID.</p>
          </div>
        </div>



        {/* Rewards table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Availability note */}
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-600">Last chance</span>
            <span className="text-[11px] text-slate-400">= Razorpay API balance below threshold. Shown to users on front-end. Not manually set.</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brand</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Offer</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Discount</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Value / Plan</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expiry</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Availability</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map(reward => (
                <tr key={reward.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-slate-900">{reward.brand}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-600">{reward.title}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      reward.rewardType === 'gift_card' ? 'bg-blue-50 text-blue-600' :
                      reward.rewardType === 'membership' ? 'bg-purple-50 text-purple-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {reward.rewardType === 'gift_card' ? 'Gift Card' : reward.rewardType === 'membership' ? 'Membership' : 'Offer'}
                    </span>
                    {reward.rewardType === 'offer' && reward.offerHasCode === false && (
                      <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-600">No code</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-semibold text-slate-700">{reward.discount}</span>
                  </td>
                  <td className="px-5 py-4">
                    {reward.rewardType === 'gift_card' && reward.cardValue ? (
                      <span className="px-1.5 py-0.5 bg-slate-50 rounded text-[10px] text-slate-500">Rs.{reward.cardValue}</span>
                    ) : reward.rewardType === 'membership' && reward.interval ? (
                      <span className="text-xs text-slate-500">{reward.interval}</span>
                    ) : (
                      <span className="text-xs text-slate-300">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-500">{reward.expiry}</div>
                  </td>
                  <td className="px-5 py-4">
                    {reward.lastChance ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600">
                        Last chance
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                        Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



      </div>
    </CMSShell>
  );
}
