import './Navbar.css'
import { useState, useEffect } from 'react'
import logoImg from '../../assets/logo.jpeg'

const NAV_LINKS = [
  { label: 'About',           href: '#about'        },
  { label: 'Consultation',    href: '#consultation' },
  { label: 'Diet Food',       href: '#diet-food'    },
  { label: 'Contact',         href: '#contact'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">
        {/* Brand */}
        <a href="/" className="navbar__brand" aria-label="Ajwa Elite Nutrition">
          <img src={logoImg} alt="Ajwa Elite Nutrition Logo" className="navbar__logo-img" />
          <span className="navbar__brand-name">Ajwa Elite</span>
        </a>

        {/* desktop links */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="navbar__link">{l.label}</a>
          ))}
        </nav>

        {/* CTA pair + hamburger */}
        <div className="navbar__actions">
          <a href="#register-consultation" className="btn btn--outline-gold navbar__cta navbar__cta--consult">
            Book Consultation
          </a>
          <a href="#register-diet-food" className="btn btn--sage navbar__cta navbar__cta--diet">
            Order Diet Food
          </a>
          <button
            className={`navbar__hamburger${open ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="navbar__drawer" aria-modal="true">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="navbar__drawer-link" onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <div className="navbar__drawer-ctas">
            <a href="#register-consultation" className="btn btn--outline-gold" onClick={closeMenu}>
              Book Consultation
            </a>
            <a href="#register-diet-food" className="btn btn--sage" onClick={closeMenu}>
              Order Diet Food
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
