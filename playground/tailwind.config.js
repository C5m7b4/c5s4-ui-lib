/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'hover:bg-slate-200',
    'hover:bg-slate-300',
    'hover:bg-blue-200',
    'fill-white',
    'hover:bg-slate-400',
    'hover:bg-red-500',
    'fill-content',
    'fill-bkg',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'rgb(var(--color-accent1) / <alpha-value>)',
          2: 'rgb(var(--color-accent2) / <alpha-value>)',
        },
        bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
        bkg2: 'rgb(var(--color-bkg2) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)',
        hover: 'rgb(var(--color-hover) / <alpha-value>)',
      },
      keyframes: {
        slideInFromRightModal: {
          '0%': { transform: 'translateX(80%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutToRightModal: {
          '0%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(80%)' },
        },
        collapse: {
          '0%': { maxHeight: '500px' },
          '100%': { maxHeight: '0px' },
        },
        expand: {
          '0%': { maxHeight: '0px' },
          '100%': { maxHeight: '500px' },
        },
        expandSubmenu: {
          '0%': {
            maxHeight: '0px',
            opacity: 0,
          },
          '100%': {
            maxHeight: '250px',
            opacity: 1,
          },
        },
        collapseSubmenu: {
          '100%': {
            maxHeight: '250px',
            opacity: 1,
          },
          '0%': {
            maxHeight: '0px',
            opacity: 0,
          },
        },
      },
      animation: {
        slideInFromRightModal: 'slideInFromRightModal 0.5s ease-in-out forwards',
        slideOutToRightModal: 'slideOutToRightModal 0.5s ease-in-out forwards',
        collapse: 'collapse 0.5s ease-in-out forwards',
        expand: 'expand 0.5s ease-in-out forwards',
        expandSubmenu: 'expandSubmenu 0.5s ease-in-out forwards',
        collapseSubmenu: 'collapseSubmenu 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
