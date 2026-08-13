import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { usePlan, calcReiRevenue, calcBbRevenue, calcRebRevenue } from '../context/PlanContext'

const COLORS = ['#1e3a5f', '#c9891a', '#2a7a4b']

const fmt = n => '$' + Number(n || 0).toLocaleString()
const fmtK = n => {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'K'
  return '$' + n
}

export default function Financials() {
  const { plan } = usePlan()

  const reiRev = calcReiRevenue(plan.rei)
  const bbRev = calcBbRevenue(plan.businessBrokerage)
  const rebRev = calcRebRevenue(plan.reBrokerage)

  const reiExp = plan.rei.projections
  const bbExp = plan.businessBrokerage.projections
  const rebExp = plan.reBrokerage.projections

  const years = ['year1', 'year2', 'year3']

  const chartData = years.map((yr, i) => {
    const reiR = reiRev[yr]
    const bbR = bbRev[yr]
    const rebR = rebRev[yr]
    const reiE = (reiExp[yr].expenses || 0)
    const bbE = (bbExp[yr].expenses || 0)
    const rebE = (rebExp[yr].expenses || 0)
    const totalRev = reiR + bbR + rebR
    const totalExp = reiE + bbE + rebE
    return {
      year: `Year ${i + 1}`,
      'RE Investment': reiR,
      'Business Brokerage': bbR,
      'RE Brokerage': rebR,
      Revenue: totalRev,
      Expenses: totalExp,
      'Net Profit': totalRev - totalExp,
    }
  })

  const pieData = [
    { name: 'RE Investment', value: reiRev.year1 + reiRev.year2 + reiRev.year3 },
    { name: 'Business Brokerage', value: bbRev.year1 + bbRev.year2 + bbRev.year3 },
    { name: 'RE Brokerage', value: rebRev.year1 + rebRev.year2 + rebRev.year3 },
  ].filter(d => d.value > 0)

  const totalRev = chartData.map(d => d.Revenue)
  const totalExp = chartData.map(d => d.Expenses)
  const totalProfit = chartData.map(d => d['Net Profit'])

  const kpis = [
    { label: 'Y1 Total Revenue', value: fmt(totalRev[0]), trend: null },
    { label: 'Y3 Total Revenue', value: fmt(totalRev[2]), trend: totalRev[0] > 0 ? `${Math.round((totalRev[2] / totalRev[0] - 1) * 100)}% growth` : null },
    { label: 'Y1 Net Profit', value: fmt(totalProfit[0]), sub: totalRev[0] > 0 ? `${Math.round((totalProfit[0] / totalRev[0]) * 100)}% margin` : null },
    { label: 'Y3 Net Profit', value: fmt(totalProfit[2]), sub: totalRev[2] > 0 ? `${Math.round((totalProfit[2] / totalRev[2]) * 100)}% margin` : null },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Financial Projections</h1>
        <p className="section-subtitle">3-year revenue, expense, and profitability analysis across all business lines</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="stat-card">
            <div className="text-2xl font-bold text-navy-800">{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
            {kpi.trend && <div className="text-xs text-green-600 font-medium mt-1">↑ {kpi.trend}</div>}
            {kpi.sub && <div className="text-xs text-gold-600 font-medium mt-1">{kpi.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stacked Revenue Bar Chart */}
        <div className="section-card">
          <h2 className="text-sm font-bold text-navy-700 mb-4">Revenue by Business Line (3 Years)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val) => fmt(val)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="RE Investment" stackId="a" fill={COLORS[0]} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Business Brokerage" stackId="a" fill={COLORS[1]} radius={[0, 0, 0, 0]} />
              <Bar dataKey="RE Brokerage" stackId="a" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Expenses Line Chart */}
        <div className="section-card">
          <h2 className="text-sm font-bold text-navy-700 mb-4">Revenue vs. Expenses vs. Net Profit</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val) => fmt(val)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Revenue" stroke="#1e3a5f" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Expenses" stroke="#dc3545" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="Net Profit" stroke="#28a745" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="section-card flex flex-col items-center">
          <h2 className="text-sm font-bold text-navy-700 mb-2 self-start">Revenue Mix (3-Year Total)</h2>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(val) => fmt(val)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 w-full">
                {pieData.map((d, i) => {
                  const total = pieData.reduce((s, x) => s + x.value, 0)
                  return (
                    <div key={d.name} className="flex justify-between text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: COLORS[i] }} />
                        {d.name}
                      </span>
                      <span className="font-semibold">{total > 0 ? Math.round(d.value / total * 100) : 0}%</span>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 py-8">Set projections in Business Lines</div>
          )}
        </div>

        {/* Detailed Table */}
        <div className="section-card md:col-span-2">
          <h2 className="text-sm font-bold text-navy-700 mb-3">Detailed Financial Summary</h2>
          <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[480px]">
            <thead>
              <tr className="bg-navy-50">
                <th className="text-left px-3 py-2 rounded-l text-navy-700">Line Item</th>
                <th className="text-right px-3 py-2 text-navy-700">Year 1</th>
                <th className="text-right px-3 py-2 text-navy-700">Year 2</th>
                <th className="text-right px-3 py-2 rounded-r text-navy-700">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <TableSection label="REVENUE" />
              <TableRow label="🏠 RE Investment" v1={reiRev.year1} v2={reiRev.year2} v3={reiRev.year3} />
              <TableRow label="💼 Business Brokerage" v1={bbRev.year1} v2={bbRev.year2} v3={bbRev.year3} />
              <TableRow label="🔑 RE Brokerage" v1={rebRev.year1} v2={rebRev.year2} v3={rebRev.year3} />
              <TableRow label="Total Revenue" v1={totalRev[0]} v2={totalRev[1]} v3={totalRev[2]} bold />
              <TableSection label="EXPENSES" />
              <TableRow label="🏠 RE Investment Expenses" v1={reiExp.year1.expenses} v2={reiExp.year2.expenses} v3={reiExp.year3.expenses} neg />
              <TableRow label="💼 Business Brokerage Expenses" v1={bbExp.year1.expenses} v2={bbExp.year2.expenses} v3={bbExp.year3.expenses} neg />
              <TableRow label="🔑 RE Brokerage Expenses" v1={rebExp.year1.expenses} v2={rebExp.year2.expenses} v3={rebExp.year3.expenses} neg />
              <TableRow label="Total Expenses" v1={totalExp[0]} v2={totalExp[1]} v3={totalExp[2]} bold neg />
              <TableSection label="PROFITABILITY" />
              <TableRow label="Net Profit" v1={totalProfit[0]} v2={totalProfit[1]} v3={totalProfit[2]} bold profit />
              <TableRow
                label="Profit Margin"
                v1={totalRev[0] > 0 ? `${Math.round(totalProfit[0] / totalRev[0] * 100)}%` : '—'}
                v2={totalRev[1] > 0 ? `${Math.round(totalProfit[1] / totalRev[1] * 100)}%` : '—'}
                v3={totalRev[2] > 0 ? `${Math.round(totalProfit[2] / totalRev[2] * 100)}%` : '—'}
                isStr
              />
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function TableSection({ label }) {
  return (
    <tr className="bg-gray-50">
      <td colSpan={4} className="px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</td>
    </tr>
  )
}

function TableRow({ label, v1, v2, v3, bold, neg, profit, isStr }) {
  const cls = bold ? 'font-bold' : ''
  const color = profit
    ? (v1 >= 0 ? 'text-green-700' : 'text-red-600')
    : neg ? 'text-red-500' : 'text-gray-800'

  const display = v => isStr ? v : (neg ? `(${fmt(v)})` : fmt(v))

  return (
    <tr className="hover:bg-gray-50">
      <td className={`px-3 py-2 ${cls} ${bold ? 'text-navy-800' : 'text-gray-700'}`}>{label}</td>
      <td className={`px-3 py-2 text-right ${cls} ${color}`}>{display(v1)}</td>
      <td className={`px-3 py-2 text-right ${cls} ${color}`}>{display(v2)}</td>
      <td className={`px-3 py-2 text-right ${cls} ${color}`}>{display(v3)}</td>
    </tr>
  )
}
