/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Material palette — derived from the illuminated manuscript:
        // lapis-ink ground, gold leaf, cinnabar rubrication, aged parchment.
        "ink": "#0B0D16",          // base ground — deep lapis-night
        "ink-2": "#10131F",        // raised panels
        "ink-3": "#161A2A",        // hover / cards
        "lapis": "#1E3163",        // manuscript blue
        "lapis-bright": "#3A5BA8", // glow / focus
        "gold": "#C9A227",         // gold leaf
        "gold-glow": "#EBCB6B",    // illumination highlight
        "cinnabar": "#C8443A",     // red diacritic / rubrication
        "parchment": "#ECE4D2",    // primary text on dark
        "parchment-dim": "#9C927C",// secondary text
        "line": "#2A2E3D",         // hairline borders

        // Kept so any stray legacy class still resolves to the new system
        "primary": "#ECE4D2",
        "secondary": "#C9A227",
        "surface": "#0B0D16",
        "on-surface": "#ECE4D2",
        "on-surface-variant": "#9C927C",
        "gold-leaf": "#C9A227",
        "error": "#C8443A",
      },
      borderRadius: {
        "DEFAULT": "2px",
        "sm": "2px",
        "lg": "4px",
        "xl": "6px",
        "full": "9999px",
      },
      spacing: {
        "margin-mobile": "24px",
        "margin-desktop": "80px",
        "gutter": "28px",
        "unit": "8px",
        "section-gap": "140px",
        "container-max": "1320px",
      },
      maxWidth: {
        "container-max": "1320px",
      },
      fontFamily: {
        "display": ["Fraunces", "serif"],
        "sans": ["Hanken Grotesk", "system-ui", "sans-serif"],
        "mono": ["Space Mono", "ui-monospace", "monospace"],
        "arabic": ["Amiri", "serif"],
        "kufi": ["Reem Kufi", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3rem, 8.5vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em", fontWeight: "300" }],
        "display-sm": ["clamp(2.25rem, 5.5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.015em", fontWeight: "300" }],
        "title": ["clamp(1.6rem, 3vw, 2.6rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "400" }],
        "eyebrow": ["0.72rem", { lineHeight: "1.4", letterSpacing: "0.32em", fontWeight: "400" }],
      },
      letterSpacing: {
        "widest-x": "0.42em",
      },
      transitionTimingFunction: {
        "ink": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
