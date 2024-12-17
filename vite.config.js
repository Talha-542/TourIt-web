import path from "path"
import { fileURLToPath } from "url" // Import from 'url' module
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Get __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@/service': '/src/service',
    },
  },
})
