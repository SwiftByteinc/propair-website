/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette ProPair - White Mode Clean
        primary: '#09090B',        // Noir Onyx - Titres
        body: '#4B5563',           // Gris Slate - Corps de texte
        muted: '#6B7280',          // Gris moyen
        teal: {
          DEFAULT: '#0D9488',      // Teal Foncé - Accent primaire
          dark: '#0F766E',         // Teal plus foncé
          light: '#14B8A6',        // Teal clair
        },
        amber: {
          DEFAULT: '#F59E0B',      // Ambre - Action/CTA
          dark: '#D97706',         // Ambre foncé
          light: '#FBBF24',        // Ambre clair
        },
        background: '#FFFFFF',     // Fond principal blanc pur
        surface: '#F9FAFB',        // Fond sections alternées
        border: {
          DEFAULT: '#F3F4F6',      // Bordures/Dividendes
          dark: '#E5E7EB',         // Bordures plus visibles
        },
        success: '#10B981',        // Vert Émeraude
        // Alias
        brand: '#0D9488',
        action: '#F59E0B',
      }
    },
  },
  plugins: [],
}
