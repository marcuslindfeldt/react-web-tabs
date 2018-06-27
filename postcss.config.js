module.exports = ({ env } = {}) => ({
  plugins: {
    'postcss-import': true,
    cssnano: env === 'production' ? {} : false,
  },
});
