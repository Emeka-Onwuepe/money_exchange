import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    allowedHosts: ['localhost', '127.0.0.1', 'c0f09f232165.ngrok-free.app']
  }
})
