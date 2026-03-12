const SECTION_ORDER = [
  'hero',
  'products',
  'services',
  'gallery',
  'testimonials',
  'about',
  'blog',
  'contact',
  'videos',
]

const SECTION_LABELS = {
  hero: 'Hero',
  products: 'Products',
  services: 'Services',
  gallery: 'Gallery',
  testimonials: 'Testimonials',
  about: 'About',
  blog: 'Blog',
  contact: 'Contact',
  videos: 'Videos',
}

const IMAGE_MODULES = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
})

const VIDEO_MODULES = import.meta.glob('../assets/videos/**/*.{mp4,webm,mov,avi,mkv}', {
  eager: true,
  import: 'default',
})

function createEmptyCatalog() {
  return SECTION_ORDER.reduce((catalog, section) => {
    catalog[section] = { images: [], videos: [] }
    return catalog
  }, {})
}

function normalizeModulePath(modulePath) {
  return modulePath.replace(/\\/g, '/')
}

function extractSection(modulePath, rootKey) {
  const normalizedPath = normalizeModulePath(modulePath)
  const marker = `/${rootKey}/`
  const relative = normalizedPath.split(marker)[1] ?? ''
  const [section] = relative.split('/').filter(Boolean)
  return SECTION_ORDER.includes(section) ? section : 'gallery'
}

function extractFileName(modulePath) {
  const normalizedPath = normalizeModulePath(modulePath)
  const chunks = normalizedPath.split('/')
  return chunks[chunks.length - 1] ?? ''
}

function toTitleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function filenameToReadableText(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hasStrongText(value) {
  return /[a-z]{2,}/i.test(value)
}

function buildAltText(section, kind, filename, index) {
  const sectionLabel = SECTION_LABELS[section] ?? 'Section'
  const readableName = filenameToReadableText(filename)
  if (hasStrongText(readableName)) {
    return toTitleCase(readableName)
  }

  return `${sectionLabel} ${kind} ${index + 1}`
}

function pushMediaItem(catalog, section, kind, modulePath, src) {
  const fileName = extractFileName(modulePath)
  const item = {
    id: `${kind}-${normalizeModulePath(modulePath).toLowerCase()}`,
    src,
    kind,
    section,
    filename: fileName,
    alt: '',
  }

  if (kind === 'image') {
    catalog[section].images.push(item)
    return
  }

  catalog[section].videos.push(item)

  if (section !== 'videos') {
    catalog.videos.videos.push({
      ...item,
      id: `videos-${item.id}`,
      section: 'videos',
    })
  }
}

function sortAndAnnotate(catalog) {
  for (const section of SECTION_ORDER) {
    const imageList = catalog[section].images.sort((a, b) =>
      a.filename.localeCompare(b.filename, undefined, { sensitivity: 'base' }),
    )
    const videoList = catalog[section].videos.sort((a, b) =>
      a.filename.localeCompare(b.filename, undefined, { sensitivity: 'base' }),
    )

    imageList.forEach((item, index) => {
      item.alt = buildAltText(section, 'image', item.filename, index)
    })

    videoList.forEach((item, index) => {
      item.alt = buildAltText(section, 'video', item.filename, index)
    })
  }
}

function buildCatalog() {
  const catalog = createEmptyCatalog()

  for (const [modulePath, src] of Object.entries(IMAGE_MODULES)) {
    const section = extractSection(modulePath, 'images')
    pushMediaItem(catalog, section, 'image', modulePath, src)
  }

  for (const [modulePath, src] of Object.entries(VIDEO_MODULES)) {
    const section = extractSection(modulePath, 'videos')
    pushMediaItem(catalog, section, 'video', modulePath, src)
  }

  sortAndAnnotate(catalog)
  return catalog
}

export const mediaCatalog = buildCatalog()

export function getCatalogCounts(catalog = mediaCatalog) {
  const uniqueImageIds = new Set()
  const uniqueVideoIds = new Set()

  for (const section of SECTION_ORDER) {
    for (const item of catalog[section].images) {
      uniqueImageIds.add(item.id)
    }
    for (const item of catalog[section].videos) {
      const normalizedId = item.id.startsWith('videos-') ? item.id.slice(7) : item.id
      uniqueVideoIds.add(normalizedId)
    }
  }

  return {
    imageTotal: uniqueImageIds.size,
    videoTotal: uniqueVideoIds.size,
    mediaTotal: uniqueImageIds.size + uniqueVideoIds.size,
  }
}

export { SECTION_ORDER }
