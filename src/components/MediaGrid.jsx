import { useMemo, useState } from 'react'

export default function MediaGrid({
  items,
  initialCount = 12,
  columns = 'md:grid-cols-2 lg:grid-cols-3',
  imageClassName = 'h-56',
  caption = false,
}) {
  const [limit, setLimit] = useState(initialCount)

  const visibleItems = useMemo(() => {
    return items.slice(0, Math.min(limit, items.length))
  }, [items, limit])

  const hasMore = visibleItems.length < items.length

  return (
    <div>
      <div className={`grid gap-5 ${columns}`}>
        {visibleItems.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className={`${imageClassName} w-full object-cover`}
            />
            {caption ? (
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-slate-700">{item.alt}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setLimit((current) => current + initialCount)}
            className="rounded-sm border border-slate-400 px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:border-slate-700 hover:text-slate-900"
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  )
}
