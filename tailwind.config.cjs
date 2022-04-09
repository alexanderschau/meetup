module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        text: { DEFAULT: "#281F15" },
        background: { DEFAULT: "#F6F5F4" },
        primary: { DEFAULT: "#AA8362" },
      },
      flex: {
        2: 2,
      },
      fontFamily: {
        PlayfairDisplay: ["PlayfairDisplay", "serif"],
        PTSans: ["PTSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
