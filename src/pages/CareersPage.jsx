import PageBanner from '../components/PageBanner'
import { getImageByIndex, serviceImages } from '../lib/siteMedia'

const OPENINGS = [
  {
    title: 'Business Development Executive',
    type: 'Full Time',
    location: 'Howrah / Kolkata',
  },
  {
    title: 'International Sourcing Coordinator',
    type: 'Full Time',
    location: 'Howrah / Hybrid',
  },
  {
    title: 'Operations And Logistics Associate',
    type: 'Full Time',
    location: 'Howrah',
  },
]

export default function CareersPage() {
  return (
    <div>
      <PageBanner
        title="Careers"
        subtitle="Join a fast-moving team focused on quality execution, global trade operations, and long-term client success."
        image={getImageByIndex(serviceImages, 6)}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
            Work With Us
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Current Opportunities
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {OPENINGS.map((opening, index) => (
            <article
              key={opening.title}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={getImageByIndex(serviceImages, index + 10)?.src}
                alt={getImageByIndex(serviceImages, index + 10)?.alt ?? opening.title}
                loading="lazy"
                decoding="async"
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-slate-900">{opening.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {opening.type} | {opening.location}
                </p>
                <button
                  type="button"
                  className="mt-5 rounded-sm border border-slate-400 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:border-slate-700 hover:text-slate-900"
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
