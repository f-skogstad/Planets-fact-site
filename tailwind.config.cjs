/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    backgroundImage: {
      'background-stars': "url('/background-stars.svg')",
    },
    colors: {
      white: '#fff',
      'dark-blue': '#070724',
      'dark-grey': '#38384F',
      grey: '#838391',
    },
    fontSize: {
      body: '14px',
      h4: '11px',
      h3: '12px',
      h2: '40px',
      h1: '80px',
    },
    lineHeight: {
      body: '25px',
      h4: '25px',
      h3: '25px',
      h2: '52px',
      h1: '103px',
    },
    letterSpacing: {
      h4: '1px',
      h3: '2.6px',
      h2: '-1.5px',
    },
    fontFamily: {
      heading: ['Antonio', 'sans-serif'],
      body: ['League Spartan', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
