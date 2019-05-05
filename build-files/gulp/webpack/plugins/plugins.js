/*
       _             _
 _ __ | |_   _  __ _(_)_ __  ___
| '_ \| | | | |/ _` | | '_ \/ __|
| |_) | | |_| | (_| | | | | \__ \
| .__/|_|\__,_|\__, |_|_| |_|___/
|_|            |___/

Plugins for webpack both prod and dev.

Make sure you setup any configurations you may need here. Adding a dependency here will make that dep available globally without needing to import it in your files.

*/

let webpack = require("webpack");

let ModernizrWebpackPlugin = require("modernizr-webpack-plugin"),
    modernizr_config = require("../../../node_modules/modernizr/lib/config-all.json");

/*
------------------------------------------
| plugins:void (-)
|
| devPlugins:array
| prodPlugins:array
------------------------------------------ */
module.exports = {
  devPlugins: () => {
    let plugins = [
      new webpack.ProvidePlugin({
        Mustache: "mustache"
      }),
      new webpack.ProvidePlugin({
        picturefill: "picturefill"
      }),
      new webpack.ProvidePlugin({
        _: "lodash"
      }),
      new ModernizrWebpackPlugin(modernizr_config),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "commons",
        filename: "commons.js",
        minChunks: 0,
      })
    ];
    return plugins;
  },
  prodPlugins: () => {
    let plugins = [
      new webpack.ProvidePlugin({
        Mustache: "mustache"
      }),
      new webpack.ProvidePlugin({
        _: "lodash"
      }),
      new ModernizrWebpackPlugin(modernizr_config),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "commons",
        filename: "commons.js",
        minChunks: 0,
      })
    ];
    return plugins;
  }
};
