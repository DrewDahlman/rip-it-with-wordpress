let BaseC = require("./base-c");

// Sub
let SubM = require("../models/sub-m"),
  SubC = require("./sub-c");

class AppC extends BaseC {
  constructor(init) {
    super(init);

    this._sub_c = new SubC({"model": new SubM()});

    // test
    this.env.eventful.on("update-from-m", () => console.log("got update from m"));
    this.env.eventful.on("update-from-c", () => console.log("got update from here"));
    this.env.eventful.on("update-from-sub-m", () => console.log("got update from sub-m"));
    this.env.eventful.on("update-from-sub-c", () => console.log("got update from sub-c"));

    setTimeout(() => this.env.eventful.trigger("update-from-c"), 2000);
  }
}

module.exports = AppC;
