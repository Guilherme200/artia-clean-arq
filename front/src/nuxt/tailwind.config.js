/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"]
        },
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"]
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

