/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react")

module.exports = {
  content: [
    //"./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/forms'),
    require("flowbite/plugin"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#0284c7",
              foreground: "#ffffff",
            },
            focus: "#0284c7",
          },
        },
        dark: {},
      },
      addCommonColors: true,
    }),
  ],
}
