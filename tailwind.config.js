
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { gold: '#D4AF37', ink: '#0a0a0b' },
      backgroundImage: {
        'glyph': 'radial-gradient(50% 50% at 50% 50%, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0) 70%)'
      }
    }
  },
  plugins: []
}
