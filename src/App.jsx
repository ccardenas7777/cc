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
      <Sidebar active={activeSection} setActive={setActiveSection} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeSection={activeSection} />
        <main className="flex-1 p-6 overflow-auto">
          <Section />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <PlanProvider>
      <BusinessPlanApp />
    </PlanProvider>
  )
}
