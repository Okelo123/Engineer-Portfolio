import { readSharedContent, writeSharedContent } from '../server/contentStore.js'

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('CDN-Cache-Control', 'no-store')
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body)
  if (typeof req.body === 'string' && req.body) return Promise.resolve(JSON.parse(req.body))

  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        if (raw.length > 500_000) throw new Error('Content is too large.')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      send(res, 200, await readSharedContent())
      return
    }

    if (req.method === 'POST') {
      const data = await readBody(req)
      await writeSharedContent(data)
      send(res, 200, { ok: true })
      return
    }

    res.setHeader('Allow', 'GET, POST')
    send(res, 405, { ok: false, error: 'Method not allowed.' })
  } catch (error) {
    const status = error?.status || 500
    send(res, status, { ok: false, error: error instanceof Error ? error.message : 'Unable to save.' })
  }
}
