"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _synth = require("./players/synth");

var _InstrumentOutput = require("../InstrumentOutput");

var _Oscillator = require("../AudioUtils/Oscillator");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SynthProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SynthProvider, _React$Component);

  function SynthProvider(props) {
    var _this;

    _classCallCheck(this, SynthProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SynthProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "playNoteAtTime", function (midiNumber, time, noteLengthInSeconds) {
      var _this$props = _this.props,
          currentInstrument = _this$props.currentInstrument,
          bpm = _this$props.bpm,
          synthConfig = _this$props.synthConfig;
      _this.oscillators = _this.sourceNode.setupOscillators(synthConfig.oscillators);

      _this.play(midiNumber, time, noteLengthInSeconds, bpm, currentInstrument, _this.filterNodes, _this.oscillators);
    });

    _defineProperty(_assertThisInitialized(_this), "playNote", function (midiNumber) {
      var _this$props2 = _this.props,
          currentInstrument = _this$props2.currentInstrument,
          synthConfig = _this$props2.synthConfig;
      _this.oscillators = _this.sourceNode.setupOscillators(synthConfig.oscillators);
      _this.playingVoices = _this.play(midiNumber, 0, null, null, currentInstrument, _this.filterNodes, _this.oscillators);
    });

    _defineProperty(_assertThisInitialized(_this), "stopNote", function (midiNumber) {
      console.log('stopppp', midiNumber, _this.playingVoices, _this.playingVoices[midiNumber]);

      _this.playingVoices[midiNumber].forEach(function (voice) {
        if (voice.vca) {
          console.log('soft stop voice.release', voice.release);
          voice.vca.gain.linearRampToValueAtTime(0, voice.release);
          voice.source.gainNode.gain.linearRampToValueAtTime(0, voice.release);
          console.log('this.filterNodes', _this.filterNodes);
          setTimeout(function () {
            voice.source.stop(); //voice.vca.gain.value = this.props.gain;
          }, voice.release);
        } else {
          console.log('hard stop key up');
          voice.source.stop();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopNoteAtTime", function (midiNumber, time) {
      _this.playingVoices[midiNumber].forEach(function (voice) {
        if (voice.vca) {
          console.log('soft stop voice.release', voice.release);
          voice.vca.gain.linearRampToValueAtTime(0, voice.release);
          setTimeout(function () {
            voice.source.stop(); //voice.vca.gain.value = this.gainNode.gain.value;
          }, voice.release);
        } else {
          console.log('hard stop key up');
          voice.source.stop();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopAllNotes", function () {
      for (var note in _this.playingVoices) {
        if (_this.playingVoices.hasOwnProperty(note)) {
          _this.playingVoices[note].forEach(function (voice) {
            if (voice.vca) {
              console.log('soft stop voice.release', voice.release);
              voice.vca.gain.linearRampToValueAtTime(0, voice.release);
              setTimeout(function () {
                voice.source.stop(); //voice.vca.gain.value = this.props.gain;
              }, voice.release);
            } else {
              console.log('hard stop key up');
              voice.source.stop();
            }
          });
        }
      }
    });

    var _this$props3 = _this.props,
        audioContext = _this$props3.audioContext,
        _synthConfig = _this$props3.synthConfig,
        filters = _this$props3.filters,
        instrumentId = _this$props3.instrumentId;
    _this.gainNode = _this.props.gainNode;
    _this.synthOutputChannel = (0, _InstrumentOutput.outputChannel)(audioContext, filters ? filters : [], _this.gainNode);
    _this.filterNodes = _this.synthOutputChannel.filterNodes;
    _this.sourceNode = (0, _Oscillator.Source)(audioContext);
    _this.play = (0, _synth.synthPlayer)(audioContext, _synthConfig);
    _this.oscillators = _this.sourceNode.setupOscillators(_synthConfig.oscillators);
    _this.state = {
      playingVoices: {
        a: []
      }
    };
    _this.playNote = _this.playNote.bind(_assertThisInitialized(_this));
    _this.stopNote = _this.stopNote.bind(_assertThisInitialized(_this));
    _this.playNoteAtTime = _this.playNoteAtTime.bind(_assertThisInitialized(_this));
    _this.shouldComponentUpdate = _this.shouldComponentUpdate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SynthProvider, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      var _this2 = this;

      if (nextProps.filters !== this.props.filters) {
        var filterFieldsToUpdate = [{
          field: 'frequency',
          value: nextProps.filters[0].props.value
        }, {
          field: 'Q',
          value: nextProps.filters[0].props.Q
        }];
        this.filterNodes = this.synthOutputChannel.updateValue(0, filterFieldsToUpdate);
      } else if (nextProps.synthConfig !== this.props.synthConfig) {
        this.oscillators.forEach(function (osc, index) {
          osc = _this2.sourceNode.applyTuning(osc, nextProps.synthConfig.oscillators[index].tuning);
          osc.frequency.value = osc.frequencyWithoutPipeLength ? _this2.sourceNode.applyPipeLength(osc.frequencyWithoutPipeLength, nextProps.synthConfig.oscillators[index].pipeLength) : 0;
          osc.type = nextProps.synthConfig.oscillators[index].type;
          osc.gain = nextProps.synthConfig.oscillators[index].gain;
          osc.gainNode.gain.value = nextProps.synthConfig.oscillators[index].gain / 100;
        });
      }

      return true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //todo: Temporary solution, might need to pull keyboard down and up as well as voices out of react completely?
      this.stopAllNotes();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.render({
        isLoading: false,
        playNote: this.playNote,
        playNoteAtTime: this.playNoteAtTime,
        stopNote: this.stopNote,
        stopAllNotes: this.stopAllNotes
      });
    }
  }]);

  return SynthProvider;
}(_react.default.Component);

_defineProperty(SynthProvider, "propTypes", {
  instrumentNames: _propTypes.default.array.isRequired,
  audioContext: _propTypes.default.instanceOf(window.AudioContext),
  render: _propTypes.default.func,
  synthConfig: _propTypes.default.object.isRequired
});

_defineProperty(SynthProvider, "defaultProps", {
  currentInstrument: 'defaultCurrentInstrument!'
});

var _default = SynthProvider;
exports.default = _default;