import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['ab0f-202-47-56-206.ngrok-free.app', 'e6de-202-47-56-206.ngrok-free.app'],
  },
})
