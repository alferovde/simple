const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || "development";

const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;
module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },

  entry: path.resolve(__dirname, "./src/index.js"),

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/template.html"),
      filename: "index.html",
      clean: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/cart.html"),
      filename: "cart.html",
      clean: true,
    }),

    new MiniCssExtractPlugin({
      filename: "style.[hash].css",
    }),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          devtool ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.woff2?|ttf$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name][ext]",
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "script.[hash].js",
    assetModuleFilename: "assets/[name][ext]",
  },
};
