import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const livePath = path.join(root, 'src', 'data', 'live-content.json')
const seedPath = path.join(root, 'src', 'data', 'content.json')
const BLOB_PATH = 'portfolio-content.json'

export function isContent(data) {
  return Boolean(
    data &&
    typeof data === 'object' &&
    typeof data.profile?.name === 'string' &&
    data.profile.name.trim() &&
    Array.isArray(data.projects) &&
    typeof data.footer?.copyright === 'string'
  )
}

function readSeedContent() {
  try {
    return JSON.parse(fs.readFileSync(seedPath, 'utf8'))
  } catch {
    return null
  }
}

function readFileContent() {
  try {
    if (fs.existsSync(livePath)) {
      const live = JSON.parse(fs.readFileSync(livePath, 'utf8'))
      if (isContent(live)) return live
    }
  } catch {
    // Fall through to the seed file.
  }
  const seed = readSeedContent()
  if (seed && isContent(seed)) return seed
  throw new Error('Default content is missing.')
}

function writeFileContent(data) {
  fs.mkdirSync(path.dirname(livePath), { recursive: true })
  fs.writeFileSync(livePath, `${JSON.stringify(data, null, 2)}\n`)
}

async function readBlob() {
  const { get } = await import('@vercel/blob')
  const result = await get(BLOB_PATH, { access: 'private', useCache: false })
  if (!result?.stream || result.statusCode === 304) return null
  const text = await new Response(result.stream).text()
  const data = JSON.parse(text)
  return isContent(data) ? data : null
}

async function writeBlob(data) {
  const { put } = await import('@vercel/blob')
  await put(BLOB_PATH, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 1,
  })
}

export async function readSharedContent() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const remote = await readBlob()
      if (remote) return remote
    } catch {
      // A missing blob falls back to the file on this machine.
    }
  }
  return readFileContent()
}

export async function writeSharedContent(data) {
  if (!isContent(data)) {
    const error = new Error('Content is missing required fields.')
    error.status = 400
    throw error
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlob(data)
    return
  }

  try {
    writeFileContent(data)
  } catch {
    const error = new Error('Shared saves need BLOB_READ_WRITE_TOKEN on this host.')
    error.status = 503
    throw error
  }
}
