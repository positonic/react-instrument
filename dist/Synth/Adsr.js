"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LittleFatty = _interopRequireDefault(require("../controls/LittleFatty"));

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

//import Envelope from 'envelope-generator';
var Adsr =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Adsr, _React$Component);

  function Adsr(props) {
    var _this;

    _classCallCheck(this, Adsr);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Adsr).call(this, props));
    _this.setAdsrValue = _this.setAdsrValue.bind(_assertThisInitialized(_this));
    _this.state = {
      envelope: _this.props.defaultValue
    };
    return _this;
  }

  _createClass(Adsr, [{
    key: "getButtonText",
    value: function getButtonText() {
      return this.state.isPlaying ? _react.default.createElement("i", {
        className: "fa fa-stop-circle fa-6",
        "aria-hidden": "true"
      }) : _react.default.createElement("i", {
        className: "fa fa-play-circle fa-6",
        "aria-hidden": "true"
      }); //return (this.state.isPlaying ?  this.playingText: this.stoppedText);
    }
  }, {
    key: "setAdsrValue",
    value: function setAdsrValue(envelopeId, property, value) {
      this.props.setValue(this.props.envelopeId, property, value);
    }
  }, {
    key: "render",
    value: function render() {
      var values = this.props.values;
      return _react.default.createElement("div", {
        className: "filterPanel module"
      }, _react.default.createElement("span", null, this.props.controls), _react.default.createElement(_LittleFatty.default, {
        width: 45,
        height: 45,
        fatId: 0,
        name: 'attack',
        setValue: this.setAdsrValue,
        value: values.attack,
        defaultValue: 0,
        unit: 1,
        max: 100,
        min: 0,
        fatProperty: 'attack'
      }), _react.default.createElement("br", null), _react.default.createElement(_LittleFatty.default, {
        width: 45,
        height: 45,
        fatId: 0,
        name: 'decay',
        setValue: this.setAdsrValue,
        value: values.decay,
        defaultValue: 0,
        unit: 1,
        max: 100,
        min: 0,
        fatProperty: 'decay'
      }), _react.default.createElement("br", null), _react.default.createElement(_LittleFatty.default, {
        width: 45,
        height: 45,
        fatId: 0,
        name: 'sustain',
        setValue: this.setAdsrValue,
        value: values.sustain,
        defaultValue: 0,
        unit: 1,
        max: 100,
        min: 0,
        fatProperty: 'sustain'
      }), _react.default.createElement("br", null), _react.default.createElement(_LittleFatty.default, {
        width: 45,
        height: 45,
        fatId: 0,
        name: 'release',
        setValue: this.setAdsrValue,
        value: values.release,
        defaultValue: 0,
        unit: 1,
        max: 100,
        min: 0,
        fatProperty: 'release'
      }));
    }
  }]);

  return Adsr;
}(_react.default.Component);

exports.default = Adsr;