/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif']
      },
      backgroundColor: {
        'light-black':'#18181b',
        'dark-black':'#121212',
        'darker-black': '#111111'
      },
      spacing: {
        '128':'32rem'
      }
    },
  },
  plugins: [],
}


// spacing: {
//   '1': '8px',    // Equivalent to m-1 or p-1
//   '2': '16px',   // Equivalent to m-2 or p-2
//   '3': '24px',   // Equivalent to m-3 or p-3
//   // Add more custom spacing values as needed
// },
