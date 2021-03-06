const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const cwd = process.cwd();

module.exports = {
  target: 'electron-renderer',
  entry: {
    app: [
      'video.js/dist/video-js.min.css',
      './src/rander/index.js'
    ]
  },
  output: {
    path: path.resolve(cwd, './dist'),
    publicPath: '/dist/',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					"less-loader"
				]
			},
			{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            
          }
        }
      },
      {
        test:/\.xml$/,
        loader: 'raw-loader'
      },
      {
        test:/\.yaml$/,
        loader: 'json-loader!yaml-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      '@fontawesome$': path.resolve(__dirname, '../node_modules/@fontawesome'),
      'video.js$': path.resolve(__dirname, '../node_modules/video.js')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
	plugins: [
		new VueLoaderPlugin()
	]
}