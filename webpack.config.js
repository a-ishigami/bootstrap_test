// [定数] webpack の出力オプションを指定します

//
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 'production' か 'development' を指定
// モード値を production に設定すると最適化された状態で、
// development に設定するとソースマップ有効でJSファイルが出力される
const MODE = 'development';

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = (MODE === 'development');

module.exports = {
  mode: MODE,

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: 'dist',
    open: true
  },

  module: {
    rules: [
      {
        // 対象となるファイルの拡張子(scss)
        test: /\.scss$/,

        // Sassファイルの読み込みとコンパイル
        use: ExtractTextPlugin.extract([
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込まない
              url: false,
              // ソースマップの利用有無
              sourceMap: true,
              // 空白文字を取り除く
              minimize: true,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2
            },
          },

          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              // ベンダープレフィックスを自動付与する
              plugins: () => [require('autoprefixer')]
            },
          },

          // Sassをバンドルするための機能
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: true,
            }
          }
        ]),
      },
    ],
  },

  // cssファイルを用意してstyleタグで読ませるためのプラグイン
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],

  // source-map方式でないと、CSSの元ソースが追跡できないため
  devtool: "source-map"
};
