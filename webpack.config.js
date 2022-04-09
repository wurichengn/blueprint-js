const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** 当时是否是开发环境 */
const isDev = process.env.NODE_ENV === 'development';

/** 要返回的webpack配置 */
var config = {
  mode: isDev ? 'development' : 'production',
  // 入口文件
  entry: {
    main: './src/main.js',
    samples: './src/samples.js',
    editor: './src/editor.js'
  },
  optimization: {
    minimize: false
  },
  externals: {
    'react': 'react',
    'mobx': 'mobx',
    'mobx-react': 'mobx-react',
    'react-dom': 'react-dom',
    'ahooks': 'ahooks'
  },
  experiments: {
    outputModule: true
  },
  // 输出目录
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module'
    }
  },
  // loader配置
  module: {
    rules: [
      // 全局less
      {
        test: /\.global.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // less
      {
        test: /\.less$/,
        use: ['style-loader', { loader: 'css-loader', options: { modules: true }}, 'less-loader']
      },
      // js载入
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-modules-commonjs',
              '@babel/plugin-transform-runtime',
              'transform-remove-strict-mode',
              ['@babel/plugin-proposal-decorators', { 'legacy': true }]
            ]
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    new BundleAnalyzerPlugin({
      reportFilename: '../report.html',
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: false
    })
  ],
  // 服务设置
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 13816,
    lazy: false,
    inline: false,
    clientLogLevel: 'none',
    open: false, // 是否自动打开默认浏览器
    // 隔离模式头
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
    // 允许远端访问
    host: '0.0.0.0'
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map'
};

// 输出最终的配置
module.exports = config;
