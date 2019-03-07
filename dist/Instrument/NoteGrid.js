"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _NoteGridRow = _interopRequireDefault(require("./NoteGridRow"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Notes = _interopRequireDefault(require("./Notes"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  canvas {\n    position:absolute;\n    z-index:1;\n    margin-left: 80px;\n    height: 2300px;\n  }\n  width: 1520px;\n  overflow: scroll;\n  height: 100%;\n  &::-webkit-scrollbar { \n      display: none;  // Safari and Chrome\n  }\n  -ms-overflow-style: none;  // IE 10+\n  overflow: -moz-scrollbars-none;  // Firefox\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  height: 2300px;  \n  position:relative;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  float:left;\n  background-image: linear-gradient( 90deg,\n\t\tvar( --gsuiKeys-whiteKey-colorA ),\n\t\tvar( --gsuiKeys-whiteKey-colorB ) )\n  background-color: white;\n  width: 80px;\n  height: 700px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  height: 20px;\n  background-color: black;\n  width: 66%;\n  border-bottom:1px solid #D8D7DD;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  height: 20px;\n  width: 100%;\n  background-color: whitesmoke;\n  border-bottom:1px solid #D8D7DD;\n\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  height: 20px;\n  background-color: ", ";\n  width: 100%;\n  border-bottom:1px solid #D8D7DD;\n  color: #333;\n  font-size: 13px;\n  line-height:20px;\n  text-align: right;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  left: 0;\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: url('/images/grid.png') repeat;\n  width: ", "\n  height: 2300px;\n  margin-left: 80px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NoteGridBackground = _styledComponents.default.div(_templateObject(), function (props) {
  return props.gridWidth ? props.gridWidth + 'px' : '1440px';
});

var NoteGridBlock = _styledComponents.default.div(_templateObject2());

var PianoKey = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.isMiddleC ? 'floralwhite' : 'whitesmoke';
});

var PianoKeyHolder = _styledComponents.default.div(_templateObject4());

var PianoKeyBlack = _styledComponents.default.div(_templateObject5());

var PianoBlock = _styledComponents.default.div(_templateObject6());

var Child = _styledComponents.default.div(_templateObject7());

var NoteGrid =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NoteGrid, _React$Component);

  function NoteGrid(props) {
    var _this;

    _classCallCheck(this, NoteGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NoteGrid).call(this, props));
    _this.state = {
      startTime: 0,
      bpm: _this.props.bpm,
      stylusInterval: null
    };
    _this.xGridSize = 22.5;
    _this.yGridSize = 20;
    _this.beatPixels = props.gridWidthPixels * 4;
    _this.canvas = _react.default.createRef();
    _this.noteGridScroller = _react.default.createRef();
    _this.xpos = 0;
    _this.loopBeat = 1;
    _this.drawPlayingStylus = _this.drawPlayingStylus.bind(_assertThisInitialized(_this));
    _this.calculateXPos = _this.calculateXPos.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.changeGridSequence = _this.changeGridSequence.bind(_assertThisInitialized(_this));
    _this.togglePlay = _this.togglePlay.bind(_assertThisInitialized(_this));
    _this.convertMouseToCoordinates = _this.convertMouseToCoordinates.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.mouseDown = {};
    return _this;
  }

  _createClass(NoteGrid, [{
    key: "calculateWidth",
    value: function calculateWidth(beatsPerLoop) {
      this.gridWidthPixels = this.props.gridWidthPixels ? this.props.gridWidthPixels : 22.5;
      return this.props.ticksPerBeat * beatsPerLoop * this.gridWidthPixels;
    }
  }, {
    key: "renderKeys",
    value: function renderKeys(pianoKeys) {
      var _this2 = this;

      var rows = [];
      this.props.pianoKeys.forEach(function (pianoKey, index) {
        rows.push(_this2.renderKey(pianoKey, index));
      });
      return rows;
    }
  }, {
    key: "renderKey",
    value: function renderKey(pianoKey, i) {
      if (pianoKey.isSharp) {
        return _react.default.createElement(PianoKeyHolder, {
          key: i
        }, _react.default.createElement(PianoKeyBlack, null));
      } else {
        if (pianoKey.note.indexOf('C') > -1) {
          return _react.default.createElement(PianoKeyHolder, {
            key: i
          }, _react.default.createElement(PianoKey, {
            isMiddleC: pianoKey.midiNumber === 60
          }, pianoKey.note, " "));
        } else {
          return _react.default.createElement(PianoKeyHolder, {
            key: i
          }, _react.default.createElement(PianoKey, null));
        }
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(evt) {
      var _this$props = this.props,
          selectedNotes = _this$props.selectedNotes,
          deleteSelectedNotes = _this$props.deleteSelectedNotes;

      if (evt.key === 'Delete') {
        //This was the actioncreator - deleteSelectedNotes(trackId, instrumentId, selectedNotes);
        deleteSelectedNotes(selectedNotes);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var canvas = this.canvas.current;
      this.canvasContext = canvas.getContext('2d');
      this.canvasContext.translate(18.75 + 4, 0); // make 0, next to the piano keys

      this.canvasContext.globalAlpha = 0.8; //this.canvasContext.strokeStyle = '#FFFF00';

      this.canvasContext.strokeStyle = '#FFF';
      this.canvasContext.lineWidth = 1;
      window.fluent.emitter.on('togglePlay', this.togglePlay);
      document.addEventListener('keydown', this.onKeyDown);
      setTimeout(function () {
        var highestNoteMidiNumber = Math.max.apply(Math, _this3.props.instrumentNotes.map(function (o) {
          return o.midiNumber;
        }));
        console.log('pianoKeys', _this3.props.pianoKeys);
        var highestPianoMidiNumber = 127;
        var differenceToTop = highestPianoMidiNumber - highestNoteMidiNumber;
        var keyHeight = 20;
        var noKeysToPadTop = 10;
        _this3.noteGridScroller.current.scrollTop = (differenceToTop - noKeysToPadTop) * keyHeight;
      }, 500);
    }
  }, {
    key: "togglePlay",
    value: function togglePlay(playObj) {
      var _this4 = this;

      if (playObj.isPlaying === true) {
        var stylusInterval = setInterval(function () {
          requestAnimationFrame(_this4.drawPlayingStylus);
        }, 1000 / 60);
        this.setState({
          startTime: playObj.startTime,
          bpm: playObj.bpm,
          stylusInterval: stylusInterval
        });
      } else {
        clearInterval(this.state.stylusInterval);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.state.stylusInterval);
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "calculateXPos",
    value: function calculateXPos() {
      var secondsPassed = this.props.audioContext.currentTime - this.state.startTime;
      var beatsPerSecond = this.state.bpm / 60;
      var beatsPassed = secondsPassed * beatsPerSecond;
      var loopBeat = (0, _utils.getLoopBeat)(beatsPassed, this.props.beatsPerLoop);
      var xPos = loopBeat * this.beatPixels / 4; // why div 4? Makes no sense - but works

      return xPos;
    }
  }, {
    key: "drawPlayingStylus",
    value: function drawPlayingStylus() {
      if (this.canvas.current) this.canvasContext.clearRect(-2, 0, this.canvas.current.width, 2321);
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(this.xpos, 0);
      this.canvasContext.lineTo(this.xpos, 2321);
      this.canvasContext.stroke();
      this.xpos = this.calculateXPos();
    }
  }, {
    key: "convertMouseToCoordinates",
    value: function convertMouseToCoordinates(event, eventType) {
      var canvas = this.canvas.current;
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      this.mouseDown = this.convertMouseToCoordinates(event, 'down');
    }
  }, {
    key: "getMidiNumberFromYCoOrdinate",
    value: function getMidiNumberFromYCoOrdinate(yCoOrd) {
      var rowNo = Math.ceil(yCoOrd / this.yGridSize);
      var indexOffsetRowNo = rowNo - 1;
      var lastMidiNote = 127; //Highest at the top;

      var midiRowNo = lastMidiNote - indexOffsetRowNo;
      return midiRowNo;
    }
  }, {
    key: "getBeatNumberFromXCoOrdinate",
    value: function getBeatNumberFromXCoOrdinate(xCoOrd) {
      var tickNo = Math.ceil(xCoOrd / this.xGridSize);
      return (0, _utils.getBeatFromTick)(tickNo - 1);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      var beatNumber = this.getBeatNumberFromXCoOrdinate(this.mouseDown.x);
      var midiNumber = this.getMidiNumberFromYCoOrdinate(this.mouseDown.y);
      var mouseUpCoOrdinates = this.convertMouseToCoordinates(event, 'up');
      var xDif = mouseUpCoOrdinates.x - this.mouseDown.x;
      var noteLengthTicks = xDif / this.xGridSize;
      var noteLengthBeats = noteLengthTicks / 4;
      this.changeGridSequence(midiNumber, noteLengthBeats, beatNumber);
    }
  }, {
    key: "changeGridSequence",
    value: function changeGridSequence(midiNumber, noteLengthBeats, beatNumber) {
      var _this$props2 = this.props,
          changeGridSequence = _this$props2.changeGridSequence,
          instrumentId = _this$props2.instrumentId;
      changeGridSequence(midiNumber, instrumentId, noteLengthBeats, beatNumber);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          beatsPerLoop = _this$props3.beatsPerLoop,
          instrumentNotes = _this$props3.instrumentNotes,
          trackId = _this$props3.trackId,
          instrumentId = _this$props3.instrumentId,
          pianoKeys = _this$props3.pianoKeys,
          setSelectedNotes = _this$props3.setSelectedNotes,
          selectedNotes = _this$props3.selectedNotes;
      var gridWidth = this.calculateWidth(beatsPerLoop);
      return _react.default.createElement("div", {
        className: this.props.className
      }, _react.default.createElement(Child, null, _react.default.createElement("canvas", {
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        ref: this.canvas,
        width: gridWidth,
        height: "660"
      }), _react.default.createElement(NoteGridBlock, null, _react.default.createElement(PianoBlock, null, this.renderKeys(pianoKeys)), _react.default.createElement(NoteGridBackground, {
        gridWidth: gridWidth
      }), _react.default.createElement(_Notes.default, {
        onKeyDown: this.onKeyPress,
        onKeyPress: this.onKeyPress,
        selectedNotes: selectedNotes,
        setSelectedNotes: setSelectedNotes,
        pianoKeys: pianoKeys,
        beatsPerLoop: beatsPerLoop,
        notes: instrumentNotes,
        trackId: trackId,
        instrumentId: instrumentId,
        changeSequencedNote: this.props.changeSequencedNote,
        gridWidthPixels: this.props.gridWidthPixels,
        gridHeightPixels: this.props.gridHeightPixels,
        noteGridWidth: gridWidth
      }))));
    }
  }]);

  return NoteGrid;
}(_react.default.Component);

var _default = (0, _styledComponents.default)(NoteGrid)(_templateObject8());

exports.default = _default;