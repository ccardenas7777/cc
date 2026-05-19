import { useState } from 'react'
import { usePlan } from '../context/PlanContext'

const PRIORITIES = ['High', 'Medium', 'Low']
const STATUSES = ['pending', 'in-progress', 'done', 'blocked']
const CATEGORIES = ['Legal', 'Finance', 'Marketing', 'Operations', 'REI', 'Business Brokerage', 'RE Brokerage', 'Networking', 'Technology']

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  done: { label: 'Done', color: 'bg-green-100 text-green-700' },
  blocked: { label: 'Blocked', color: 'bg-red-100 text-red-700' },
}

const PRIORITY_CONFIG = {
  High: 'text-red-600 bg-red-50',
  Medium: 'text-amber-600 bg-amber-50',
  Low: 'text-gray-600 bg-gray-50',
}

let nextId = 100

export default function ActionPlan() {
  const { plan, setPlan } = usePlan()
  const items = plan.actionPlan
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({ task: '', category: 'Legal', deadline: '', priority: 'High', status: 'pending', notes: '' })

  const setItems = items => setPlan(p => ({ ...p, actionPlan: items }))

  const addItem = () => {
    if (!newItem.task.trim()) return
    setItems([...items, { ...newItem, id: nextId++ }])
    setNewItem({ task: '', category: 'Legal', deadline: '', priority: 'High', status: 'pending', notes: '' })
    setShowForm(false)
  }

  const updateItem = (id, field, val) =>
    setItems(items.map(item => (item.id === id ? { ...item, [field]: val } : item)))

  const deleteItem = id => setItems(items.filter(item => item.id !== id))

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)

  const counts = {
    all: items.length,
    pending: items.filter(i => i.status === 'pending').length,
    'in-progress': items.filter(i => i.status === 'in-progress').length,
    done: items.filter(i => i.status === 'done').length,
    blocked: items.filter(i => i.status === 'blocked').length,
  }

  const progress = items.length > 0 ? Math.round((counts.done / items.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Action Plan</h1>
        <p className="section-subtitle">Track tasks and milestones to execute your business plan</p>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white rounded-xl p-5 flex items-center gap-6">
        <div className="shrink-0">
          <div className="text-4xl font-bold text-gold-300">{progress}%</div>
          <div className="text-xs text-navy-300">Complete</div>
        </div>
        <div className="flex-1">
          <div className="h-3 bg-navy-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 text-xs text-navy-300">
            <span className="text-green-400">✓ {counts.done} done</span>
            <span className="text-blue-300">⟳ {counts['in-progress']} in progress</span>
            <span className="text-gray-400">○ {counts.pending} pending</span>
            <span className="text-red-400">⚡ {counts.blocked} blocked</span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="btn-gold shrink-0"
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="section-card border-2 border-gold-300">
          <h3 className="font-bold text-navy-700 mb-4">New Action Item</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <label className="field-label">Task</label>
              <input className="field-input" value={newItem.task}
                onChange={e => setNewItem(p => ({ ...p, task: e.target.value }))}
                placeholder="Describe the action item..." />
            </div>
            <div>
              <label className="field-label">Category</label>
              <select className="field-input" value={newItem.category}
                onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Deadline</label>
              <input type="date" className="field-input" value={newItem.deadline}
                onChange={e => setNewItem(p => ({ ...p, deadline: e.target.value }))} />
            </div>
            <div>
              <label className="field-label">Priority</label>
              <select className="field-input" value={newItem.priority}
                onChange={e => setNewItem(p => ({ ...p, priority: e.target.value }))}>
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Status</label>
              <select className="field-input" value={newItem.status}
                onChange={e => setNewItem(p => ({ ...p, status: e.target.value }))}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="field-label">Notes (optional)</label>
              <input className="field-input" value={newItem.notes}
                onChange={e => setNewItem(p => ({ ...p, notes: e.target.value }))}
                placeholder="Additional context or details..." />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addItem} className="btn-primary">Add Task</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        {[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending' },
          { key: 'in-progress', label: 'In Progress' },
          { key: 'done', label: 'Done' },
          { key: 'blocked', label: 'Blocked' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              filter === f.key ? 'tab-active' : 'tab-inactive'
            }`}
          >
            {f.label} <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-sm">No tasks found. Add your first action item!</div>
          </div>
        )}
        {filtered.map(item => (
          <div key={item.id} className={`bg-white border rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:shadow-sm ${item.status === 'done' ? 'opacity-60' : ''}`}>
            <button
              onClick={() => updateItem(item.id, 'status', item.status === 'done' ? 'pending' : 'done')}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                item.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {item.status === 'done' && '✓'}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`font-medium text-sm ${item.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {item.task}
              </div>
              {item.notes && <div className="text-xs text-gray-400 mt-0.5">{item.notes}</div>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_CONFIG[item.priority]}`}>
                {item.priority}
              </span>
              <select
                className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 cursor-pointer ${STATUS_CONFIG[item.status].color}`}
                value={item.status}
                onChange={e => updateItem(item.id, 'status', e.target.value)}
              >
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
              </select>
              {item.deadline && (
                <span className="text-xs text-gray-400">{new Date(item.deadline + 'T00:00:00').toLocaleDateString()}</span>
              )}
              <button onClick={() => deleteItem(item.id)} className="text-gray-300 hover:text-red-500 text-sm ml-1">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
