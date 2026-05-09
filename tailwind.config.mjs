/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: {
          DEFAULT: '#0D9488',
          dark:    '#0F766E',
          light:   '#CCFBF1',
          faint:   '#F0FDFA',
        },
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'heading': ['clamp(1.75rem, 3vw, 2.5rem)',  { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};
