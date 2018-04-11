/*
              _                      _          _
__      _____| |__  _ __   __ _  ___| | __   __| | _____   __
\ \ /\ / / _ \ '_ \| '_ \ / _` |/ __| |/ /  / _` |/ _ \ \ / /
 \ V  V /  __/ |_) | |_) | (_| | (__|   <  | (_| |  __/\ V /
  \_/\_/ \___|_.__/| .__/ \__,_|\___|_|\_\  \__,_|\___| \_/
                   |_|

Webpack Dev configuration.
*/

let path    = require("path"),
    webpack = require("webpack");

let PLUGINS = require("./plugins/plugins");

module.exports = {
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        query: {
          configFile: "./.eslintrc.js",
          fix: true
        }
      },
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "mustache-loader"
      }
    ]
  },
  resolve: {
    alias: {
      templates: path.resolve(__dirname, "../../src/templates")
    }
  },
  plugins: PLUGINS.devPlugins()
};
