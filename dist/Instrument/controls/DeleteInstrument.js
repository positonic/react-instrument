"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 2px;\n  right: 7px;\n  cursor: pointer;\n  \n  i {\n    font-size: 20px;\n  }\n  i:hover {\n    color: #01A9E8;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DeleteInstrument = function DeleteInstrument(_ref) {
  var className = _ref.className,
      deleteInstrument = _ref.deleteInstrument;

  function onClick(evt) {
    deleteInstrument();
  }

  return _react.default.createElement("a", {
    className: className,
    onClick: onClick
  }, _react.default.createElement("i", {
    className: "fa fa-times-circle"
  }));
};

var StyledDeleteInstrument = (0, _styledComponents.default)(DeleteInstrument)(_templateObject());
var _default = StyledDeleteInstrument;
exports.default = _default;