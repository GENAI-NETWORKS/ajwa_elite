import './DietFoodService.css'
import { Beef, Apple, Sparkles, Salad, Dumbbell, Bike } from 'lucide-react'

const OFFERINGS = [
  {
    icon: <Beef size={32} />,
    title: 'Protein Platters',
    features: [
      '35–50g protein per serving',
      'Nutritionist-crafted recipes',
      'Ideal for fitness & weight goals'
    ],
    tag: 'Standard: 35–50g protein',
    color: 'gold',
    image: '/assets/protein_platter.png',
  },
  {
    icon: <Apple size={32} />,
    title: 'Fresh Fruit Bowls',
    features: [
      'Seasonal, hand-selected fruits',
      'Rich in fibre & essential vitamins',
      'Clean, natural energy boost'
    ],
    tag: 'Seasonal & fresh daily',
    color: 'sage',
    image: '/assets/fruit_bowl.png',
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Customised Platters',
    features: [
      'Built around your unique macro needs',
      'Up to 60g+ protein available',
      'Diabetic, PCOS & thyroid-friendly'
    ],
    tag: '100% Bespoke Nutrition',
    color: 'terra',
    image: '/assets/custom_platter.png',
  },
]

const PLANS = [
  {
    id: 'starter',
    tier: 'Starter',
    name: 'Starter Bowl',
    price: '₹199',
    period: '/ day',
    color: 'sage',
    icon: <Salad size={24} />,
    tagline: 'Light & clean one item daily',
    perks: [
      '1 item per day (fruit bowl OR platter)',
      'Fresh Salem-sourced produce',
      'WhatsApp order updates',
      'Free delivery within 5 km',
    ],
    notIncluded: ['Protein platter', 'Custom macros', 'Priority slot'],
  },
  {
    id: 'fitness',
    tier: 'Standard',
    name: 'Daily Fitness',
    price: '₹349',
    period: '/ day',
    color: 'gold',
    icon: <Dumbbell size={24} />,
    tagline: 'Balanced protein + fruit combo',
    popular: true,
    perks: [
      '1 protein platter (35–50g protein)',
      '1 fresh fruit bowl',
      'Daily macro summary on WhatsApp',
      'Meal timing recommendations',
      'Free delivery within 5 km',
    ],
    notIncluded: ['Fully customised macros', 'Priority slot'],
  },
  {
    id: 'custom',
    tier: 'Premium',
    name: 'Custom Elite Platter',
    price: '₹499',
    period: '/ day',
    color: 'terra',
    icon: <Sparkles size={24} />,
    tagline: 'Your exact macros, every single day',
    perks: [
      'Fully customised platter (50–60g+ protein)',
      'Diabetic / PCOS / thyroid-specific prep',
      'Precise macro & calorie targeting',
      '1 fresh fruit bowl included',
      'Priority morning delivery slot',
      'Free delivery within 5 km',
      'Daily WhatsApp check-in',
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

export default function DietFoodService() {
  return (
    <section className="section section--light diet" id="diet-food" aria-label="Diet Food Service Salem">
      <div className="section__inner">

        {/* Header */}
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--sage">
            Salem Only · Diet Food Service
          </span>
          <h2 className="section__title section__title--light">
            Fresh, Dietitian-Crafted<br />
            <span className="diet__accent">Meals at Your Door</span>
          </h2>
          <p className="section__sub section__sub--light">
            Daily meal delivery in Salem from standard protein platters to fully customised
            diet meals built around your specific health needs.
          </p>
        </div>

        {/* Delivery notice */}
        <div className="diet__delivery-notice">
          <span className="diet__delivery-icon"><Bike size={24} /></span>
          <div>
            <strong>Free delivery within 5 km of Salem.</strong>
            {' '}Delivery charges apply for areas beyond 5 km. Contact us to confirm your zone.
          </div>
        </div>

        {/* Offerings */}
        <div className="diet__offerings">
          {OFFERINGS.map(o => (
            <div key={o.title} className={`diet__offering diet__offering--${o.color}`}>
              <div className="diet__offering-bg" style={{ backgroundImage: `url(${o.image})` }} />
              <div className="diet__offering-overlay" />
              <div className="diet__offering-content">
                <div className="diet__offering-header">
                  <span className="diet__offering-icon">{o.icon}</span>
                  <h3 className="diet__offering-title">{o.title}</h3>
                </div>
                <ul className="diet__offering-features">
                  {o.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="diet__offering-bullet" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div style={{marginTop: 'auto'}}>
                  <span className={`diet__offering-tag diet__offering-tag--${o.color}`}>{o.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <h3 className="diet__plans-heading">Diet Food Plans</h3>
        <div className="diet__plans">
          {PLANS.map(plan => (
            <div key={plan.id} className={`diet__card diet__card--${plan.color}${plan.popular ? ' diet__card--popular' : ''}`}>
              {plan.popular && <div className="diet__badge">Most Popular</div>}

              <div className="diet__card-top">
                <span className="diet__icon">{plan.icon}</span>
                <div>
                  <p className="diet__tier">{plan.tier}</p>
                  <h4 className="diet__name">{plan.name}</h4>
                  <p className="diet__tagline">{plan.tagline}</p>
                </div>
              </div>

              <div className="diet__price">
                <span className={`diet__price-amount diet__price-amount--${plan.color}`}>{plan.price}</span>
                <span className="diet__price-period">{plan.period}</span>
              </div>

              <ul className="diet__perks">
                {plan.perks.map(p => (
                  <li key={p} className="diet__perk diet__perk--yes">
                    <span className="diet__perk-icon diet__perk-icon--yes"><CHECK /></span>
                    {p}
                  </li>
                ))}
                {plan.notIncluded.map(p => (
                  <li key={p} className="diet__perk diet__perk--no">
                    <span className="diet__perk-icon diet__perk-icon--no"><CROSS /></span>
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href="#register-diet-food"
                className={`btn diet__btn diet__btn--${plan.color}`}
              >
                Order {plan.tier} Plan
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
