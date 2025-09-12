// Defines the configuration for the Vite build tool.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/landingPage/' : '/',
  // An array of plugins to use.
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  // Development server configuration.
  server: {
    open: true,
    // Hosts that are allowed to access the dev server. for porting
    allowedHosts: [
      'fd76a726e099.ngrok-free.app'
    ],
  }
})