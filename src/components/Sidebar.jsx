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

export default function Sidebar({ active, setActive, isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        no-print fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-200
        flex flex-col py-6 px-3 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-auto md:min-h-screen
      `}>
        <div className="px-2 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Business Plan</div>
            <div className="text-xs text-gray-400 mt-0.5">Navigation</div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-gray-600 text-xl leading-none p-1"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => { setActive(n.id); onClose() }}
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
    </>
  )
}
