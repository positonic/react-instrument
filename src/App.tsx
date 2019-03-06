import React, { Component } from 'react';
import Simpler from "./Instrument/Simpler/index";
import instrument from "./data/sampler";
import * as sampleLoader from './SampleLoader';
import * as Gain from './Instrument/audio/Gain';
import NanoEvents from "nanoevents";
import PlayButton from 'fluent-react-play-button';
import * as TimeSequencer from './Instrument/TimeSequencer';
import styled from "styled-components";

import Provider from './Provider';
import Instrument from './Instrument';
import InstrumentConfig from './Instrument/types/InstrumentConfig';

window['fluent'] = window['fluent'] || {};
window['fluent'].emitter = new NanoEvents();

const PlayButtonHolder = styled.a`
  float:right;
  cursor: pointer;
  i {
    font-size: 40px;
  }
  i:hover {
    color: #01A9E8;
    }
`;

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

  gainNode

  constructor(props) {
    super(props);
    this.state = {
      samplesBuffers: [],
      instrument: instrument,
      isPlaying: false
    }
    this.playButtonClick = this.playButtonClick.bind(this);
    this.changeSequencedKeyboardView = this.changeSequencedKeyboardView.bind(this);
    this.toggleShowEffects = this.toggleShowEffects.bind(this);
    this.changeBeatsPerLoop = this.changeBeatsPerLoop.bind(this);

    this.gainNode = Gain.create(audioContext, audioContext.destination, instrument.gain);

  }

  componentDidMount() {
    TimeSequencer.init(audioContext, this.gainNode);

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
  changeSequencedKeyboardView(instrumentId: number, view: string) {
    this.setState(state => ({
      ...state,
      instrument: {
        ...state.instrument,
        view: (state.instrument.view === 'grid' ? 'keyboard' : 'grid')
      }
    }));
  }

  changeGridSequence(midiNumber: number, instrumentId: number, instrument: any, noteLengthBeats: number, beatNumber: number) :void {
    debugger
  }


  changeSequencedKeyboardInstrument(instrumentId: number, value: number) :void {
    debugger
  }


  deleteInstrument(instrumentId: number) :void {
    debugger
  }

  setArmedInstrument(instrumentId: number) :void {
    debugger
  }

  setInstrumentGain(instrumentId: number, value: number) :void {
    debugger
  }

  changeBeatsPerLoop(instrumentId: number, value: number) :void {
    //this.props.changeBeatsPerLoop(this.props.trackId, this.props.instrumentId, evt.target.value);
    const {showEffects} = this.state.instrument;

    this.setState(state => ({
      ...state,
      instrument: {
        ...state.instrument,
        beatsPerLoop: value
      }
    }));
  }

  toggleShowEffects(instrumentId: number) :void {
    //this.props.toggleShowEffects(this.props.trackId, this.props.instrumentId);
    const {showEffects} = this.state.instrument;

    this.setState(state => ({
      ...state,
      instrument: {
        ...state.instrument,
        showEffects: !showEffects
      }
    }));
  }

  renderSimpler(loadingSamples, samplesBuffers) {

    if(!loadingSamples && samplesBuffers.length > 0) {
      const instrumentConfig: InstrumentConfig = {
        provider: Provider,
        audioContext: audioContext,
        mainOutput: this.gainNode,
        timeSequencer: TimeSequencer,
        instrument: this.state.instrument,
        instrumentId: instrumentIndex,
        instrumentNames: instrumentNames,
        currentInstrument: instrument.currentInstrument,
        samplesBuffers: samplesBuffers,
        gainNode: this.gainNode,
        gain: 0.2,
        isArmed: true,
        showInstrument: true,

        changeGridSequence: this.changeGridSequence,
        changeBeatsPerLoop: this.changeBeatsPerLoop,
        toggleShowEffects: this.toggleShowEffects,
        changeSequencedKeyboardInstrument: this.changeSequencedKeyboardInstrument,
        deleteInstrument: this.deleteInstrument,
        setArmedInstrument: this.setArmedInstrument,
        setInstrumentGain: this.setInstrumentGain,
        changeSequencedKeyboardView: this.changeSequencedKeyboardView,
      }

      return (
        <div
          className="instrument"
          style={{
            display: "inline-block",
            marginRight: "20px",
            verticalAlign: "top",
            backgroundColor: '#222'
          }}
        >
          <Instrument
          config={instrumentConfig}
        />
        </div>
      );
    } else return null;
  }

  playButtonClick() {

    if (this.state.isPlaying === false) {
      TimeSequencer.play();
      window['fluent'].emitter.emit('togglePlay', {
        isPlaying: true,
        startTime: audioContext.currentTime,
        bpm: 120
      });
      this.setState({
        isPlaying: true
      });
    } else {
      TimeSequencer.stop();
      window['fluent'].emitter.emit('togglePlay', {
        isPlaying: false,
        startTime: audioContext.currentTime,
        bpm: 120
      });

      this.setState({
        isPlaying: false
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h2>Sampler</h2>
        <PlayButtonHolder>
          <PlayButton
            playButtonClick={this.playButtonClick}
            class="mainPlay"
            isPlaying={this.state.isPlaying}
          />
        </PlayButtonHolder>
        {this.renderSimpler(_asyncRequest, this.state.samplesBuffers)}
      </div>
    );
  }
}

export default App;
