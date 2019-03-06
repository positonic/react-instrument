"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

var _reactRnd = require("react-rnd");

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

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  border: ", "\n  width: ", ";\n  height: 20px;\n  left: ", ";\n  top: ", ";\n  background: #01a9e8;\n  z-index: 1;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: ", ";\n  height: 100%;\n  left: 80px;\n  top: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// The default
var NotesBlock = _styledComponents.default.div(_templateObject(), function (props) {
  return props.blockWidth;
});

var Note = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.isSelected ? '1px solid white' : 'auto';
}, function (props) {
  return props.noteWidth;
}, function (props) {
  return props.left;
}, function (props) {
  return props.top;
});
/*const NoteResizer = styled.div`
  width: ${props => props.resizerWidth};
  height: 20px;
  position: relative;
`;
const Handle = styled.div`
  width: 5px;
  height: 20px;
  background: blue;
  cursor: text;
  display: inline-block;
  vertical-align: top;
`;
const NoteBody = styled.div`
  width: ${props => props.bodyWidth};
  background: #01a9e8;
  cursor: pointer;
  height: 20px;
  display: inline-block;
  vertical-align: top;
`;*/

/* const keyNotes = this.props.notes.filter(o => o.midiNumber === pianoKey.midiNumber);

    const notes = keyNotes ? keyNotes : [];*/
//let mousePosition;

/*function Resize(panel) {
  return function resize(e) {
    const dx = mousePosition - e.x;
    mousePosition = e.x;
    panel.style.width = parseInt(getComputedStyle(panel, '').width) + dx + 'px';
  };
}*/

/*function removeListeners() {
  document.removeEventListener ('mousemove', resize, true);
  document.mouseup ('mousemove', removeListeners, true);
}*/
//let mouseElement = null;


var Notes =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Notes, _React$Component);

  function Notes(props) {
    var _this;

    _classCallCheck(this, Notes);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Notes).call(this, props));
    _this.drawNote = _this.drawNote.bind(_assertThisInitialized(_this));
    _this.OnResizeStop = _this.OnResizeStop.bind(_assertThisInitialized(_this)); //this.onClick = this.onClick.bind(this);

    _this.state = {
      /*selectedNotes: [],
      */
      mousePosition: null,
      xPos: 60,
      yPos: 100
    };
    _this.resizing = false;
    var _this$props = _this.props,
        trackId = _this$props.trackId,
        instrumentId = _this$props.instrumentId,
        pianoKeys = _this$props.pianoKeys;
    _this.trackId = trackId;
    _this.instrumentId = instrumentId;
    _this.pianoKeys = pianoKeys;
    return _this;
  }
  /* onClick(evt) {
    evt.preventDefault();
    debugger
    this.props.setSelectedNotes(evt.target.noteIndex);
     return false;
  }*/


  _createClass(Notes, [{
    key: "OnResizeStop",
    value: function OnResizeStop(index, duration) {
      var _this2 = this;

      return function (evt, direction, refToElement, delta, position) {
        evt.preventDefault();
        var newNoteLength = duration + delta.width / 80;

        _this2.props.changeSequencedNote(_this2.trackId, _this2.instrumentId, index, null, newNoteLength, null);
      };
    }
  }, {
    key: "drawNote",
    value: function drawNote(note, id, index) {
      var _this3 = this;

      var _this$props2 = this.props,
          trackId = _this$props2.trackId,
          instrumentId = _this$props2.instrumentId,
          pianoKeys = _this$props2.pianoKeys,
          gridWidthPixels = _this$props2.gridWidthPixels,
          gridHeightPixels = _this$props2.gridHeightPixels;
      var _this$props3 = this.props,
          selectedNotes = _this$props3.selectedNotes,
          setSelectedNotes = _this$props3.setSelectedNotes;
      var xPos = (note.beat_time - 1) * 4 * gridWidthPixels;
      var pianoKeyIndex = pianoKeys.findIndex(function (o) {
        return o.midiNumber === note.midiNumber;
      });
      var yPos = pianoKeyIndex * gridHeightPixels;
      var noteWidth = note.duration * gridWidthPixels * 4;
      var onClick = this.onClick;
      return _react.default.createElement(_reactRnd.Rnd, {
        key: 'id' + id,
        enableResizing: {
          top: false,
          right: true,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        },
        onResizeStop: this.OnResizeStop(index, note.duration),
        style: {
          zIndex: 1
        },
        size: {
          width: noteWidth,
          height: gridHeightPixels
        },
        position: {
          x: xPos,
          y: yPos
        },
        onDragStop: function onDragStop(evt, data) {
          evt.preventDefault();
          var dragToKeyIndex = data.lastY / gridHeightPixels;
          var newMidiNumber = pianoKeys[dragToKeyIndex].midiNumber;
          var newBeatNumber = data.lastX / (gridWidthPixels * 4) + 1;

          if (data.deltaX === 0 && data.deltaY === 0) {
            //this.props.setSelectedNotes(trackId, instrumentId, [index]);
            debugger;
            setSelectedNotes([index]);
            /*this.setState({
              selectedNotes: [index]
            })*/
          } else {
            _this3.props.changeSequencedNote(trackId, instrumentId, index, newMidiNumber, note.duration, newBeatNumber);
          }

          return false;
        },
        dragGrid: [gridWidthPixels, gridHeightPixels]
      }, _react.default.createElement(Note, {
        onClick: onClick,
        noteIndex: index,
        noteWidth: '100%',
        isSelected: selectedNotes.indexOf(index) > -1
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          notes = _this$props4.notes,
          noteGridWidth = _this$props4.noteGridWidth;
      var drawNote = this.drawNote;
      if (notes) return _react.default.createElement(NotesBlock, {
        blockWidth: noteGridWidth + 'px'
      }, notes.map(function (note, index) {
        return drawNote(note, note.midiNumber + '-' + index, index);
      }));else return null;
    }
  }]);

  return Notes;
}(_react.default.Component);

var _default = Notes;
exports.default = _default;