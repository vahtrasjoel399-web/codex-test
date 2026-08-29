import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F3ECDD',
        ink: '#171714',
        signal: '#D43C27',
        oven: '#B5782C',
        steel: '#6D716B'
      },
      fontFamily: {
        display: ['Unbounded Variable', 'Arial Black', 'sans-serif'],
        body: ['IBM Plex Sans', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
