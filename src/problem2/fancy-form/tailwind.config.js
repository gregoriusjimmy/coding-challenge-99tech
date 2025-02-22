/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
theme: {
    extend: {
      borderRadius:{
        '2lg':'0.625rem'
      },
      spacing:{
        '1.75':'0.4375rem',
        '4.25':'1.0625rem',
        '4.5':'1.125rem',
        '5.5':'1.375rem',
        '6.5':'1.625rem',
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'], 
      },
     colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'rgba(var(--primary-400))',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        hover: 'var(--hover)',
        hover2: 'rgba(var(--hover2))',
        grey7: {
          50: 'var(--grey7-50)',
          100: 'var(--grey7-100)',
          200: 'var(--grey7-200)',
          300: 'var(--grey7-300)',
          400: 'var(--grey7-400)',
          500: 'var(--grey7-500)',
          600: 'var(--grey7-600)',
          700: 'var(--grey7-700)',
          800: 'var(--grey7-800)',
          900: 'var(--grey7-900)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
