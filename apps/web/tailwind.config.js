/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cyberpunk: {
                    bg: "#0a0a0f",
                    surface: "#151520",
                    primary: "#00f5ff",
                    secondary: "#ff00aa",
                    accent: "#9d00ff",
                    text: "#ffffff",
                },
                rust: {
                    bg: "#1a0f0a",
                    surface: "#261914",
                    primary: "#ff5500",
                    secondary: "#a83232",
                    accent: "#e6b422",
                    text: "#f0e6d2",
                },
                cs2: {
                    bg: "#0c0f12",
                    surface: "#1a1d21",
                    primary: "#4b9ae8",
                    secondary: "#f0b232",
                    accent: "#32a852",
                    text: "#e6e6e6",
                },
            },
            animation: {
                "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "fade-in": "fade-in 0.5s ease-in-out",
                "slide-in": "slide-in 0.3s ease-out",
            },
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "slide-in": {
                    from: { transform: "translateX(-10px)", opacity: "0" },
                    to: { transform: "translateX(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};