"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _SequencedKeyboard = _interopRequireDefault(require("../SequencedKeyboard"));

var _SampleProvider = _interopRequireDefault(require("./SampleProvider"));

var Instrument = _interopRequireWildcard(require("../Instrument"));

var _Effects = _interopRequireDefault(require("../Effects"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(props) {
  var Parameters = null;
  var SimplerWithSequencedKeyboard = Instrument.withSequencedKeyboard(_SequencedKeyboard.default, _SampleProvider.default, Parameters, _Effects.default, props);
  return _react.default.createElement(SimplerWithSequencedKeyboard, {
    audioContext: props.audioContext,
    instrumentNames: props.instrumentNames,
    currentInstrument: props.currentInstrument,
    mainOutput: props.mainOutput,
    onToggle: props.onToggle,
    instrument: props.instrument,
    timeSequencer: props.timeSequencer,
    isArmed: true,
    showInstrument: true,
    samplesBuffers: props.samplesBuffers,
    instrumentGainNode: props.instrumentGainNode,
    changeSequencedKeyboardInstrument: props.changeSequencedKeyboardInstrument,
    instrumentId: props.instrumentId
  });
}