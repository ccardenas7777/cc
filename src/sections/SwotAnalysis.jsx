import { usePlan } from '../context/PlanContext'

const CATEGORIES = [
  {
    key: 'strengths',
    label: 'Strengths',
    icon: '💪',
    color: 'bg-green-50 border-green-200',
    headerColor: 'bg-green-600',
    hint: 'Internal positive factors you control',
  },
  {
    key: 'weaknesses',
    label: 'Weaknesses',
    icon: '⚠️',
    color: 'bg-amber-50 border-amber-200',
    headerColor: 'bg-amber-500',
    hint: 'Internal factors that need improvement',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    icon: '🚀',
    color: 'bg-blue-50 border-blue-200',
    headerColor: 'bg-blue-600',
    hint: 'External factors you can leverage',
  },
  {
    key: 'threats',
    label: 'Threats',
    icon: '🛡️',
    color: 'bg-red-50 border-red-200',
    headerColor: 'bg-red-600',
    hint: 'External factors that could harm your business',
  },
]

export default function SwotAnalysis() {
  const { plan, update } = usePlan()
  const swot = plan.swot

  const setItems = (key, items) => update('swot', { [key]: items })

  const addItem = key => setItems(key, [...swot[key], ''])

  const removeItem = (key, idx) =>
    setItems(key, swot[key].filter((_, i) => i !== idx))

  const updateItem = (key, idx, val) =>
    setItems(key, swot[key].map((item, i) => (i === idx ? val : item)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">SWOT Analysis</h1>
        <p className="section-subtitle">Evaluate your strategic position with internal and external factors</p>
      </div>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => (
          <div key={cat.key} className={`rounded-xl border-2 overflow-hidden ${cat.color}`}>
            <div className={`${cat.headerColor} text-white px-4 py-3 flex items-center gap-2`}>
              <span className="text-xl">{cat.icon}</span>
              <div>
                <div className="font-bold">{cat.label}</div>
                <div className="text-xs opacity-80">{cat.hint}</div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {swot[cat.key].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-gray-400 text-sm mt-2 shrink-0">{idx + 1}.</span>
                  <input
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 transition"
                    value={item}
                    onChange={e => updateItem(cat.key, idx, e.target.value)}
                    placeholder={`Enter ${cat.label.toLowerCase()}...`}
                  />
                  {swot[cat.key].length > 1 && (
                    <button
                      onClick={() => removeItem(cat.key, idx)}
                      className="text-red-400 hover:text-red-600 mt-2 shrink-0 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem(cat.key)}
                className="text-xs text-gray-500 hover:text-navy-700 flex items-center gap-1 mt-2 px-2"
              >
                <span>+</span> Add {cat.label.slice(0, -1)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Implications */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2 mb-4">Strategic Implications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: '🟢 SO Strategies',
              subtitle: 'Use Strengths to capture Opportunities',
              color: 'border-l-green-500',
              hint: 'Where can your strengths help you take advantage of market opportunities?',
            },
            {
              title: '🟡 WO Strategies',
              subtitle: 'Overcome Weaknesses using Opportunities',
              color: 'border-l-amber-500',
              hint: 'How can market opportunities help you minimize your weaknesses?',
            },
            {
              title: '🔵 ST Strategies',
              subtitle: 'Use Strengths to mitigate Threats',
              color: 'border-l-blue-500',
              hint: 'How can your strengths protect you from external threats?',
            },
            {
              title: '🔴 WT Strategies',
              subtitle: 'Minimize Weaknesses and avoid Threats',
              color: 'border-l-red-500',
              hint: 'Defensive strategies for your most vulnerable areas',
            },
          ].map(s => (
            <div key={s.title} className={`bg-gray-50 rounded-lg p-4 border-l-4 ${s.color}`}>
              <div className="font-bold text-sm text-navy-800">{s.title}</div>
              <div className="text-xs text-gray-500 mb-2">{s.subtitle}</div>
              <textarea
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-navy-400 resize-none"
                rows={3}
                placeholder={s.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
