const NAV = [
  { id: 'company', icon: '🏢', label: 'Company Overview' },
  { id: 'executive', icon: '📋', label: 'Executive Summary' },
  { id: 'businessLines', icon: '📊', label: 'Business Lines' },
  { id: 'market', icon: '🗺️', label: 'Market Analysis' },
  { id: 'financials', icon: '💰', label: 'Financial Projections' },
  { id: 'swot', icon: '⚡', label: 'SWOT Analysis' },
  { id: 'goals', icon: '🎯', label: 'Goals & Milestones' },
  { id: 'action', icon: '✅', label: 'Action Plan' },
]

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="no-print w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col py-6 px-3 min-h-screen">
      <div className="px-2 mb-6">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Business Plan</div>
        <div className="text-xs text-gray-400 mt-0.5">Navigation</div>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className={`nav-item text-left w-full ${active === n.id ? 'nav-item-active' : 'nav-item-inactive'}`}
          >
            <span className="text-base">{n.icon}</span>
            <span className="leading-tight">{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto px-2 text-xs text-gray-400">
        <div className="border-t border-gray-100 pt-4">
          © {new Date().getFullYear()} Business Plan Builder
        </div>
      </div>
    </aside>
  )
}
