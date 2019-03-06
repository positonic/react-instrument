"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var mouseElement = null;

var NoteGridRow =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(NoteGridRow, _React$PureComponent);

  function NoteGridRow(props) {
    _classCallCheck(this, NoteGridRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoteGridRow).call(this, props));
  }

  _createClass(NoteGridRow, [{
    key: "subPeriodClick",
    value: function subPeriodClick(key) {
      var changeGridSequence = this.props.changeGridSequence;
      var beatNumber = key[1] / 4 + 1;
      changeGridSequence(key, 0.25, beatNumber);
    }
  }, {
    key: "subPeriodMouseDown",
    value: function subPeriodMouseDown(key) {
      mouseElement = key;
    }
  }, {
    key: "subPeriodChange",
    value: function subPeriodChange(key) {
      var changeGridSequence = this.props.changeGridSequence;

      if (key && mouseElement) {
        var noteLength = 1;
        var sendKey = key;

        if (key[0] !== mouseElement[0] || key[1] !== mouseElement[1]) {
          noteLength = key[1] - mouseElement[1] + 1; //Number of quarter notes

          sendKey[1] = mouseElement[1];
        }

        var beatNumber = key[1] / 4 + 1; //This is in ticks - let lengthInBeats = noteLength / 4;

        var lengthInBeats = noteLength / 4;
        changeGridSequence(sendKey, lengthInBeats, beatNumber);
        mouseElement = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isSharp = _this$props.isSharp,
          pianoKey = _this$props.pianoKey,
          beats = _this$props.beats;
      var midiNumber = pianoKey.midiNumber;
      var className = isSharp ? 'sharp pianoKey' : 'pianoKey';
      className = midiNumber === 60 ? className + ' middleC' : className;
      return _react.default.createElement("tr", null, _react.default.createElement("td", {
        className: className
      }), this.renderRows(beats * 4));
    }
  }, {
    key: "renderRows",
    value: function renderRows(noSubPeriods) {
      var subPeriods = [];

      for (var i = 0; i < noSubPeriods; i++) {
        subPeriods.push(this.renderSubPeriod(i));
      }

      return subPeriods;
    }
  }, {
    key: "renderSubPeriod",
    value: function renderSubPeriod(subPeriodId) {
      var pianoKey = this.props.pianoKey;
      var midiNumber = pianoKey.midiNumber;
      return _react.default.createElement("td", {
        key: subPeriodId,
        onTouchStart: this.subPeriodClick.bind(this, [midiNumber, subPeriodId]),
        onMouseDown: this.subPeriodMouseDown.bind(this, [midiNumber, subPeriodId]),
        onMouseUp: this.subPeriodChange.bind(this, [midiNumber, subPeriodId])
      });
    }
  }, {
    key: "getNoteWidth",
    value: function getNoteWidth(durationInBeats) {
      return durationInBeats * (22.5 * 4) + 'px';
    }
  }]);

  return NoteGridRow;
}(_react.default.PureComponent);

;
/*
const NoteGridRowF = (props) => {

  const subPeriodClick = (key) => {
    const { changeGridSequence } = props;
    const beatNumber = key[1] / 4 + 1;

    changeGridSequence(key, 0.25, beatNumber);
  }

  const subPeriodMouseDown = (key) => {
    mouseElement = key;
  }

  const subPeriodChange = (key) => {

    const { changeGridSequence } = props;

    if(key && mouseElement) {
      let noteLength = 1;
      let sendKey = key;

      if (key[0] !== mouseElement[0] || key[1] !== mouseElement[1]) {
        noteLength = key[1] - mouseElement[1] + 1; //Number of quarter notes
        sendKey[1] = mouseElement[1];
      }
      const beatNumber = key[1] / 4 + 1;

      //This is in ticks - let lengthInBeats = noteLength / 4;
      let lengthInBeats = noteLength / 4;

      changeGridSequence(sendKey, lengthInBeats, beatNumber);

      mouseElement = null;
    }

  }
  const renderRows = (noSubPeriods) => {
    var subPeriods = [];

    for (var i = 0; i < noSubPeriods; i++) {
      subPeriods.push(renderSubPeriod(i));
    }
    return subPeriods;
  }

  const renderSubPeriod = (subPeriodId) => {
    const { pianoKey } = props;
    const { midiNumber } = pianoKey;

    return (
      <td
        key={subPeriodId}
        onTouchStart={subPeriodClick.bind(this, [midiNumber, subPeriodId])}
        onMouseDown={subPeriodMouseDown.bind(this, [
          midiNumber,
          subPeriodId
        ])}
        onMouseUp={subPeriodChange.bind(this, [midiNumber, subPeriodId])}
      />
    );
  }

  const getNoteWidth = (durationInBeats) => {
    return durationInBeats * (20 * 4) + 'px';
  }

  const { isSharp, pianoKey, beats } = props;
  const { midiNumber } = pianoKey;

  let className = isSharp ? 'sharp pianoKey' : 'pianoKey';
  className = midiNumber === 60 ? className+' middleC' : className;

  return (
    <tr>
      <td className={className} />
      {renderRows(beats * 4)}
    </tr>
  );


};
*/

var _default = NoteGridRow;
exports.default = _default;