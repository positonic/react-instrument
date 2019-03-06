"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PipeLength = _styledComponents.default.input(_templateObject());

var PitchSwitch = function PitchSwitch(props) {
  var lengths = [32, 16, 8, 4, 2, 1];

  function handleChangeChk(event) {
    console.log('event', event);
    props.setValue(props.oscId, props.field, event.target.value);
  }

  return React.createElement("div", {
    className: 'pitchSwitch'
  }, lengths.map(function (length, key) {
    return React.createElement("div", {
      key: 'key' + key,
      className: 'pipe'
    }, React.createElement(PipeLength, {
      checked: Number(props.value) === Number(length),
      onChange: handleChangeChk,
      type: "radio",
      value: length
    }), React.createElement("label", null, length));
  }));
};

var _default = PitchSwitch;
exports.default = _default;