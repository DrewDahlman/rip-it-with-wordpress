var path = require("path");

module.exports = {
  "port": "4000", // Port to run on
  "root": path.resolve("./public"), // Where to serve from
  "dev": process.env.NODE_ENV == "production" ? "wordpress/wp-content/themes/ripit" : "/app/wp-content/themes/ripit", // Directory for dev assets to compile to
  "prod": process.env.NODE_ENV == "production" ? "wordpress/wp-content/themes/tmp" : "/app/wp-content/themes/tmp", // Directory for tmp build assets to compile to
  "sources": [], // Empty holder
  "assetPath": process.env.NODE_ENV == "production" ? "./src" : "/src/src", // Source
  "watchPath": process.env.NODE_ENV == "production" ? "./src" : "/src/src", // Watch

  // Build specific settings
  "build": {
    "browserlist": ["> 0.5%", "last 2 versions", "Firefox ESR", "Opera 12.1"]
  },

  // AWS settings
  "aws": {
    "identity": "",
    "bucket": "",
    "region": ""
  },

  // Meta for frontend static templates
  "meta": {}
};
