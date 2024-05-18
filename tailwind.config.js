/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'abel': ['Abel', 'sans-serif'],
        'seven': ['Seven Segment', 'sans-serif'],
        'lateef': ['Lateef', 'sans-serif'],
        'bruno': ['Bruno Ace', 'sans-serif'],
        'qwitcher': ['Qwitcher Grypen', 'sans-serif'],
        'vast': ['Vast Shadow', 'sans-serif'],
        'bonheur': ['Bonheur Royale', 'cursive'],
        'birthstone': ['Birthstone Bounce', 'cursive'],
        'audio': ['Audiowide', 'sans-serif'],
        'monoton': ['Monoton', 'sans-serif'],
        'allura': ['Allura', 'cursive'],
        'madimi': ['Madimi One', 'sans-serif'],
      },
      aspectRatio: {
        '21/9': '4 / 3',
      },

    },
  },
  plugins: [],
}
                                                