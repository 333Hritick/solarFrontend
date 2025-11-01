/**@type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-images': {
          '0%': { transform: 'translateX(0%)' },
          '33.333%': { transform: 'translateX(-100%)' },
          '66.666%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'slide-images': 'slide-images 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
