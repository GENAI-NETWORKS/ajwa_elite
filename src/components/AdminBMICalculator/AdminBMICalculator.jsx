import { useState } from 'react'
import { Lock, Leaf, ClipboardList } from 'lucide-react'
import './AdminBMICalculator.css'

const ADMIN_PIN = 'ajwaelite@12'

function calcBMI(weight, height) {
  const hm = height / 100
  return weight / (hm * hm)
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'blue' }
  if (bmi < 25)   return { label: 'Normal Weight', color: 'green' }
  if (bmi < 30)   return { label: 'Overweight', color: 'orange' }
  return              { label: 'Obese', color: 'red' }
}

function calcBMR(weight, height, age, gender) {
  // Mifflin-St Jeor
  if (gender === 'female') return 10 * weight + 6.25 * height - 5 * age - 161
  return 10 * weight + 6.25 * height - 5 * age + 5
}

const ACTIVITY = [
  { id: 'sedentary',  label: 'Sedentary (little/no exercise)',    factor: 1.2   },
  { id: 'light',      label: 'Lightly active (1–3 days/week)',    factor: 1.375 },
  { id: 'moderate',   label: 'Moderately active (3–5 days/week)', factor: 1.55  },
  { id: 'very',       label: 'Very active (6–7 days/week)',        factor: 1.725 },
  { id: 'extra',      label: 'Extra active (physical job)',        factor: 1.9   },
]

const GOALS = [
  { id: 'loss',     label: 'Weight Loss',   calFactor: 0.8,  proteinFactor: 2.0 },
  { id: 'maintain', label: 'Maintenance',   calFactor: 1.0,  proteinFactor: 1.6 },
  { id: 'gain',     label: 'Weight Gain',   calFactor: 1.15, proteinFactor: 1.8 },
]

const INITIAL = { clientName: '', weight: '', height: '', age: '', gender: 'female', activity: 'moderate', goal: 'maintain', notes: '' }

export default function AdminBMICalculator() {
  const [pin,       setPin]       = useState('')
  const [unlocked,  setUnlocked]  = useState(false)
  const [pinError,  setPinError]  = useState(false)
  const [form,      setForm]      = useState(INITIAL)
  const [result,    setResult]    = useState(null)

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handlePin = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      setUnlocked(true)
      setPinError(false)
    } else {
      setPinError(true)
      setPin('')
    }
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    const w = parseFloat(form.weight)
    const h = parseFloat(form.height)
    const a = parseInt(form.age)
    if (!w || !h || !a) return

    const bmi     = calcBMI(w, h)
    const cat     = bmiCategory(bmi)
    const bmr     = calcBMR(w, h, a, form.gender)
    const actObj  = ACTIVITY.find(x => x.id === form.activity)
    const goalObj = GOALS.find(x => x.id === form.goal)
    const tdee    = bmr * actObj.factor
    const targetCal = Math.round(tdee * goalObj.calFactor)

    const protein = Math.round(w * goalObj.proteinFactor)
    const fat     = Math.round(targetCal * 0.28 / 9)
    const carbs   = Math.round((targetCal - protein * 4 - fat * 9) / 4)

    // ideal weight range
    const hm = h / 100
    const idealLow  = Math.round(18.5 * hm * hm)
    const idealHigh = Math.round(24.9 * hm * hm)

    setResult({ bmi: bmi.toFixed(1), cat, bmr: Math.round(bmr), tdee: Math.round(tdee), targetCal, protein, fat, carbs, idealLow, idealHigh })
  }

  const reset = () => { setForm(INITIAL); setResult(null) }

  // ── PIN gate ──
  if (!unlocked) {
    return (
      <div className="admin admin--gate">
        <div className="admin__gate-card">
          <div className="admin__gate-icon"><Lock size={40} /></div>
          <h1 className="admin__gate-title">Admin Access</h1>
          <p className="admin__gate-sub">Ajwa Elite Nutrition Admin Tool</p>
          <form className="admin__gate-form" onSubmit={handlePin}>
            <input
              id="admin-pin"
              type="password"
              className={`admin__pin-input${pinError ? ' admin__pin-input--error' : ''}`}
              placeholder="Enter admin PIN"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false) }}
              autoFocus
              autoComplete="current-password"
            />
            {pinError && <p className="admin__pin-error">Incorrect PIN. Please try again.</p>}
            <button type="submit" className="btn btn--gold admin__pin-submit">
              Unlock
            </button>
          </form>
          <p className="admin__gate-note">This tool is for the dietitian's use only.</p>
        </div>
      </div>
    )
  }

  // ── BMI Calculator ──
  return (
    <div className="admin">
      <header className="admin__header">
        <div className="admin__header-inner">
          <div>
            <p className="admin__header-label">Admin Dashboard</p>
            <h1 className="admin__header-title"><Leaf size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Ajwa Elite Nutrition BMI & Nutrition Calculator</h1>
          </div>
          <a href="/" className="btn btn--outline-gold admin__home-btn">← Back to Site</a>
        </div>
      </header>

      <div className="admin__body">
        <div className="admin__grid">

          {/* Input form */}
          <form className="admin__form" onSubmit={handleCalculate}>
            <h2 className="admin__section-title">Client Details</h2>

            <div className="admin__form-group">
              <label htmlFor="a-name" className="admin__label">Client Name</label>
              <input id="a-name" type="text" className="admin__input"
                placeholder="Client's name"
                value={form.clientName} onChange={e => set('clientName', e.target.value)} />
            </div>

            <div className="admin__row">
              <div className="admin__form-group">
                <label htmlFor="a-weight" className="admin__label">Weight (kg) *</label>
                <input id="a-weight" type="number" required step="0.1" min="20" max="250"
                  className="admin__input" placeholder="e.g. 68.5"
                  value={form.weight} onChange={e => set('weight', e.target.value)} />
              </div>
              <div className="admin__form-group">
                <label htmlFor="a-height" className="admin__label">Height (cm) *</label>
                <input id="a-height" type="number" required step="0.1" min="100" max="250"
                  className="admin__input" placeholder="e.g. 162"
                  value={form.height} onChange={e => set('height', e.target.value)} />
              </div>
            </div>

            <div className="admin__row">
              <div className="admin__form-group">
                <label htmlFor="a-age" className="admin__label">Age (years) *</label>
                <input id="a-age" type="number" required min="5" max="100"
                  className="admin__input" placeholder="e.g. 32"
                  value={form.age} onChange={e => set('age', e.target.value)} />
              </div>
              <div className="admin__form-group">
                <label className="admin__label">Gender *</label>
                <div className="admin__gender-group">
                  {['female', 'male'].map(g => (
                    <button
                      key={g} type="button"
                      className={`admin__gender-btn${form.gender === g ? ' admin__gender-btn--active' : ''}`}
                      onClick={() => set('gender', g)}
                    >
                      {g === 'female' ? 'Female' : 'Male'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin__form-group">
              <label htmlFor="a-activity" className="admin__label">Activity Level *</label>
              <select id="a-activity" className="admin__input admin__select"
                value={form.activity} onChange={e => set('activity', e.target.value)}>
                {ACTIVITY.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>

            <div className="admin__form-group">
              <label className="admin__label">Client Goal *</label>
              <div className="admin__goal-group">
                {GOALS.map(g => (
                  <button key={g.id} type="button"
                    className={`admin__goal-btn${form.goal === g.id ? ' admin__goal-btn--active' : ''}`}
                    onClick={() => set('goal', g.id)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin__form-group">
              <label htmlFor="a-notes" className="admin__label">Clinical Notes</label>
              <textarea id="a-notes" className="admin__input admin__textarea" rows={3}
                placeholder="Medical conditions, medications, restrictions, observations…"
                value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>

            <div className="admin__form-actions">
              <button type="submit" className="btn btn--gold admin__calc-btn">Calculate</button>
              <button type="button" className="btn btn--outline-gold" onClick={reset}>Reset</button>
            </div>
          </form>

          {/* Results */}
          <div className="admin__results">
            <h2 className="admin__section-title">Results</h2>

            {!result ? (
              <div className="admin__results-empty">
                <p>Fill in client details and click <strong>Calculate</strong> to see the analysis.</p>
              </div>
            ) : (
              <>
                {form.clientName && (
                  <p className="admin__client-label">Client: <strong>{form.clientName}</strong></p>
                )}

                {/* BMI card */}
                <div className={`admin__bmi-card admin__bmi-card--${result.cat.color}`}>
                  <div>
                    <p className="admin__bmi-value">{result.bmi}</p>
                    <p className="admin__bmi-label">BMI</p>
                  </div>
                  <div>
                    <p className={`admin__bmi-cat admin__bmi-cat--${result.cat.color}`}>{result.cat.label}</p>
                    <p className="admin__bmi-range">Ideal weight: {result.idealLow}–{result.idealHigh} kg</p>
                  </div>
                </div>

                {/* BMI scale */}
                <div className="admin__bmi-scale">
                  <div className="admin__bmi-track">
                    <div className="admin__bmi-segment admin__bmi-segment--blue"   title="Underweight &lt;18.5" />
                    <div className="admin__bmi-segment admin__bmi-segment--green"  title="Normal 18.5–24.9" />
                    <div className="admin__bmi-segment admin__bmi-segment--orange" title="Overweight 25–29.9" />
                    <div className="admin__bmi-segment admin__bmi-segment--red"    title="Obese ≥30" />
                    <div
                      className="admin__bmi-marker"
                      style={{ left: `${Math.min(Math.max((parseFloat(result.bmi) - 10) / 30 * 100, 2), 98)}%` }}
                    />
                  </div>
                  <div className="admin__bmi-scale-labels">
                    <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                  </div>
                </div>

                {/* Energy metrics */}
                <div className="admin__metrics">
                  {[
                    { label: 'BMR (Basal)',   value: `${result.bmr} kcal`, sub: 'Calories at complete rest' },
                    { label: 'TDEE (Maint.)', value: `${result.tdee} kcal`, sub: 'Total daily energy expenditure' },
                    { label: 'Target Intake', value: `${result.targetCal} kcal`, sub: `For ${GOALS.find(g => g.id === form.goal)?.label}`, highlight: true },
                  ].map(m => (
                    <div key={m.label} className={`admin__metric${m.highlight ? ' admin__metric--highlight' : ''}`}>
                      <p className="admin__metric-label">{m.label}</p>
                      <p className="admin__metric-value">{m.value}</p>
                      <p className="admin__metric-sub">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Macros */}
                <div className="admin__macros">
                  <h3 className="admin__macros-title">Recommended Daily Macros</h3>
                  <div className="admin__macros-grid">
                    {[
                      { label: 'Protein', value: `${result.protein}g`, cal: result.protein * 4, color: 'sage' },
                      { label: 'Carbohydrates', value: `${result.carbs}g`, cal: result.carbs * 4, color: 'gold' },
                      { label: 'Fats', value: `${result.fat}g`, cal: result.fat * 9, color: 'terra' },
                    ].map(m => (
                      <div key={m.label} className={`admin__macro admin__macro--${m.color}`}>
                        <p className="admin__macro-label">{m.label}</p>
                        <p className="admin__macro-value">{m.value}</p>
                        <p className="admin__macro-cal">{m.cal} kcal</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {form.notes && (
                  <div className="admin__notes-display">
                    <p className="admin__notes-heading"><ClipboardList size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Clinical Notes</p>
                    <p className="admin__notes-text">{form.notes}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
