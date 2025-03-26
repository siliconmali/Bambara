import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: 'var(--primary-default)',
          secondary: 'var(--primary-secondary)',
          tertiary: 'var(--primary-tertiary)',
          contrast: 'var(--primary-contrast)'
        },
        light: {
          default: 'var(--light-default)',
          secondary: 'var(--light-secondary)',
          tertiary: 'var(--light-tertiary)',
          contrast: 'var(--light-contrast)'
        },
        accent: {
          default: 'var(--accent-default)',
          secondary: 'var(--accent-secondary)',
          tertiary: 'var(--accent-tertiary)',
          contrast: 'var(--accent-contrast)'
        },
        surface: {
          default: 'var(--surface-default)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)'
        },
        content: {
          default: 'var(--content-default)',
          secondary: 'var(--content-secondary)',
          tertiary: 'var(--content-tertiary)'
        },
        solid: {
          50: 'var(--solid-50)',
          100: 'var(--solid-100)',
          200: 'var(--solid-200)',
          300: 'var(--solid-300)',
          400: 'var(--solid-400)',
          500: 'var(--solid-500)'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
