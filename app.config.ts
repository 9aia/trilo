import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  appRoot: 'app',
  middleware: './app/middleware.ts',
  server: {
    preset: 'cloudflare-worker',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'db'),
      },
    },
  },
})
