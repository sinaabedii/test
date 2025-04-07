/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'vazir': ['Vazirmatn', 'sans-serif'],
          'iransans': ['IRANSans', 'sans-serif'],
        },
        colors: {
          primary: {
            50: '#e6f1fe',
            100: '#cce3fd',
            200: '#99c7fb',
            300: '#66abf9',
            400: '#338ff7',
            500: '#0073f5', // رنگ اصلی آبی
            600: '#005cbf',
            700: '#00448f',
            800: '#002e60',
            900: '#001730',
          },
          secondary: {
            50: '#fef3e6',
            100: '#fde7cc',
            200: '#fbcf99',
            300: '#f9b766',
            400: '#f7a033',
            500: '#f58800', // رنگ ثانویه نارنجی
            600: '#c46a00',
            700: '#934f00',
            800: '#623500',
            900: '#311a00',
          },
          neutral: {
            50: '#f0f4f8',
            100: '#d9e2ec',
            200: '#bcccdc',
            300: '#9fb3c8',
            400: '#829ab1',
            500: '#627d98',
            600: '#486581',
            700: '#334e68',
            800: '#243b53',
            900: '#102a43',
          }
        },
        spacing: {
          '18': '4.5rem',
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'header': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-in-out',
          'slide-down': 'slideDown 0.5s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
        gridTemplateColumns: {
          'product-card': 'repeat(auto-fill, minmax(280px, 1fr))',
          'product-card-sm': 'repeat(auto-fill, minmax(220px, 1fr))',
        }
      },
    },
    plugins: [],
  }