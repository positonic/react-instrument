"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PipeLengthSelect = _interopRequireDefault(require("../controls/PipeLengthSelect"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _LittleFatty = _interopRequireDefault(require("../controls/LittleFatty"));

var _WaveShapeSelector = _interopRequireDefault(require("../controls/WaveShapeSelector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  .littleFatty {\n    display: inline-block;\n    font-size: 12px;\n    margin-left: 8px;\n    margin-top: 10px;\n    text-align: center;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  vertical-align: top;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var OscName = _styledComponents.default.span(_templateObject());

var OscillatorBox = _styledComponents.default.div(_templateObject2());

var Oscillator = function Oscillator(props) {
  var oscillator = props.oscillator;
  return _react.default.createElement(OscillatorBox, {
    className: props.classNames
  }, _react.default.createElement("div", {
    style: {
      position: 'relative'
    }
  }, _react.default.createElement(OscName, null, props.name), _react.default.createElement(_WaveShapeSelector.default, {
    oscIndex: props.oscIndex,
    oscillator: oscillator,
    oscNo: props.oscNo,
    setWaveFormValue: props.setWaveFormValue
  }), _react.default.createElement(_PipeLengthSelect.default, {
    setValue: props.setOscValue,
    field: 'pipeLength',
    oscId: props.oscIndex,
    value: oscillator.pipeLength
  })), _react.default.createElement(_LittleFatty.default, {
    width: 45,
    height: 45,
    fatId: props.oscIndex,
    name: 'tuning',
    setValue: props.setOscValue,
    value: props.tuning,
    defaultValue: 700,
    unit: 100,
    max: 1200,
    min: 0,
    fatProperty: 'tuning'
  }), _react.default.createElement(_LittleFatty.default, {
    width: 45,
    height: 45,
    fatId: props.oscIndex,
    name: 'gain',
    setValue: props.setOscValue,
    value: oscillator.gain,
    defaultValue: 20,
    unit: 1,
    max: 100,
    min: 0,
    fatProperty: 'gain'
  }));
};

var _default = Oscillator;
exports.default = _default;