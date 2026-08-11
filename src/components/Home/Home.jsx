import { useEffect, useRef, useState } from 'react'
import { Bike, Globe, MapPin, ArrowRight } from 'lucide-react'
import heroVideo from '../../assets/ajwa.mp4'
import './Home.css'

const CONSULTATION_CONDITIONS = [
  'Weight Loss', 'Thyroid Issues',
  'PCOD / PCOS', 'Diabetes Management'
]
const DIET_FOOD_ITEMS = [
  'Protein Platters',
  'Customised Diet Platters',
]

export default function Home() {
  const videoRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeCard, setActiveCard] = useState('diet')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveCard(prev => prev === 'diet' ? 'consult' : 'diet');
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.volume = 0
    vid.playsInline = true
    vid.loop = true
    vid.play().catch(() => {})
    const retry = () => { vid.play().catch(() => {}); window.removeEventListener('click', retry) }
    window.addEventListener('click', retry)
    return () => window.removeEventListener('click', retry)
  }, [])

  return (
    <section className="home" id="home" aria-label="Ajwa Elite Nutrition Home">
      {/* Background Video */}
      <div className="home__video-bg" aria-hidden="true">
        {!isVideoReady && <div className="home__shimmer" />}
        <video
          ref={videoRef}
          className="home__video"
          src={heroVideo}
          muted autoPlay loop playsInline
          onCanPlay={() => setIsVideoReady(true)}
        />
        <div className="home__video-overlay" />
      </div>

      <div className={`home__inner ${visible ? 'home__inner--in' : ''}`}>
        
        <div className="home__layout">
          
          {/* 1. Main Text Block */}
          <div className="home__bento-item home__text-block">
            <h1 className="home__headline">
              Certified Clinical Dietitian,<br />
              <span className="home__headline-accent">Expertly Guided.</span>
            </h1>
            <p className="home__sub">
              Personalised, science-backed nutrition plans. Choose expert online consultations or customised diet meal delivery.
            </p>

            <div className="home__hero-highlight">
              <div className="home__hero-highlight-pulse"></div>
              <div className="home__hero-highlight-icon"><MapPin size={18} /></div>
              <div className="home__hero-highlight-content">
                <span className="home__hero-highlight-badge">Salem Exclusive</span>
                <span className="home__hero-highlight-text">
                  <strong>Customised Diet Platters</strong> with <br className="home__hero-br" />
                  <strong>Free Delivery within 5km!</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 2. 3D Cards Stack */}
          <div 
            className="home__cards-stack"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Consultation Card */}
            <a 
              href="#register-consultation" 
              className={`home__path home__path--consult ${activeCard === 'consult' ? 'home__path--front' : 'home__path--back'}`}
              onMouseEnter={() => setActiveCard('consult')}
            >
            <div className="home__path-header">
              <div className="home__path-icon home__path-icon--consult">
                <Globe size={24} />
              </div>
              <div className="home__path-title-group">
                <p className="home__path-tag">Worldwide</p>
                <h2 className="home__path-title">Online Consultation</h2>
              </div>
              <div className="home__path-arrow">
                <ArrowRight size={20} />
              </div>
            </div>
            <div className="home__path-body">
              <p className="home__path-desc">
                One-on-one dietitian consultation, available anywhere in the world.
              </p>
              <ul className="home__path-list">
                {CONSULTATION_CONDITIONS.map(c => (
                  <li key={c}><span className="home__path-dot" />{c}</li>
                ))}
              </ul>
            </div>
          </a>

          {/* Diet Food Card */}
          <a 
            href="#register-diet-food" 
            className={`home__path home__path--diet ${activeCard === 'diet' ? 'home__path--front' : 'home__path--back'}`}
            onMouseEnter={() => setActiveCard('diet')}
          >
            <div className="home__path-header">
              <div className="home__path-icon home__path-icon--diet">
                <MapPin size={24} />
              </div>
              <div className="home__path-arrow">
                <ArrowRight size={20} />
              </div>
            </div>
            <div className="home__path-title-group home__path-title-group--diet">
              <p className="home__path-tag">Salem Only</p>
              <h2 className="home__path-title">Diet Food Service</h2>
            </div>
            <div className="home__path-body">
              <p className="home__path-desc">
                Fresh, dietitian-crafted meal delivery directly to your door.
              </p>
              <ul className="home__path-list">
                {DIET_FOOD_ITEMS.map(item => (
                  <li key={item}><span className="home__path-dot home__path-dot--sage" />{item}</li>
                ))}
              </ul>
              <div className="home__path-delivery">
                <Bike size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Free delivery within 5 km
              </div>
            </div>
          </a>
          
          </div> {/* End cards stack */}

        </div>

      </div>
    </section>
  )
}
