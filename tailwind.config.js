module.exports = {
  content: ["./src/**/*.{html,js}", "*.{html,js}"],
  theme: {
    extend: {
      colors: {
        energetic: {
          neonGreen: '#39FF14',
          hotPink: '#FF69B4',
          electricBlue: '#7DF9FF',
          brightYellow: '#FFFF00',
        },
      },
      animation: {
        'energetic-fast': 'fast-spin 1s linear infinite',
      },
      keyframes: {
        'fast-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

