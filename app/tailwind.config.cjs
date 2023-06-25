/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-banner": "url('/assets/img/coffee-beans-banner.jpg')",
        "happy-farmer": "url('/assets/img/happy-farmer.jpg')",
      },
      colors: {
        midnight: "#090706",
        cloud: "#FDFBFC",
        brew: "#7f3f23",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
