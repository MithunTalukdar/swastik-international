import { mediaCatalog } from './mediaCatalog'

const IMAGE_SECTIONS = [
  'hero',
  'products',
  'services',
  'gallery',
  'testimonials',
  'about',
  'blog',
  'contact',
]

function dedupeBy(items, getKey) {
  const seen = new Set()
  const uniqueItems = []

  for (const item of items) {
    const key = getKey(item)
    if (seen.has(key)) {
      continue
    }
    seen.add(key)
    uniqueItems.push(item)
  }

  return uniqueItems
}

export const allImages = dedupeBy(
  IMAGE_SECTIONS.flatMap((section) => mediaCatalog[section].images),
  (item) => item.id,
)

export const allVideos = dedupeBy(
  mediaCatalog.videos.videos,
  (item) => item.id.replace(/^videos-/, ''),
)

export const heroSlides = mediaCatalog.hero.images.slice(0, 7)
export const homeTestimonials = mediaCatalog.testimonials.images
export const serviceImages = mediaCatalog.services.images
export const productImages = mediaCatalog.products.images
export const aboutImages = mediaCatalog.about.images
export const aboutVideos = mediaCatalog.about.videos
export const blogImages = mediaCatalog.blog.images
export const contactImages = mediaCatalog.contact.images
export const clientImages = dedupeBy(
  [
    ...allImages.filter((item) => /client/i.test(item.filename)),
    ...allImages.filter((item) => /testi/i.test(item.filename)),
  ],
  (item) => item.id,
)

export function getImageByIndex(collection, index, fallback = null) {
  if (collection.length === 0) {
    return fallback
  }
  return collection[index % collection.length]
}

export function splitByKeyword(items, groups) {
  const assignedIds = new Set()
  const result = groups.map((group) => {
    const matches = items.filter((item) => {
      if (assignedIds.has(item.id)) {
        return false
      }
      if (!group.matcher(item)) {
        return false
      }
      assignedIds.add(item.id)
      return true
    })
    return { ...group, items: matches }
  })

  const leftovers = items.filter((item) => !assignedIds.has(item.id))
  return { groups: result, leftovers }
}
