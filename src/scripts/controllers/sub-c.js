let BaseC = require("./base-c");

class SubC extends BaseC {
  constructor(init) {
    super(init);
    setTimeout(() => this.env.eventful.trigger("update-from-sub-c"), 4000);
  }
}

module.exports = SubC;
