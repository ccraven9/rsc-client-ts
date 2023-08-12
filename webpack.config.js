const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin({
			includeAliases: ['util', 'buffer']
		})
	],
  resolve: {
    fallback: {
        "crypto": require.resolve('crypto-browserify'),
        "stream": require.resolve("stream-browserify"),
        "fs": require.resolve("brfs"),
        "os": require.resolve("os-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
};