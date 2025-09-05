/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand color system
        brand: {
          primary: '#382859',    // Deep purple - primary brand color
          cream: '#F2E0D0',      // Warm cream - light backgrounds  
          coral: '#D95F43',      // Coral orange - accent/CTAs
          rose: '#BF9D95',       // Muted rose - secondary elements
          red: '#BF3939',        // Deep red - alerts/errors
        },
        // Semantic colors derived from brand palette
        surface: {
          light: '#F2E0D0',      // Light mode backgrounds
          dark: '#382859',       // Dark mode backgrounds
          elevated: {
            light: 'rgba(242, 224, 208, 0.8)',  // Light mode cards
            dark: 'rgba(56, 40, 89, 0.8)',      // Dark mode cards
          }
        },
        accent: {
          primary: '#D95F43',    // Primary actions
          secondary: '#BF9D95',  // Secondary actions
          muted: 'rgba(191, 157, 149, 0.6)',
        },
        text: {
          primary: {
            light: '#382859',    // Dark text on light
            dark: '#F2E0D0',     // Light text on dark
          },
          secondary: {
            light: 'rgba(56, 40, 89, 0.7)',
            dark: 'rgba(242, 224, 208, 0.7)',
          },
          muted: {
            light: 'rgba(56, 40, 89, 0.5)',
            dark: 'rgba(242, 224, 208, 0.5)',
          }
        },
        status: {
          error: '#BF3939',
          success: '#4A7C59',    // Derived green
          warning: '#D95F43',    // Using coral for warnings
        },
        border: {
          light: 'rgba(56, 40, 89, 0.15)',
          dark: 'rgba(242, 224, 208, 0.15)',
          elevated: {
            light: 'rgba(56, 40, 89, 0.2)',
            dark: 'rgba(242, 224, 208, 0.2)',
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}