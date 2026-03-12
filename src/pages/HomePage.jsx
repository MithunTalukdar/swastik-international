import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import { aboutImages, getImageByIndex, heroSlides } from '../lib/siteMedia'

const highlights = [
  {
    title: 'Multi-Sector Coverage',
    text: 'Healthcare, agro, industrial, and export support under one execution model.',
  },
  {
    title: 'Quality-Driven Delivery',
    text: 'Structured sourcing and verification standards before every dispatch cycle.',
  },
  {
    title: 'Transparent Communication',
    text: 'Clear updates, predictable timelines, and responsive client coordination.',
  },
]

export default function HomePage() {
  return (
    <div>
      <HeroSlider slides={heroSlides.slice(0, 5)} />

      <section className="section-block page-shell">
        <div className="home-intro-grid">
          <article className="panel">
            <p className="eyebrow">About Company</p>
            <h2>Trade Infrastructure Built For Modern Business</h2>
            <p>
              Swastik International helps organizations source products and execute supply plans
              with reliability and precision. We combine sourcing intelligence, quality control,
              and delivery coordination to support long-term growth.
            </p>
            <p>
              Our team works as an extension of client operations, ensuring every requirement is
              planned, tracked, and delivered with clarity.
            </p>

            <div className="home-intro-actions">
              <Link to="/about" className="btn btn-primary">
                Learn More
              </Link>
              <Link to="/clients" className="btn home-outline-btn">
                View Clients
              </Link>
            </div>
          </article>

          <article className="home-intro-media">
            <img
              src={getImageByIndex(aboutImages, 5, getImageByIndex(aboutImages, 0))?.src}
              alt={getImageByIndex(aboutImages, 5, getImageByIndex(aboutImages, 0))?.alt}
              loading="lazy"
              decoding="async"
            />
          </article>
        </div>

        <div className="home-highlight-grid">
          {highlights.map((item, index) => (
            <article key={item.title} className="home-highlight-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
