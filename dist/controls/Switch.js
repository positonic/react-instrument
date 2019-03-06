"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledSwitch = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n.toggle-btn {\n  box-sizing: initial;\n  display: inline-block;\n  outline: 0;\n  width: 8em;\n  height: 4em;\n  position: relative;\n  cursor: pointer;\n  user-select: none;\n  background: #fbfbfb;\n  border-radius: 4em;\n  padding: 4px;\n  transition: all 0.4s ease;\n  border: 2px solid #e8eae9;\n}\n.toggle-btn:focus::after,\n.toggle-btn:active::after {\n  box-sizing: initial;\n  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),\n    inset 0px 0px 0px 3px #9c9c9c;\n}\n.toggle-btn::after {\n  left: 0;\n  position: relative;\n  display: block;\n  content: '';\n  width: 50%;\n  height: 100%;\n  border-radius: 4em;\n  background: #fbfbfb;\n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),\n    padding 0.3s ease, margin 0.3s ease;\n  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);\n}\n.toggle-btn.toggle-btn-on::after {\n  left: 50%;\n}\n.toggle-btn.toggle-btn-on {\n  background: #86d993;\n}\n.toggle-btn.toggle-btn-on:active {\n  box-shadow: none;\n}\n.toggle-btn.toggle-btn-on:active::after {\n  margin-left: -1.6em;\n}\n.toggle-btn:active::after {\n  padding-right: 1.6em;\n}\n.toggle-input {\n  display: none;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Switch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _getPrototypeOf(Switch).apply(this, arguments));
  }

  _createClass(Switch, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          on = _this$props.on,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          props = _objectWithoutProperties(_this$props, ["on", "className"]);

      var btnClassName = [className, 'toggle-btn', on ? 'toggle-btn-on' : 'toggle-btn-off'].filter(Boolean).join(' ');
      return _react.default.createElement("div", {
        className: this.props.className + 'switch'
      }, _react.default.createElement("input", {
        className: "toggle-input",
        type: "checkbox",
        checked: on,
        onChange: function onChange() {// changing is handled by clicking the button
        }
      }), _react.default.createElement("button", _extends({
        className: btnClassName,
        "aria-label": "Toggle"
      }, props)));
    }
  }]);

  return Switch;
}(_react.default.Component);

var StyledSwitch = (0, _styledComponents.default)(Switch)(_templateObject());
exports.StyledSwitch = StyledSwitch;