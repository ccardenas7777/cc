import { usePlan } from '../context/PlanContext'

const GOAL_PERIODS = [
  { key: 'q1', label: 'Q1 Goals', subtitle: '0–90 Days', icon: '🌱', color: 'bg-emerald-50 border-emerald-200', badge: 'bg-emerald-500' },
  { key: 'q2', label: 'Q2 Goals', subtitle: '90–180 Days', icon: '🌿', color: 'bg-teal-50 border-teal-200', badge: 'bg-teal-500' },
  { key: 'year1', label: 'Year 1 Goals', subtitle: 'End of Year 1', icon: '🎯', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-500' },
  { key: 'year3', label: 'Year 3 Goals', subtitle: 'End of Year 3', icon: '🚀', color: 'bg-purple-50 border-purple-200', badge: 'bg-purple-500' },
  { key: 'year5', label: 'Year 5 Goals', subtitle: 'End of Year 5', icon: '🌟', color: 'bg-gold-50 border-gold-200', badge: 'bg-gold-500' },
]

export default function Goals() {
  const { plan, update } = usePlan()
  const goals = plan.goals

  const setGoals = (key, items) => update('goals', { [key]: items })
  const addGoal = key => setGoals(key, [...goals[key], ''])
  const removeGoal = (key, idx) => setGoals(key, goals[key].filter((_, i) => i !== idx))
  const updateGoal = (key, idx, val) =>
    setGoals(key, goals[key].map((g, i) => (i === idx ? val : g)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Goals & Milestones</h1>
        <p className="section-subtitle">Define your short, medium, and long-term objectives across all business lines</p>
      </div>

      {/* Goal Timeline Visual */}
      <div className="section-card">
        <div className="flex items-center gap-0 overflow-x-auto">
          {GOAL_PERIODS.map((p, i) => (
            <div key={p.key} className="flex items-center">
              <div className="flex flex-col items-center min-w-[120px]">
                <div className={`w-10 h-10 rounded-full ${p.badge} text-white flex items-center justify-center text-lg font-bold shadow`}>
                  {p.icon}
                </div>
                <div className="text-xs font-bold text-navy-800 mt-1">{p.label}</div>
                <div className="text-xs text-gray-400">{p.subtitle}</div>
                <div className="text-xs text-center mt-1 text-gray-600">
                  {goals[p.key].filter(g => g.trim()).length} goals
                </div>
              </div>
              {i < GOAL_PERIODS.length - 1 && (
                <div className="h-0.5 w-12 bg-gray-200 mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {GOAL_PERIODS.slice(0, 3).map(period => (
          <GoalCard
            key={period.key}
            period={period}
            items={goals[period.key]}
            onAdd={() => addGoal(period.key)}
            onRemove={idx => removeGoal(period.key, idx)}
            onChange={(idx, val) => updateGoal(period.key, idx, val)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOAL_PERIODS.slice(3).map(period => (
          <GoalCard
            key={period.key}
            period={period}
            items={goals[period.key]}
            onAdd={() => addGoal(period.key)}
            onRemove={idx => removeGoal(period.key, idx)}
            onChange={(idx, val) => updateGoal(period.key, idx, val)}
          />
        ))}
      </div>

      {/* Goal Suggestions */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2 mb-4">Goal Ideas by Business Line</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: '🏠',
              title: 'Real Estate Investment',
              ideas: [
                'Acquire first investment property',
                'Build a team (agent, inspector, lender)',
                'Set up property management systems',
                'Analyze 50 deals, close 2',
                'Build $50K cash reserve',
              ],
            },
            {
              icon: '💼',
              title: 'Business Brokerage',
              ideas: [
                'Obtain business broker certification/license',
                'Build pipeline of 20 business sellers',
                'Join local business associations',
                'Close first $1M+ business sale',
                'Establish attorney/CPA referral network',
              ],
            },
            {
              icon: '🔑',
              title: 'Real Estate Brokerage',
              ideas: [
                'Activate real estate license',
                'Complete first 5 transactions',
                'Recruit first buyer agent',
                'Build SOI list of 500+ contacts',
                'Generate 3 closings/month consistently',
              ],
            },
          ].map(line => (
            <div key={line.title} className="bg-gray-50 rounded-lg p-4">
              <div className="font-bold text-sm text-navy-800 mb-3 flex items-center gap-2">
                <span className="text-xl">{line.icon}</span>{line.title}
              </div>
              <ul className="space-y-1.5">
                {line.ideas.map(idea => (
                  <li key={idea} className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-gold-500 shrink-0">→</span>{idea}
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

function GoalCard({ period, items, onAdd, onRemove, onChange }) {
  return (
    <div className={`rounded-xl border-2 overflow-hidden ${period.color}`}>
      <div className={`${period.badge} text-white px-4 py-3 flex items-center gap-2`}>
        <span className="text-xl">{period.icon}</span>
        <div>
          <div className="font-bold text-sm">{period.label}</div>
          <div className="text-xs opacity-80">{period.subtitle}</div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <span className="text-gray-400 text-xs shrink-0">☐</span>
            <input
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-navy-400"
              value={item}
              onChange={e => onChange(idx, e.target.value)}
              placeholder="Enter goal..."
            />
            {items.length > 1 && (
              <button onClick={() => onRemove(idx)} className="text-red-400 hover:text-red-600 text-xs shrink-0">✕</button>
            )}
          </div>
        ))}
        <button
          onClick={onAdd}
          className="text-xs text-gray-500 hover:text-navy-700 flex items-center gap-1 mt-1 px-1"
        >
          + Add goal
        </button>
      </div>
    </div>
  )
}
