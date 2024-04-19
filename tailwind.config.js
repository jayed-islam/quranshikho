const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        uthmani: ["var(--font-uthmani)"],
        satoshi: ["var(--font-satoshi)"],
      },
    },
  },

  plugins: [],
});
