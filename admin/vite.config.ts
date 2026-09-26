import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

/** Dev-only: this app only serves under /admin (base: '/admin/'), so hitting
 * this dev server directly at the bare root (e.g. someone typing just
 * http://localhost:5174/) shows Vite's own "did you mean /admin/?" message
 * instead of the app. Redirect any request outside /admin straight there. */
function redirectRootToAdmin(): Plugin {
  return {
    name: 'redirect-root-to-admin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && !req.url.startsWith('/admin')) {
          res.writeHead(302, { Location: `/admin${req.url}` })
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss(), redirectRootToAdmin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5174'),
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5174'),
  },
})
