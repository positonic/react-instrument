import React from 'react';
import { Piano } from 'react-piano';
import 'react-piano/dist/styles.css';
import NoteGrid from './NoteGrid';
import PropTypes from 'prop-types';
import { instrumentsChanged } from './ShouldUpdate';
import styled from "styled-components";
import Timeline from "./controls/Timeline";

const PianoDarkTheme = styled.div`
  .ReactPiano__Key--accidental {
    background: #025d7d;
    border: 1px solid #888;
  }
  .ReactPiano__Key--natural {
    background: #013243;
    border: 1px solid #888;
    margin-right: 0;
  }
  .ReactPiano__Key--active.ReactPiano__Key--accidental {
    background: #0396ca;
  }
  .ReactPiano__Key--active.ReactPiano__Key--natural {
    background: #0396ca;
  }
`;

const NoteGridBox = styled.div`
  margin-top: 88px;
  display: inline-block;
  height: 700px;
  overflow: hidden;
`;


class SequencedKeyboard extends React.Component {
  static propTypes = {
    pianoSettings: PropTypes.object.isRequired,
    noteGridSettings: PropTypes.object.isRequired,
    instrument: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.getView = this.getView.bind(this);
    this.toggleEffects = this.toggleEffects.bind(this);
    this.changeNumberOfBeatsLoop = this.changeNumberOfBeatsLoop.bind(this);
    this.getNoteGrid = this.getNoteGrid.bind(this);
    this.changeView = this.changeView.bind(this);
    this.deleteSelectedNotes = this.deleteSelectedNotes.bind(this);
    //This is too slow - props.timeSequencer.subscribeToTicks(this.onTick);

    this.state = {
      showMoreSettings: false
    };
    //props.timeSequencer.registerInstrumentPlayer(this.props.Instrument.type+'-'+this.props.Instrument.instrumentName, this.onTick);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      instrumentsChanged(nextProps, this.props) ||
      nextProps.pianoSettings !== this.props.pianoSettings ||
      nextProps.noteGridSettings !== this.props.noteGridSettings
    ) {
      return true;
    } else {
      return false;
    }
  }

  getButtonText() {}

  getView() {
    const {
      pianoSettings,
      noteGridSettings,
      isArmed,
      activeView
    } = this.props;
    const { gridWidthPixels, gridHeightPixels, ticksPerBeat, pianoKeys, instrumentType } = noteGridSettings;
    const { playNote, stopNote } = pianoSettings;

    if (activeView === 'grid') {
      return null;
    } else {
      return (
        <div>
          <PianoDarkTheme>
            <Piano
              disabled={!isArmed}
              noteRange={pianoSettings.noteRange}
              playNote={playNote}
              stopNote={stopNote}
              width={pianoSettings.width}
              keyboardShortcuts={pianoSettings.keyboardShortcuts}
            />
          </PianoDarkTheme>
        </div>
      );
    }
  }
  deleteSelectedNotes(selectedNotes) {
    this.props.deleteSelectedNotesState(selectedNotes);
  }
  getNoteGrid() {

    const {
      noteGridSettings,
      setSelectedNotesState,
      instrumentId,
      instrument,
      activeView,
      changeGridSequence
    } = this.props;

    if (activeView !== 'grid') return null;
    else {

      const {gridWidthPixels, ticksPerBeat, pianoKeys, instrumentType, gridHeightPixels} = noteGridSettings;

      return (
        <NoteGridBox>
          <Timeline noBeats={instrument.beatsPerLoop}></Timeline>
          <NoteGrid
            selectedNotes={instrument.selected_notes}
            setSelectedNotes={setSelectedNotesState}
            gridWidthPixels={gridWidthPixels}
            gridHeightPixels={gridHeightPixels}
            ticksPerBeat={ticksPerBeat}
            instrumentType={instrumentType}
            pianoKeys={pianoKeys}
            instrumentId={instrumentId}
            notes={instrument.notes[instrument.notesIndex]}
            instrumentNotes={instrument.notes[instrument.notesIndex]}
            beatsPerLoop={this.props.noteGridSettings.beats}
            deleteSelectedNotes={this.deleteSelectedNotes}
            audioContext={this.props.audioContext}
            changeGridSequence={changeGridSequence}
          />
        </NoteGridBox>
      );
    }
  }
  changeView(view) {
    const { changeSequencedKeyboardView, instrumentId } = this.props;

    changeSequencedKeyboardView(instrumentId, view);
  }

  changeNumberOfBeatsLoop(evt) {
    this.props.changeBeatsPerLoop(this.props.trackId, this.props.instrumentId, evt.target.value);
  }

  toggleEffects() {
    this.props.toggleShowEffects(this.props.trackId, this.props.instrumentId);
  }

  render() {
    return this.props.render({
      changeView: this.changeView,
      changeNumberOfBeatsLoop: this.changeNumberOfBeatsLoop,
      getView: this.getView,
      getNoteGrid: this.getNoteGrid,
      toggleMoreSettings: this.toggleMoreSettings,
      toggleEffects: this.toggleEffects
    });
  }
}

export default SequencedKeyboard;
