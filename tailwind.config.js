/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffd1dc',
          300: '#ffb6c1',
          400: '#ffa6b8',
          500: '#ff69b4',
          600: '#ff1493',
          700: '#e91e63',
          800: '#c71585',
          900: '#ad1457',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, -15px) scale(1.1)' },
          '50%': { transform: 'translate(-5px, 10px) scale(0.95)' },
          '75%': { transform: 'translate(15px, 5px) scale(1.05)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
