/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // 🎨 Custom Palette
                grape: "#372E39",
                violet: "#583C84",
                olive: "#4D4735",
                espresso: "#281F14",
                blush: "#FFF8F7",
                sand: "#DFBEAE",
                peach: "#D5AE9C",
                rose: "#EDD4C9",
                cocoa: "#4C3836",
            },
            fontFamily: {
                // 🩵 Kodchasan
                "kodchasan-light": [
                    "var(--font-kodchasan-light)",
                    "sans-serif",
                ],
                "kodchasan-regular": [
                    "var(--font-kodchasan-regular)",
                    "sans-serif",
                ],
                "kodchasan-semibold": [
                    "var(--font-kodchasan-semibold)",
                    "sans-serif",
                ],
                "kodchasan-bold": ["var(--font-kodchasan-bold)", "sans-serif"],

                // 🩶 Literata
                "literata-light": ["var(--font-literata-light)", "serif"],
                "literata-regular": ["var(--font-literata-regular)", "serif"],
                "literata-semibold": ["var(--font-literata-semibold)", "serif"],
                "literata-bold": ["var(--font-literata-bold)", "serif"],
                "literata-black": ["var(--font-literata-black)", "serif"],
            },
        },
    },
    plugins: [],
};
