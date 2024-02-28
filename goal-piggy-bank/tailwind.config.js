/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage:{
        "wave-1":"url(../public/wave1.svg)",
        "mountain":"url(/mountain.jpg)"
      }
    },
  },
  plugins: [],
}

