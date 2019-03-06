"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpriteOffset = getSpriteOffset;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n width: ", ";\n height: ", ";\n\tdisplay: inline-block;\n\tcursor: pointer;\n\tmargin: 0;\n\tpadding: 0;\n\tbackground: url(\"/images/LittlePhatty.png\");\n\tbackground-size: 100% 10100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Knob = _styledComponents.default.span(_templateObject(), function (props) {
  return props.width + 'px' || '64px';
}, function (props) {
  return props.height + 'px' || '64px';
}); //var knobImage = require('./images/LittlePhatty.png');


function getSpriteOffset(value, max, height) {
  return -1 * Math.round(value / max * 100) * height;
}

var LittleFatty =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LittleFatty, _React$Component);

  function LittleFatty(props) {
    var _this;

    _classCallCheck(this, LittleFatty);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LittleFatty).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    var width = props.width ? props.width : 64;
    var height = props.height ? props.height : 64;
    _this.state = {
      enable: true,
      hover: false,
      sensitivity: 1,
      src: null,
      bgsrc: null,

      /*value: this.props.value,*/
      unit: _this.props.unit,
      fatProperty: _this.props.fatProperty,
      defvalue: 0,
      min: _this.props.min,
      max: _this.props.max,
      step: 1,
      log: 0,
      units: null,
      width: width,
      height: height,
      diameter: null,
      sprites: 0,
      aluetip: 1,
      tootip: null,
      colors: 'setupImage',
      vtflag: 0,
      ctlStep: 1
    };
    _this.mouseOver = _this.mouseOver.bind(_assertThisInitialized(_this));
    _this.pointerOut = _this.pointerOut.bind(_assertThisInitialized(_this));
    _this.pointermove = _this.pointermove.bind(_assertThisInitialized(_this));
    _this.pointerDown = _this.pointerDown.bind(_assertThisInitialized(_this));
    _this.cancel = _this.cancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LittleFatty, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "enable",
    value: function enable() {
      if (!this.state.enabled) return;
      this.setState({
        hover: 1
      });
    }
  }, {
    key: "mouseOver",
    value: function mouseOver() {
      if (!this.state.enable) return;
      this.setState({
        hover: 1
      });
    }
  }, {
    key: "mouseOut",
    value: function mouseOut() {
      if (!this.state.enable) return;
      this.setState({
        hover: 0
      });
      this.setState({
        values: []
      });
      this.sendevent();
      this.redraw();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._isMounted) {
        this.setState({
          press: 0,
          vtflag: 0
        }); //this.showtip();

        this.setState({
          startPosX: null,
          startPosY: null
        });
      }

      window.removeEventListener('mousemove', this.boundPointermove, true);
      window.removeEventListener('touchmove', this.boundPointermove, true);
      window.removeEventListener('mouseup', this.boundCancel, true);
      window.removeEventListener('touchend', this.boundCancel, true);
      window.removeEventListener('touchcancel', this.boundCancel, true);
      document.body.removeEventListener('touchstart', this.preventScroll, false); //This is set as we drage this.props.setValue(this.props.fatId, this.state.fatProperty, this.props.value);
    }
  }, {
    key: "pointerDown",
    value: function pointerDown(e) {
      if (!this.state.enable) return;
      this.boundPointermove = this.pointermove.bind(null);
      this.boundCancel = this.cancel.bind(null);
      /* this.boundPointermove = this.pointermove.bind(this);
       this.boundCancel = this.cancel.bind(this);*/

      /*if (e.ctrlKey || e.metaKey) {
          this.setValue(parseFloat(this.defvalue));
      }
      else {*/

      this.setState({
        startPosX: e.pageX
      });
      this.setState({
        startPosY: e.pageY
      });
      this.setState({
        startVal: this.props.value
      });
      window.addEventListener('mousemove', this.boundPointermove, true);
      window.addEventListener('touchmove', this.pointermove, true); //}

      window.addEventListener('mouseup', this.boundCancel, true);
      window.addEventListener('touchend', this.boundCancel, true);
      window.addEventListener('touchcancel', this.boundCancel, true); //document.body.addEventListener('touchstart', this.preventScroll);

      this.setState({
        press: 1,
        vtflag: 1
      }); //this.ttflag = 0;
      // this.showtip();

      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, {
    key: "applyUnit",
    value: function applyUnit(value, unit) {
      //return value;
      //return value * unit;
      return unit * Math.round(value / unit);
    }
  }, {
    key: "pointermove",
    value: function pointermove(event) {
      /*if(event.touches)
        e = event.touches[0];*/

      /*if(this.state.lastShift !== event.shiftKey) {
          this.state.lastShift = event.shiftKey;
          this.state.startPosX = event.pageX;
          this.state.startPosY = event.pageY;
          this.state.startVal = this.statevent.value;
      }*/
      var offset = (this.state.startPosY - event.pageY - this.state.startPosX + event.pageX) * this.state.sensitivity;
      var value = this.state.min + ((this.state.startVal + (this.state.max - this.state.min) * offset / ((event.shiftKey ? 4 : 1) * 128) - this.state.min) / this.state.ctlStep | 0) * this.state.ctlStep;
      var roundedValue = this.applyUnit(value, this.state.unit);
      var outputValue = roundedValue < this.state.min ? this.state.min : roundedValue > this.state.max ? this.state.max : roundedValue;
      this.props.setValue(this.props.fatId, this.state.fatProperty, outputValue);
      /* console.log("this.state.min - " + this.state.min);
       console.log("this.state.startVal - " + this.state.startVal);
       console.log("this.state.max - " + this.state.max);
       console.log("offset - " + offset);
       console.log("event.shiftKey - " + event.shiftKey);
       console.log("this.state.ctlStep - " + this.state.ctlStep);
      */

      /*console.log("OUTPUT VALUE -> " + outputValue);*/

      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    /*pointerUp: function(e) {
        var e = event.nativeEvent;
        debugger
        if(this.state.enable) {
            this.state.press = 0;
            this.state.values=[];
            /!*this.sendevent();
            this.redraw();*!/
        }
        e.preventDefault();
    },
    */

  }, {
    key: "pointerOut",
    value: function pointerOut() {
      var updatedState = {};
      updatedState.ttflag = 0;
      if (this.state.press === 0) updatedState.vtflag = 0;
      this.setState(updatedState);
    }
  }, {
    key: "click",
    value: function click(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, {
    key: "sendevent",
    value: function sendevent() {
      var notes = [];

      for (var i = 0, j = this.state.valuesold.length; i < j; ++i) {
        if (this.state.values.indexOf(this.state.valuesold[i]) < 0) notes.push([0, this.state.valuesold[i]]);
      }

      for (i = 0, j = this.state.values.length; i < j; ++i) {
        if (this.state.valuesold.indexOf(this.state.values[i]) < 0) notes.push([1, this.state.values[i]]);
      }

      if (notes.length) {
        this.setState({
          valuesold: this.values
        });

        for (i = 0; i < notes.length; ++i) {
          this.state.setdispvalues(notes[i][0], notes[i][1]);
          var ev = document.createEvent('HTMLEvents');
          ev.initEvent('change', true, true);
          ev.note = notes[i];
          this.state.dispatchEvent(ev);
        }
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var range = this.max - this.min;
      var style = this.$['wac-knob'].style;

      if (this.sprites) {
        var offset = (this.sprites * (this.value - this.min) / range | 0) * this.height;
        style.backgroundPosition = '0px -' + offset + 'px';
        style.transform = 'rotate(0deg)';
      } else {
        var deg = 270 * ((this.value - this.min) / range - 0.5);
        style.transform = 'rotate(' + deg + 'deg)';
      }
    }
  }, {
    key: "showtip",
    value: function showtip() {
      var vs = this.$['wac-valuetip'].style;
      var ts = this.$['wac-tooltip-box'].style;

      if (this.valuetip && this.vtflag) {
        if (this.vtim) {
          clearTimeout(this.vtim);
          this.vtim = null;
        }

        vs.display = 'inline-block';
        setTimeout(function () {
          this.opacity = 0.9;
        }.bind(vs), 50);
      } else if (vs.opacity) {
        vs.opacity = 0;
        this.vtim = setTimeout(function () {
          if (this.vtflag === 0) this.$['wac-valuetip'].style.display = 'none';
        }.bind(this), 500);
      }

      if (this.tooltip && this.ttflag) {
        ts.display = 'block';
        setTimeout(function () {
          this.opacity = 0.8;
        }.bind(ts), 100);
      } else if (ts.opacity) {
        ts.opacity = 0;
        setTimeout(function () {
          this.display = 'none';
        }.bind(ts), 500);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "littleFatty",
        onMouseOver: this.mouseOver,
        onMouseDown: this.pointerDown,
        onMouseOut: this.pointerOut,
        onClick: this.click
      }, _react.default.createElement(Knob, {
        width: this.state.width,
        height: this.state.height,
        style: {
          backgroundPosition: '0px ' + getSpriteOffset(this.props.value, this.state.max, this.state.height) + 'px'
        }
      }), _react.default.createElement("div", null, this.props.name));
    }
  }]);

  return LittleFatty;
}(_react.default.Component);

var _default = LittleFatty;
exports.default = _default;