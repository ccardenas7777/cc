import { usePlan, calcReiRevenue, calcBbRevenue, calcRebRevenue } from '../context/PlanContext'

const fmt = n => '$' + Number(n || 0).toLocaleString()

export default function PrintView() {
  const { plan } = usePlan()
  const { company, executiveSummary: es, rei, businessBrokerage: bb, reBrokerage: reb, market, swot, goals, actionPlan } = plan

  const reiRev = calcReiRevenue(rei)
  const bbRev = calcBbRevenue(bb)
  const rebRev = calcRebRevenue(reb)

  const reiExp = rei.projections
  const bbExp = bb.projections
  const rebExp = reb.projections

  const years = ['year1', 'year2', 'year3']
  const totalRev = years.map(y => reiRev[y] + bbRev[y] + rebRev[y])
  const totalExp = years.map(y => (reiExp[y].expenses||0) + (bbExp[y].expenses||0) + (rebExp[y].expenses||0))
  const totalProfit = totalRev.map((r, i) => r - totalExp[i])

  return (
    <div className="print-only">

      {/* ── Cover Page ── */}
      <div className="print-page flex flex-col items-center justify-center text-center min-h-[10in]">
        <div className="text-6xl mb-6">🏢</div>
        <h1 className="text-4xl font-bold text-navy-900 mb-2">
          {company.name || 'Business Plan'}
        </h1>
        {company.tagline && (
          <p className="text-xl text-gray-500 italic mb-8">"{company.tagline}"</p>
        )}
        <div className="w-24 h-1 bg-gold-500 mx-auto mb-8 rounded" />
        <div className="text-gray-600 space-y-1 text-sm">
          {company.owner && <p><strong>Owner:</strong> {company.owner}</p>}
          {company.entityType && <p><strong>Entity:</strong> {company.entityType}</p>}
          {company.email && <p><strong>Email:</strong> {company.email}</p>}
          {company.phone && <p><strong>Phone:</strong> {company.phone}</p>}
          {company.address && <p><strong>Address:</strong> {company.address}</p>}
          <p><strong>Founded:</strong> {company.founded}</p>
        </div>
        <div className="mt-12 text-xs text-gray-400">Confidential Business Plan</div>
      </div>

      {/* ── Executive Summary ── */}
      <div className="print-page">
        <PrintHeader title="Executive Summary" icon="📋" />
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Business Lines', value: '3' },
            { label: 'Y1 Revenue', value: fmt(totalRev[0]) },
            { label: 'Y3 Revenue', value: fmt(totalRev[2]) },
            { label: 'Entity', value: company.entityType },
          ].map(s => (
            <div key={s.label} className="bg-navy-50 border border-navy-100 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-navy-800">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
        {company.mission && <PrintBlock label="Mission" text={company.mission} />}
        {company.vision && <PrintBlock label="Vision" text={company.vision} />}
        {es.overview && <PrintBlock label="Business Overview" text={es.overview} />}
        {es.problemSolved && <PrintBlock label="Problem & Opportunity" text={es.problemSolved} />}
        {es.solution && <PrintBlock label="Our Solution" text={es.solution} />}
        {es.keysToSuccess && <PrintBlock label="Keys to Success" text={es.keysToSuccess} />}
      </div>

      {/* ── Business Line: REI ── */}
      <div className="print-page">
        <PrintHeader title="Business Line 1: Real Estate Investment" icon="🏠" />
        {rei.description && <PrintBlock label="Description" text={rei.description} />}
        {rei.strategies.length > 0 && (
          <PrintBlock label="Investment Strategies" text={rei.strategies.join(' · ')} />
        )}
        {rei.propertyTypes.length > 0 && (
          <PrintBlock label="Property Types" text={rei.propertyTypes.join(' · ')} />
        )}
        {rei.targetMarkets && <PrintBlock label="Target Markets" text={rei.targetMarkets} />}
        {rei.initialCapital > 0 && <PrintBlock label="Initial Capital" text={fmt(rei.initialCapital)} />}
        {rei.financingStrategy && <PrintBlock label="Financing Strategy" text={rei.financingStrategy} />}
        {rei.exitStrategy && <PrintBlock label="Exit Strategy" text={rei.exitStrategy} />}
        <div className="mt-4">
          <div className="font-semibold text-navy-700 text-sm mb-2">3-Year Projections</div>
          <table className="w-full text-xs border border-gray-200 rounded">
            <thead className="bg-navy-50">
              <tr>
                <th className="text-left px-3 py-2">Metric</th>
                <th className="text-right px-3 py-2">Year 1</th>
                <th className="text-right px-3 py-2">Year 2</th>
                <th className="text-right px-3 py-2">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <PRow label="Acquisitions" y1={reiExp.year1.acquisitions} y2={reiExp.year2.acquisitions} y3={reiExp.year3.acquisitions} raw />
              <PRow label="Avg Purchase Price" y1={reiExp.year1.avgPurchasePrice} y2={reiExp.year2.avgPurchasePrice} y3={reiExp.year3.avgPurchasePrice} />
              <PRow label="Gross Rent" y1={reiExp.year1.grossRent} y2={reiExp.year2.grossRent} y3={reiExp.year3.grossRent} />
              <PRow label="Appreciation" y1={reiExp.year1.appreciation} y2={reiExp.year2.appreciation} y3={reiExp.year3.appreciation} />
              <PRow label="Expenses" y1={reiExp.year1.expenses} y2={reiExp.year2.expenses} y3={reiExp.year3.expenses} />
              <PRow label="Net Revenue" y1={reiRev.year1} y2={reiRev.year2} y3={reiRev.year3} bold />
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Business Line: Business Brokerage ── */}
      <div className="print-page">
        <PrintHeader title="Business Line 2: Business Brokerage" icon="💼" />
        {bb.description && <PrintBlock label="Description" text={bb.description} />}
        {bb.targetSectors && <PrintBlock label="Target Business Sectors" text={bb.targetSectors} />}
        {bb.dealSizeRange && <PrintBlock label="Deal Size Range" text={bb.dealSizeRange} />}
        <PrintBlock label="Commission Rate" text={`${bb.commissionRate}%`} />
        {bb.marketing && <PrintBlock label="Marketing Strategy" text={bb.marketing} />}
        <div className="mt-4">
          <div className="font-semibold text-navy-700 text-sm mb-2">3-Year Projections</div>
          <table className="w-full text-xs border border-gray-200 rounded">
            <thead className="bg-navy-50">
              <tr>
                <th className="text-left px-3 py-2">Metric</th>
                <th className="text-right px-3 py-2">Year 1</th>
                <th className="text-right px-3 py-2">Year 2</th>
                <th className="text-right px-3 py-2">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <PRow label="# Deals" y1={bbExp.year1.deals} y2={bbExp.year2.deals} y3={bbExp.year3.deals} raw />
              <PRow label="Avg Deal Size" y1={bbExp.year1.avgDealSize} y2={bbExp.year2.avgDealSize} y3={bbExp.year3.avgDealSize} />
              <PRow label="Expenses" y1={bbExp.year1.expenses} y2={bbExp.year2.expenses} y3={bbExp.year3.expenses} />
              <PRow label="Commission Revenue" y1={bbRev.year1} y2={bbRev.year2} y3={bbRev.year3} bold />
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Business Line: RE Brokerage ── */}
      <div className="print-page">
        <PrintHeader title="Business Line 3: Real Estate Brokerage" icon="🔑" />
        {reb.description && <PrintBlock label="Description" text={reb.description} />}
        {reb.licenseState && <PrintBlock label="License State" text={reb.licenseState} />}
        {reb.brokerage && <PrintBlock label="Brokerage Name" text={reb.brokerage} />}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <PrintBlock label="Commission Rate" text={`${reb.commissionRate}%`} />
          <PrintBlock label="Agent Split" text={`${reb.splitRatio}%`} />
        </div>
        {reb.marketing && <PrintBlock label="Marketing Strategy" text={reb.marketing} />}
        <div className="mt-4">
          <div className="font-semibold text-navy-700 text-sm mb-2">3-Year Projections</div>
          <table className="w-full text-xs border border-gray-200 rounded">
            <thead className="bg-navy-50">
              <tr>
                <th className="text-left px-3 py-2">Metric</th>
                <th className="text-right px-3 py-2">Year 1</th>
                <th className="text-right px-3 py-2">Year 2</th>
                <th className="text-right px-3 py-2">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <PRow label="# Transactions" y1={reb.projections.year1.transactions} y2={reb.projections.year2.transactions} y3={reb.projections.year3.transactions} raw />
              <PRow label="Avg Sale Price" y1={reb.projections.year1.avgSalePrice} y2={reb.projections.year2.avgSalePrice} y3={reb.projections.year3.avgSalePrice} />
              <PRow label="Expenses" y1={reb.projections.year1.expenses} y2={reb.projections.year2.expenses} y3={reb.projections.year3.expenses} />
              <PRow label="Net Commission Revenue" y1={rebRev.year1} y2={rebRev.year2} y3={rebRev.year3} bold />
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Financial Summary ── */}
      <div className="print-page">
        <PrintHeader title="Financial Projections" icon="💰" />
        <table className="w-full text-sm border border-gray-200 rounded mb-6">
          <thead className="bg-navy-800 text-white">
            <tr>
              <th className="text-left px-4 py-2.5 rounded-tl">Line Item</th>
              <th className="text-right px-4 py-2.5">Year 1</th>
              <th className="text-right px-4 py-2.5">Year 2</th>
              <th className="text-right px-4 py-2.5 rounded-tr">Year 3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-gray-50"><td colSpan={4} className="px-4 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Revenue</td></tr>
            <PRow label="🏠 RE Investment" y1={reiRev.year1} y2={reiRev.year2} y3={reiRev.year3} />
            <PRow label="💼 Business Brokerage" y1={bbRev.year1} y2={bbRev.year2} y3={bbRev.year3} />
            <PRow label="🔑 RE Brokerage" y1={rebRev.year1} y2={rebRev.year2} y3={rebRev.year3} />
            <PRow label="Total Revenue" y1={totalRev[0]} y2={totalRev[1]} y3={totalRev[2]} bold />
            <tr className="bg-gray-50"><td colSpan={4} className="px-4 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Expenses</td></tr>
            <PRow label="🏠 RE Investment" y1={reiExp.year1.expenses} y2={reiExp.year2.expenses} y3={reiExp.year3.expenses} neg />
            <PRow label="💼 Business Brokerage" y1={bbExp.year1.expenses} y2={bbExp.year2.expenses} y3={bbExp.year3.expenses} neg />
            <PRow label="🔑 RE Brokerage" y1={rebExp.year1.expenses} y2={rebExp.year2.expenses} y3={rebExp.year3.expenses} neg />
            <PRow label="Total Expenses" y1={totalExp[0]} y2={totalExp[1]} y3={totalExp[2]} bold neg />
            <tr className="bg-gray-50"><td colSpan={4} className="px-4 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Profitability</td></tr>
            <PRow label="Net Profit" y1={totalProfit[0]} y2={totalProfit[1]} y3={totalProfit[2]} bold profit />
            <tr>
              <td className="px-4 py-2 text-gray-700">Profit Margin</td>
              {totalRev.map((r, i) => (
                <td key={i} className="px-4 py-2 text-right font-semibold text-navy-700">
                  {r > 0 ? `${Math.round(totalProfit[i] / r * 100)}%` : '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Y1 Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Year 1', rev: totalRev[0], exp: totalExp[0], profit: totalProfit[0] },
            { label: 'Year 2', rev: totalRev[1], exp: totalExp[1], profit: totalProfit[1] },
            { label: 'Year 3', rev: totalRev[2], exp: totalExp[2], profit: totalProfit[2] },
          ].map(y => (
            <div key={y.label} className="bg-navy-50 border border-navy-100 rounded-lg p-4 text-center">
              <div className="font-bold text-navy-700 text-sm mb-2">{y.label}</div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between"><span className="text-gray-500">Revenue</span><span className="font-semibold text-navy-800">{fmt(y.rev)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Expenses</span><span className="font-semibold text-red-600">({fmt(y.exp)})</span></div>
                <div className="border-t border-navy-200 pt-1 flex justify-between"><span className="font-bold text-navy-800">Net Profit</span><span className={`font-bold ${y.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmt(y.profit)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Market Analysis ── */}
      <div className="print-page">
        <PrintHeader title="Market Analysis" icon="🗺️" />
        {market.geography && <PrintBlock label="Geographic Focus" text={market.geography} />}
        {market.targetDemographic && <PrintBlock label="Target Demographics & Clients" text={market.targetDemographic} />}
        {market.marketSize && <PrintBlock label="Estimated Market Size" text={market.marketSize} />}
        {market.competitors && <PrintBlock label="Key Competitors" text={market.competitors} />}
        {market.advantages && <PrintBlock label="Competitive Advantages" text={market.advantages} />}
        {market.trends && <PrintBlock label="Market Trends & Tailwinds" text={market.trends} />}
        {market.regulations && <PrintBlock label="Regulatory Environment" text={market.regulations} />}
      </div>

      {/* ── SWOT ── */}
      <div className="print-page">
        <PrintHeader title="SWOT Analysis" icon="⚡" />
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'strengths', label: 'Strengths', icon: '💪', color: 'border-green-500 bg-green-50' },
            { key: 'weaknesses', label: 'Weaknesses', icon: '⚠️', color: 'border-amber-500 bg-amber-50' },
            { key: 'opportunities', label: 'Opportunities', icon: '🚀', color: 'border-blue-500 bg-blue-50' },
            { key: 'threats', label: 'Threats', icon: '🛡️', color: 'border-red-500 bg-red-50' },
          ].map(q => (
            <div key={q.key} className={`border-l-4 rounded-lg p-4 ${q.color}`}>
              <div className="font-bold text-sm mb-2">{q.icon} {q.label}</div>
              <ul className="space-y-1">
                {swot[q.key].filter(i => i.trim()).map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex gap-1.5">
                    <span className="shrink-0 text-gray-400">{idx + 1}.</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Goals ── */}
      <div className="print-page">
        <PrintHeader title="Goals & Milestones" icon="🎯" />
        <div className="space-y-4">
          {[
            { key: 'q1', label: 'Q1 Goals (0–90 Days)', color: 'border-emerald-500' },
            { key: 'q2', label: 'Q2 Goals (90–180 Days)', color: 'border-teal-500' },
            { key: 'year1', label: 'Year 1 Goals', color: 'border-blue-500' },
            { key: 'year3', label: 'Year 3 Goals', color: 'border-purple-500' },
            { key: 'year5', label: 'Year 5 Goals', color: 'border-gold-500' },
          ].map(g => {
            const items = goals[g.key].filter(i => i.trim())
            if (!items.length) return null
            return (
              <div key={g.key} className={`border-l-4 pl-4 ${g.color}`}>
                <div className="font-semibold text-sm text-navy-700 mb-1">{g.label}</div>
                <ul className="space-y-0.5">
                  {items.map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex gap-1.5">
                      <span className="text-gray-400 shrink-0">☐</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Action Plan ── */}
      <div className="print-page">
        <PrintHeader title="Action Plan" icon="✅" />
        <table className="w-full text-xs border border-gray-200 rounded">
          <thead className="bg-navy-800 text-white">
            <tr>
              <th className="text-left px-3 py-2 rounded-tl">Task</th>
              <th className="text-left px-3 py-2">Category</th>
              <th className="text-left px-3 py-2">Priority</th>
              <th className="text-left px-3 py-2">Deadline</th>
              <th className="text-left px-3 py-2 rounded-tr">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {actionPlan.map(item => (
              <tr key={item.id} className={item.status === 'done' ? 'opacity-50' : ''}>
                <td className="px-3 py-2 font-medium text-gray-800">
                  {item.status === 'done' ? '✓ ' : '☐ '}{item.task}
                  {item.notes && <div className="text-gray-400 font-normal">{item.notes}</div>}
                </td>
                <td className="px-3 py-2 text-gray-600">{item.category}</td>
                <td className="px-3 py-2">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-50 text-red-600' :
                    item.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>{item.priority}</span>
                </td>
                <td className="px-3 py-2 text-gray-500">
                  {item.deadline ? new Date(item.deadline + 'T00:00:00').toLocaleDateString() : '—'}
                </td>
                <td className="px-3 py-2 capitalize text-gray-600">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

function PrintHeader({ title, icon }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-navy-700">
      <span className="text-3xl">{icon}</span>
      <h2 className="text-2xl font-bold text-navy-800">{title}</h2>
    </div>
  )
}

function PrintBlock({ label, text }) {
  if (!text) return null
  return (
    <div className="mb-3">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
    </div>
  )
}

function PRow({ label, y1, y2, y3, bold, neg, profit, raw }) {
  const cls = bold ? 'font-bold' : ''
  const color = profit
    ? (y1 >= 0 ? 'text-green-700' : 'text-red-600')
    : neg ? 'text-red-500' : 'text-gray-800'
  const display = v => raw ? v : neg ? `(${fmt(v)})` : fmt(v)
  return (
    <tr className="hover:bg-gray-50">
      <td className={`px-4 py-2 ${cls} ${bold ? 'text-navy-800' : 'text-gray-700'}`}>{label}</td>
      <td className={`px-4 py-2 text-right ${cls} ${color}`}>{display(y1)}</td>
      <td className={`px-4 py-2 text-right ${cls} ${color}`}>{display(y2)}</td>
      <td className={`px-4 py-2 text-right ${cls} ${color}`}>{display(y3)}</td>
    </tr>
  )
}
