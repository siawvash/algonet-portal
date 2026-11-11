/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        portal: {
          bg: '#282a42',
          surface: '#30334e',
          nested: '#34364d',
          hover: '#383b59',
          border: '#3d3f59',
          'border-strong': '#42455f',
          primary: '#666cff',
          'primary-hover': '#5b60e6',
          text: '#eaeafb',
          muted: '#8386a1',
          tertiary: '#585b74',
          clock: '#323460',
          badge: '#243947',
          success: '#28c76f',
          'success-glow': '#5ee9b5',
          warning: '#ff9f43',
          error: '#ea5455',
          info: '#00cfe8'
        },
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
        },
        surface: {
          card: 'var(--surface-card)',
          nested: 'var(--surface-nested)',
        },
        semantic: {
          success: 'var(--semantic-success)',
          warning: 'var(--semantic-warning)',
          error: 'var(--semantic-error)',
          info: 'var(--semantic-info)',
        }
      },
      borderRadius: {
        'sm': 'var(--r-sm)',
        'md': 'var(--r-md)',
        'lg': 'var(--r-lg)',
        'chrome': 'var(--r-chrome)',
        'pill': 'var(--r-pill)',
      },
      fontFamily: {
        sans: ['DiodrumArabic', 'Vazirmatn', 'system-ui', 'sans-serif'],
        diodrum: ['DiodrumArabic', 'Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 20px var(--brand-glow)',
        'chrome': '0 12px 40px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
