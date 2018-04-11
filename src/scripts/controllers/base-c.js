// Dependencies
// Env, Util, etc
let env = require("../env.js");

class BaseC {

  /*
  ------------------------------------------
  | constructor:void
  |
  | init:object - init params
  |
  | Construct.
  ------------------------------------------ */
  constructor(init) {
    // class vars
    this.env = env;
    this.model = init.model;
  }
}

module.exports = BaseC;
