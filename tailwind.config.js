const { default: colors } = require('./theme/default_colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/screens/**/*.{js,ts,jsx,tsx}',
        './src/patterns/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
                secondary: colors.secondary,
                tertiary: colors.tertiary,
                warning: colors.warning,
                danger: colors.danger,
                neutral: colors.neutral,
                'neutral-variant': colors['neutral-variant'],
            },
        },
    },
    plugins: [],
};
