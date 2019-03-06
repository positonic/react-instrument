"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("react-piano/dist/styles.css");

var _FilterPanel = _interopRequireDefault(require("./FilterPanel"));

var _Adsr = _interopRequireDefault(require("./Adsr"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Oscillator = _interopRequireDefault(require("./Oscillator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  font-size: 20px;\n  .machine {\n    font-size: 20px;\n  }\n  h5 {\n    font-size: 20px;\n  }\n  .littleFatty {\n    text-align: center;\n  }\n  color: white;\n  font-size: 1.5em;\n  margin: 10px auto 0;\n  position: relative;\n\n  .machine {\n    font-size: 20px;\n  }\n\n  .body {\n    position: relative;\n    float: left;\n    width: 100%;\n  }\n  .machine {\n    background: url(/images/background-grey.jpg) repeat-x;\n    padding: 10px;\n  }\n  .sources {\n    display: inline-block;\n  }\n  .clearBoth {\n    clear: both;\n  }\n  .module {\n    background: #222;\n    border: 1px solid #474545;\n    padding: 8px;\n    position: relative;\n  }\n  .osc2 {\n    float: left;\n    clear: left;\n  }\n  .osc2-m {\n    margin-top: 10px;\n  }\n  .module {\n    background: #222;\n    border: 1px solid #474545;\n    padding: 8px;\n    position: relative;\n  }\n  .sequencedSynth .filters {\n    display: inline-block;\n    vertical-align: top;\n  }\n  .envelopes {\n    display: inline-block;\n    vertical-align: top;\n  }\n  .layout1 .envelopes {\n    width: 16%;\n  }\n  .layout1 .envelopes .module {\n    display: inline-block;\n  }\n  .filters {\n    display: inline-block;\n    vertical-align: top;\n  }\n  .envelopes {\n    display: inline-block;\n    vertical-align: top;\n  }\n  .layout1 .envelopes {\n    width: 16%;\n  }\n  .layout1 .envelopes .module {\n    display: inline-block;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Parameters =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Parameters, _React$Component);

  function Parameters(props) {
    var _this;

    _classCallCheck(this, Parameters);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Parameters).call(this, props));
    _this.updateSynthFilter = _this.updateSynthFilter.bind(_assertThisInitialized(_this));
    _this.setOscValue = _this.setOscValue.bind(_assertThisInitialized(_this));
    _this.updateSynthFilter = _this.updateSynthFilter.bind(_assertThisInitialized(_this));
    _this.setWaveFormValue = _this.setWaveFormValue.bind(_assertThisInitialized(_this));
    _this.setAdsrValue = _this.setAdsrValue.bind(_assertThisInitialized(_this));
    _this.state = {
      view: "grid",
      ampEnvelope: {
        attackTime: 0.1,
        decayTime: 3,
        sustainLevel: 0.4,
        releaseTime: 0.1
      }
    };
    return _this;
  }

  _createClass(Parameters, [{
    key: "setWaveFormValue",
    value: function setWaveFormValue(event, property) {
      /*this.setFatValue(this.setValue(event.target.dataset.value, property);*/
      this.setOscValue(property.oscId, property.field, event.target.dataset.value);
    }
  }, {
    key: "setOscValue",
    value: function setOscValue(oscId, property, value) {
      console.log("setOscValue(oscId, property, value)", oscId, property, value);
      this.props.updateSynthOscState(oscId, property, value);
    }
  }, {
    key: "changeView",
    value: function changeView(view) {
      this.setState({
        view: view
      });
    }
  }, {
    key: "setAdsrValue",
    value: function setAdsrValue(envelopeId, property, value) {
      var updateEnvelopeState = this.props.updateEnvelopeState;
      updateEnvelopeState(envelopeId, property, value);
    }
  }, {
    key: "updateSynthFilter",
    value: function updateSynthFilter(filterId, property, value) {
      this.props.updateSynthFilterState(filterId, property, value);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      console.log("this.nextProps.osc1.tuning", nextProps.instrument.oscillators[0].tuning);
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      //const { instrument } = this.state;
      var instrument = this.props.instrument;
      var lowPassFilterValue = instrument.filters[0].props.value;
      var resonanceFilterValue = instrument.filters[0].props.Q;
      var ampEnvelope = instrument.envelopes[1];
      return _react.default.createElement("div", {
        className: this.props.className + " sequencedSynth layout1"
      }, _react.default.createElement("div", {
        className: "body machine"
      }, _react.default.createElement("div", {
        style: {
          float: "left"
        }
      }, _react.default.createElement("div", {
        className: "clearBoth sources slot"
      }, _react.default.createElement(_Oscillator.default, {
        oscNo: 1,
        oscIndex: 0,
        name: "o1",
        setOscValue: this.setOscValue,
        setWaveFormValue: this.setWaveFormValue,
        oscillator: instrument.oscillators[0],
        tuning: instrument.oscillators[0].tuning,
        classNames: "source osc osc1 clearfix module"
      }), _react.default.createElement(_Oscillator.default, {
        oscNo: 2,
        oscIndex: 1,
        name: "o2",
        setOscValue: this.setOscValue,
        setWaveFormValue: this.setWaveFormValue,
        oscillator: instrument.oscillators[1],
        tuning: instrument.oscillators[1].tuning,
        classNames: "source osc osc1 osc2-m osc2 clearfix module"
      })), " ", _react.default.createElement("div", {
        className: "filters slot"
      }, _react.default.createElement(_FilterPanel.default, {
        cutoff: lowPassFilterValue,
        resonance: resonanceFilterValue,
        updateSynthFilter: this.updateSynthFilter
      }), " "), " ", _react.default.createElement("div", {
        className: "envelopes slot"
      }, " ", " ", _react.default.createElement(_Adsr.default, {
        envelopeId: 1,
        setValue: this.setAdsrValue,
        defaultValue: this.state.ampEnvelope,
        values: ampEnvelope,
        controls: "amp"
      })), " "), " "), " ");
    }
  }]);

  return Parameters;
}(_react.default.Component);

var styledParameters = (0, _styledComponents.default)(Parameters)(_templateObject());
var _default = styledParameters;
exports.default = _default;