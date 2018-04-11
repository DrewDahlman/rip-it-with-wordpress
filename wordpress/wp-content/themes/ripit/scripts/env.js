webpackJsonp([2],[
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

/***/ })
],[0]);