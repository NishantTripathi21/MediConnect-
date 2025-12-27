/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The core "Dark Calm" palette
        'bg-main': '#0f172a',      // Deep slate background
        'bg-surface': '#111827',   // Card/Panel background
        'bg-muted': '#1f2933',     // Darker highlights
        
        'primary': '#2dd4bf',      // Soft teal accent
        'primary-muted': '#14b8a6',// Darker teal for hover
        
        'text-main': '#e5e7eb',    // Light grey text (Primary)
        'text-dim': '#9ca3af',     // Muted grey text (Secondary)
        
        'border-soft': '#243244',  // Subtle UI borders
        'success': '#22c55e',      // Green status
        'danger': '#ef4444',       // Red status
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      // Adding a custom transition for that "smooth" feel
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}