"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  width: 49%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var FilterBox = _styledComponents.default.a(_templateObject());

var Filter = function Filter(props) {
  return _react.default.createElement(FilterBox, null, _react.default.createElement(_Checkbox.default, {
    value: props.checked,
    checked: props.active === true,
    onChange: props.onChange
  }), props.type);
};

var Effects =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Effects, _React$Component);

  function Effects(props) {
    var _this;

    _classCallCheck(this, Effects);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Effects).call(this, props));
    _this.toggleFilter = _this.toggleFilter.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Effects, [{
    key: "toggleFilter",
    value: function toggleFilter(trackId, instrumentId, filterIndex) {
      /*alert('Check shouldComponentUpdate in Instrument.js, its not updating at present.')
      return (evt) => {
        this.props.toggleFilter(trackId, instrumentId, filterIndex);
      };*/
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          trackId = _this$props.trackId,
          instrumentId = _this$props.instrumentId;
      return _react.default.createElement("div", {
        className: this.props.className + ' clearBoth'
      }, this.props.instrument.filters.map(function (filter, index) {
        var type = filter.hasOwnProperty('tunaType') ? filter.tunaType : filter.type;
        return _react.default.createElement(Filter, {
          type: type,
          active: filter.active,
          onChange: _this2.toggleFilter(trackId, instrumentId, index)
        });
      }), _react.default.createElement("br", {
        className: "clearBoth"
      }));
    }
  }]);

  return Effects;
}(_react.default.Component);

var StyledEffects = (0, _styledComponents.default)(Effects)(_templateObject2());
var _default = StyledEffects;
exports.default = _default;