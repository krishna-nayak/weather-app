const plugin = require("tailwindcss/plugin");
module.exports = {
  purge: ["./views/**/*.ejs"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        ".btn-red": {
          padding: "0.5rem 1rem",
          borderRadius: ".5rem",
          fontWeight: "800",
          backgroundColor: "rgb(252, 165, 165)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgb(248, 113, 113)",
          },
        },
      };

      addComponents(buttons);
    }),
  ],
};
