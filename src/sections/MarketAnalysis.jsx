import { usePlan } from '../context/PlanContext'

export default function MarketAnalysis() {
  const { plan, update } = usePlan()
  const m = plan.market

  const set = (field, val) => update('market', { [field]: val })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Market Analysis</h1>
        <p className="section-subtitle">Research and define your target market, competition, and opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Market */}
        <div className="section-card space-y-4">
          <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Target Market</h2>
          <Textarea
            label="Geographic Focus"
            value={m.geography}
            onChange={v => set('geography', v)}
            rows={2}
            placeholder="e.g. Dallas-Fort Worth Metroplex, specifically Collin County and Denton County, TX"
          />
          <Textarea
            label="Target Demographics & Clients"
            value={m.targetDemographic}
            onChange={v => set('targetDemographic', v)}
            rows={3}
            placeholder="• RE Investment: Owner-occupants looking to sell, distressed sellers, off-market deals&#10;• Business Brokerage: Business owners aged 55+ looking to retire, startups seeking acquisitions&#10;• RE Brokerage: Move-up buyers, first-time homebuyers, investors"
          />
          <Textarea
            label="Estimated Market Size"
            value={m.marketSize}
            onChange={v => set('marketSize', v)}
            rows={2}
            placeholder="e.g. DFW has ~$30B in annual real estate transactions, 1,200+ businesses change hands annually..."
          />
        </div>

        {/* Competition */}
        <div className="section-card space-y-4">
          <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Competitive Landscape</h2>
          <Textarea
            label="Key Competitors"
            value={m.competitors}
            onChange={v => set('competitors', v)}
            rows={3}
            placeholder="• Large RE brokerages: Keller Williams, RE/MAX, Coldwell Banker&#10;• Business brokerages: Murphy Business, VR Business Brokers&#10;• Local investment firms and iBuyers (Opendoor, Offerpad)"
          />
          <Textarea
            label="Our Competitive Advantages"
            value={m.advantages}
            onChange={v => set('advantages', v)}
            rows={3}
            placeholder="• One-stop shop: Investment + Brokerage under one brand&#10;• Deep local market expertise&#10;• Personalized service vs. franchise cookie-cutter approach&#10;• Network of off-market deals&#10;• Speed and flexibility in decision-making"
          />
        </div>
      </div>

      {/* Market Trends */}
      <div className="section-card space-y-4">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Market Trends & External Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            label="Market Trends & Tailwinds"
            value={m.trends}
            onChange={v => set('trends', v)}
            rows={4}
            placeholder="• Aging baby boomer business owners creating a $10T business transfer wave&#10;• Population migration to Sun Belt markets&#10;• Rising rents supporting investment property demand&#10;• Technology enabling remote real estate transactions"
          />
          <Textarea
            label="Regulatory Environment"
            value={m.regulations}
            onChange={v => set('regulations', v)}
            rows={4}
            placeholder="• Texas real estate license requirements (TREC)&#10;• Business broker license regulations in your state&#10;• Zoning laws and property acquisition rules&#10;• SEC regulations for business sales over certain thresholds"
          />
        </div>
      </div>

      {/* Market Opportunity Scorecard */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2 mb-4">Market Opportunity by Business Line</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: '🏠', title: 'Real Estate Investment',
              factors: ['Low inventory = rising values', 'Strong rental demand', 'Recession-resistant asset class', 'Tax advantages (depreciation)'],
              score: 9,
            },
            {
              icon: '💼', title: 'Business Brokerage',
              factors: ['$10T boomer business transition wave', 'Few qualified brokers in market', 'High commission potential', 'Repeat referral business'],
              score: 8,
            },
            {
              icon: '🔑', title: 'Real Estate Brokerage',
              factors: ['Essential service always in demand', 'Multiple revenue pathways', 'Investor relationships = repeat business', 'Scalable with agent team'],
              score: 8,
            },
          ].map(line => (
            <div key={line.title} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{line.icon}</span>
                <div>
                  <div className="font-bold text-navy-800 text-sm">{line.title}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-3 rounded-sm ${i < line.score ? 'bg-gold-500' : 'bg-gray-200'}`}
                      />
                    ))}
                    <span className="text-xs text-gold-600 font-bold ml-1">{line.score}/10</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-1">
                {line.factors.map(f => (
                  <li key={f} className="text-xs text-gray-600 flex gap-1">
                    <span className="text-green-500 shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Textarea({ label, value, onChange, rows, placeholder }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <textarea
        className="field-textarea"
        rows={rows}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
