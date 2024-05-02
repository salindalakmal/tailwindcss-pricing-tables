/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./**/*.html'],
    darkMode: ['selector', '[data-theme-mode="dark"]'],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    xl: '2rem',
                },
            },
            fontFamily: {
                'body': '"Inter", sans-serif',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
