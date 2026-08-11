import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import './RegisterConsultation.css'

const WA_NUMBER = '917540099421'

const HEALTH_CONDITIONS = [
  'Weight Loss', 'Weight Gain', 'Thyroid Issues',
  'Pregnancy & Lactation', 'PCOD / PCOS', 'Diabetes Management',
  'Hormonal Balance', 'General Health / Other',
]
const PLANS = ['Basic Wellness ₹999/mo', 'Standard Transform ₹1,999/mo', 'Elite Care ₹3,499/mo']

const INITIAL = { name: '', phone: '', email: '', country: '', condition: '', plan: '', message: '' }

export default function RegisterConsultation() {
  const [form, setForm]       = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hello Ajwa Elite Nutrition! \n\n` +
      `I'd like to book an *Online Consultation*.\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Country:* ${form.country}\n` +
      `*Health Concern:* ${form.condition}\n` +
      `*Plan Interested In:* ${form.plan}\n` +
      (form.message ? `*Additional Info:* ${form.message}` : '')
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm(INITIAL)
  }

  return (
    <section className="section reg-consult" id="register-consultation" aria-label="Book a Consultation">
      <div className="section__inner reg-consult__inner">

        {/* left info */}
        <div className="reg-consult__info">
          <span className="section__eyebrow section__eyebrow--gold">Book Your Consultation</span>
          <h2 className="reg-consult__title">
            Start Your<br /><span className="reg-consult__accent">Health Journey</span>
          </h2>
          <p className="reg-consult__desc">
            Fill in the form and we'll connect with you on WhatsApp to confirm your consultation
            slot and answer any questions. We're available for clients worldwide.
          </p>

          <div className="reg-consult__steps">
            {['Fill in the form below', 'We confirm via WhatsApp', 'Your consultation is scheduled'].map((s, i) => (
              <div key={s} className="reg-consult__step">
                <span className="reg-consult__step-num">{i + 1}</span>
                <span className="reg-consult__step-text">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* form */}
        <form className="reg-consult__form" onSubmit={handleSubmit} noValidate>
          {submitted && (
            <div className="reg-consult__success" role="alert">
              <CheckCircle2 size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Redirecting to WhatsApp! We'll be in touch shortly.
            </div>
          )}

          <div className="reg-form__row">
            <div className="reg-form__group">
              <label htmlFor="rc-name" className="reg-form__label">Full Name *</label>
              <input
                id="rc-name" type="text" required
                className="reg-form__input"
                placeholder="Your full name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
            <div className="reg-form__group">
              <label htmlFor="rc-phone" className="reg-form__label">WhatsApp / Phone *</label>
              <input
                id="rc-phone" type="tel" required
                className="reg-form__input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="reg-form__row">
            <div className="reg-form__group">
              <label htmlFor="rc-email" className="reg-form__label">Email Address</label>
              <input
                id="rc-email" type="email"
                className="reg-form__input"
                placeholder="you@email.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>
            <div className="reg-form__group">
              <label htmlFor="rc-country" className="reg-form__label">Country *</label>
              <input
                id="rc-country" type="text" required
                className="reg-form__input"
                placeholder="e.g. India, UAE, UK…"
                value={form.country}
                onChange={e => set('country', e.target.value)}
              />
            </div>
          </div>

          <div className="reg-form__group">
            <label htmlFor="rc-condition" className="reg-form__label">Primary Health Concern *</label>
            <select
              id="rc-condition" required
              className="reg-form__input reg-form__select"
              value={form.condition}
              onChange={e => set('condition', e.target.value)}
            >
              <option value="">Select your concern…</option>
              {HEALTH_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="reg-form__group">
            <label htmlFor="rc-plan" className="reg-form__label">Consultation Plan *</label>
            <select
              id="rc-plan" required
              className="reg-form__input reg-form__select"
              value={form.plan}
              onChange={e => set('plan', e.target.value)}
            >
              <option value="">Select a plan…</option>
              {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="reg-form__group">
            <label htmlFor="rc-message" className="reg-form__label">Additional Information</label>
            <textarea
              id="rc-message"
              className="reg-form__input reg-form__textarea"
              placeholder="Any specific concerns, current medications, recent test results…"
              rows={3}
              value={form.message}
              onChange={e => set('message', e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn--wa reg-form__submit" id="rc-submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Send via WhatsApp
          </button>
          <p className="reg-form__note">
            Clicking will open WhatsApp with your details pre-filled. No data is stored on our servers.
          </p>
        </form>
      </div>
    </section>
  )
}
