import { usePlan } from '../context/PlanContext'

const ENTITY_TYPES = ['LLC', 'S-Corp', 'C-Corp', 'Sole Proprietor', 'Partnership', 'LP']

export default function Company() {
  const { plan, update } = usePlan()
  const c = plan.company

  const set = (field, val) => update('company', { [field]: val })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Company Overview</h1>
        <p className="section-subtitle">Your business identity and core information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="section-card space-y-4">
          <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Business Identity</h2>
          <Field label="Company Name" value={c.name} onChange={v => set('name', v)} placeholder="e.g. Cardenas Ventures LLC" />
          <Field label="Owner / Principal" value={c.owner} onChange={v => set('owner', v)} placeholder="Full name" />
          <Field label="Tagline" value={c.tagline} onChange={v => set('tagline', v)} placeholder="e.g. Building Wealth Through Real Estate" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Entity Type</label>
              <select className="field-input" value={c.entityType} onChange={e => set('entityType', e.target.value)}>
                {ENTITY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <Field label="Founded Year" type="number" value={c.founded} onChange={v => set('founded', v)} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="section-card space-y-4">
          <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Contact Information</h2>
          <Field label="Email" type="email" value={c.email} onChange={v => set('email', v)} placeholder="owner@company.com" />
          <Field label="Phone" type="tel" value={c.phone} onChange={v => set('phone', v)} placeholder="(555) 000-0000" />
          <Field label="Website" value={c.website} onChange={v => set('website', v)} placeholder="www.mycompany.com" />
          <Field label="Business Address" value={c.address} onChange={v => set('address', v)} placeholder="123 Main St, City, State ZIP" />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="section-card space-y-4">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2">Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Mission Statement</label>
            <p className="text-xs text-gray-500 mb-2">Why your business exists — your purpose</p>
            <textarea
              className="field-textarea"
              rows={4}
              value={c.mission}
              onChange={e => set('mission', e.target.value)}
              placeholder="e.g. To build generational wealth by providing exceptional real estate and business brokerage services that create value for our clients and communities..."
            />
          </div>
          <div>
            <label className="field-label">Vision Statement</label>
            <p className="text-xs text-gray-500 mb-2">Where you want to be in 5–10 years</p>
            <textarea
              className="field-textarea"
              rows={4}
              value={c.vision}
              onChange={e => set('vision', e.target.value)}
              placeholder="e.g. To become the premier real estate investment and brokerage firm in the region, managing $50M+ in assets..."
            />
          </div>
        </div>
      </div>

      {/* Business Lines Overview */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-navy-700 border-b pb-2 mb-4">Business Lines at a Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🏠', title: 'Real Estate Investment', desc: 'Acquire, manage, and grow a portfolio of income-producing properties.' },
            { icon: '💼', title: 'Business Brokerage', desc: 'Facilitate the buying and selling of established businesses.' },
            { icon: '🔑', title: 'Real Estate Brokerage', desc: 'Represent buyers and sellers in residential and commercial transactions.' },
          ].map(line => (
            <div key={line.title} className="bg-navy-50 rounded-lg p-4 border border-navy-100">
              <div className="text-3xl mb-2">{line.icon}</div>
              <div className="font-bold text-navy-800 text-sm mb-1">{line.title}</div>
              <div className="text-xs text-gray-600">{line.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        className="field-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
