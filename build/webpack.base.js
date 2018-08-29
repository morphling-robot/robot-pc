const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const cwd = process.cwd();

module.exports = {
  target: 'electron-renderer',
  entry: {
    app: [
      'videojs-record/dist/css/videojs.record.css',
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
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
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
	devtool: '#eval-source-map',
	plugins: [
		new VueLoaderPlugin()
	]
}