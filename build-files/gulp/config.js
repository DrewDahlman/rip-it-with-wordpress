var path = require("path");

// Set your theme name here
const THEME = "rip-it";
const PATH = "/app";

// Export config
module.exports = {
  "port": "4000", // Port to run on
  "root": path.resolve(`${PATH}/wp-content/themes/${THEME}`), // Where to serve from
  "dev": `${PATH}/wp-content/themes/${THEME}`, // Directory for dev assets to compile to
  "prod": `${PATH}/wp-content/themes/${THEME}-tmp`, // Directory for tmp build assets to compile to
  "sources": [], // Empty holder
  "assetPath": "/src/src", // Source
  "watchPath": "/src/src", // Watch

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
