import PageBanner from '../components/PageBanner'
import { aboutImages, getImageByIndex } from '../lib/siteMedia'

const coreValues = [
  {
    title: 'Quality Discipline',
    description:
      'Every shipment is mapped against quality checkpoints so clients get predictable outcomes.',
  },
  {
    title: 'Transparent Operations',
    description:
      'Teams receive clear updates across sourcing, production, packaging, and final movement.',
  },
  {
    title: 'Long-Term Partnerships',
    description:
      'We optimize processes for repeatability, not one-time transactions.',
  },
]

const milestones = [
  'Built a diversified sourcing network across healthcare, tea, agro, and industrial streams.',
  'Expanded documentation and logistics workflows for faster cross-border movement.',
  'Established repeat client retention through reliability-focused delivery standards.',
]

export default function AboutPage() {
  return (
    <div>
      <PageBanner
        title="About Swastik International"
        subtitle="A modern trade company built around consistency, quality systems, and enterprise-level execution."
        eyebrow="About"
        image={getImageByIndex(aboutImages, 6, getImageByIndex(aboutImages, 0))}
      />

      <section className="section-block page-shell">
        <div className="about-intro-grid">
          <article className="panel">
            <h2>Company Overview</h2>
            <p>
              Swastik International operates as an integrated trade partner for organizations that
              need dependable procurement and delivery support across multiple sectors. Our model
              combines product intelligence, supplier management, and structured execution.
            </p>
            <p>
              The result is a reliable workflow that reduces uncertainty and improves operational
              planning for our clients.
            </p>

            <div className="metric-row">
              <article className="metric-card">
                <strong>4+</strong>
                <span>Core Sectors</span>
              </article>
              <article className="metric-card">
                <strong>20+</strong>
                <span>Product Lines</span>
              </article>
              <article className="metric-card">
                <strong>100%</strong>
                <span>Client Focus</span>
              </article>
            </div>
          </article>

          <div className="image-stack">
            {[0, 2, 4, 8].map((index) => {
              const image = getImageByIndex(aboutImages, index, getImageByIndex(aboutImages, 0))
              return (
                <img
                  key={image?.id ?? index}
                  src={image?.src}
                  alt={image?.alt ?? 'About us visual'}
                  loading="lazy"
                  decoding="async"
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-block section-alt">
        <div className="page-shell">
          <div className="section-title">
            <p>Core Values</p>
            <h2>Operating Principles</h2>
          </div>

          <div className="feature-grid">
            {coreValues.map((item, index) => (
              <article key={item.title} className="feature-card">
                <img
                  src={getImageByIndex(aboutImages, index + 10, getImageByIndex(aboutImages, 1))?.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block page-shell">
        <div className="about-timeline">
          <article className="panel">
            <p className="eyebrow">Growth Path</p>
            <h2>Milestones That Define Our Direction</h2>
            <ul className="timeline-list">
              {milestones.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ul>
          </article>

          <img
            src={getImageByIndex(aboutImages, 12, getImageByIndex(aboutImages, 0))?.src}
            alt={getImageByIndex(aboutImages, 12, getImageByIndex(aboutImages, 0))?.alt}
            className="wide-media"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </div>
  )
}
