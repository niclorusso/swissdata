import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Swiss-inspired palette
        // SwissData family tokens (src/styles/family-tokens.css)
        paper: "var(--sdf-paper)",
        surface: "var(--sdf-surface)",
        line: "var(--sdf-line)",
        ink: "var(--sdf-ink)",
        subtle: "var(--sdf-subtle)",
        // Greys of the site, warm like the paper. 400 and 500 are the same tone:
        // it is the lightest grey that passes AA for text on paper and on white.
        swiss: {
          red: "#FF0000",
          white: "#FFFFFF",
          gray: {
            50: "#ECEAE3",
            100: "#E9E6DD",
            200: "#DEDBD1",
            300: "#C9C4B8",
            400: "#5F6873",
            500: "#5F6873",
            600: "#4B5058",
            700: "#3A3F46",
            800: "#22262B",
            900: "#14181D",
          },
        },
        // Semantic colors
        primary: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#ECEAE3",
          foreground: "#14181D",
        },
        muted: {
          DEFAULT: "#ECEAE3",
          foreground: "#5F6873",
        },
        accent: {
          DEFAULT: "#FEE2E2",
          foreground: "#991B1B",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        // Category colors for indicators
        // text colours pass AA on their light background and on white
        economic: {
          DEFAULT: "#1D4ED8",
          light: "#DBEAFE",
        },
        demographic: {
          DEFAULT: "#6D28D9",
          light: "#EDE9FE",
        },
        social: {
          DEFAULT: "#047857",
          light: "#D1FAE5",
        },
        // Chart colors
        chart: {
          1: "#DC2626",
          2: "#2563EB",
          3: "#059669",
          4: "#7C3AED",
          5: "#EA580C",
        },
      },
      fontSize: {
        // 14px is the smallest interface text; 13px (--sdf-text-small) is kept for source lines
        xs: ["0.875rem", { lineHeight: "1.3rem" }],
        source: ["0.8125rem", { lineHeight: "1.2rem" }],
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "var(--sdf-radius-card)",
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "count-up": "countUp 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
