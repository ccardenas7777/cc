import { useState } from 'react'
import { PlanProvider } from './context/PlanContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Company from './sections/Company'
import ExecutiveSummary from './sections/ExecutiveSummary'
import BusinessLines from './sections/BusinessLines'
import MarketAnalysis from './sections/MarketAnalysis'
import Financials from './sections/Financials'
import SwotAnalysis from './sections/SwotAnalysis'
import Goals from './sections/Goals'
import ActionPlan from './sections/ActionPlan'
import PrintView from './sections/PrintView'

const SECTIONS = {
  company: Company,
  executive: ExecutiveSummary,
  businessLines: BusinessLines,
  market: MarketAnalysis,
  financials: Financials,
  swot: SwotAnalysis,
  goals: Goals,
  action: ActionPlan,
}

function BusinessPlanApp() {
  const [activeSection, setActiveSection] = useState('company')
  const Section = SECTIONS[activeSection]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — hidden on print */}
      <Sidebar active={activeSection} setActive={setActiveSection} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header — hidden on print */}
        <Header activeSection={activeSection} />

        {/* Interactive section */}
        <main className="no-print flex-1 p-6 overflow-auto">
          <Section />
        </main>

        {/* Full-plan print view — hidden on screen, shown on print */}
        <PrintView />
      </div>
    </div>
  )
}

export default function App() {
  const [appKey, setAppKey] = useState(0)
  return (
    <PlanProvider key={appKey} onReset={() => setAppKey(k => k + 1)}>
      <BusinessPlanApp />
    </PlanProvider>
  )
}
