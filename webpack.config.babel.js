import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const minified = process.env.NODE_ENV === 'production' ? '.min' : '';

export default () => ({
  entry: [
    './src/index.js',
    './styles/style.css',
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `react-web-tabs${minified}.js`,
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
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(`react-web-tabs${minified}.css`),
  ],
});
