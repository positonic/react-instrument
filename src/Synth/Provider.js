// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React from "react";
import PropTypes from "prop-types";
import { synthPlayer } from "./players/synth";
import { outputChannel } from "../InstrumentOutput";
import { Source } from "../AudioUtils/Oscillator";

class SynthProvider extends React.Component {
  static propTypes = {
    instrumentNames: PropTypes.array.isRequired,
    audioContext: PropTypes.instanceOf(window.AudioContext),
    render: PropTypes.func,
    synthConfig: PropTypes.object.isRequired
  };

  static defaultProps = {
    currentInstrument: "defaultCurrentInstrument!"
  };

  constructor(props) {
    super(props);
    const { audioContext, synthConfig, filters, instrumentId } = this.props;

    this.gainNode = this.props.gainNode;

    this.synthOutputChannel = outputChannel(
      audioContext,
      filters ? filters : [],
      this.gainNode
    );

    this.filterNodes = this.synthOutputChannel.filterNodes;
    this.sourceNode = Source(audioContext);

    this.play = synthPlayer(audioContext, synthConfig);
    this.oscillators = this.sourceNode.setupOscillators(
      synthConfig.oscillators
    );

    this.state = {
      playingVoices: {
        a: []
      }
    };

    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
    this.playNoteAtTime = this.playNoteAtTime.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.filters !== this.props.filters) {
      const filterFieldsToUpdate = [
        { field: "frequency", value: nextProps.filters[0].props.value },
        { field: "Q", value: nextProps.filters[0].props.Q }
      ];
      this.filterNodes = this.synthOutputChannel.updateValue(
        0,
        filterFieldsToUpdate
      );
    } else if (nextProps.synthConfig !== this.props.synthConfig) {
      this.oscillators.forEach((osc, index) => {
        osc = this.sourceNode.applyTuning(
          osc,
          nextProps.synthConfig.oscillators[index].tuning
        );
        osc.frequency.value = osc.frequencyWithoutPipeLength
          ? this.sourceNode.applyPipeLength(
              osc.frequencyWithoutPipeLength,
              nextProps.synthConfig.oscillators[index].pipeLength
            )
          : 0;
        osc.type = nextProps.synthConfig.oscillators[index].type;
        osc.gain = nextProps.synthConfig.oscillators[index].gain / 100;
        osc.gainNode.gain.value =
          nextProps.synthConfig.oscillators[index].gain / 100;
      });
    }
    return true;
  }

  componentWillUnmount() {
    //todo: Temporary solution, might need to pull keyboard down and up as well as voices out of react completely?
    this.stopAllNotes();
  }

  playNoteAtTime = (midiNumber, time, noteLengthInSeconds) => {
    const { currentInstrument, bpm, synthConfig } = this.props;
    this.oscillators = this.sourceNode.setupOscillators(
      synthConfig.oscillators
    );

    this.play(
      midiNumber,
      time,
      noteLengthInSeconds,
      bpm,
      currentInstrument,
      this.filterNodes,
      this.oscillators
    );
  };

  playNote = midiNumber => {
    const { currentInstrument, synthConfig } = this.props;
    this.oscillators = this.sourceNode.setupOscillators(
      synthConfig.oscillators
    );

    this.playingVoices = this.play(
      midiNumber,
      0,
      null,
      null,
      currentInstrument,
      this.filterNodes,
      this.oscillators
    );
  };

  stopNote = midiNumber => {
    this.playingVoices[midiNumber].forEach(voice => {
      if (voice.vca) {
        voice.vca.gain.linearRampToValueAtTime(0, voice.release);
        voice.source.gainNode.gain.linearRampToValueAtTime(0, voice.release);

        setTimeout(() => {
          voice.source.stop();
          //voice.vca.gain.value = this.props.gain;
        }, voice.release);
      } else {
        console.log("hard stop key up");
        voice.source.stop();
      }
    });
  };

  stopNoteAtTime = (midiNumber, time) => {
    this.playingVoices[midiNumber].forEach(voice => {
      if (voice.vca) {
        console.log("soft stop voice.release", voice.release);
        voice.vca.gain.linearRampToValueAtTime(0, voice.release);

        setTimeout(() => {
          voice.source.stop();
          //voice.vca.gain.value = this.gainNode.gain.value;
        }, voice.release);
      } else {
        console.log("hard stop key up");
        voice.source.stop();
      }
    });
  };

  // Clear any residual notes that don't get called with stopNote
  stopAllNotes = () => {
    for (const note in this.playingVoices) {
      if (this.playingVoices.hasOwnProperty(note)) {
        this.playingVoices[note].forEach(voice => {
          if (voice.vca) {
            voice.vca.gain.linearRampToValueAtTime(0, voice.release);
            setTimeout(() => {
              voice.source.stop();
              //voice.vca.gain.value = this.props.gain;
            }, voice.release);
          } else {
            voice.source.stop();
          }
        });
      }
    }
  };

  render() {
    return this.props.render({
      isLoading: false,
      playNote: this.playNote,
      playNoteAtTime: this.playNoteAtTime,
      stopNote: this.stopNote,
      stopAllNotes: this.stopAllNotes
    });
  }
}

export default SynthProvider;
