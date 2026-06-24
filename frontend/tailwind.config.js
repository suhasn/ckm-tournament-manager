module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Chess Klub branding colors
        ck: {
          50: '#fef9f3',
          100: '#fef3e6',
          200: '#fce7cd',
          300: '#fad5a1',
          400: '#f89c56',
          500: '#f56d2f', // Primary Orange
          600: '#e85b1f',
          700: '#cc4913',
          800: '#a83c11',
          900: '#813110',
        },
        // Enhanced blacks and whites
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      backgroundColor: {
        primary: '#1e293b', // Deep Black
        secondary: '#f56d2f', // Orange
        accent: '#ffffff', // White
      },
      textColor: {
        primary: '#1e293b', // Deep Black
        secondary: '#f56d2f', // Orange
        accent: '#ffffff', // White
      },
      borderColor: {
        primary: '#f56d2f', // Orange
        secondary: '#1e293b', // Black
      },
    },
  },
  plugins: [],
}
