import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enable dark mode support
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-red": "#6d2323", // Custom dark red color
        "bright-red": "#a31d1d", // Custom bright red color
        "soft-beige": "#e5d0ac", // Custom soft beige color
        "light-cream": "#fef9e1", // Custom light cream color
        border: "hsl(var(--border))", // Border color variable
        input: "hsl(var(--input))", // Input color variable
        ring: "hsl(var(--ring))", // Ring color variable
        background: "hsl(var(--background))", // Background color variable
        foreground: "hsl(var(--foreground))", // Foreground color variable
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "12px", // Large rounded corners
        md: "8px", // Medium rounded corners
        sm: "4px", // Small rounded corners
      },
      boxShadow: {
        soft: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for cards
        medium: "0 4px 6px rgba(0, 0, 0, 0.15)", // Medium shadow
      },
      transitionProperty: {
        height: "height", // Enable height transitions
        spacing: "margin, padding", // Enable spacing transitions
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // For animations
  ],
};

export default config;