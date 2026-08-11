import './Contact.css'
import { Smartphone, MapPin, Globe, MessageCircle } from 'lucide-react'

const WA_NUMBER = '917540099421'
const WA_DISPLAY = '+91 75400 99421'

const CONTACT_ITEMS = [
  {
    icon: <Smartphone size={24} />,
    label: 'WhatsApp / Phone',
    value: WA_DISPLAY,
    href:  `https://wa.me/${WA_NUMBER}?text=Hello%20Ajwa%20Elite%20Nutrition!%20I%20have%20an%20enquiry.`,
    cta:   'Chat on WhatsApp',
    color: 'wa',
  },
  {
    icon: <MapPin size={24} />,
    label: 'Location',
    value: 'Salem, Tamil Nadu, India',
    href:  'https://maps.google.com/?q=Salem,Tamil+Nadu,India',
    cta:   'View on Maps',
    color: 'sage',
  },
  {
    icon: <Globe size={24} />,
    label: 'Consultation',
    value: 'Available Worldwide',
    href:  '#register-consultation',
    cta:   'Book Consultation',
    color: 'gold',
  },
]

export default function Contact() {
  return (
    <section className="section section--light contact" id="contact" aria-label="Contact Ajwa Elite Nutrition">
      <div className="section__inner">

        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--sage">Get in Touch</span>
          <h2 className="section__title section__title--light">
            Have Questions? <span className="contact__accent">We're Here.</span>
          </h2>
          <p className="section__sub section__sub--light">
            Reach out to us on WhatsApp for the fastest response. We're happy to help you
            choose the right plan or answer any questions about our services.
          </p>
        </div>

        <div className="contact__cards">
          {CONTACT_ITEMS.map(item => (
            <div key={item.label} className={`contact__card contact__card--${item.color}`}>
              <span className="contact__icon">{item.icon}</span>
              <p className="contact__label">{item.label}</p>
              <p className="contact__value">{item.value}</p>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`btn contact__btn contact__btn--${item.color}`}
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
