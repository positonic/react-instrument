"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: 40px; \n  line-height: 40px; \n  font-size: 14px;\n  background: #151313; \n  position: relative;\n  color: white;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TimelineBox = _styledComponents.default.div(_templateObject());

var TimeNumber = _styledComponents.default.div(_templateObject2());

var Timeline = function Timeline(props) {
  function printBeats(noBeats) {
    var timeNumbers = [];
    var tickWidth = 22.5;
    var beatWidth = tickWidth * 4;

    for (var i = 0; i < noBeats; i++) {
      timeNumbers.push(_react.default.createElement(TimeNumber, {
        key: i,
        style: {
          left: 75 + i * beatWidth
        }
      }, i + 1));
      timeNumbers.push(_react.default.createElement(TimeNumber, {
        key: i + '.',
        style: {
          left: 100 + i * beatWidth
        }
      }, "."));
      timeNumbers.push(_react.default.createElement(TimeNumber, {
        key: i + '.2',
        style: {
          left: 120 + i * beatWidth
        }
      }, "."));
      timeNumbers.push(_react.default.createElement(TimeNumber, {
        key: i + '.3',
        style: {
          left: 140 + i * beatWidth
        }
      }, "."));
    }

    return timeNumbers;
  }

  return _react.default.createElement(TimelineBox, null, printBeats(props.noBeats), _react.default.createElement("svg", {
    className: "gsuiTimeline-cursor",
    width: "16",
    height: "10",
    style: {
      left: 0
    }
  }, _react.default.createElement("polygon", {
    points: "2,2 8,8 14,2"
  })));
};

var _default = Timeline;
exports.default = _default;