import { usePlan } from '../context/PlanContext'
import { calcReiRevenue, calcBbRevenue, calcRebRevenue } from '../context/PlanContext'

export default function ExecutiveSummary() {
  const { plan, update } = usePlan()
  const es = plan.executiveSummary

  const reiRev = calcReiRevenue(plan.rei)
  const bbRev = calcBbRevenue(plan.businessBrokerage)
  const rebRev = calcRebRevenue(plan.reBrokerage)

  const totalY1 = reiRev.year1 + bbRev.year1 + rebRev.year1
  const totalY3 = reiRev.year3 + bbRev.year3 + rebRev.year3

  const fmt = n => '$' + Number(n).toLocaleString()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Executive Summary</h1>
        <p className="section-subtitle">A concise overview of your business opportunity and strategy</p>
      </div>

      {/* Auto Summary */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 text-white rounded-xl p-6">
        <div className="text-sm font-semibold text-gold-300 mb-3 uppercase tracking-wider">Business Snapshot</div>
        <div className="text-lg font-bold mb-1">{plan.company.name || 'My Real Estate Business'}</div>
        {plan.company.tagline && <div className="text-navy-200 text-sm mb-4 italic">"{plan.company.tagline}"</div>}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[
            { label: 'Business Lines', value: '3' },
            { label: 'Projected Y1 Revenue', value: fmt(totalY1) },
            { label: 'Projected Y3 Revenue', value: fmt(totalY3) },
            { label: 'Entity Type', value: plan.company.entityType },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-gold-300">{s.value}</div>
              <div className="text-xs text-navy-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Written Fields */}
      <div className="section-card space-y-4">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Business Overview</h2>
        <Textarea
          label="Business Overview"
          hint="Describe your business in 2-3 paragraphs — who you are, what you do, and why you'll succeed."
          value={es.overview}
          onChange={v => update('executiveSummary', { overview: v })}
          rows={5}
          placeholder={`${plan.company.name || 'Our company'} is a diversified real estate and business services firm focused on three core revenue streams: real estate investment, business brokerage, and real estate brokerage. Founded in ${plan.company.founded}, we are uniquely positioned to serve clients across the full spectrum of real estate and business transactions...`}
        />
        <Textarea
          label="Problem & Opportunity"
          hint="What market need or gap does your business address?"
          value={es.problemSolved}
          onChange={v => update('executiveSummary', { problemSolved: v })}
          rows={3}
          placeholder="Many property owners and business owners lack access to expert guidance for maximizing the value of their assets. We bridge this gap by combining investment acumen with brokerage expertise..."
        />
        <Textarea
          label="Our Solution"
          hint="How does your business uniquely solve the problem?"
          value={es.solution}
          onChange={v => update('executiveSummary', { solution: v })}
          rows={3}
          placeholder="We offer a one-stop solution for real estate and business transactions, combining deep market knowledge, a robust network, and three specialized service lines under one roof..."
        />
        <Textarea
          label="Keys to Success"
          hint="What critical factors will drive your business success?"
          value={es.keysToSuccess}
          onChange={v => update('executiveSummary', { keysToSuccess: v })}
          rows={3}
          placeholder="• Deep local market knowledge&#10;• Diversified revenue across three lines&#10;• Strong professional network&#10;• Rigorous due diligence process&#10;• Client-first approach"
        />
      </div>

      {/* Revenue Preview */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2 mb-4">3-Year Revenue Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { year: 'Year 1', rei: reiRev.year1, bb: bbRev.year1, reb: rebRev.year1 },
            { year: 'Year 2', rei: reiRev.year2, bb: bbRev.year2, reb: rebRev.year2 },
            { year: 'Year 3', rei: reiRev.year3, bb: bbRev.year3, reb: rebRev.year3 },
          ].map(row => {
            const total = row.rei + row.bb + row.reb
            return (
              <div key={row.year} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="font-bold text-navy-800 text-sm mb-3">{row.year}</div>
                <div className="space-y-2 text-xs">
                  <RevRow icon="🏠" label="RE Investment" val={fmt(row.rei)} />
                  <RevRow icon="💼" label="Business Brokerage" val={fmt(row.bb)} />
                  <RevRow icon="🔑" label="RE Brokerage" val={fmt(row.reb)} />
                  <div className="border-t pt-2 flex justify-between font-bold text-navy-800">
                    <span>Total</span>
                    <span className="text-gold-600">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">* Based on projections configured in Business Lines section</p>
      </div>
    </div>
  )
}

function Textarea({ label, hint, value, onChange, rows, placeholder }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {hint && <p className="text-xs text-gray-500 mb-1">{hint}</p>}
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

function RevRow({ icon, label, val }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{icon} {label}</span>
      <span className="font-semibold text-gray-800">{val}</span>
    </div>
  )
}
