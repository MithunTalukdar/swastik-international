import PageBanner from '../components/PageBanner'
import { getImageByIndex, serviceImages } from '../lib/siteMedia'

const serviceCards = [
  {
    title: 'Medical Sourcing',
    description: 'Critical consumables and equipment support with validation-driven quality flow.',
  },
  {
    title: 'Agro Trade',
    description: 'Selected agro products managed through consistent grading and supply planning.',
  },
  {
    title: 'Tea Programs',
    description: 'Blended and specialty tea dispatch aligned with market-specific requirements.',
  },
  {
    title: 'Industrial Material Supply',
    description: 'Structured sourcing and dispatch support for industrial buyers and distributors.',
  },
  {
    title: 'Vendor Coordination',
    description: 'Single-point execution for multi-vendor procurement and compliance tracking.',
  },
  {
    title: 'Export Readiness',
    description: 'Packaging, paperwork, and shipment workflow prepared for smooth movement.',
  },
]

const processSteps = [
  {
    title: 'Requirement Mapping',
    text: 'Scope, quality benchmarks, lead-time constraints, and required quantities are aligned.',
  },
  {
    title: 'Source Validation',
    text: 'Suppliers are validated for quality consistency, packaging readiness, and capacity.',
  },
  {
    title: 'Execution Window',
    text: 'Procurement, documentation, and logistics are coordinated under one delivery timeline.',
  },
  {
    title: 'Delivery Assurance',
    text: 'Final dispatch quality checks and communication protocols ensure client visibility.',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <PageBanner
        title="Services"
        subtitle="High-structure service operations tailored for reliability, speed, and quality-backed delivery."
        eyebrow="Services"
        image={getImageByIndex(serviceImages, 2, getImageByIndex(serviceImages, 0))}
      />

      <section className="section-block page-shell">
        <div className="section-title">
          <p>What We Deliver</p>
          <h2>Service Architecture</h2>
        </div>

        <div className="service-grid">
          {serviceCards.map((service, index) => (
            <article className="service-card" key={service.title}>
              <img
                src={getImageByIndex(serviceImages, index, getImageByIndex(serviceImages, 0))?.src}
                alt={service.title}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block section-alt">
        <div className="page-shell">
          <div className="section-title">
            <p>How We Work</p>
            <h2>Execution Process</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article className="process-card" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block page-shell">
        <div className="cta-panel">
          <img
            src={getImageByIndex(serviceImages, 14, getImageByIndex(serviceImages, 0))?.src}
            alt={getImageByIndex(serviceImages, 14, getImageByIndex(serviceImages, 0))?.alt}
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="eyebrow">Scale With Confidence</p>
            <h2>Need a dedicated sourcing and delivery partner?</h2>
            <p>
              We design custom service combinations based on your sector, product profile, and
              timeline constraints.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
