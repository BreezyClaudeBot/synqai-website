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
        'display': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.06', letterSpacing: '-0.04em' }],
        'heading': ['clamp(1.75rem, 3vw, 2.5rem)',  { lineHeight: '1.18', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
};
