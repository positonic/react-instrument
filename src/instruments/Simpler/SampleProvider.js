// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React from "react";
import PropTypes from "prop-types";
import { samplePlayer } from "../players/sample";
import { outputChannel } from "../InstrumentOutput";

class SampleProvider extends React.Component {
  static propTypes = {
    instrumentNames: PropTypes.array.isRequired,
    audioContext: PropTypes.instanceOf(window.AudioContext),
    render: PropTypes.func
  };

  static defaultProps = {
    currentInstrument: "moog1"
  };

  constructor(props) {
    super(props);

    this.playNote = this.playNote.bind(this);
    this.playNoteAtTime = this.playNoteAtTime.bind(this);

    const { audioContext, filters, instrumentId, samplesBuffers } = this.props;

    this.gainNode = this.props.gainNode;

    this.outputChannel = outputChannel(
      audioContext,
      filters ? filters : [],
      this.gainNode
    );

    this.play = samplePlayer(
      this.props.audioContext,
      this.outputChannel.filterNodes[0],
      samplesBuffers
    );

    this.state = {
      activeAudioNodes: {},
      instrument: null
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.gain !== this.props.gain) {
      this.gainNode.gain.value = nextProps.gain;
    }
    return true;
  }

  componentDidMount() {
    /*sampleLoader.init(this.props.audioContext, sampleFilePaths).then(loadedSamplesBuffers => {
      this.samplesBuffers = loadedSamplesBuffers;

      this.play = samplePlayer(this.props.audioContext, this.outputChannel.filterNodes[0], this.samplesBuffers);

    });*/
  }

  playNoteAtTime = (midiNumber, time, noteLengthInSeconds) => {
    const { currentInstrument, bpm } = this.props;

    this.play(midiNumber, time, noteLengthInSeconds, bpm, currentInstrument);
  };
  playNote = midiNumber => {
    this.voice = this.play(
      midiNumber,
      0,
      null,
      null,
      this.props.currentInstrument
    );
  };

  stopNote = midiNumber => {
    this.voice.stop();
  };

  // Clear any residual notes that don't get called with stopNote
  stopAllNotes = () => {
    this.props.audioContext.resume().then(() => {
      const activeAudioNodes = Object.values(this.state.activeAudioNodes);
      activeAudioNodes.forEach(node => {
        if (node) {
          node.stop();
        }
      });
      this.setState({
        activeAudioNodes: {}
      });
    });
  };

  render() {
    return this.props.render({
      isLoading: !this.state.instrument,
      playNote: this.playNote,
      playNoteAtTime: this.playNoteAtTime,
      stopNote: this.stopNote,
      stopAllNotes: this.stopAllNotes
    });
  }
}

export default SampleProvider;
