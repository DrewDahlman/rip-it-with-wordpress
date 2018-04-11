let BaseM = require("./base-m");

class AppM extends BaseM {
  constructor() {
    super();
    setTimeout(() => this.env.eventful.trigger("update-from-m"), 1000);
  }
}

module.exports = AppM;
