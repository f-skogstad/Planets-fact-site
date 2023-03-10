/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    backgroundImage: {
      'background-stars': "url('/background-stars.svg')",
    },
    colors: {
      white: '#fff',
      grey: '#838391',
    },
    borderColor: {
      grey: '#838391',
    },
    backgroundColor: {
      'dark-blue': '#070724',
      'dark-grey': '#38384F',
      grey: '#838391',
      'azure-blue': '#419EBB',
      'light-orange': '#EDA249',
      indigo: '#6F2ED6',
      'brown-red': '#D14C32',
      red: '#D83A34',
      orange: '#CD5120',
      teal: '#1EC2A4',
      blue: '#2D68F0',
    },
    fontSize: {
      body: '0.9rem',
      h4: '0.8rem',
      h3: '0.9rem',
      h2: '2.5rem',
      h1: '5rem',
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
