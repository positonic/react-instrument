"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _sample = require("../../Provider/players/sample");

var _InstrumentOutput = require("../../Provider/InstrumentOutput");

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

var SampleProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SampleProvider, _React$Component);

  function SampleProvider(props) {
    var _this;

    _classCallCheck(this, SampleProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SampleProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "playNoteAtTime", function (midiNumber, time, noteLengthInSeconds) {
      var _this$props = _this.props,
          currentInstrument = _this$props.currentInstrument,
          bpm = _this$props.bpm;

      _this.play(midiNumber, time, noteLengthInSeconds, bpm, currentInstrument);
    });

    _defineProperty(_assertThisInitialized(_this), "playNote", function (midiNumber) {
      _this.voice = _this.play(midiNumber, 0, null, null, _this.props.currentInstrument);
    });

    _defineProperty(_assertThisInitialized(_this), "stopNote", function (midiNumber) {
      _this.voice.stop();
    });

    _defineProperty(_assertThisInitialized(_this), "stopAllNotes", function () {
      _this.props.audioContext.resume().then(function () {
        var activeAudioNodes = Object.values(_this.state.activeAudioNodes);
        activeAudioNodes.forEach(function (node) {
          if (node) {
            node.stop();
          }
        });

        _this.setState({
          activeAudioNodes: {}
        });
      });
    });

    _this.playNote = _this.playNote.bind(_assertThisInitialized(_this));
    _this.playNoteAtTime = _this.playNoteAtTime.bind(_assertThisInitialized(_this));
    var _this$props2 = _this.props,
        audioContext = _this$props2.audioContext,
        filters = _this$props2.filters,
        instrumentId = _this$props2.instrumentId,
        samplesBuffers = _this$props2.samplesBuffers;
    _this.gainNode = _this.props.gainNode;
    _this.outputChannel = (0, _InstrumentOutput.outputChannel)(audioContext, filters ? filters : [], _this.gainNode);
    _this.play = (0, _sample.samplePlayer)(_this.props.audioContext, _this.outputChannel.filterNodes[0], samplesBuffers);
    _this.state = {
      activeAudioNodes: {},
      instrument: null
    };
    return _this;
  }

  _createClass(SampleProvider, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      if (nextProps.gain !== this.props.gain) {
        this.gainNode.gain.value = nextProps.gain;
      }

      return true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      /*sampleLoader.init(this.props.audioContext, sampleFilePaths).then(loadedSamplesBuffers => {
        this.samplesBuffers = loadedSamplesBuffers;
         this.play = samplePlayer(this.props.audioContext, this.outputChannel.filterNodes[0], this.samplesBuffers);
       });*/
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.render({
        isLoading: !this.state.instrument,
        playNote: this.playNote,
        playNoteAtTime: this.playNoteAtTime,
        stopNote: this.stopNote,
        stopAllNotes: this.stopAllNotes
      });
    }
  }]);

  return SampleProvider;
}(_react.default.Component);

_defineProperty(SampleProvider, "propTypes", {
  instrumentNames: _propTypes.default.array.isRequired,
  audioContext: _propTypes.default.instanceOf(window.AudioContext),
  render: _propTypes.default.func
});

_defineProperty(SampleProvider, "defaultProps", {
  currentInstrument: "moog1"
});

var _default = SampleProvider;
exports.default = _default;