import { useState } from 'react'
import { usePlan } from '../context/PlanContext'

export default function Header({ activeSection }) {
  const { plan, save, saved, reset } = usePlan()
  const [showResetModal, setShowResetModal] = useState(false)

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

  const handleReset = () => {
    reset()
    setShowResetModal(false)
  }

  return (
    <>
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
            🖨️ Print Plan
          </button>
          <button
            onClick={() => setShowResetModal(true)}
            className="bg-white/10 hover:bg-red-500/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      {showResetModal && (
        <div className="no-print fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4">
            <div className="text-3xl mb-3 text-center">⚠️</div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Reset Business Plan?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              All your data will be cleared and reset to the default values. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
