import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // Specify the port number you want
  },
  optimizeDeps: {
    exclude: [
      'react', 
      'react-dom', 
      // Add other dependencies you suspect might be causing the issue
    ]
  }
})
