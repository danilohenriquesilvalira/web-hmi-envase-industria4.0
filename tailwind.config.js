/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b', 
        accent: '#3b82f6',
        'status-running': '#10b981',
        'status-stopped': '#ef4444',
        'status-paused': '#f59e0b',
        'status-warning': '#f97316',
        'status-error': '#dc2626'
      }
    },
  },
  plugins: [],
}