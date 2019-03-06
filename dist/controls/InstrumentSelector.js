"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 20px;\n  top: 86px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Selector = _styledComponents.default.select(_templateObject());

var InstrumentSelector = function InstrumentSelector(props) {
  var changeInstrument = props.changeInstrument,
      instruments = props.instruments,
      currentInstrument = props.currentInstrument;
  return _react.default.createElement(Selector, {
    className: "dmInstrumentSelect",
    onChange: changeInstrument,
    value: currentInstrument
  }, instruments.map(function (instrument, key) {
    return _react.default.createElement("option", {
      key: key,
      value: instrument
    }, instrument);
  }));
};

InstrumentSelector.propTypes = {
  changeInstrument: _propTypes.default.func.isRequired,
  instruments: _propTypes.default.array.isRequired
};
var _default = InstrumentSelector;
exports.default = _default;