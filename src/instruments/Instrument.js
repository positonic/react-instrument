import {
  convertTickToLoopTick,
  getNoteLengthSecondsFromBeats,
  getSequencedNotes
} from './utils';

import React from 'react';
import PropTypes from 'prop-types';
import InstrumentSelector from './controls/InstrumentSelector';
import { PianoKeys } from './utils/PianoKeys';
import { KeyboardShortcuts, MidiNumbers} from 'react-piano';
import styled from 'styled-components';
import DeleteInstrument from './controls/DeleteInstrument';
import BeatsPerLoopSelector from './controls/BeatsPerLoopSelector';
import ToggleMoreSettings from './controls/ToggleMoreSettings';
import {SetMidiCallbacks } from './controls/Midi';
import AudioVisualiser from "./AudioVisualiser";

const SequencedKeyboardContainer = styled.div`
  float: left;
  .body {
    position: relative;
    float: left;
    width:100%; 
  }
`;

const Instrument = styled.div`
  width:100%;
`;

const SequencedKeyboardBody = styled.div`
  float: left;

  .body {
    position: relative;
    float: left;
    width:100%;
 
  }
`;

const ActivateInstrument = styled.a`
  margin-left: 10px;
  cursor: pointer;
  i {
    font-size: 30px;
  }
`;
const SoundSourceBox = styled.div`
  vertical-align: top;
  display: inline-block;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: inline;
    button {
      padding: 10px;
    }
  }
`
const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f5')
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW
});

function getDefaultGridConfig(beatsPerLoop) {
  return {
    instrumentType: 'sequencedSynth',
    sequencedNotes: {},
    numberOfNotes: PianoKeys.length,
    pianoKeys: PianoKeys,
    notes: [],
    //beats: beatsPerLoop,
    gridWidthPixels: 22.5,
    gridHeightPixels: 20,
    ticksPerBeat: 4
  };
}

export function withParameters(SequencedKeyboard, Parameters, props) {
  class WithParameters extends React.Component {
    getParameters(instrument) {
      return (
        <Parameters
          instrument={instrument}
          updateSynthOscState={props.updateSynthOscState}
          updateEnvelopeState={props.updateEnvelopeState}
          {...props}
        />
      );
    }
    render() {
      return <SequencedKeyboard getParameters={this.getParameters} {...props} />;
    }
  }

  return WithParameters;
}

let playingVoices = {};

export function withSequencedKeyboard(
  SequencedKeyboard,
  SoundProvider,
  Parameters,
  Effects,
  props
) {
  const { trackId, instrumentId } = props;
  const midi = null;


  let noteGridSettings = getDefaultGridConfig();
  noteGridSettings.beats = props.instrument.beatsPerLoop;

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.setVoices = this.setVoices.bind(this);
      this.deleteInstrument = this.deleteInstrument.bind(this);
      this.changeInstrument = this.changeInstrument.bind(this);
      this.toggleMoreSettings = this.toggleMoreSettings.bind(this);
      this.updateSynthFilterState = this.updateSynthFilterState.bind(this);
      this.updateSynthOscState = this.updateSynthOscState.bind(this);
      this.updateEnvelopeState = this.updateEnvelopeState.bind(this);
      this.onTick = this.onTick.bind(this);
      this.setSelectedNotes = this.setSelectedNotes.bind(this);

      this.state = {
        showAnalyser: false,
        instrument: props.instrument
      };

      this.props.timeSequencer.subscribeToTicks(props.instrumentId, this.onTick);
    }

    static propTypes = {
      audioContext: PropTypes.instanceOf(window.AudioContext),
      instrumentNames: PropTypes.array.isRequired,
      currentInstrument: PropTypes.string.isRequired,
      mainOutput: PropTypes.object.isRequired,
      instrument: PropTypes.object.isRequired
    };

    setActiveMidi(playNote, stopNote) {
      SetMidiCallbacks(midi, playNote, stopNote);
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.instrument !== this.props.instrument || nextState.instrument !== this.state.instrument) {
        return true;
      }

      return false;
    }

    changeInstrument(evt) {
      this.props.changeSequencedKeyboardInstrument(trackId, instrumentId, evt.target.value);
    }

    deleteInstrument() {
      this.props.deleteInstrument(trackId, instrumentId);
    }

    getInstrumentSelector(instrumentNames, currentInstrument) {
      if (instrumentNames.length) {
        return (
          <InstrumentSelector
            instruments={instrumentNames}
            changeInstrument={this.changeInstrument}
            currentInstrument={currentInstrument}
          />
        );
      } else return null;
    }

    setVoices(voices) {
      //this.props.setVoices(trackId, instrumentId, voices);
      playingVoices = voices;
    }

    activateInstrument() {
      props.setArmedInstrument(instrumentId);
    }

    setInstrumentGain(value) {
      props.setInstrumentGain(trackId, instrumentId, value);
    }

    updateSynthOscState(oscId, property, value) {
      //this.props.updateSynthOscState(this.props.trackId, this.props.instrumentId, oscId, property, value);
      console.log('updating state updateSynthOscState');

      this.setState(state => ({
        ...state,
        instrument: {
          ...state.instrument,
          oscillators: state.instrument.oscillators.map((item, index) => {
            if (index !== oscId) {
              // This isn't the item we care about - keep it as-is
              return item;
            }

            const newOsc = state.instrument.oscillators[oscId];
            newOsc[property] = value;

            console.log('new newOsc instrument state = ', {
              ...item,
              ...newOsc
            });
            return {
              ...item,
              ...newOsc
            };
          })
        }
      }), () => {
        console.log('Newstate is ', this.state);
      });
    }

    updateEnvelopeState(envelopeId, property, value) {
      //this.props.updateSynthOscState(this.props.trackId, this.props.instrumentId, oscId, property, value);
      console.log('updating state updateSynthOscState');

      this.setState(state => ({
        ...state,
        instrument: {
          ...state.instrument,
          envelopes: state.instrument.envelopes.map((item, index) => {
            if (index !== envelopeId) {
              // This isn't the item we care about - keep it as-is
              return item;
            }

            const newOsc = state.instrument.envelopes[envelopeId];
            newOsc[property] = value;

            console.log('new newOsc instrument state = ', {
              ...item,
              ...newOsc
            });
            return {
              ...item,
              ...newOsc
            };
          })
        }
      }), () => {
        console.log('Newstate is ', this.state);
      });
    }

    updateSynthFilterState(filterId, property, value) {
      /*this.props.updateSynthFilter(
        this.props.trackId,
        this.props.instrumentId,
        filterId,
        property,
        value
      );*/
      this.setState(state => ({
        ...state,
        instrument: {
          ...state.instrument,
          filters: state.instrument.filters.map((item, index) => {
            if (index !== filterId) {
              // This isn't the item we care about - keep it as-is
              return item;
            }

            const newFilter = state.instrument.filters[filterId];
            if (property === 'filter') newFilter.props.value = value;
            else if (property === 'resonance') newFilter.props.Q = value;
            else console.log('Error unexpected propery', property);
            console.log('newFilter.props is ', property, newFilter.props);
            // Otherwise, this is the one we want - return an updated value

            return {
              ...item,
              ...newFilter
            };
          })
        }
      }));
    }

    /**
     * tick: {
     *   tickNumber,
     *   time
     * }
     * @param tick
     */
    onTick(tick) {
      const { instrument } = this.state;
      if(instrument.isMuted !== true) {
        const notes = instrument.notes[instrument.notesIndex];

        let ticksPerLoop = instrument.beatsPerLoop * 4;

        const loopTick = convertTickToLoopTick(tick.tickNumber, ticksPerLoop);

        let beatTimeTick = loopTick; //Notes starting a quarter note too soon for some reason, this fixes it

        if (notes.length) {
          const sequencedNotes = getSequencedNotes(notes, beatTimeTick);
          if (sequencedNotes.length) {
            sequencedNotes.forEach(note => {
              if (note.on === true || note.on === 1) {
                let noteLengthInSeconds = getNoteLengthSecondsFromBeats(note.duration, tick.bpm);
                this.playNoteAtTime(note.midiNumber, tick.time, noteLengthInSeconds);
              }
            });
          }
        }
      }

    }
    toggleMoreSettings() {
      //this.props.toggleShowInstrumentSettings(this.props.trackId, this.props.instrumentId);
      const { showMoreSettings } = this.state.instrument;
      const state = this.state;
      console.log(state, showMoreSettings, this.state.instrument);

      this.setState(state => ({
        ...state,
        instrument: {
          ...state.instrument,
          showMoreSettings: !showMoreSettings
        }
      }));
    }
    setSelectedNotes(selectedNotes) {

      this.setState(state => ({
        ...state,
        instrument: {
          ...state.instrument,
          selectedNotes
        }
      }));
    }

    deleteSelectedNotes(notesToDelete) {
      
      /*const notes = fromJS(this.state.instrument.notes).update(notesIndex, arr => {
        let newNotes;
        notesToDelete.forEach(noteIndex => {
          newNotes = arr.delete(noteIndex);
        });
        return newNotes;
      });

      this.setState(state => ({
        ...state,
        instrument: {
          ...state.instrument,
          notes: notes
        }
      }));*/
    }

    render() {
      const {
        audioContext,
        instrumentNames,
        mainOutput,
        bpm,
        currentInstrument,
        samplesBuffers,
        instrumentId,
        showInstrument,
        changeSequencedKeyboardView,
        isArmed
      } = this.props;


      let outputJack = null;
      var Visualiser = null;
      if(this.state.showAnalyser === true) {
        let analyser = audioContext.createAnalyser();
        analyser.connect(mainOutput);
        outputJack = mainOutput;
        Visualiser = (buffer) => <AudioVisualiser buffer={buffer} analyser={analyser}/>
      } else {
        outputJack = mainOutput;
        Visualiser= () => '';
      }
      const { instrument } = this.state;

      return (
        <Instrument
          className="sequencedSynth"
        >
          <SoundProvider
            audioContext={audioContext}
            instrumentNames={instrumentNames}
            currentInstrument={currentInstrument}
            /*mainOutput={outputJack}*/
            bpm={bpm}
            gain={props.gain}
            instrumentId={instrumentId}
            synthConfig={{
              oscillators: instrument.oscillators,
              envelopes: instrument.envelopes,
              isMuted: instrument.instrument
            }}
            filters={instrument.filters}
            setVoices={this.setVoices}
            playingVoices={playingVoices}
            samplesBuffers={samplesBuffers}
            gainNode={props.gainNode}
            render={({ isLoading, playNote, playNoteAtTime, stopNote }) => {
              this.playNoteAtTime = playNoteAtTime;
              let pianoSettings = {
                playNote,
                playNoteAtTime,
                stopNote,
                disabled: isLoading,
                isLoading,
                width: 700,
                keyboardShortcuts,
                noteRange
              };

              if (isArmed && midi) this.setActiveMidi(playNote, stopNote);
              let instrumentParameters;

              if (Parameters && instrument.showMoreSettings)
                instrumentParameters = (
                  <Parameters
                    updateSynthFilterState={this.updateSynthFilterState}
                    updateSynthOscState={this.updateSynthOscState}
                    updateEnvelopeState={this.updateEnvelopeState}
                    instrument={instrument}
                    oscillators={instrument.oscillators}
                  />
                );
              else instrumentParameters = '';

              let instrumentEffects;

              if (Effects && instrument.showEffects === true)
                instrumentEffects = <Effects instrument={instrument} {...this.props} />;
              else instrumentEffects = '';
              const activateStyle = isArmed
                ? {
                    color: 'yellow'
                  }
                : {
                    color: 'auto'
                  };

              if (showInstrument) {
                return (
                  <SequencedKeyboardContainer>
                    <div
                      className="body machine"
                      /*style={{
                    width: instrumentWidth
                  }}*/
                    >
                      <DeleteInstrument deleteInstrument={this.deleteInstrument} />
                      <h3>{currentInstrument.replace(/_/gi, ' ')}
                        <ActivateInstrument style={activateStyle} onClick={this.activateInstrument}>
                          <i className="fa fa-bolt" />
                        </ActivateInstrument></h3>
                      {((showAnalyser, currentInstrument, samplesBuffers) => {
                        if(showAnalyser) return Visualiser(samplesBuffers.filter(o => o.name === currentInstrument)[0].buffer)})(this.state.showAnalyser, currentInstrument, samplesBuffers)
                      }
                      {this.getInstrumentSelector(instrumentNames, currentInstrument)}

                      <SequencedKeyboard
                        setSelectedNotesState={this.setSelectedNotes}
                        playNote={playNote}
                        stopNote={stopNote}
                        pianoSettings={pianoSettings}
                        noteGridSettings={noteGridSettings}
                        activeView={instrument.view}
                        instrument={instrument}
                        isArmed={isArmed}
                        deleteSelectedNotesState={this.deleteSelectedNotes}
                        changeSequencedKeyboardView={changeSequencedKeyboardView}
                        {...props}
                        render={({
                          changeView,
                          changeNumberOfBeatsLoop,
                          getView,
                          getNoteGrid,
                          toggleEffects
                        }) => {
                          return (
                            <SequencedKeyboardBody>
                              <SoundSourceBox className="synthFullPanel">
                                {
                                  <ul>
                                    <li>
                                      <button
                                        onClick={() => changeView('grid')}
                                        className="metal linear"
                                      >
                                        sequencer
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => changeView('keyboard')}
                                        className="metal linear"
                                      >
                                        keyboard
                                      </button>
                                    </li>
                                    {/* {this.getToggleMoreSettingsButton()}*/}
                                    <li>
                                      <ToggleMoreSettings onClick={this.toggleMoreSettings}>
                                        <i className="fa fa-bars" />
                                      </ToggleMoreSettings>
                                    </li>
                                    <li>
                                      <ToggleMoreSettings onClick={toggleEffects}>
                                        <i className="fa fa-assistive-listening-systems" />
                                      </ToggleMoreSettings>
                                    </li>
                                  </ul>
                                }
                                {instrumentParameters} <br className="clearBoth" />
                                {instrumentEffects}
                                <BeatsPerLoopSelector
                                  noLoopBeats={instrument.beatsPerLoop}
                                  changeNumberOfBeatsLoop={noOfBeats => {
                                    changeNumberOfBeatsLoop(noOfBeats);
                                  }}
                                />
                                {getView()}
                              </SoundSourceBox>

                                {getNoteGrid()}
                            </SequencedKeyboardBody>
                          );
                        }}
                      />
                    </div>

                    {/*<InstrumentWires isMuted={instrument.isMuted} onToggle={onToggle} setInstrumentGain={this.setInstrumentGain} gainValue={instrument.gain} />*/}
                  </SequencedKeyboardContainer>
                );
              } else {
                return null;
              }
            }}
          />
        </Instrument>
      );
    }
  };
}
