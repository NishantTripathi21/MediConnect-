/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        'primary': '#5F6FFF',
        'bg-main': '#000000',     /* True Black */
        'bg-surface': '#0a0a0a',  /* Near Black for cards */
        'bg-muted': '#1a1a1a',    /* Dark gray for hovers */
        'text-main': '#ffffff',   /* White text */
        'text-dim': '#a3a3a3',    /* Gray text */
        'border-soft': '#ffffff20', /* Subtle white border like the photo */
        'success': '#22c55e',
        'danger': '#ef4444',
      }
    },
  },
  plugins: [],
}