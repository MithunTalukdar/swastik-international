import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const SLIDE_CONTENT = [
  {
    eyebrow: 'Global Trade Network',
    headline: 'Reliable Sourcing. Premium Execution.',
    text:
      'Multi-sector procurement and delivery systems built for speed, quality, and consistency.',
  },
  {
    eyebrow: 'Medical And Industrial Focus',
    headline: 'Precision Supply For Critical Requirements.',
    text:
      'Structured workflows for healthcare, agro, industrial, and export-oriented business streams.',
  },
  {
    eyebrow: 'Client-First Operations',
    headline: 'Transparent Timelines. Trusted Outcomes.',
    text:
      'End-to-end support from requirement mapping to dispatch with real-time coordination.',
  },
]

export default function HeroSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideItems = Array.isArray(slides) ? slides : []

  useEffect(() => {
    if (slideItems.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideItems.length)
    }, 4800)

    return () => clearInterval(timer)
  }, [slideItems.length])

  const content = useMemo(() => SLIDE_CONTENT[activeIndex % SLIDE_CONTENT.length], [activeIndex])

  if (slideItems.length === 0) {
    return null
  }

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + slideItems.length) % slideItems.length)
  }

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % slideItems.length)
  }

  return (
    <section className="home-hero-slider" aria-label="Hero slider">
      {slideItems.map((item, index) => (
        <img
          key={item.id}
          src={item.src}
          alt={item.alt}
          className={`home-hero-slide ${index === activeIndex ? 'home-hero-slide-active' : 'home-hero-slide-idle'}`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding={index === 0 ? 'sync' : 'async'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      ))}

      <div className="home-hero-overlay" />

      <div className="page-shell home-hero-inner">
        <p>{content.eyebrow}</p>
        <h1>{content.headline}</h1>
        <p>{content.text}</p>

        <div className="home-hero-actions">
          <Link to="/services" className="btn btn-primary">
            Explore Services
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Get Started
          </Link>
        </div>

        <div className="home-hero-controls">
          <button type="button" onClick={goPrevious} className="hero-control-btn" aria-label="Previous slide">
            Prev
          </button>

          <div className="home-hero-dots">
            {slideItems.map((item, index) => (
              <button
                key={`dot-${item.id}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`hero-dot ${index === activeIndex ? 'hero-dot-active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button type="button" onClick={goNext} className="hero-control-btn" aria-label="Next slide">
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
