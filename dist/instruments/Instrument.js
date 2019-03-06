"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withParameters = withParameters;
exports.withSequencedKeyboard = withSequencedKeyboard;

var _utils = require("./utils");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InstrumentSelector = _interopRequireDefault(require("./controls/InstrumentSelector"));

var _PianoKeys = require("./utils/PianoKeys");

var _reactPiano = require("react-piano");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _DeleteInstrument = _interopRequireDefault(require("./controls/DeleteInstrument"));

var _BeatsPerLoopSelector = _interopRequireDefault(require("./controls/BeatsPerLoopSelector"));

var _ToggleMoreSettings = _interopRequireDefault(require("./controls/ToggleMoreSettings"));

var _Midi = require("./controls/Midi");

var _AudioVisualiser = _interopRequireDefault(require("./AudioVisualiser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  vertical-align: top;\n  display: inline-block;\n  ul {\n    list-style: none;\n    padding: 0;\n  }\n  li {\n    display: inline;\n    button {\n      padding: 10px;\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 10px;\n  cursor: pointer;\n  i {\n    font-size: 30px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  float: left;\n\n  .body {\n    position: relative;\n    float: left;\n    width:100%;\n \n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width:100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  float: left;\n  .body {\n    position: relative;\n    float: left;\n    width:100%; \n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SequencedKeyboardContainer = _styledComponents.default.div(_templateObject());

var Instrument = _styledComponents.default.div(_templateObject2());

var SequencedKeyboardBody = _styledComponents.default.div(_templateObject3());

var ActivateInstrument = _styledComponents.default.a(_templateObject4());

var SoundSourceBox = _styledComponents.default.div(_templateObject5());

var noteRange = {
  first: _reactPiano.MidiNumbers.fromNote('c3'),
  last: _reactPiano.MidiNumbers.fromNote('f5')
};

var keyboardShortcuts = _reactPiano.KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: _reactPiano.KeyboardShortcuts.HOME_ROW
});

function getDefaultGridConfig(beatsPerLoop) {
  return {
    instrumentType: 'sequencedSynth',
    sequencedNotes: {},
    numberOfNotes: _PianoKeys.PianoKeys.length,
    pianoKeys: _PianoKeys.PianoKeys,
    notes: [],
    //beats: beatsPerLoop,
    gridWidthPixels: 22.5,
    gridHeightPixels: 20,
    ticksPerBeat: 4
  };
}

function withParameters(SequencedKeyboard, Parameters, props) {
  var WithParameters =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WithParameters, _React$Component);

    function WithParameters() {
      _classCallCheck(this, WithParameters);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithParameters).apply(this, arguments));
    }

    _createClass(WithParameters, [{
      key: "getParameters",
      value: function getParameters(instrument) {
        return _react.default.createElement(Parameters, _extends({
          instrument: instrument,
          updateSynthOscState: props.updateSynthOscState,
          updateEnvelopeState: props.updateEnvelopeState
        }, props));
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(SequencedKeyboard, _extends({
          getParameters: this.getParameters
        }, props));
      }
    }]);

    return WithParameters;
  }(_react.default.Component);

  return WithParameters;
}

var playingVoices = {};

function withSequencedKeyboard(SequencedKeyboard, SoundProvider, Parameters, Effects, props) {
  var _class, _temp;

  var trackId = props.trackId,
      instrumentId = props.instrumentId;
  var midi = null;
  var noteGridSettings = getDefaultGridConfig();
  noteGridSettings.beats = props.instrument.beatsPerLoop;
  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(_class, _React$Component2);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
      _this.setVoices = _this.setVoices.bind(_assertThisInitialized(_this));
      _this.deleteInstrument = _this.deleteInstrument.bind(_assertThisInitialized(_this));
      _this.changeInstrument = _this.changeInstrument.bind(_assertThisInitialized(_this));
      _this.toggleMoreSettings = _this.toggleMoreSettings.bind(_assertThisInitialized(_this));
      _this.updateSynthFilterState = _this.updateSynthFilterState.bind(_assertThisInitialized(_this));
      _this.updateSynthOscState = _this.updateSynthOscState.bind(_assertThisInitialized(_this));
      _this.updateEnvelopeState = _this.updateEnvelopeState.bind(_assertThisInitialized(_this));
      _this.onTick = _this.onTick.bind(_assertThisInitialized(_this));
      _this.setSelectedNotes = _this.setSelectedNotes.bind(_assertThisInitialized(_this));
      _this.state = {
        showAnalyser: false,
        instrument: props.instrument
      };

      _this.props.timeSequencer.subscribeToTicks(props.instrumentId, _this.onTick);

      return _this;
    }

    _createClass(_class, [{
      key: "setActiveMidi",
      value: function setActiveMidi(playNote, stopNote) {
        (0, _Midi.SetMidiCallbacks)(midi, playNote, stopNote);
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.instrument !== this.props.instrument || nextState.instrument !== this.state.instrument) {
          return true;
        }

        return false;
      }
    }, {
      key: "changeInstrument",
      value: function changeInstrument(evt) {
        this.props.changeSequencedKeyboardInstrument(trackId, instrumentId, evt.target.value);
      }
    }, {
      key: "deleteInstrument",
      value: function deleteInstrument() {
        this.props.deleteInstrument(trackId, instrumentId);
      }
    }, {
      key: "getInstrumentSelector",
      value: function getInstrumentSelector(instrumentNames, currentInstrument) {
        if (instrumentNames.length) {
          return _react.default.createElement(_InstrumentSelector.default, {
            instruments: instrumentNames,
            changeInstrument: this.changeInstrument,
            currentInstrument: currentInstrument
          });
        } else return null;
      }
    }, {
      key: "setVoices",
      value: function setVoices(voices) {
        //this.props.setVoices(trackId, instrumentId, voices);
        playingVoices = voices;
      }
    }, {
      key: "activateInstrument",
      value: function activateInstrument() {
        props.setArmedInstrument(instrumentId);
      }
    }, {
      key: "setInstrumentGain",
      value: function setInstrumentGain(value) {
        props.setInstrumentGain(trackId, instrumentId, value);
      }
    }, {
      key: "updateSynthOscState",
      value: function updateSynthOscState(oscId, property, value) {
        var _this2 = this;

        //this.props.updateSynthOscState(this.props.trackId, this.props.instrumentId, oscId, property, value);
        console.log('updating state updateSynthOscState');
        this.setState(function (state) {
          return _objectSpread({}, state, {
            instrument: _objectSpread({}, state.instrument, {
              oscillators: state.instrument.oscillators.map(function (item, index) {
                if (index !== oscId) {
                  // This isn't the item we care about - keep it as-is
                  return item;
                }

                var newOsc = state.instrument.oscillators[oscId];
                newOsc[property] = value;
                console.log('new newOsc instrument state = ', _objectSpread({}, item, newOsc));
                return _objectSpread({}, item, newOsc);
              })
            })
          });
        }, function () {
          console.log('Newstate is ', _this2.state);
        });
      }
    }, {
      key: "updateEnvelopeState",
      value: function updateEnvelopeState(envelopeId, property, value) {
        var _this3 = this;

        //this.props.updateSynthOscState(this.props.trackId, this.props.instrumentId, oscId, property, value);
        console.log('updating state updateSynthOscState');
        this.setState(function (state) {
          return _objectSpread({}, state, {
            instrument: _objectSpread({}, state.instrument, {
              envelopes: state.instrument.envelopes.map(function (item, index) {
                if (index !== envelopeId) {
                  // This isn't the item we care about - keep it as-is
                  return item;
                }

                var newOsc = state.instrument.envelopes[envelopeId];
                newOsc[property] = value;
                console.log('new newOsc instrument state = ', _objectSpread({}, item, newOsc));
                return _objectSpread({}, item, newOsc);
              })
            })
          });
        }, function () {
          console.log('Newstate is ', _this3.state);
        });
      }
    }, {
      key: "updateSynthFilterState",
      value: function updateSynthFilterState(filterId, property, value) {
        /*this.props.updateSynthFilter(
          this.props.trackId,
          this.props.instrumentId,
          filterId,
          property,
          value
        );*/
        this.setState(function (state) {
          return _objectSpread({}, state, {
            instrument: _objectSpread({}, state.instrument, {
              filters: state.instrument.filters.map(function (item, index) {
                if (index !== filterId) {
                  // This isn't the item we care about - keep it as-is
                  return item;
                }

                var newFilter = state.instrument.filters[filterId];
                if (property === 'filter') newFilter.props.value = value;else if (property === 'resonance') newFilter.props.Q = value;else console.log('Error unexpected propery', property);
                console.log('newFilter.props is ', property, newFilter.props); // Otherwise, this is the one we want - return an updated value

                return _objectSpread({}, item, newFilter);
              })
            })
          });
        });
      }
      /**
       * tick: {
       *   tickNumber,
       *   time
       * }
       * @param tick
       */

    }, {
      key: "onTick",
      value: function onTick(tick) {
        var _this4 = this;

        var instrument = this.state.instrument;

        if (instrument.isMuted !== true) {
          var notes = instrument.notes[instrument.notesIndex];
          var ticksPerLoop = instrument.beatsPerLoop * 4;
          var loopTick = (0, _utils.convertTickToLoopTick)(tick.tickNumber, ticksPerLoop);
          var beatTimeTick = loopTick; //Notes starting a quarter note too soon for some reason, this fixes it

          if (notes.length) {
            var sequencedNotes = (0, _utils.getSequencedNotes)(notes, beatTimeTick);

            if (sequencedNotes.length) {
              sequencedNotes.forEach(function (note) {
                if (note.on === true || note.on === 1) {
                  var noteLengthInSeconds = (0, _utils.getNoteLengthSecondsFromBeats)(note.duration, tick.bpm);

                  _this4.playNoteAtTime(note.midiNumber, tick.time, noteLengthInSeconds);
                }
              });
            }
          }
        }
      }
    }, {
      key: "toggleMoreSettings",
      value: function toggleMoreSettings() {
        //this.props.toggleShowInstrumentSettings(this.props.trackId, this.props.instrumentId);
        var showMoreSettings = this.state.instrument.showMoreSettings;
        var state = this.state;
        console.log(state, showMoreSettings, this.state.instrument);
        this.setState(function (state) {
          return _objectSpread({}, state, {
            instrument: _objectSpread({}, state.instrument, {
              showMoreSettings: !showMoreSettings
            })
          });
        });
      }
    }, {
      key: "setSelectedNotes",
      value: function setSelectedNotes(selectedNotes) {
        this.setState(function (state) {
          return _objectSpread({}, state, {
            instrument: _objectSpread({}, state.instrument, {
              selectedNotes: selectedNotes
            })
          });
        });
      }
    }, {
      key: "deleteSelectedNotes",
      value: function deleteSelectedNotes(notesToDelete) {
        /*const notes = fromJS(this.state.instrument.notes).update(notesIndex, arr => {
          let newNotes;
          notesToDelete.forEach(noteIndex => {
            newNotes = arr.delete(noteIndex);
          });
          return newNotes;
        });
         this.setState(state => ({
          ...state,
          instrument: {
            ...state.instrument,
            notes: notes
          }
        }));*/
      }
    }, {
      key: "render",
      value: function render() {
        var _this5 = this;

        var _this$props = this.props,
            audioContext = _this$props.audioContext,
            instrumentNames = _this$props.instrumentNames,
            mainOutput = _this$props.mainOutput,
            bpm = _this$props.bpm,
            currentInstrument = _this$props.currentInstrument,
            samplesBuffers = _this$props.samplesBuffers,
            instrumentId = _this$props.instrumentId,
            showInstrument = _this$props.showInstrument,
            changeSequencedKeyboardView = _this$props.changeSequencedKeyboardView,
            isArmed = _this$props.isArmed;
        var outputJack = null;
        var Visualiser = null;

        if (this.state.showAnalyser === true) {
          var analyser = audioContext.createAnalyser();
          analyser.connect(mainOutput);
          outputJack = mainOutput;

          Visualiser = function Visualiser(buffer) {
            return _react.default.createElement(_AudioVisualiser.default, {
              buffer: buffer,
              analyser: analyser
            });
          };
        } else {
          outputJack = mainOutput;

          Visualiser = function Visualiser() {
            return '';
          };
        }

        var instrument = this.state.instrument;
        return _react.default.createElement(Instrument, {
          className: "sequencedSynth"
        }, _react.default.createElement(SoundProvider, {
          audioContext: audioContext,
          instrumentNames: instrumentNames,
          currentInstrument: currentInstrument
          /*mainOutput={outputJack}*/
          ,
          bpm: bpm,
          gain: props.gain,
          instrumentId: instrumentId,
          synthConfig: {
            oscillators: instrument.oscillators,
            envelopes: instrument.envelopes,
            isMuted: instrument.instrument
          },
          filters: instrument.filters,
          setVoices: this.setVoices,
          playingVoices: playingVoices,
          samplesBuffers: samplesBuffers,
          gainNode: props.gainNode,
          render: function render(_ref) {
            var isLoading = _ref.isLoading,
                playNote = _ref.playNote,
                playNoteAtTime = _ref.playNoteAtTime,
                stopNote = _ref.stopNote;
            _this5.playNoteAtTime = playNoteAtTime;
            var pianoSettings = {
              playNote: playNote,
              playNoteAtTime: playNoteAtTime,
              stopNote: stopNote,
              disabled: isLoading,
              isLoading: isLoading,
              width: 700,
              keyboardShortcuts: keyboardShortcuts,
              noteRange: noteRange
            };
            if (isArmed && midi) _this5.setActiveMidi(playNote, stopNote);
            var instrumentParameters;
            if (Parameters && instrument.showMoreSettings) instrumentParameters = _react.default.createElement(Parameters, {
              updateSynthFilterState: _this5.updateSynthFilterState,
              updateSynthOscState: _this5.updateSynthOscState,
              updateEnvelopeState: _this5.updateEnvelopeState,
              instrument: instrument,
              oscillators: instrument.oscillators
            });else instrumentParameters = '';
            var instrumentEffects;
            if (Effects && instrument.showEffects === true) instrumentEffects = _react.default.createElement(Effects, _extends({
              instrument: instrument
            }, _this5.props));else instrumentEffects = '';
            var activateStyle = isArmed ? {
              color: 'yellow'
            } : {
              color: 'auto'
            };

            if (showInstrument) {
              return _react.default.createElement(SequencedKeyboardContainer, null, _react.default.createElement("div", {
                className: "body machine"
                /*style={{
                width: instrumentWidth
                }}*/

              }, _react.default.createElement(_DeleteInstrument.default, {
                deleteInstrument: _this5.deleteInstrument
              }), _react.default.createElement("h3", null, currentInstrument.replace(/_/gi, ' '), _react.default.createElement(ActivateInstrument, {
                style: activateStyle,
                onClick: _this5.activateInstrument
              }, _react.default.createElement("i", {
                className: "fa fa-bolt"
              }))), function (showAnalyser, currentInstrument, samplesBuffers) {
                if (showAnalyser) return Visualiser(samplesBuffers.filter(function (o) {
                  return o.name === currentInstrument;
                })[0].buffer);
              }(_this5.state.showAnalyser, currentInstrument, samplesBuffers), _this5.getInstrumentSelector(instrumentNames, currentInstrument), _react.default.createElement(SequencedKeyboard, _extends({
                setSelectedNotesState: _this5.setSelectedNotes,
                playNote: playNote,
                stopNote: stopNote,
                pianoSettings: pianoSettings,
                noteGridSettings: noteGridSettings,
                activeView: instrument.view,
                instrument: instrument,
                isArmed: isArmed,
                deleteSelectedNotesState: _this5.deleteSelectedNotes,
                changeSequencedKeyboardView: changeSequencedKeyboardView
              }, props, {
                render: function render(_ref2) {
                  var changeView = _ref2.changeView,
                      _changeNumberOfBeatsLoop = _ref2.changeNumberOfBeatsLoop,
                      getView = _ref2.getView,
                      getNoteGrid = _ref2.getNoteGrid,
                      toggleEffects = _ref2.toggleEffects;
                  return _react.default.createElement(SequencedKeyboardBody, null, _react.default.createElement(SoundSourceBox, {
                    className: "synthFullPanel"
                  }, _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement("button", {
                    onClick: function onClick() {
                      return changeView('grid');
                    },
                    className: "metal linear"
                  }, "sequencer")), _react.default.createElement("li", null, _react.default.createElement("button", {
                    onClick: function onClick() {
                      return changeView('keyboard');
                    },
                    className: "metal linear"
                  }, "keyboard")), _react.default.createElement("li", null, _react.default.createElement(_ToggleMoreSettings.default, {
                    onClick: _this5.toggleMoreSettings
                  }, _react.default.createElement("i", {
                    className: "fa fa-bars"
                  }))), _react.default.createElement("li", null, _react.default.createElement(_ToggleMoreSettings.default, {
                    onClick: toggleEffects
                  }, _react.default.createElement("i", {
                    className: "fa fa-assistive-listening-systems"
                  })))), instrumentParameters, " ", _react.default.createElement("br", {
                    className: "clearBoth"
                  }), instrumentEffects, _react.default.createElement(_BeatsPerLoopSelector.default, {
                    noLoopBeats: instrument.beatsPerLoop,
                    changeNumberOfBeatsLoop: function changeNumberOfBeatsLoop(noOfBeats) {
                      _changeNumberOfBeatsLoop(noOfBeats);
                    }
                  }), getView()), getNoteGrid());
                }
              }))));
            } else {
              return null;
            }
          }
        }));
      }
    }]);

    return _class;
  }(_react.default.Component), _defineProperty(_class, "propTypes", {
    audioContext: _propTypes.default.instanceOf(window.AudioContext),
    instrumentNames: _propTypes.default.array.isRequired,
    currentInstrument: _propTypes.default.string.isRequired,
    mainOutput: _propTypes.default.object.isRequired,
    instrument: _propTypes.default.object.isRequired
  }), _temp;
}