"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  var data = _taggedTemplateLiteral(["\n  border: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: ", ";\n  display: inline-block;\n  position: absolute;\n  margin: 0 20px 0 10px;\n  background-color: #333;\n  padding: 3px;\n  overflow: hidden;\n  \n  .waveSawtooth {\n    background-image: url(/images/oscillator_saw_black_30.png);\n  }\n  .waveSquare {\n    background-image: url(/images/oscillator_square_black_30.png);\n  }\n  .waveSine {\n    background-image: url(/images/oscillator_sine_black_30.png);\n  }\n  .waveTriangle {\n    background-image: url(/images/oscillator_triangle_black_30.png);\n  }\n  input {\n    margin: 0;\n    padding: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n\n    position: absolute;\n    z-index: 999;\n  }\n  input:active + .waveFormLabel,\n  .waveHolder input:active + .waveFormLabel {\n    opacity: 0.9;\n  }\n\n  input:checked + .waveFormLabel,\n  .waveHolder input:checked + .waveFormLabel {\n    -webkit-filter: none;\n    -moz-filter: none;\n    filter: none;\n  }\n\n  label {\n    \n    cursor: pointer;\n    background-size: contain;\n    background-repeat: no-repeat;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    -webkit-transition: all 100ms ease-in;\n    -moz-transition: all 100ms ease-in;\n    transition: all 100ms ease-in;\n    -webkit-filter: brightness(1.8) grayscale(1) opacity(0.7);\n    -moz-filter: brightness(1.8) grayscale(1) opacity(0.7);\n    filter: brightness(1.8) grayscale(1) opacity(0.7);\n  }\n\n  label:hover {\n    -webkit-filter: brightness(1.2) grayscale(0.5) opacity(0.9);\n    -moz-filter: brightness(1.2) grayscale(0.5) opacity(0.9);\n    filter: brightness(1.2) grayscale(0.5) opacity(0.9);\n  }\n\n  img {\n    width: 20px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var WaveHolder = _styledComponents.default.span(_templateObject(), function (props) {
  return props.isOpen ? 'auto' : '25px';
});

var WaveForm = _styledComponents.default.label(_templateObject2(), function (props) {
  return props.isActive ? "1px solid #FFFF00" : 'auto';
});

var WaveFormShape = function WaveFormShape(props) {
  return React.createElement("span", {
    style: {
      display: 'block',
      width: '20px'
    }
  }, React.createElement("input", {
    id: props.id,
    defaultChecked: true,
    type: "radio",
    name: "waveform" + props.oscNo,
    value: props.shape
  }), React.createElement(WaveForm, {
    isActive: props.shape === props.oscillator.type,
    onTouchStart: function onTouchStart(evt) {
      return props.setWaveFormValue(evt, {
        oscId: props.oscIndex,
        field: 'type'
      });
    },
    onClick: function onClick(evt) {
      return props.setWaveFormValue(evt, {
        oscId: props.oscIndex,
        field: 'type'
      });
    },
    className: props.id,
    htmlFor: props.id,
    "data-value": props.shape
  }));
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var WaveShapeSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WaveShapeSelector, _React$Component);

  function WaveShapeSelector(props) {
    var _this;

    _classCallCheck(this, WaveShapeSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WaveShapeSelector).call(this, props));
    _this.state = {
      isOpen: false,
      waveforms: ['sawtooth', 'square', 'sine', 'triangle']
    };
    _this.setIsOpen = _this.setIsOpen.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(WaveShapeSelector, [{
    key: "setIsOpen",
    value: function setIsOpen(evt) {
      evt.preventDefault();
      var isOpen = this.state.isOpen;
      console.log('setIsOpen', isOpen);
      this.setState({
        isOpen: !isOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var oscillator = this.props.oscillator;
      return React.createElement(WaveHolder, {
        onClick: this.setIsOpen,
        isOpen: this.state.isOpen
      }, React.createElement(WaveFormShape, {
        id: "wave" + capitalizeFirstLetter(oscillator.type),
        oscIndex: this.props.oscIndex,
        shape: oscillator.type,
        oscNo: this.props.oscNo,
        oscillator: oscillator,
        setWaveFormValue: this.props.setWaveFormValue
      }), this.state.waveforms.map(function (waveform) {
        if (waveform !== oscillator.type) {
          return React.createElement(WaveFormShape, {
            key: waveform,
            id: "wave" + capitalizeFirstLetter(waveform),
            oscIndex: _this2.props.oscIndex,
            shape: waveform,
            oscNo: _this2.props.oscNo,
            oscillator: oscillator,
            setWaveFormValue: _this2.props.setWaveFormValue
          });
        } else {
          return null;
        }
      }));
    }
  }]);

  return WaveShapeSelector;
}(React.Component);
/*const WaveShapeSelector: any = (props: any) => {

  const {oscillator} = props;
  //['sawtooth', 'square', 'sine', 'triangle'].map();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
      <WaveHolder isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <WaveFormShape id={"wave"+capitalizeFirstLetter(oscillator.type)} oscIndex={props.oscIndex} shape={oscillator.type} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
        <WaveFormShape id="waveSquare" oscIndex={props.oscIndex} shape={'square'} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
        <WaveFormShape id="waveSine" oscIndex={props.oscIndex} shape={'sine'} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
        <WaveFormShape id="waveTriangle" oscIndex={props.oscIndex} shape={'triangle'} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
      </WaveHolder>
  );
};*/


var _default = WaveShapeSelector;
exports.default = _default;