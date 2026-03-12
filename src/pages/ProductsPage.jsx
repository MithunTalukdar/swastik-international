import PageBanner from '../components/PageBanner'
import { getImageByIndex, productImages, splitByKeyword } from '../lib/siteMedia'

const productGroups = [
  {
    key: 'dialyser',
    title: 'Dialyser Range',
    matcher: (item) => /(dialy|browndove)/i.test(item.filename),
  },
  {
    key: 'catheter',
    title: 'Catheter Solutions',
    matcher: (item) => /catheter/i.test(item.filename),
  },
  {
    key: 'bloodlines',
    title: 'Bloodline Components',
    matcher: (item) => /bloodlines|pre-pump|post-pump|priming|transducer/i.test(item.filename),
  },
  {
    key: 'access',
    title: 'Needles And Access',
    matcher: (item) => /needle|avf/i.test(item.filename),
  },
]

export default function ProductsPage() {
  const { groups, leftovers } = splitByKeyword(productImages, productGroups)
  const categories = [
    ...groups,
    {
      key: 'special',
      title: 'Specialized Variants',
      items: leftovers,
    },
  ]

  return (
    <div>
      <PageBanner
        title="Products"
        subtitle="Category-organized product portfolio for medical and allied procurement programs."
        eyebrow="Products"
        image={getImageByIndex(productImages, 0)}
      />

      <section className="section-block page-shell">
        <div className="section-title">
          <p>Portfolio Breakdown</p>
          <h2>Category Collection</h2>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <article id={category.key} className="category-card" key={category.key}>
              <img
                src={getImageByIndex(category.items, 0, getImageByIndex(productImages, index))?.src}
                alt={category.title}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p>{String(index + 1).padStart(2, '0')}</p>
                <h3>{category.title}</h3>
                <span>{category.items.length} products</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block section-alt">
        <div className="page-shell">
          <div className="section-title">
            <p>Showcase</p>
            <h2>Featured Product Visuals</h2>
          </div>

          <div className="masonry-grid">
            {productImages.slice(0, 12).map((item, index) => (
              <article key={item.id} className={`masonry-card ${index % 5 === 0 ? 'masonry-tall' : ''}`}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
