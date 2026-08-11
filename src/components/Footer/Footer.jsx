import './Footer.css'
import logoImg from '../../assets/logo.jpeg'

const WA_NUMBER = '917540099421'

const LINKS = {
  Services: ['Online Consultation', 'Diet Food Service (Salem)', 'Book a Consultation', 'Order Diet Food'],
  Services2: ['About Us', 'Consultation Plans', 'Diet Food Plans', 'Contact Us'],
  Support:  ['WhatsApp Support', 'Delivery Info', 'Privacy Policy', 'Terms of Service'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  const HREF_MAP = {
    'Online Consultation': '#consultation',
    'Diet Food Service (Salem)': '#diet-food',
    'Book a Consultation': '#register-consultation',
    'Order Diet Food': '#register-diet-food',
    'About Us': '#about',
    'Consultation Plans': '#consultation',
    'Diet Food Plans': '#diet-food',
    'Contact Us': '#contact',
    'WhatsApp Support': `https://wa.me/${WA_NUMBER}`,
    'Delivery Info': '#diet-food',
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        {/* brand column */}
        <div className="footer__brand">
          <a href="/" className="footer__logo" aria-label="Ajwa Elite Nutrition">
            <img src={logoImg} alt="Ajwa Elite Nutrition Logo" className="footer__logo-img" />
          </a>
          <p className="footer__tagline">
            Certified dietitian consultations worldwide. Fresh diet food delivery in Salem, Tamil Nadu.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hello%20Ajwa%20Elite%20Nutrition!`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--wa footer__wa-btn"
            aria-label="Contact Ajwa Elite Nutrition on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* link columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading} className="footer__col">
            <h3 className="footer__col-title">
              {heading === 'Services2' ? 'Navigate' : heading}
            </h3>
            <ul className="footer__col-list">
              {items.map(item => (
                <li key={item}>
                  <a
                    href={HREF_MAP[item] || '#'}
                    className="footer__col-link"
                    target={HREF_MAP[item]?.startsWith('http') ? '_blank' : undefined}
                    rel={HREF_MAP[item]?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {year} Ajwa Elite Nutrition Salem, Tamil Nadu, India.
        </p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
