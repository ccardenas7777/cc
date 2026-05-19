import { useState } from 'react'
import { usePlan } from '../context/PlanContext'
import { calcReiRevenue, calcBbRevenue, calcRebRevenue } from '../context/PlanContext'

const TABS = [
  { id: 'rei', icon: '🏠', label: 'Real Estate Investment' },
  { id: 'bb', icon: '💼', label: 'Business Brokerage' },
  { id: 'reb', icon: '🔑', label: 'Real Estate Brokerage' },
]

const REI_STRATEGIES = ['Buy & Hold', 'Fix & Flip', 'Wholesale', 'BRRRR', 'Short-Term Rental', 'Commercial']
const PROPERTY_TYPES = ['Single Family', 'Multi-Family', 'Duplex/Triplex', 'Commercial', 'Land', 'Mobile Home Park']

export default function BusinessLines() {
  const [tab, setTab] = useState('rei')
  const { plan, update } = usePlan()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Business Lines</h1>
        <p className="section-subtitle">Configure each revenue stream with strategy, description, and 3-year projections</p>
      </div>

      {/* Tab Bar */}
      <div className="section-card !p-0 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                tab === t.id ? 'tab-active bg-navy-50' : 'tab-inactive hover:bg-gray-50'
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {tab === 'rei' && <ReiTab plan={plan} update={update} />}
          {tab === 'bb' && <BbTab plan={plan} update={update} />}
          {tab === 'reb' && <RebTab plan={plan} update={update} />}
        </div>
      </div>
    </div>
  )
}

function ReiTab({ plan, update }) {
  const rei = plan.rei
  const rev = calcReiRevenue(rei)

  const setRei = data => update('rei', data)
  const setProj = (yr, field, val) =>
    update('rei', {
      projections: {
        ...rei.projections,
        [yr]: { ...rei.projections[yr], [field]: Number(val) },
      },
    })

  const toggleStrategy = s => {
    const arr = rei.strategies.includes(s)
      ? rei.strategies.filter(x => x !== s)
      : [...rei.strategies, s]
    setRei({ strategies: arr })
  }

  const togglePropertyType = t => {
    const arr = rei.propertyTypes.includes(t)
      ? rei.propertyTypes.filter(x => x !== t)
      : [...rei.propertyTypes, t]
    setRei({ propertyTypes: arr })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Field label="Business Description" textarea rows={3}
            value={rei.description}
            onChange={v => setRei({ description: v })}
            placeholder="Describe your real estate investment strategy and goals..." />

          <div>
            <label className="field-label">Investment Strategies</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {REI_STRATEGIES.map(s => (
                <button
                  key={s}
                  onClick={() => toggleStrategy(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    rei.strategies.includes(s)
                      ? 'bg-navy-700 text-white border-navy-700'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-navy-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="field-label">Property Types</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {PROPERTY_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => togglePropertyType(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    rei.propertyTypes.includes(t)
                      ? 'bg-gold-500 text-white border-gold-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gold-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Initial Capital ($)" type="number" value={rei.initialCapital}
              onChange={v => setRei({ initialCapital: Number(v) })} placeholder="e.g. 100000" />
            <Field label="Target Markets" value={rei.targetMarkets}
              onChange={v => setRei({ targetMarkets: v })} placeholder="e.g. Dallas, TX" />
          </div>

          <Field label="Financing Strategy" value={rei.financingStrategy}
            onChange={v => setRei({ financingStrategy: v })}
            placeholder="e.g. Conventional loans, DSCR, private money, HELOCs..." />
          <Field label="Exit Strategy" value={rei.exitStrategy}
            onChange={v => setRei({ exitStrategy: v })}
            placeholder="e.g. Long-term hold 10+ years, refinance & repeat (BRRRR)..." />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-bold text-navy-700 mb-3 text-sm">📈 3-Year Projections</div>
            {['year1', 'year2', 'year3'].map((yr, i) => (
              <div key={yr} className="mb-4 last:mb-0">
                <div className="text-xs font-bold text-navy-600 mb-2 uppercase">Year {i + 1}</div>
                <div className="grid grid-cols-2 gap-2">
                  <MiniField label="Acquisitions" type="number" value={rei.projections[yr].acquisitions}
                    onChange={v => setProj(yr, 'acquisitions', v)} />
                  <MiniField label="Avg Purchase ($)" type="number" value={rei.projections[yr].avgPurchasePrice}
                    onChange={v => setProj(yr, 'avgPurchasePrice', v)} />
                  <MiniField label="Gross Rent ($)" type="number" value={rei.projections[yr].grossRent}
                    onChange={v => setProj(yr, 'grossRent', v)} />
                  <MiniField label="Expenses ($)" type="number" value={rei.projections[yr].expenses}
                    onChange={v => setProj(yr, 'expenses', v)} />
                  <MiniField label="Appreciation ($)" type="number" value={rei.projections[yr].appreciation}
                    onChange={v => setProj(yr, 'appreciation', v)} />
                  <div className="bg-navy-50 rounded p-2 text-center">
                    <div className="text-xs text-gray-500">Net Revenue</div>
                    <div className="font-bold text-navy-700 text-sm">${rev[yr].toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BbTab({ plan, update }) {
  const bb = plan.businessBrokerage
  const rev = calcBbRevenue(bb)

  const setBb = data => update('businessBrokerage', data)
  const setProj = (yr, field, val) =>
    update('businessBrokerage', {
      projections: {
        ...bb.projections,
        [yr]: { ...bb.projections[yr], [field]: Number(val) },
      },
    })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Field label="Business Description" textarea rows={3}
            value={bb.description}
            onChange={v => setBb({ description: v })}
            placeholder="Describe your business brokerage services and target market..." />
          <Field label="Target Business Sectors" textarea rows={2}
            value={bb.targetSectors}
            onChange={v => setBb({ targetSectors: v })}
            placeholder="e.g. Restaurants, retail, service businesses, franchises, $500K-$5M range..." />
          <Field label="Deal Size Range" value={bb.dealSizeRange}
            onChange={v => setBb({ dealSizeRange: v })} placeholder="e.g. $500K – $5M" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Commission Rate (%)" type="number" value={bb.commissionRate}
              onChange={v => setBb({ commissionRate: Number(v) })} placeholder="10" />
          </div>
          <Field label="Marketing Strategy" textarea rows={2}
            value={bb.marketing}
            onChange={v => setBb({ marketing: v })}
            placeholder="e.g. Business owner networks, CPA/attorney referrals, LinkedIn, direct mail..." />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-bold text-navy-700 mb-3 text-sm">📈 3-Year Projections</div>
            {['year1', 'year2', 'year3'].map((yr, i) => {
              const r = rev[yr]
              return (
                <div key={yr} className="mb-4 last:mb-0">
                  <div className="text-xs font-bold text-navy-600 mb-2 uppercase">Year {i + 1}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <MiniField label="# Deals" type="number" value={bb.projections[yr].deals}
                      onChange={v => setProj(yr, 'deals', v)} />
                    <MiniField label="Avg Deal Size ($)" type="number" value={bb.projections[yr].avgDealSize}
                      onChange={v => setProj(yr, 'avgDealSize', v)} />
                    <MiniField label="Expenses ($)" type="number" value={bb.projections[yr].expenses}
                      onChange={v => setProj(yr, 'expenses', v)} />
                    <div className="bg-navy-50 rounded p-2 text-center">
                      <div className="text-xs text-gray-500">Commission Revenue</div>
                      <div className="font-bold text-navy-700 text-sm">${r.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-gold-50 border border-gold-200 rounded-lg p-3 text-xs text-gold-800">
            <strong>Commission Formula:</strong> Deals × Avg Deal Size × {bb.commissionRate}%
          </div>
        </div>
      </div>
    </div>
  )
}

function RebTab({ plan, update }) {
  const reb = plan.reBrokerage
  const rev = calcRebRevenue(reb)

  const setReb = data => update('reBrokerage', data)
  const setProj = (yr, field, val) =>
    update('reBrokerage', {
      projections: {
        ...reb.projections,
        [yr]: { ...reb.projections[yr], [field]: Number(val) },
      },
    })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Field label="Business Description" textarea rows={3}
            value={reb.description}
            onChange={v => setReb({ description: v })}
            placeholder="Describe your real estate brokerage services..." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="License State" value={reb.licenseState}
              onChange={v => setReb({ licenseState: v })} placeholder="e.g. TX" />
            <Field label="Brokerage Name" value={reb.brokerage}
              onChange={v => setReb({ brokerage: v })} placeholder="e.g. My Realty LLC" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Commission Rate (%)" type="number" value={reb.commissionRate}
              onChange={v => setReb({ commissionRate: Number(v) })} placeholder="3" />
            <Field label="Agent Split (%)" type="number" value={reb.splitRatio}
              onChange={v => setReb({ splitRatio: Number(v) })} placeholder="80" />
          </div>
          <Field label="Marketing Strategy" textarea rows={2}
            value={reb.marketing}
            onChange={v => setReb({ marketing: v })}
            placeholder="e.g. Sphere of influence, social media, open houses, direct mail farming..." />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-bold text-navy-700 mb-3 text-sm">📈 3-Year Projections</div>
            {['year1', 'year2', 'year3'].map((yr, i) => {
              const r = rev[yr]
              return (
                <div key={yr} className="mb-4 last:mb-0">
                  <div className="text-xs font-bold text-navy-600 mb-2 uppercase">Year {i + 1}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <MiniField label="# Transactions" type="number" value={reb.projections[yr].transactions}
                      onChange={v => setProj(yr, 'transactions', v)} />
                    <MiniField label="Avg Sale Price ($)" type="number" value={reb.projections[yr].avgSalePrice}
                      onChange={v => setProj(yr, 'avgSalePrice', v)} />
                    <MiniField label="Expenses ($)" type="number" value={reb.projections[yr].expenses}
                      onChange={v => setProj(yr, 'expenses', v)} />
                    <div className="bg-navy-50 rounded p-2 text-center">
                      <div className="text-xs text-gray-500">Net Commission</div>
                      <div className="font-bold text-navy-700 text-sm">${r.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-gold-50 border border-gold-200 rounded-lg p-3 text-xs text-gold-800">
            <strong>Commission Formula:</strong> Transactions × Avg Price × {reb.commissionRate}% × {reb.splitRatio}% (agent split)
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', textarea, rows = 2 }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {textarea ? (
        <textarea className="field-textarea" rows={rows} value={value}
          onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input type={type} className="field-input" value={value}
          onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  )
}

function MiniField({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <input
        type={type}
        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-navy-400"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
