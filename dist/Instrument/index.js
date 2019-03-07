"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _SequencedKeyboard = _interopRequireDefault(require("./SequencedKeyboard"));

var Instrument = _interopRequireWildcard(require("./Instrument"));

var _Effects = _interopRequireDefault(require("./Effects"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(props) {
  var config = props.config;
  var InstrumentWithSequencedKeyboard = Instrument.withSequencedKeyboard(_SequencedKeyboard.default, config.provider, config.parameters, config.effects, config);
  /* audioContext={config.audioContext}
      instrumentNames={config.instrumentNames}
      currentInstrument={config.currentInstrument}
      mainOutput={config.mainOutput}
      onToggle={config.onToggle}
      instrument={config.instrument}
      timeSequencer={config.timeSequencer}
      isArmed={config.isArmed}
      showInstrument={config.showInstrument}
      samplesBuffers={config.samplesBuffers}
      instrumentGainNode={config.instrumentGainNode}
      instrumentId={config.instrumentId}
      gainNode={config.gainNode}
       changeGridSequence={config.changeGridSequence}
      changeSequencedKeyboardInstrument={config.changeSequencedKeyboardInstrument}
      changeSequencedKeyboardView={config.changeSequencedKeyboardView}
  */

  return _react.default.createElement(InstrumentWithSequencedKeyboard, config);
}