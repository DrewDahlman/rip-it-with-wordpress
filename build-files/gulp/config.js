var path = require("path");

// Set your theme name here
const THEME = "rip-it";

// Export config
module.exports = {
  "port": "4000", // Port to run on
  "root": path.resolve(`/app/wp-content/themes/${THEME}`), // Where to serve from
  "dev": process.env.NODE_ENV == "production" ? `/app/wp-content/themes/${THEME}` : `/app/wp-content/themes/${THEME}`, // Directory for dev assets to compile to
  "prod": process.env.NODE_ENV == "production" ? `/app/wp-content/themes/${THEME}-tmp` : `/app/wp-content/themes/${THEME}-tmp`, // Directory for tmp build assets to compile to
  "sources": [], // Empty holder
  "assetPath": process.env.NODE_ENV == "production" ? "/src/src" : "/src/src", // Source
  "watchPath": process.env.NODE_ENV == "production" ? "/src/src" : "/src/src", // Watch

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
