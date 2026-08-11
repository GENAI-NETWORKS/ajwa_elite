import { useState } from 'react'
import { CheckCircle2, Settings, Package } from 'lucide-react'
import './RegisterDietFood.css'

const WA_NUMBER = '917540099421'
const PLANS = ['Starter Bowl ₹199/day', 'Daily Fitness ₹349/day', 'Custom Elite Platter ₹499/day']

const INITIAL = { name: '', phone: '', address: '', area: '', plan: '', notes: '' }

export default function RegisterDietFood() {
  const [form, setForm]         = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hello Ajwa Elite Nutrition! \n\n` +
      `I'd like to order *Diet Food Delivery*.\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Delivery Address:* ${form.address}\n` +
      `*Area / Pincode:* ${form.area}\n` +
      `*Plan Selected:* ${form.plan}\n` +
      (form.notes ? `*Customisation / Health Notes:* ${form.notes}` : '')
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm(INITIAL)
  }

  return (
    <section className="section section--darker reg-diet" id="register-diet-food" aria-label="Order Diet Food">
      <div className="section__inner reg-diet__inner">

        {/* left info */}
        <div className="reg-diet__info">
          <span className="section__eyebrow section__eyebrow--sage">Order Diet Food</span>
          <h2 className="reg-diet__title">
            Salem Delivery,<br /><span className="reg-diet__accent">Your Doorstep</span>
          </h2>
          <p className="reg-diet__desc">
            Place your order below and we'll confirm your slot via WhatsApp. Our dietitian will
            reach out to discuss any customisation needs before your first delivery.
          </p>

          {/* delivery info card */}
          <div className="reg-diet__delivery-card">
            <h4 className="reg-diet__delivery-title"><Package size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Delivery Info</h4>
            <ul className="reg-diet__delivery-list">
              <li><span className="reg-diet__dot" />Free delivery within 5 km of Salem</li>
              <li><span className="reg-diet__dot" />Delivery charges apply beyond 5 km</li>
              <li><span className="reg-diet__dot" />Daily delivery morning slot</li>
              <li><span className="reg-diet__dot" />Salem, Tamil Nadu only</li>
            </ul>
          </div>

          {/* customisation note */}
          <div className="reg-diet__custom-note">
            <span className="reg-diet__custom-icon"><Settings size={18} /></span>
            <p>
              <strong>Need a custom platter?</strong> If you have specific macro requirements
              (e.g., 60g+ protein for diabetes management), mention it in the customisation
              field our dietitian will design the meal around your exact needs.
            </p>
          </div>
        </div>

        {/* form */}
        <form className="reg-diet__form" onSubmit={handleSubmit} noValidate>
          {submitted && (
            <div className="reg-consult__success" role="alert">
              <CheckCircle2 size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Redirecting to WhatsApp! We'll confirm your order shortly.
            </div>
          )}

          <div className="reg-form__row">
            <div className="reg-form__group">
              <label htmlFor="rd-name" className="reg-form__label">Full Name *</label>
              <input
                id="rd-name" type="text" required
                className="reg-form__input"
                placeholder="Your full name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
            <div className="reg-form__group">
              <label htmlFor="rd-phone" className="reg-form__label">WhatsApp Number *</label>
              <input
                id="rd-phone" type="tel" required
                className="reg-form__input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="reg-form__group">
            <label htmlFor="rd-address" className="reg-form__label">Delivery Address *</label>
            <textarea
              id="rd-address" required
              className="reg-form__input reg-form__textarea"
              placeholder="Door/flat number, street, landmark…"
              rows={2}
              value={form.address}
              onChange={e => set('address', e.target.value)}
            />
          </div>

          <div className="reg-form__group">
            <label htmlFor="rd-area" className="reg-form__label">Area / Pincode *</label>
            <input
              id="rd-area" type="text" required
              className="reg-form__input"
              placeholder="e.g. Fairlands, 636016"
              value={form.area}
              onChange={e => set('area', e.target.value)}
            />
          </div>

          <div className="reg-form__group">
            <label htmlFor="rd-plan" className="reg-form__label">Plan Selected *</label>
            <select
              id="rd-plan" required
              className="reg-form__input reg-form__select"
              value={form.plan}
              onChange={e => set('plan', e.target.value)}
            >
              <option value="">Choose a plan…</option>
              {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="reg-form__group">
            <label htmlFor="rd-notes" className="reg-form__label">Customisation / Health Notes</label>
            <textarea
              id="rd-notes"
              className="reg-form__input reg-form__textarea"
              placeholder="Any specific health conditions, allergies, macro targets (e.g. 60g protein for diabetes), dietary restrictions…"
              rows={3}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn--wa reg-form__submit" id="rd-submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Order via WhatsApp
          </button>
          <p className="reg-form__note">
            Clicking will open WhatsApp with your order details. No data is stored on our servers.
          </p>
        </form>
      </div>
    </section>
  )
}
