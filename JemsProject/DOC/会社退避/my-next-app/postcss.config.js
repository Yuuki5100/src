// module.exports = {
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ],
// };
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ これが必要！
    tailwindcss: {},
    autoprefixer: {},
  },
};
