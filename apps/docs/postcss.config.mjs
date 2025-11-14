/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {
      config: './tailwind.config.js',
    },
    autoprefixer: {},
  },
};

export default config;

