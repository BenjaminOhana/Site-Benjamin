/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F5', // Fond Principal
          dark: '#F3EDE7',    // Fond Secondaire
        },
        anthracite: '#1D1D1F', // Texte Principal
        zinc: {
          600: '#52525B',      // Texte Secondaire
        },
        sienna: {
          DEFAULT: '#B94A2F', // CTA Boutons (Deep Terracotta)
          hover: '#9A3D25',   // CTA Hover
        },
        terracotta: '#C4775C', // Accent Décoratif
        sage: '#6B7F6B',       // Accent Secondaire
        border: '#E5E0D8',     // Bordures
        error: '#895656',      // Erreur
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
