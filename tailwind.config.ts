import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "calc": "calc(350px * 9)"
      },
      height: {
        "calc": "calc(350px * 9)"
      },
      variants: {
        animation: ["motion-safe"]
      },
      animation: {
        fadeIn: "fadeInUp 1s ease-in forwards",
        scale: "scale 2s",
        carousel: "carousel 40s linear infinite",
        rotate: "rotate 4s linear infinite",
      },
    }
  },
  plugins: [],
} satisfies Config;
