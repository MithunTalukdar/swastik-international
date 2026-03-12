import PageBanner from '../components/PageBanner'
import { clientImages, getImageByIndex, heroSlides } from '../lib/siteMedia'

const stats = [
  { value: '96%', label: 'Repeat Clients' },
  { value: '120+', label: 'Orders Delivered' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '24/7', label: 'Support Access' },
]

const clientReviews = [
  {
    name: 'Rahul Mehta',
    company: 'Northline Healthcare',
    rating: 5,
    text:
      'Consistent delivery quality and clear communication helped our procurement team execute faster.',
  },
  {
    name: 'Nisha Roy',
    company: 'Evercore Meditech',
    rating: 5,
    text: 'Their timeline discipline and product consistency made them our preferred long-term partner.',
  },
  {
    name: 'Arman Das',
    company: 'TriAxis Agro Trade',
    rating: 4,
    text: 'Great team coordination and practical sourcing support across complex order windows.',
  },
  {
    name: 'Aditi Kapoor',
    company: 'Bengal Export Network',
    rating: 5,
    text: 'Excellent response time and strong execution in both documentation and dispatch planning.',
  },
  {
    name: 'Vikram Sen',
    company: 'Primeleaf Foods',
    rating: 4,
    text: 'Reliable outcomes, transparent updates, and a process that feels organized from start to finish.',
  },
  {
    name: 'Rohan Ghosh',
    company: 'Unified Procurement Group',
    rating: 5,
    text:
      'Their quality checks and accountability at each stage have improved our supply confidence.',
  },
]

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (
    <span key={`star-${index}`} className={index < rating ? 'star-active' : 'star-idle'}>
      &#9733;
    </span>
  ))
}

export default function ClientsPage() {
  const fallbackClientImage = getImageByIndex(clientImages, 0, getImageByIndex(heroSlides, 0))
  const loopedLogos = [...clientImages, ...clientImages]

  return (
    <div>
      <PageBanner
        title="Clients"
        subtitle="Trusted by partners who value consistent delivery, transparent communication, and premium service standards."
        eyebrow="Clients"
        image={getImageByIndex(heroSlides, 4, getImageByIndex(heroSlides, 0))}
      />

      <section className="section-block page-shell">
        <div className="stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      {clientImages.length > 0 ? (
        <section className="section-block section-alt">
          <div className="page-shell">
            <div className="section-title">
              <p>Client Logos</p>
              <h2>Trusted Organizations</h2>
            </div>

            <div className="client-logo-carousel">
              <div className="client-logo-track">
                {loopedLogos.map((logo, index) => (
                  <article key={`${logo.id}-${index}`} className="client-logo-chip">
                    <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-block page-shell">
        <div className="section-title">
          <p>Client Reviews</p>
          <h2>Partner Testimonials</h2>
        </div>

        <div className="client-review-grid">
          {clientReviews.map((review, index) => (
            <article key={review.name} className="client-review-card">
              <img
                src={getImageByIndex(clientImages, index, fallbackClientImage)?.src}
                alt={review.company}
                loading="lazy"
                decoding="async"
              />
              <div className="client-review-body">
                <small>{review.company}</small>
                <h3>{review.name}</h3>
                <div className="client-rating" aria-label={`${review.rating} out of 5 stars`}>
                  {renderStars(review.rating)}
                </div>
                <p>{review.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
