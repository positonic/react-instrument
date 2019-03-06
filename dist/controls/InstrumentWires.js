"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Toggle = require("./Toggle");

var _Switch = require("./Switch");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _LittleFatty = _interopRequireDefault(require("./LittleFatty"));

var _PlayButton = _interopRequireDefault(require("./PlayButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 100%;\n  padding: 20px;\n  button i {\n    font-size: 50px;\n  }\n\n  button.toggle-btn {\n    margin-right: 5px;\n  }\n  text-align: center;\n  .littleFatty {\n    margin-top: 20px;\n  }\n\n  .switch {\n    display: inline-block;\n  }\n  float: left;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InstrumentWires =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InstrumentWires, _React$Component);

  function InstrumentWires(props) {
    var _this;

    _classCallCheck(this, InstrumentWires);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstrumentWires).call(this, props));
    var gainValue = _this.props.gainValue;
    _this.state = {
      gainValue: gainValue
    };
    return _this;
  }

  _createClass(InstrumentWires, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      if (nextState.gainValue !== this.state.gainValue) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var setInstrumentGain = this.props.setInstrumentGain;

      var setVolumeValue = function setVolumeValue(oscId, property, value) {
        _this2.setState({
          gainValue: value
        });

        setInstrumentGain(value);
      };
      /*const moveVolumeValue = (oscId, property, value) => {
        this.setState({gainValue: value})
      };*/


      return _react.default.createElement("div", {
        className: this.props.className
      }, _react.default.createElement(_Toggle.Toggle, {
        on: !this.props.isMuted,
        onToggle: this.props.onToggle
      }, function (_ref) {
        var on = _ref.on,
            toggle = _ref.toggle;
        return _react.default.createElement("div", null, on ? 'The button is on' : 'The button is off', _react.default.createElement(_Switch.Switch, {
          on: on,
          onClick: toggle
        }), _react.default.createElement("hr", null), _react.default.createElement("button", {
          "aria-label": "custom-button",
          onClick: toggle
        }, on ? 'on' : 'off'));
      }), _react.default.createElement("br", null), _react.default.createElement(_LittleFatty.default, {
        width: 45,
        height: 45,
        fatId: 1,
        setValue: setVolumeValue,
        value: this.state.gainValue,
        defaultValue: 20,
        unit: 1,
        max: 100,
        min: 0,
        fatProperty: 'gain'
      }));
    }
  }]);

  return InstrumentWires;
}(_react.default.Component);

;

var _default = (0, _styledComponents.default)(InstrumentWires)(_templateObject());

exports.default = _default;