"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var PlayButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PlayButton, _React$Component);

  function PlayButton(props) {
    var _this;

    _classCallCheck(this, PlayButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayButton).call(this, props));
    _this.state = {
      buttonText: 'Play main'
    };
    _this.play = _this.play.bind(_assertThisInitialized(_this));
    _this.getButtonText = _this.getButtonText.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PlayButton, [{
    key: "getButtonText",
    value: function getButtonText() {
      return this.props.isPlaying === true ? _react.default.createElement("i", {
        className: "fa fa-stop-circle fa-6",
        "aria-hidden": "true"
      }) : _react.default.createElement("i", {
        className: "fa fa-play-circle fa-6",
        "aria-hidden": "true"
      });
    }
  }, {
    key: "play",
    value: function play() {
      this.props.playButtonClick();
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("button", {
        className: this.props.class,
        onClick: this.play
      }, this.getButtonText());
    }
  }]);

  return PlayButton;
}(_react.default.Component);

PlayButton.propTypes = {
  playButtonClick: _propTypes.default.func.isRequired,
  isPlaying: _propTypes.default.bool.isRequired
};
var _default = PlayButton;
exports.default = _default;