import PageBanner from '../components/PageBanner'
import { contactImages, getImageByIndex } from '../lib/siteMedia'

const contactCards = [
  {
    label: 'Phone',
    value: '+91 9831161331',
    href: 'tel:+919831161331',
  },
  {
    label: 'Email',
    value: 'info@swastikintl.com',
    href: 'mailto:info@swastikintl.com',
  },
  {
    label: 'Office',
    value: 'Liluah, Howrah, West Bengal, India',
    href: '#',
  },
]

export default function ContactPage() {
  return (
    <div>
      <PageBanner
        title="Contact"
        subtitle="Share your requirement and we will map the right service flow for your business."
        eyebrow="Contact"
        image={getImageByIndex(contactImages, 1, getImageByIndex(contactImages, 0))}
      />

      <section className="section-block page-shell">
        <div className="contact-grid">
          <article className="panel">
            <p className="eyebrow">Direct Access</p>
            <h2>Talk To Our Team</h2>
            <p>
              Connect for sourcing requests, product clarifications, shipment planning, or long-term
              supply partnerships.
            </p>

            <div className="contact-cards">
              {contactCards.map((card) => (
                <article key={card.label} className="contact-card">
                  <small>{card.label}</small>
                  {card.href !== '#' ? <a href={card.href}>{card.value}</a> : <span>{card.value}</span>}
                </article>
              ))}
            </div>

            <div className="contact-photo-strip">
              {contactImages.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </article>

          <article className="panel">
            <p className="eyebrow">Inquiry Form</p>
            <h2>Send Requirement Details</h2>

            <form className="contact-form">
              <label htmlFor="full-name">Full Name</label>
              <input id="full-name" type="text" placeholder="Enter your full name" />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email address" />

              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" placeholder="Enter your contact number" />

              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} placeholder="Describe your requirement" />

              <button type="button" className="btn btn-primary">
                Submit Inquiry
              </button>
            </form>
          </article>
        </div>
      </section>

      <section className="section-block section-alt">
        <div className="page-shell">
          <div className="map-shell">
            <iframe
              title="Howrah map"
              src="https://www.google.com/maps?q=Howrah%2C%20West%20Bengal&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
