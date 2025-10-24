/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0b12',
        card: '#121222',
        muted: '#9aa0b6',
        text: '#f5f7ff',
        primary: '#824dee',
        'primary-2': '#351b67',
        accent: '#21e1b8',
        ring: 'rgba(130,77,238,.35)',
      },
      borderRadius: {
        'custom': '18px',
      },
      maxWidth: {
        'custom': '1200px',
      },
      boxShadow: {
        'custom': '0 10px 30px rgba(0,0,0,.25)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #824dee, #351b67)',
        'gradient-accent': 'linear-gradient(135deg, #6ef2d6, #21e1b8)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))',
        'gradient-hero': 'radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%)',
        'gradient-header': 'linear-gradient(180deg, rgba(11,11,18,.85), rgba(11,11,18,.65))',
        'gradient-cta': 'linear-gradient(135deg, rgba(130,77,238,.18), rgba(33,225,184,.12))',
        'gradient-glass': 'linear-gradient(180deg, rgba(130,77,238,.08), transparent 40%)',
      }
    },
  },
  plugins: [],
}