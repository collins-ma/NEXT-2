/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}', // If you still use the Pages Router in some parts
    './components/**/*.{js,ts,jsx,tsx}', // Include components folder if you have one
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
