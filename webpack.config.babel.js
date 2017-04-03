import path from 'path';

export default ({ minify = false } = {}) => ({
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `react-web-tabs${minify ? '.min' : ''}.js`,
    libraryTarget: 'umd',
    library: 'react-web-tabs',
  },

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
});
