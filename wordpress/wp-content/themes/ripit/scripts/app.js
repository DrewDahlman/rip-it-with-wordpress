webpackJsonp([0,2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Eventful = __webpack_require__(1);

module.exports = {
  "eventful": new Eventful()
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eventful = function () {

  /*
  ------------------------------------------
  | constructor:void
  |
  | Construct.
  ------------------------------------------ */
  function Eventful() {
    _classCallCheck(this, Eventful);

    this._events = [];
  }

  /*
  ------------------------------------------
  | validateEventType:null
  |
  | type:string - event name
  |
  | Validate event type.
  ------------------------------------------ */


  _createClass(Eventful, [{
    key: "validateEventType",
    value: function validateEventType(type) {
      if (/^[a-z\-_]+$/g.test(type) === false) {
        throw "Error: type type must be a string (a-z, -, _)!";
      }
    }

    /*
    ------------------------------------------
    | validateEventCallback:null
    |
    | cb:function - callback
    |
    | Validate event callback.
    ------------------------------------------ */

  }, {
    key: "validateEventCallback",
    value: function validateEventCallback(cb) {
      if (typeof cb !== "function") {
        throw "Error: callback must be a function!";
      }
    }

    /*
    ------------------------------------------
    | eventTypeExists:boolean
    |
    | type:string - event name
    |
    | Does this event type exist.
    ------------------------------------------ */

  }, {
    key: "eventTypeExists",
    value: function eventTypeExists(type) {
      return this._events.hasOwnProperty(type);
    }

    /*
    ------------------------------------------
    | on:object
    |
    | type:string - event name
    | cb:function - callback
    |
    | Register an event.
    ------------------------------------------ */

  }, {
    key: "on",
    value: function on(type, cb) {
      // check type / cb
      this.validateEventType(type);
      this.validateEventCallback(cb);

      // add type if it doesn't exist
      if (this.eventTypeExists(type) === false) {
        this._events[type] = [];
      }

      // register event
      this._events[type].unshift(cb);

      // return this for chainging
      return this;
    }

    /*
    ------------------------------------------
    | off:object
    |
    | type:string - event name
    | ...args[0]:function - callback
    |
    | Remove an event.
    ------------------------------------------ */

  }, {
    key: "off",
    value: function off(type) {
      var _this = this;

      var index = void 0;

      // check type
      this.validateEventType(type);

      // are there any events with this type?
      if (this.eventTypeExists(type) === false) {
        return this;
      }

      // if no cb was specfied, remove them all
      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 0) {
        this._events[type] = [];
        return this;
      }

      // check args
      this.validateEventCallback(arguments.length <= 1 ? undefined : arguments[1]);

      // are there any listeners?
      index = this._events[type].indexOf(arguments.length <= 1 ? undefined : arguments[1]);
      if (index !== -1) {
        setTimeout(function () {
          _this._events[type].splice(index, 1);
        }, 0);
      }

      // return this for chainging
      return this;
    }

    /*
    ------------------------------------------
    | trigger:object
    |
    | type:string - event name
    | data:array - data to callback
    |
    | Trigger an event.
    ------------------------------------------ */

  }, {
    key: "trigger",
    value: function trigger(type) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // check type / data
      this.validateEventType(type);

      if ((typeof data === "undefined" ? "undefined" : _typeof(data)) !== "object") {
        throw "Error: data must be an object!";
      }

      // are there any listeners?
      if (this.eventTypeExists(type) === false) {
        return this;
      }

      // pass type to callbacks
      data.ev_type = type;

      // execute callbacks
      this._events[type].forEach(function (cb) {
        cb.call(_this2, data);
      });

      // return this for chainging
      return this;
    }
  }]);

  return Eventful;
}();

module.exports = Eventful;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dependencies
// Env, Util, etc
var env = __webpack_require__(0);

var BaseM =

/*
------------------------------------------
| constructor:void
|
| Construct.
------------------------------------------ */
function BaseM() {
  _classCallCheck(this, BaseM);

  this.env = env;
};

module.exports = BaseM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dependencies
// Env, Util, etc
var env = __webpack_require__(0);

var BaseC =

/*
------------------------------------------
| constructor:void
|
| init:object - init params
|
| Construct.
------------------------------------------ */
function BaseC(init) {
  _classCallCheck(this, BaseC);

  // class vars
  this.env = env;
  this.model = init.model;
};

module.exports = BaseC;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AppM = __webpack_require__(5),
    AppC = __webpack_require__(6);

module.exports = new AppC({ "model": new AppM() });

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseM = __webpack_require__(2);

var AppM = function (_BaseM) {
  _inherits(AppM, _BaseM);

  function AppM() {
    _classCallCheck(this, AppM);

    var _this = _possibleConstructorReturn(this, (AppM.__proto__ || Object.getPrototypeOf(AppM)).call(this));

    setTimeout(function () {
      return _this.env.eventful.trigger("update-from-m");
    }, 1000);
    return _this;
  }

  return AppM;
}(BaseM);

module.exports = AppM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseC = __webpack_require__(3);

// Sub
var SubM = __webpack_require__(7),
    SubC = __webpack_require__(8);

var AppC = function (_BaseC) {
  _inherits(AppC, _BaseC);

  function AppC(init) {
    _classCallCheck(this, AppC);

    var _this = _possibleConstructorReturn(this, (AppC.__proto__ || Object.getPrototypeOf(AppC)).call(this, init));

    _this._sub_c = new SubC({ "model": new SubM() });

    // test
    _this.env.eventful.on("update-from-m", function () {
      return console.log("got update from m");
    });
    _this.env.eventful.on("update-from-c", function () {
      return console.log("got update from here");
    });
    _this.env.eventful.on("update-from-sub-m", function () {
      return console.log("got update from sub-m");
    });
    _this.env.eventful.on("update-from-sub-c", function () {
      return console.log("got update from sub-c");
    });

    setTimeout(function () {
      return _this.env.eventful.trigger("update-from-c");
    }, 2000);
    return _this;
  }

  return AppC;
}(BaseC);

module.exports = AppC;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseM = __webpack_require__(2);

var SubM = function (_BaseM) {
  _inherits(SubM, _BaseM);

  function SubM() {
    _classCallCheck(this, SubM);

    var _this = _possibleConstructorReturn(this, (SubM.__proto__ || Object.getPrototypeOf(SubM)).call(this));

    setTimeout(function () {
      return _this.env.eventful.trigger("update-from-sub-m");
    }, 3000);
    return _this;
  }

  return SubM;
}(BaseM);

module.exports = SubM;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseC = __webpack_require__(3);

var SubC = function (_BaseC) {
  _inherits(SubC, _BaseC);

  function SubC(init) {
    _classCallCheck(this, SubC);

    var _this = _possibleConstructorReturn(this, (SubC.__proto__ || Object.getPrototypeOf(SubC)).call(this, init));

    setTimeout(function () {
      return _this.env.eventful.trigger("update-from-sub-c");
    }, 4000);
    return _this;
  }

  return SubC;
}(BaseC);

module.exports = SubC;

/***/ })
],[4]);