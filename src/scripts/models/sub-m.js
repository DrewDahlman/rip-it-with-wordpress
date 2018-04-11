let BaseM = require("./base-m");

class SubM extends BaseM {
  constructor() {
    super();
    setTimeout(() => this.env.eventful.trigger("update-from-sub-m"), 3000);
  }
}

module.exports = SubM;
