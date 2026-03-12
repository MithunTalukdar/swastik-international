import { copyFile, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
  '.svg',
])

const VIDEO_EXTENSIONS = new Set([
  '.mp4',
  '.webm',
  '.mov',
  '.avi',
  '.mkv',
])

const SECTION_BY_FOLDER = new Map([
  ['indexphoto', 'hero'],
  ['products', 'products'],
  ['services-photos', 'services'],
  ['about-images', 'about'],
  ['testimonials-photos', 'testimonials'],
  ['blog-images', 'blog'],
  ['contact-photos', 'contact'],
])

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FRONTEND_ROOT = path.resolve(__dirname, '..')
const SOURCE_ROOT = path.resolve(FRONTEND_ROOT, '..', 'Images', 'Images')
const ASSET_ROOT = path.resolve(FRONTEND_ROOT, 'src', 'assets')
const IMAGE_DEST_ROOT = path.join(ASSET_ROOT, 'images')
const VIDEO_DEST_ROOT = path.join(ASSET_ROOT, 'videos')

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectFiles(fullPath)
      }
      return [fullPath]
    }),
  )

  return files.flat()
}

function getTopFolder(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean)
  if (parts.length <= 1) {
    return null
  }
  return parts[0]
}

function resolveSection(relativePath) {
  const topFolder = getTopFolder(relativePath)
  if (!topFolder) {
    return 'gallery'
  }

  return SECTION_BY_FOLDER.get(topFolder.toLowerCase()) ?? 'gallery'
}

function resolveContextFolder(relativePath) {
  const relativeDir = path.dirname(relativePath)
  if (relativeDir === '.' || relativeDir === path.sep) {
    return '_root'
  }

  return relativeDir
}

async function copyIntoSection(filePath, kind, section, contextFolder) {
  const baseName = path.basename(filePath)
  const targetRoot = kind === 'video' ? VIDEO_DEST_ROOT : IMAGE_DEST_ROOT
  const targetPath = path.join(targetRoot, section, contextFolder, baseName)
  await mkdir(path.dirname(targetPath), { recursive: true })
  await copyFile(filePath, targetPath)
}

async function main() {
  await rm(IMAGE_DEST_ROOT, { recursive: true, force: true })
  await rm(VIDEO_DEST_ROOT, { recursive: true, force: true })

  await mkdir(IMAGE_DEST_ROOT, { recursive: true })
  await mkdir(VIDEO_DEST_ROOT, { recursive: true })

  const files = await collectFiles(SOURCE_ROOT)
  let imageCount = 0
  let videoCount = 0
  let ignoredCount = 0

  for (const filePath of files) {
    const extension = path.extname(filePath).toLowerCase()
    const relativePath = path.relative(SOURCE_ROOT, filePath)
    const section = resolveSection(relativePath)
    const contextFolder = resolveContextFolder(relativePath)

    if (IMAGE_EXTENSIONS.has(extension)) {
      await copyIntoSection(filePath, 'image', section, contextFolder)
      imageCount += 1
      continue
    }

    if (VIDEO_EXTENSIONS.has(extension)) {
      await copyIntoSection(filePath, 'video', section, contextFolder)
      videoCount += 1
      continue
    }

    ignoredCount += 1
  }

  console.log(`Source: ${SOURCE_ROOT}`)
  console.log(`Destination images: ${IMAGE_DEST_ROOT}`)
  console.log(`Destination videos: ${VIDEO_DEST_ROOT}`)
  console.log(`ImageTotal=${imageCount}`)
  console.log(`VideoTotal=${videoCount}`)
  console.log(`OtherTotal=${ignoredCount}`)
}

main().catch((error) => {
  console.error('media:sync failed', error)
  process.exitCode = 1
})
