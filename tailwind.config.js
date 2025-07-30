import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Wedibox Color Palette
      colors: {
        // Wedding Ivory & Rose Gold Palette
        'wedibox-ivory': '#FFF9F2',
        'wedibox-rose': '#E8B4BC',
        'wedibox-rose-light': '#F2D7DC',
        'wedibox-rose-dark': '#D69BA4',
        
        // Extended Rose Palette
        rose: {
          50: '#FFF7F8',
          100: '#FFEEF0',
          200: '#FFDDE2',
          300: '#FFB3C1',
          400: '#E8B4BC',  // Main Wedibox Rose
          500: '#D69BA4',
          600: '#C2858F',
          700: '#A86B78',
          800: '#8B5A66',
          900: '#6D4850',
        },
        
        // UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // Wedibox Typography
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'lato': ['var(--font-lato)', 'Lato', 'sans-serif'],
        sans: ['var(--font-lato)', 'Lato', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      
      // Animations & Transitions
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      
      // Wedibox-specific utilities
      backgroundImage: {
        'wedding-gradient': 'linear-gradient(135deg, #FFF9F2 0%, #FFFFFF 50%, #FFF9F2 100%)',
        'rose-gradient': 'linear-gradient(135deg, #E8B4BC 0%, #D69BA4 100%)',
        'celebration-pattern': "url('/pattern.svg')",
      },
      
      // Shadows
      boxShadow: {
        'wedibox': '0 4px 6px -1px rgba(232, 180, 188, 0.1), 0 2px 4px -1px rgba(232, 180, 188, 0.06)',
        'wedibox-lg': '0 10px 15px -3px rgba(232, 180, 188, 0.1), 0 4px 6px -2px rgba(232, 180, 188, 0.05)',
        'wedibox-xl': '0 20px 25px -5px rgba(232, 180, 188, 0.1), 0 10px 10px -5px rgba(232, 180, 188, 0.04)',
      },
      
      // Spacing for celebrations
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;