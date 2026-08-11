import './Consultation.css'
import { Scale, Dumbbell, Activity, Baby, RefreshCw, Stethoscope, FlaskConical, Leaf, Sprout, Zap, Sparkles } from 'lucide-react'

const CONDITIONS = [
  { icon: <Scale size={18} />, label: 'Weight Loss' },
  { icon: <Dumbbell size={18} />, label: 'Weight Gain' },
  { icon: <Activity size={18} />, label: 'Thyroid Issues' },
  { icon: <Baby size={18} />, label: 'Pregnancy & Lactation' },
  { icon: <RefreshCw size={18} />, label: 'PCOD / PCOS' },
  { icon: <Stethoscope size={18} />, label: 'Diabetes Management' },
  { icon: <FlaskConical size={18} />, label: 'Hormonal Balance' },
  { icon: <Leaf size={18} />, label: 'General Health' },
]

const PLANS = [
  {
    id: 'basic',
    tier: 'Basic',
    name: 'Basic Wellness',
    price: '₹999',
    period: '/ month',
    color: 'sage',
    icon: <Sprout size={24} />,
    tagline: 'A great starting point for your health journey',
    perks: [
      'Initial health assessment call',
      'Personalised diet plan (PDF)',
      'Monthly follow-up check-in',
      'WhatsApp support (text only)',
    ],
    notIncluded: ['Bi-weekly calls', 'Blood report review', 'Priority response'],
  },
  {
    id: 'standard',
    tier: 'Standard',
    name: 'Standard Transform',
    price: '₹1,999',
    period: '/ month',
    color: 'gold',
    icon: <Zap size={24} />,
    tagline: 'For consistent, measurable transformation',
    popular: true,
    perks: [
      'Initial health assessment call',
      'Fully customised meal plan',
      'Bi-weekly check-in calls (2×/month)',
      'Diet plan revisions as needed',
      'WhatsApp support (priority text)',
    ],
    notIncluded: ['Blood report review', 'Weekly calls'],
  },
  {
    id: 'premium',
    tier: 'Premium',
    name: 'Elite Care',
    price: '₹3,499',
    period: '/ month',
    color: 'terra',
    icon: <Sparkles size={24} />,
    tagline: 'Full concierge nutrition nothing left out',
    perks: [
      'Detailed initial consultation call',
      'Fully bespoke weekly meal plan',
      'Weekly 1-on-1 check-in calls (4×/month)',
      'Blood report & lab result review',
      'Priority WhatsApp response (within 2 hrs)',
      'Unlimited diet plan revisions',
      'Monthly progress report',
    ],
    notIncluded: [],
  },
]

const CHECK = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)
const CROSS = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

export default function Consultation() {
  return (
    <section className="section section--darker consult" id="consultation" aria-label="Online Consultation">
      <div className="section__inner">

        {/* Hero Section */}
        <div className="consult__hero">
          <div className="consult__hero-bg" style={{ backgroundImage: 'url(/assets/consultation_bg.png)' }}></div>
          <div className="consult__hero-overlay"></div>
          
          <div className="consult__hero-content">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--gold">
                Worldwide · Online Consultation
              </span>
              <h2 className="section__title section__title--dark">
                Expert Nutrition Guidance,<br />
                <span className="consult__accent">Wherever You Are</span>
              </h2>
              <p className="section__sub section__sub--dark">
                Our certified dietitian provides personalised one-on-one consultations for a wide range
                of health conditions available to clients anywhere in the world.
              </p>
            </div>

            {/* Conditions grid */}
            <div className="consult__conditions">
              {CONDITIONS.map(c => (
                <div key={c.label} className="consult__condition">
                  <span className="consult__condition-icon">{c.icon}</span>
                  <span className="consult__condition-label">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plans */}
        <h3 className="consult__plans-heading">Consultation Plans</h3>
        <div className="consult__plans">
          {PLANS.map(plan => (
            <div key={plan.id} className={`consult__card consult__card--${plan.color}${plan.popular ? ' consult__card--popular' : ''}`}>
              {plan.popular && <div className="consult__badge">Most Popular</div>}

              <div className="consult__card-top">
                <span className="consult__icon">{plan.icon}</span>
                <div>
                  <p className="consult__tier">{plan.tier}</p>
                  <h4 className="consult__name">{plan.name}</h4>
                  <p className="consult__tagline">{plan.tagline}</p>
                </div>
              </div>

              <div className="consult__price">
                <span className={`consult__price-amount consult__price-amount--${plan.color}`}>{plan.price}</span>
                <span className="consult__price-period">{plan.period}</span>
              </div>

              <ul className="consult__perks">
                {plan.perks.map(p => (
                  <li key={p} className="consult__perk consult__perk--yes">
                    <span className="consult__perk-icon consult__perk-icon--yes"><CHECK /></span>
                    {p}
                  </li>
                ))}
                {plan.notIncluded.map(p => (
                  <li key={p} className="consult__perk consult__perk--no">
                    <span className="consult__perk-icon consult__perk-icon--no"><CROSS /></span>
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href="#register-consultation"
                className={`btn consult__btn consult__btn--${plan.color}`}
                data-plan={plan.name}
              >
                Choose {plan.tier} Plan
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
