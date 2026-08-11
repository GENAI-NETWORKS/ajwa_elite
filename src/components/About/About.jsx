import './About.css'
import { GraduationCap, Hospital, Globe, MapPin, Leaf, ShieldCheck, HeartPulse, Trophy } from 'lucide-react'

const CREDENTIALS = [
  { icon: <GraduationCap size={24} />, label: 'B.Sc. & M.Sc. in Nutrition & Dietetics' },
  { icon: <Hospital size={24} />, label: 'Clinical Dietitian Hospital & Private Practice' },
  { icon: <Globe size={24} />, label: 'Serving Clients Worldwide via Online Consultations' },
  { icon: <MapPin size={24} />, label: 'Based in Salem, Tamil Nadu, India' },
]

const TRUST = [
  { icon: <HeartPulse size={28} />, number: '500+', label: 'Clients Consulted' },
  { icon: <ShieldCheck size={28} />, number: '8+',   label: 'Health Conditions Covered' },
  { icon: <Trophy size={28} />, number: '5★',   label: 'Client Satisfaction' },
]

export default function About() {
  return (
    <section className="section section--light about" id="about" aria-label="About Ajwa Elite Nutrition">
      <div className="section__inner">
        <div className="section__header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section__eyebrow section__eyebrow--sage">About Us</span>
          <h2 className="section__title section__title--light about__title">
            Ajwa Elite <span className="about__accent">Nutrition</span>
          </h2>
        </div>

        <div className="about__grid">
          
          {/* 1. Mission Statement */}
          <div className="about__card about__mission">
            <h3 className="about__mission-statement">
              Evidence-based clinical nutrition, tailored to your <br/>
              <span className="about__mission-highlight">unique health profile and lifestyle.</span>
            </h3>
          </div>

          {/* 2. Credentials */}
          <div className="about__credentials-container">
            {CREDENTIALS.map(c => (
              <div key={c.label} className="about__card about__credential-card">
                <span className="about__credential-icon">{c.icon}</span>
                <span className="about__credential-label">{c.label}</span>
              </div>
            ))}
          </div>

          {/* 3. Philosophy */}
          <div className="about__card about__philosophy">
            <div className="about__philosophy-icon"><Leaf size={32} /></div>
            <h3 className="about__philosophy-title">Our Philosophy</h3>
            <p className="about__philosophy-text">
              We combine clinical nutrition science with deep personalisation. Every client gets a
              plan built around their specific body, lifestyle, and health goals.
            </p>
          </div>

          {/* 4. Trust Strip */}
          <div className="about__trust-container">
            {TRUST.map(t => (
              <div key={t.label} className="about__card about__trust-card">
                <div className="about__trust-icon">{t.icon}</div>
                <div className="about__trust-stats">
                  <span className="about__trust-number">{t.number}</span>
                  <span className="about__trust-label">{t.label}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
