"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _sampler = _interopRequireDefault(require("./data/sampler"));

var sampleLoader = _interopRequireWildcard(require("./SampleLoader"));

var Gain = _interopRequireWildcard(require("./Instrument/audio/Gain"));

var _nanoevents = _interopRequireDefault(require("nanoevents"));

var _fluentReactPlayButton = _interopRequireDefault(require("fluent-react-play-button"));

var TimeSequencer = _interopRequireWildcard(require("./Instrument/TimeSequencer"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Provider = _interopRequireDefault(require("./Provider"));

var _Instrument = _interopRequireDefault(require("./Instrument"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  float:right;\n  cursor: pointer;\n  i {\n    font-size: 40px;\n  }\n  i:hover {\n    color: #01A9E8;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

window['fluent'] = window['fluent'] || {};
window['fluent'].emitter = new _nanoevents.default();

var PlayButtonHolder = _styledComponents.default.a(_templateObject());

var audioContext = new AudioContext();
var instrumentNames = ["claustra", "vinyl", "moog1", "moog2", "acid", "distBass1c", "distBass3c", "distBass5e", "distBass8g", "distBass7g", "distBass8e", "wobbleBass1g", "synthMc9Dist2c", "synthMc9Dist3c"];
var sampleFilePaths = {
  bdImpact: '/samples/BD IMPACT.wav',
  clave808: '/samples/E808_CL-01.wav',
  clap808: '/samples/E808_CP-01.wav',
  clpCreep: '/samples/CLP CREEP.wav',
  clpDetroit: '/samples/CLP DETROIT.wav',
  hatBasic: '/samples/HAT BASIC.wav',
  hatBonaFide: '/samples/HAT BONA FIDE.wav',
  hatBrush: '/samples/HAT BRUSH.wav',
  hatCym: '/samples/HAT CYM.wav',
  claustra: '/samples/pads/cw_virus_claustrophobia.wav',
  vinyl: '/samples/vinyl/Vinyl Noise 04.wav',
  metronome: '/samples/metronomes/Ableton/Metronome.wav',
  metronomeUp: '/samples/metronomes/Ableton/MetronomeUp.wav',
  moog1: '/samples/moog/MG Rogue Bass FX1-2.wav',
  acid: '/samples/acid/MC09 Acid BassLine01 120 Em.wav',
  distBass1c: '/samples/bass/MC09 Dist Bass 01 C.wav',
  distBass3c: '/samples/bass/MC09 Dist Bass 03 C.wav',
  distBass5e: '/samples/bass/MC09 Dist Bass 05 E.wav',
  distBass8g: '/samples/bass/MC09 Dist Bass 08 G.wav',
  distBass7g: '/samples/bass/MC09 Sub Bass 07 G.wav',
  distBass8e: '/samples/bass/MC09 Sub Bass 08 E.wav',
  wobbleBass1g: '/samples/bass/MC09 Wobble Bass 01 G.wav',
  synthMc9Dist2c: '/samples/synth/MC09 Dist 7th Synth 02 C.wav',
  synthMc9Dist3c: '/samples/synth/MC09 Dist 7th Synth 03 C.wav'
};
var instrumentIndex = 0;

var _asyncRequest;

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "gainNode", void 0);

    _this.state = {
      samplesBuffers: [],
      instrument: _sampler.default,
      isPlaying: false
    };
    _this.playButtonClick = _this.playButtonClick.bind(_assertThisInitialized(_this));
    _this.changeSequencedKeyboardView = _this.changeSequencedKeyboardView.bind(_assertThisInitialized(_this));
    _this.toggleShowEffects = _this.toggleShowEffects.bind(_assertThisInitialized(_this));
    _this.changeBeatsPerLoop = _this.changeBeatsPerLoop.bind(_assertThisInitialized(_this));
    _this.gainNode = Gain.create(audioContext, audioContext.destination, _sampler.default.gain);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      TimeSequencer.init(audioContext, this.gainNode);
      _asyncRequest = sampleLoader.init(audioContext, sampleFilePaths).then(function (loadedSamplesBuffers) {
        _asyncRequest = null;

        _this2.setState({
          samplesBuffers: loadedSamplesBuffers
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (_asyncRequest) {
        _asyncRequest.cancel();
      }
    }
  }, {
    key: "changeSequencedKeyboardView",
    value: function changeSequencedKeyboardView(instrumentId, view) {
      this.setState(function (state) {
        return _objectSpread({}, state, {
          instrument: _objectSpread({}, state.instrument, {
            view: state.instrument.view === 'grid' ? 'keyboard' : 'grid'
          })
        });
      });
    }
  }, {
    key: "changeGridSequence",
    value: function changeGridSequence(midiNumber, instrumentId, instrument, noteLengthBeats, beatNumber) {
      debugger;
    }
  }, {
    key: "changeSequencedKeyboardInstrument",
    value: function changeSequencedKeyboardInstrument(instrumentId, value) {
      debugger;
    }
  }, {
    key: "deleteInstrument",
    value: function deleteInstrument(instrumentId) {
      debugger;
    }
  }, {
    key: "setArmedInstrument",
    value: function setArmedInstrument(instrumentId) {
      debugger;
    }
  }, {
    key: "setInstrumentGain",
    value: function setInstrumentGain(instrumentId, value) {
      debugger;
    }
  }, {
    key: "changeBeatsPerLoop",
    value: function changeBeatsPerLoop(instrumentId, value) {
      //this.props.changeBeatsPerLoop(this.props.trackId, this.props.instrumentId, evt.target.value);
      var showEffects = this.state.instrument.showEffects;
      this.setState(function (state) {
        return _objectSpread({}, state, {
          instrument: _objectSpread({}, state.instrument, {
            beatsPerLoop: value
          })
        });
      });
    }
  }, {
    key: "toggleShowEffects",
    value: function toggleShowEffects(instrumentId) {
      //this.props.toggleShowEffects(this.props.trackId, this.props.instrumentId);
      var showEffects = this.state.instrument.showEffects;
      this.setState(function (state) {
        return _objectSpread({}, state, {
          instrument: _objectSpread({}, state.instrument, {
            showEffects: !showEffects
          })
        });
      });
    }
  }, {
    key: "renderSimpler",
    value: function renderSimpler(loadingSamples, samplesBuffers) {
      if (!loadingSamples && samplesBuffers.length > 0) {
        var instrumentConfig = {
          provider: _Provider.default,
          audioContext: audioContext,
          mainOutput: this.gainNode,
          timeSequencer: TimeSequencer,
          instrument: this.state.instrument,
          instrumentId: instrumentIndex,
          instrumentNames: instrumentNames,
          currentInstrument: _sampler.default.currentInstrument,
          samplesBuffers: samplesBuffers,
          gainNode: this.gainNode,
          gain: 0.2,
          isArmed: true,
          showInstrument: true,
          changeGridSequence: this.changeGridSequence,
          changeBeatsPerLoop: this.changeBeatsPerLoop,
          toggleShowEffects: this.toggleShowEffects,
          changeSequencedKeyboardInstrument: this.changeSequencedKeyboardInstrument,
          deleteInstrument: this.deleteInstrument,
          setArmedInstrument: this.setArmedInstrument,
          setInstrumentGain: this.setInstrumentGain,
          changeSequencedKeyboardView: this.changeSequencedKeyboardView
        };
        return _react.default.createElement("div", {
          className: "instrument",
          style: {
            display: "inline-block",
            marginRight: "20px",
            verticalAlign: "top",
            backgroundColor: '#222'
          }
        }, _react.default.createElement(_Instrument.default, {
          config: instrumentConfig
        }));
      } else return null;
    }
  }, {
    key: "playButtonClick",
    value: function playButtonClick() {
      if (this.state.isPlaying === false) {
        TimeSequencer.play();
        window['fluent'].emitter.emit('togglePlay', {
          isPlaying: true,
          startTime: audioContext.currentTime,
          bpm: 120
        });
        this.setState({
          isPlaying: true
        });
      } else {
        TimeSequencer.stop();
        window['fluent'].emitter.emit('togglePlay', {
          isPlaying: false,
          startTime: audioContext.currentTime,
          bpm: 120
        });
        this.setState({
          isPlaying: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("h2", null, "Sampler"), _react.default.createElement(PlayButtonHolder, null, _react.default.createElement(_fluentReactPlayButton.default, {
        playButtonClick: this.playButtonClick,
        class: "mainPlay",
        isPlaying: this.state.isPlaying
      })), this.renderSimpler(_asyncRequest, this.state.samplesBuffers));
    }
  }]);

  return App;
}(_react.default.Component);

var _default = App;
exports.default = _default;