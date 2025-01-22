/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  safelist: [
    'hover:bg-slate-200',
    'hover:bg-slate-300',
    'hover:bg-blue-200',
    'fill-white',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': {
            opacity: 0,
            display: 'none',
          },
          '100%': {
            opacity: 1,
            display: 'block',
            zIndex: 25,
          },
        },
        dissappear: {
          '0%': {
            opacity: '1',
            display: 'block',
          },
          '100%': {
            opacity: '0',
            display: 'none',
          },
        },
        fadeInModal: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOutModal: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '90%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOutToRight: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '10%': { transform: 'translateX(-10%)' },
          '100%': {
            transform: 'translateX(100%)',
            opacity: 0,
          },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '90%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOutToLeft: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '10%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
        collapse: {
          '0%': { maxHeight: '500px' },
          '100%': { maxHeight: '0px' },
        },
        expand: {
          '0%': { maxHeight: '0px' },
          '100%': { maxHeight: '500px' },
        },
        slideOutRightConfigurator: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(95%)',
          },
        },
        slideInFromRightConfigurator: {
          '0%': {
            transform: 'translateX(95%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        appear: 'appear .3s ease-in-out forwards',
        dissappear: 'dissappear .3s ease-in-out forwards',
        fadeInModal: 'fadeInModal .3s ease-in-out forwards',
        fadeOutModal: 'fadeOutModal .3s ease-in-out forwards',
        slideInFromRight: 'slideInFromRight 0.5s ease-in-out forwards',
        slideOutToRight: 'slideOutToRight 0.5s ease-in-out forwards',
        slideInFromLeft: 'slideInFromLeft 0.5s ease-in-out forwards',
        slideOutToLeft: 'slideOutToLeft 0.5s ease-in-out forwards',
        collapse: 'collapse 0.5s ease-in-out forwards',
        expand: 'expand 0.5s ease-in-out forwards',
        slideOutRightConfigurator:
          'slideOutRightConfigurator 0.5s ease-in-out forwards',
        slideInFromRightConfigurator:
          'slideInFromRightConfigurator 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
