/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontSize: {
        '2xs': '0.6rem'
      },
      colors: {
        'c-dark-green': '#024c43',
        'c-green': '#019281',
        'c-light-green': '#009e8b'

      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  important: true,
};
