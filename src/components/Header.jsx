import { usePlan } from '../context/PlanContext'

export default function Header({ activeSection }) {
  const { plan, save, saved, reset } = usePlan()

  const sectionTitles = {
    company: 'Company Overview',
    executive: 'Executive Summary',
    businessLines: 'Business Lines',
    market: 'Market Analysis',
    financials: 'Financial Projections',
    swot: 'SWOT Analysis',
    goals: 'Goals & Milestones',
    action: 'Action Plan',
  }

  return (
    <header className="no-print bg-navy-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold tracking-tight text-gold-300">
          🏢 {plan.company.name || 'My Real Estate Business'}
        </div>
        <div className="h-5 w-px bg-navy-500" />
        <div className="text-sm text-navy-200">{sectionTitles[activeSection]}</div>
      </div>
      <div className="flex items-center gap-2">
        {!saved && (
          <span className="text-xs text-gold-300 bg-gold-500/20 px-2 py-1 rounded">Unsaved changes</span>
        )}
        <button onClick={save} className="btn-gold text-xs px-3 py-1.5">
          💾 Save
        </button>
        <button
          onClick={() => window.print()}
          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        >
          🖨️ Print
        </button>
        <button
          onClick={reset}
          className="bg-white/10 hover:bg-red-500/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        >
          Reset
        </button>
      </div>
    </header>
  )
}
