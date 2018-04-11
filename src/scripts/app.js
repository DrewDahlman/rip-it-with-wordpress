let AppM = require("./models/app-m"),
  AppC = require("./controllers/app-c");

module.exports = new AppC({"model": new AppM()});
