import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const defaultPlan = {
  company: {
    name: '',
    owner: '',
    tagline: '',
    mission: '',
    vision: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    founded: new Date().getFullYear(),
    entityType: 'LLC',
  },
  executiveSummary: {
    overview: '',
    problemSolved: '',
    solution: '',
    keysToSuccess: '',
  },
  rei: {
    description: '',
    strategies: ['buy-and-hold'],
    propertyTypes: ['Single Family'],
    targetMarkets: '',
    initialCapital: 0,
    financingStrategy: '',
    exitStrategy: '',
    projections: {
      year1: { acquisitions: 2, avgPurchasePrice: 250000, grossRent: 24000, expenses: 12000, appreciation: 5000 },
      year2: { acquisitions: 3, avgPurchasePrice: 275000, grossRent: 54000, expenses: 27000, appreciation: 15000 },
      year3: { acquisitions: 5, avgPurchasePrice: 300000, grossRent: 108000, expenses: 54000, appreciation: 37500 },
    },
  },
  businessBrokerage: {
    description: '',
    targetSectors: '',
    dealSizeRange: '$500K – $5M',
    commissionRate: 10,
    marketing: '',
    projections: {
      year1: { deals: 2, avgDealSize: 750000, expenses: 30000 },
      year2: { deals: 4, avgDealSize: 900000, expenses: 45000 },
      year3: { deals: 6, avgDealSize: 1100000, expenses: 60000 },
    },
  },
  reBrokerage: {
    description: '',
    licenseState: '',
    brokerage: '',
    agentCount: { year1: 1, year2: 3, year3: 6 },
    avgSalePrice: 400000,
    commissionRate: 3,
    splitRatio: 80,
    marketing: '',
    projections: {
      year1: { transactions: 12, avgSalePrice: 400000, expenses: 25000 },
      year2: { transactions: 30, avgSalePrice: 425000, expenses: 50000 },
      year3: { transactions: 60, avgSalePrice: 450000, expenses: 80000 },
    },
  },
  market: {
    geography: '',
    targetDemographic: '',
    marketSize: '',
    competitors: '',
    advantages: '',
    trends: '',
    regulations: '',
  },
  swot: {
    strengths: ['Local market knowledge', 'Diversified revenue streams', 'Strong network'],
    weaknesses: ['Limited initial capital', 'Brand awareness'],
    opportunities: ['Growing market', 'Low interest rate environment', 'Distressed properties'],
    threats: ['Market volatility', 'Regulatory changes', 'Competition from large firms'],
  },
  goals: {
    q1: ['Obtain all necessary licenses', 'Establish LLC and open business accounts', 'Build initial marketing presence'],
    q2: ['Close first investment property', 'List first business for sale', 'Complete 5 real estate transactions'],
    year1: ['Acquire 2 investment properties', 'Close 2 business brokerage deals', 'Complete 12 real estate transactions'],
    year3: ['Portfolio of 10 properties', 'Market leader in business brokerage locally', 'Team of 6 agents'],
    year5: ['$5M+ portfolio', 'Expand to adjacent markets', 'Passive income exceeds active income'],
  },
  actionPlan: [
    { id: 1, task: 'Form LLC and obtain EIN', category: 'Legal', deadline: '', priority: 'High', status: 'pending' },
    { id: 2, task: 'Open business bank accounts', category: 'Finance', deadline: '', priority: 'High', status: 'pending' },
    { id: 3, task: 'Obtain real estate license', category: 'Legal', deadline: '', priority: 'High', status: 'pending' },
    { id: 4, task: 'Obtain business broker license', category: 'Legal', deadline: '', priority: 'High', status: 'pending' },
    { id: 5, task: 'Build CRM system', category: 'Operations', deadline: '', priority: 'Medium', status: 'pending' },
    { id: 6, task: 'Launch website & branding', category: 'Marketing', deadline: '', priority: 'Medium', status: 'pending' },
    { id: 7, task: 'Secure first investment property deal', category: 'REI', deadline: '', priority: 'High', status: 'pending' },
  ],
}

const PlanContext = createContext(null)

export function PlanProvider({ children, onReset }) {
  const [plan, setPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('re-business-plan')
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultPlan))
    } catch {
      return JSON.parse(JSON.stringify(defaultPlan))
    }
  })
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    setSaved(false)
  }, [plan])

  const save = useCallback(() => {
    localStorage.setItem('re-business-plan', JSON.stringify(plan))
    setSaved(true)
  }, [plan])

  const update = useCallback((section, data) => {
    setPlan(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))
  }, [])

  const updateNested = useCallback((section, subsection, data) => {
    setPlan(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: { ...prev[section][subsection], ...data },
      },
    }))
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem('re-business-plan')
    if (onReset) onReset()
  }, [onReset])

  return (
    <PlanContext.Provider value={{ plan, update, updateNested, save, saved, reset, setPlan }}>
      {children}
    </PlanContext.Provider>
  )
}

export const usePlan = () => {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error('usePlan must be used within PlanProvider')
  return ctx
}

export function calcReiRevenue(rei) {
  return {
    year1: (rei.projections.year1.grossRent || 0) + (rei.projections.year1.appreciation || 0),
    year2: (rei.projections.year2.grossRent || 0) + (rei.projections.year2.appreciation || 0),
    year3: (rei.projections.year3.grossRent || 0) + (rei.projections.year3.appreciation || 0),
  }
}

export function calcBbRevenue(bb) {
  return {
    year1: Math.round((bb.projections.year1.deals || 0) * (bb.projections.year1.avgDealSize || 0) * (bb.commissionRate / 100)),
    year2: Math.round((bb.projections.year2.deals || 0) * (bb.projections.year2.avgDealSize || 0) * (bb.commissionRate / 100)),
    year3: Math.round((bb.projections.year3.deals || 0) * (bb.projections.year3.avgDealSize || 0) * (bb.commissionRate / 100)),
  }
}

export function calcRebRevenue(reb) {
  const rate = reb.commissionRate / 100
  const split = reb.splitRatio / 100
  return {
    year1: Math.round((reb.projections.year1.transactions || 0) * (reb.projections.year1.avgSalePrice || 0) * rate * split),
    year2: Math.round((reb.projections.year2.transactions || 0) * (reb.projections.year2.avgSalePrice || 0) * rate * split),
    year3: Math.round((reb.projections.year3.transactions || 0) * (reb.projections.year3.avgSalePrice || 0) * rate * split),
  }
}
