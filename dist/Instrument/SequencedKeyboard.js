"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactPiano = require("react-piano");

require("react-piano/dist/styles.css");

var _NoteGrid = _interopRequireDefault(require("./NoteGrid"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ShouldUpdate = require("./ShouldUpdate");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Timeline = _interopRequireDefault(require("./controls/Timeline"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral([
    "\n  margin-top: 88px;\n  display: inline-block;\n  height: 700px;\n  overflow: hidden;\n"
  ]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([
    "\n  .ReactPiano__Key--accidental {\n    background: #025d7d;\n    border: 1px solid #888;\n  }\n  .ReactPiano__Key--natural {\n    background: #013243;\n    border: 1px solid #888;\n    margin-right: 0;\n  }\n  .ReactPiano__Key--active.ReactPiano__Key--accidental {\n    background: #0396ca;\n  }\n  .ReactPiano__Key--active.ReactPiano__Key--natural {\n    background: #0396ca;\n  }\n"
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

var PianoDarkTheme = _styledComponents.default.div(_templateObject());

var NoteGridBox = _styledComponents.default.div(_templateObject2());

var SequencedKeyboard =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(SequencedKeyboard, _React$Component);

    function SequencedKeyboard(props) {
      var _this;

      _classCallCheck(this, SequencedKeyboard);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(SequencedKeyboard).call(this, props)
      );
      _this.getView = _this.getView.bind(_assertThisInitialized(_this));
      _this.toggleEffects = _this.toggleEffects.bind(
        _assertThisInitialized(_this)
      );
      _this.changeNumberOfBeatsLoop = _this.changeNumberOfBeatsLoop.bind(
        _assertThisInitialized(_this)
      );
      _this.getNoteGrid = _this.getNoteGrid.bind(_assertThisInitialized(_this));
      _this.changeView = _this.changeView.bind(_assertThisInitialized(_this));
      _this.deleteSelectedNotes = _this.deleteSelectedNotes.bind(
        _assertThisInitialized(_this)
      ); //This is too slow - props.timeSequencer.subscribeToTicks(this.onTick);

      _this.state = {
        showMoreSettings: false
      }; //props.timeSequencer.registerInstrumentPlayer(this.props.Instrument.type+'-'+this.props.Instrument.instrumentName, this.onTick);

      return _this;
    }

    _createClass(SequencedKeyboard, [
      {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(
          nextProps,
          nextState,
          nextContext
        ) {
          if (
            (0, _ShouldUpdate.instrumentsChanged)(nextProps, this.props) ||
            nextProps.pianoSettings !== this.props.pianoSettings ||
            nextProps.noteGridSettings !== this.props.noteGridSettings
          ) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        key: "getButtonText",
        value: function getButtonText() {}
      },
      {
        key: "getView",
        value: function getView() {
          var _this$props = this.props,
            pianoSettings = _this$props.pianoSettings,
            noteGridSettings = _this$props.noteGridSettings,
            isArmed = _this$props.isArmed,
            activeView = _this$props.activeView;
          var gridWidthPixels = noteGridSettings.gridWidthPixels,
            gridHeightPixels = noteGridSettings.gridHeightPixels,
            ticksPerBeat = noteGridSettings.ticksPerBeat,
            pianoKeys = noteGridSettings.pianoKeys,
            instrumentType = noteGridSettings.instrumentType;
          var playNote = pianoSettings.playNote,
            stopNote = pianoSettings.stopNote;

          if (activeView === "grid") {
            return null;
          } else {
            return _react.default.createElement(
              "div",
              null,
              _react.default.createElement(
                PianoDarkTheme,
                null,
                _react.default.createElement(_reactPiano.Piano, {
                  disabled: !isArmed,
                  noteRange: pianoSettings.noteRange,
                  playNote: playNote,
                  stopNote: stopNote,
                  width: pianoSettings.width,
                  keyboardShortcuts: pianoSettings.keyboardShortcuts
                })
              )
            );
          }
        }
      },
      {
        key: "deleteSelectedNotes",
        value: function deleteSelectedNotes(selectedNotes) {
          this.props.deleteSelectedNotesState(selectedNotes);
        }
      },
      {
        key: "getNoteGrid",
        value: function getNoteGrid() {
          var _this$props2 = this.props,
            noteGridSettings = _this$props2.noteGridSettings,
            setSelectedNotesState = _this$props2.setSelectedNotesState,
            instrumentId = _this$props2.instrumentId,
            instrument = _this$props2.instrument,
            activeView = _this$props2.activeView,
            changeGridSequence = _this$props2.changeGridSequence;
          if (activeView !== "grid") return null;
          else {
            var gridWidthPixels = noteGridSettings.gridWidthPixels,
              ticksPerBeat = noteGridSettings.ticksPerBeat,
              pianoKeys = noteGridSettings.pianoKeys,
              instrumentType = noteGridSettings.instrumentType,
              gridHeightPixels = noteGridSettings.gridHeightPixels;
            return _react.default.createElement(
              NoteGridBox,
              null,
              _react.default.createElement(_Timeline.default, {
                noBeats: instrument.beatsPerLoop
              }),
              _react.default.createElement(_NoteGrid.default, {
                selectedNotes: instrument.selected_notes,
                setSelectedNotes: setSelectedNotesState,
                gridWidthPixels: gridWidthPixels,
                gridHeightPixels: gridHeightPixels,
                ticksPerBeat: ticksPerBeat,
                instrumentType: instrumentType,
                pianoKeys: pianoKeys,
                instrumentId: instrumentId,
                notes: instrument.notes[instrument.notesIndex],
                instrumentNotes: instrument.notes[instrument.notesIndex],
                beatsPerLoop: this.props.noteGridSettings.beats,
                deleteSelectedNotes: this.deleteSelectedNotes,
                audioContext: this.props.audioContext,
                changeGridSequence: changeGridSequence,
                isSaved: this.props.isSaved
              })
            );
          }
        }
      },
      {
        key: "changeView",
        value: function changeView(view) {
          var _this$props3 = this.props,
            changeSequencedKeyboardView =
              _this$props3.changeSequencedKeyboardView,
            instrumentId = _this$props3.instrumentId;
          changeSequencedKeyboardView(instrumentId, view);
        }
      },
      {
        key: "changeNumberOfBeatsLoop",
        value: function changeNumberOfBeatsLoop(evt) {
          this.props.changeBeatsPerLoop(
            this.props.instrumentId,
            evt.target.value
          );
        }
      },
      {
        key: "toggleEffects",
        value: function toggleEffects() {
          this.props.toggleShowEffects(this.props.instrumentId);
        }
      },
      {
        key: "render",
        value: function render() {
          return this.props.render({
            changeView: this.changeView,
            changeNumberOfBeatsLoop: this.changeNumberOfBeatsLoop,
            getView: this.getView,
            getNoteGrid: this.getNoteGrid,
            toggleMoreSettings: this.toggleMoreSettings,
            toggleEffects: this.toggleEffects
          });
        }
      }
    ]);

    return SequencedKeyboard;
  })(_react.default.Component);

_defineProperty(SequencedKeyboard, "propTypes", {
  pianoSettings: _propTypes.default.object.isRequired,
  noteGridSettings: _propTypes.default.object.isRequired,
  instrument: _propTypes.default.object.isRequired
});

var _default = SequencedKeyboard;
exports.default = _default;
