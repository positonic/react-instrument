"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      vertical-align: middle;\n      margin-left: 20px;\n      cursor: pointer;\n      i {\n        font-size: 30px;\n      }\n      i:hover {\n        color: #01a9e8;\n      }\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ToggleMoreSettings = _styledComponents.default.a(_templateObject());

var _default = ToggleMoreSettings;
exports.default = _default;