import React, { Component } from 'react';
import "./App.css";
import Simpler from "./instruments/Simpler/index";
import instrument from "./data/sampler";
import * as sampleLoader from './SampleLoader';
import * as Gain from './instruments/audio/Gain';
import NanoEvents from "nanoevents";

window['fluent'] = window['fluent'] || {};
window['fluent'].emitter = new NanoEvents();

const audioContext = new AudioContext();

const instrumentNames = [
  "claustra",
  "vinyl",
  "moog1",
  "moog2",
  "acid",
  "distBass1c",
  "distBass3c",
  "distBass5e",
  "distBass8g",
  "distBass7g",
  "distBass8e",
  "wobbleBass1g",
  "synthMc9Dist2c",
  "synthMc9Dist3c"
];

let sampleFilePaths = {
  bdImpact: '/samples/BD IMPACT.wav',
  clave808: '/samples/E808_CL-01.wav',
  clap808: '/samples/E808_CP-01.wav',
  clpCreep: '/samples/CLP CREEP.wav',
  clpDetroit: '/samples/CLP DETROIT.wav',
  hatBasic: '/samples/HAT BASIC.wav',
  hatBonaFide: '/samples/HAT BONA FIDE.wav',
  hatBrush: '/samples/HAT BRUSH.wav',
  hatCym: '/samples/HAT CYM.wav',
  claustra: '/samples/pads/cw_virus_claustrophobia.wav',
  vinyl: '/samples/vinyl/Vinyl Noise 04.wav',
  metronome: '/samples/metronomes/Ableton/Metronome.wav',
  metronomeUp: '/samples/metronomes/Ableton/MetronomeUp.wav',

  moog1: '/samples/moog/MG Rogue Bass FX1-2.wav',
  acid: '/samples/acid/MC09 Acid BassLine01 120 Em.wav',
  distBass1c: '/samples/bass/MC09 Dist Bass 01 C.wav',
  distBass3c: '/samples/bass/MC09 Dist Bass 03 C.wav',
  distBass5e: '/samples/bass/MC09 Dist Bass 05 E.wav',
  distBass8g: '/samples/bass/MC09 Dist Bass 08 G.wav',
  distBass7g: '/samples/bass/MC09 Sub Bass 07 G.wav',
  distBass8e: '/samples/bass/MC09 Sub Bass 08 E.wav',
  wobbleBass1g: '/samples/bass/MC09 Wobble Bass 01 G.wav',
  synthMc9Dist2c: '/samples/synth/MC09 Dist 7th Synth 02 C.wav',
  synthMc9Dist3c: '/samples/synth/MC09 Dist 7th Synth 03 C.wav'
};

const instrumentIndex = 0;


var _asyncRequest;

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      samplesBuffers: [],
      instrument: instrument
    }
    this.changeSequencedKeyboardView = this.changeSequencedKeyboardView.bind(this);
  }
  componentDidMount() {
    _asyncRequest = sampleLoader
        .init(audioContext, sampleFilePaths)
        .then(loadedSamplesBuffers => {
          _asyncRequest = null;

          this.setState({
            samplesBuffers: loadedSamplesBuffers
          });
        });


  }

  componentWillUnmount() {
    if (_asyncRequest) {
      _asyncRequest.cancel();
    }
  }
  changeSequencedKeyboardView() {
    this.setState(state => ({
      ...state,
      instrument: {
        ...state.instrument,
        view: (state.instrument.view === 'grid' ? 'keyboard' : 'grid')
      }
    }));
  }

  renderSimpler(loadingSamples, samplesBuffers) {

    if(!loadingSamples && samplesBuffers.length > 0) {

      let gainNode = Gain.create(audioContext, audioContext.destination, instrument.gain);

      return (
        <div
          className="instrument"
          style={{
            display: "inline-block",
            marginRight: "20px",
            verticalAlign: "top"
          }}
        >
          <Simpler
            audioContext={audioContext}
            mainOutput={gainNode}
            instrument={this.state.instrument}
            instrumentId={instrumentIndex}
            instrumentNames={instrumentNames}
            currentInstrument={instrument.currentInstrument}
            samplesBuffers={samplesBuffers}
            gainNode={gainNode}
            changeSequencedKeyboardView={this.changeSequencedKeyboardView}
          />
        </div>
      );
    } else return null;
  }

  render() {
    return (
      <div className="App">
        <h2>Sampler</h2>
        {this.renderSimpler(_asyncRequest, this.state.samplesBuffers)}
      </div>
    );
  }
}

export default App;
