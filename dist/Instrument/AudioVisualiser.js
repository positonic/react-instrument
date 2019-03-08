"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _webaudioPeaks = _interopRequireDefault(require("webaudio-peaks"));

var _CanvasHook = _interopRequireDefault(require("./CanvasHook"));

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

var WIDTH = 300;
var HEIGHT = 300;

var AudioVisualiser =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(AudioVisualiser, _React$Component);

    function AudioVisualiser(props) {
      var _this;

      _classCallCheck(this, AudioVisualiser);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(AudioVisualiser).call(this, props)
      );
      _this.canvas = _react.default.createRef();
      _this.draw = _this.draw.bind(_assertThisInitialized(_this));
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.playSound = _this.playSound.bind(_assertThisInitialized(_this));
      _this.audioContext = new AudioContext();
      _this.source = _this.audioContext.createBufferSource(); // creates a sound source

      _this.source.buffer = props.buffer; //const samplesPerPixel = 4096;

      var samplesPerPixel = 40;
      var isMono = true;
      var cueIn = 0;
      var sampleRate = 4410;

      var cueOut = _this.secondsToSamples(
        _this.source.buffer.duration,
        sampleRate
      );

      _this.peaks = (0, _webaudioPeaks.default)(
        _this.source.buffer,
        samplesPerPixel,
        isMono,
        cueIn,
        cueOut,
        8
      );

      _this.renderPeaks();

      _this.analyser = _this.audioContext.createAnalyser();

      _this.source.connect(_this.analyser);

      _this.analyser.connect(_this.audioContext.destination);

      return _this;
    }

    _createClass(AudioVisualiser, [
      {
        key: "renderPeaks",
        value: function renderPeaks() {
          var peaks = this.peaks.data[0];
          var offset = 0;
          var bits = 8;
          var canvasColor = "white";
          this.canvasHook = new _CanvasHook.default(
            peaks,
            offset,
            this.peaks.bits,
            canvasColor
          );
        }
      },
      {
        key: "secondsToSamples",
        value: function secondsToSamples(seconds, sampleRate) {
          return Math.ceil(seconds * sampleRate);
        }
      },
      {
        key: "playSound",
        value: function playSound() {
          debugger;
          var osc = this.audioContext.createOscillator();
          osc.frequency.value = 60;
          osc.type = "square";
          var oscGain = this.audioContext.createGain();
          oscGain.gain.value = 0.2;
          osc.start(this.audioContext.currentTime);
          osc.stop(this.audioContext.currentTime + 3);
          osc.connect(oscGain);
          oscGain.connect(this.analyser);
          /*Connect oscillator to analyser node*/

          this.analyser.connect(this.audioContext.destination);
        }
      },
      {
        key: "draw",
        value: function draw() {
          this.drawVisual = requestAnimationFrame(this.draw);
          this.analyser.getByteTimeDomainData(this.dataArray);
          this.canvasContext.fillStyle = "rgb(230, 20, 210)";
          this.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
          this.canvasContext.lineWidth = 2;
          this.canvasContext.strokeStyle = "rgb(40, 95, 95)";
          this.canvasContext.beginPath();
          var sliceWidth = (WIDTH * 1.0) / this.bufferLength;
          var x = 0;

          for (var i = 0; i < this.bufferLength; i++) {
            var v = this.dataArray[i] / 128.0;
            var y = (v * HEIGHT) / 2;

            if (i === 0) {
              this.canvasContext.moveTo(x, y);
            } else {
              this.canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
          }

          this.canvasContext.lineTo(
            this.canvas.current.width,
            this.canvas.current.height / 2
          );
          this.canvasContext.stroke();
        }
      },
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          var canvas = this.canvas.current;
          this.canvasHook.hook(canvas); //rect = canvas.getBoundingClientRect();
          //this.fitToContainer(canvas); //Make canvas size of parent

          /*this.canvasContext = canvas.getContext('2d');
       //this.analyser = this.props.analyser;
      this.analyser.fftSize = 2048;
       this.bufferLength = this.analyser.frequencyBinCount;
      console.log('this.bufferLength, ', this.bufferLength);
      /!*an unsigned long value half that of the FFT size. This generally equates to
      the number of data values you will have to play with for the visualization*!/
       this.dataArray = new Uint8Array(this.bufferLength);
       this.canvasContext.clearRect(0, 0, WIDTH, HEIGHT);*/
        }
      },
      {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {}
      },
      {
        key: "onClick",
        value: function onClick() {
          //this.playSound();
          this.source.start(0);
          /*this.draw();*/
        }
      },
      {
        key: "render",
        value: function render() {
          return _react.default.createElement(
            "div",
            null,
            _react.default.createElement(
              "button",
              {
                onClick: this.onClick
              },
              "click"
            ),
            _react.default.createElement("canvas", {
              ref: this.canvas,
              className: "visualizer",
              id: "myCanvas",
              width: "340",
              height: "150"
            })
          );
        }
      }
    ]);

    return AudioVisualiser;
  })(_react.default.Component);

exports.default = AudioVisualiser;
