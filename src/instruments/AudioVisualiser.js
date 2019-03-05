import React from 'react';
import extractPeaks from 'webaudio-peaks';
import CanvasHook from "./CanvasHook";

var WIDTH = 300;
var HEIGHT = 300;

export default class AudioVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.draw = this.draw.bind(this);
    this.onClick = this.onClick.bind(this);
    this.playSound = this.playSound.bind(this);

    this.audioContext = new AudioContext();

    this.source = this.audioContext.createBufferSource(); // creates a sound source
    this.source.buffer = props.buffer;
    //const samplesPerPixel = 4096;
    const samplesPerPixel = 40;
    const isMono = true;
    const cueIn = 0;
    const sampleRate = 4410;

    const cueOut = this.secondsToSamples(this.source.buffer.duration, sampleRate);

    this.peaks = extractPeaks(this.source.buffer, samplesPerPixel, isMono, cueIn, cueOut, 8)

    this.renderPeaks();
    this.analyser = this.audioContext.createAnalyser();

    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

  };

  renderPeaks() {

    const peaks = this.peaks.data[0];

    const offset = 0;
    const bits = 8;
    const canvasColor = 'white';

    this.canvasHook = new CanvasHook(peaks, offset, this.peaks.bits, canvasColor);

  }
  secondsToSamples(seconds, sampleRate) {
    return Math.ceil(seconds * sampleRate);
  }

  playSound() {
    debugger
    var osc = this.audioContext.createOscillator();
    osc.frequency.value = 60;
    osc.type = 'square';

    let oscGain = this.audioContext.createGain();
    oscGain.gain.value = 0.2;

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 3);

    osc.connect(oscGain);
    oscGain.connect(this.analyser); /*Connect oscillator to analyser node*/
    this.analyser.connect(this.audioContext.destination);
  }


  draw() {

    this.drawVisual = requestAnimationFrame(this.draw);

    this.analyser.getByteTimeDomainData(this.dataArray);
    console.log('in draw ', this.dataArray);
    this.canvasContext.fillStyle = 'rgb(230, 20, 210)';
    this.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'rgb(40, 95, 95)';
    this.canvasContext.beginPath();

    var sliceWidth = WIDTH * 1.0 / this.bufferLength;
    var x = 0;

    for (var i = 0; i < this.bufferLength; i++) {

      var v = this.dataArray[i] / 128.0;
      var y = v * HEIGHT / 2;

      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }
    ;

    this.canvasContext.lineTo(this.canvas.current.width, this.canvas.current.height / 2);
    this.canvasContext.stroke();
  }

  componentDidMount() {
    let canvas = this.canvas.current;
    this.canvasHook.hook(canvas);
    //rect = canvas.getBoundingClientRect();
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

  shouldComponentUpdate(nextProps) {

  }

  onClick() {
    //this.playSound();
    this.source.start(0);
    /*this.draw();*/

  }
  render() {
    return (<div>
      <button onClick={this.onClick}>click</button>
      <canvas ref={this.canvas} className="visualizer" id="myCanvas" width="340" height="150"></canvas>
    </div>);
  }
}