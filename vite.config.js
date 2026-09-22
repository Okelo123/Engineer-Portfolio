import { loadEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readSharedContent, writeSharedContent } from './server/contentStore.js'

function sharedContentPlugin() {
  return {
    name: 'shared-content',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      if (env.BLOB_READ_WRITE_TOKEN) process.env.BLOB_READ_WRITE_TOKEN = env.BLOB_READ_WRITE_TOKEN

      server.middlewares.use('/api/content', (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'POST') return next()

        const done = (status, body) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
          res.end(JSON.stringify(body))
        }

        if (req.method === 'GET') {
          readSharedContent().then((data) => done(200, data)).catch((error) => {
            done(500, { ok: false, error: error instanceof Error ? error.message : 'Unable to load content.' })
          })
          return
        }

        const chunks = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          try {
            const raw = Buffer.concat(chunks).toString('utf8')
            if (raw.length > 500_000) throw new Error('Content is too large.')
            const data = JSON.parse(raw)
            writeSharedContent(data)
              .then(() => done(200, { ok: true }))
              .catch((error) => done(error?.status || 500, { ok: false, error: error instanceof Error ? error.message : 'Unable to save.' }))
          } catch (error) {
            done(400, { ok: false, error: error instanceof Error ? error.message : 'Unable to save.' })
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), sharedContentPlugin()],
  server: {
    host: true,
  },
})
