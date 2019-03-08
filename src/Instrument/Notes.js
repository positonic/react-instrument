import styled from "styled-components";
import React from "react";
/*
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
*/
import { Rnd } from "react-rnd"; // The default

const NotesBlock = styled.div`
  position: absolute;
  width: ${props => props.blockWidth};
  height: 100%;
  left: 80px;
  top: 0;
`;
const Note = styled.div`
  position: absolute;
  border: ${props => (props.isSelected ? "1px solid white" : "auto")}
  width: ${props => props.noteWidth};
  height: 20px;
  left: ${props => props.left};
  top: ${props => props.top};
  background: #01a9e8;
  z-index: 1;
`;

/*const NoteResizer = styled.div`
  width: ${props => props.resizerWidth};
  height: 20px;
  position: relative;
`;
const Handle = styled.div`
  width: 5px;
  height: 20px;
  background: blue;
  cursor: text;
  display: inline-block;
  vertical-align: top;
`;
const NoteBody = styled.div`
  width: ${props => props.bodyWidth};
  background: #01a9e8;
  cursor: pointer;
  height: 20px;
  display: inline-block;
  vertical-align: top;
`;*/
/* const keyNotes = this.props.notes.filter(o => o.midiNumber === pianoKey.midiNumber);

    const notes = keyNotes ? keyNotes : [];*/
//let mousePosition;
/*function Resize(panel) {
  return function resize(e) {
    const dx = mousePosition - e.x;
    mousePosition = e.x;
    panel.style.width = parseInt(getComputedStyle(panel, '').width) + dx + 'px';
  };
}*/
/*function removeListeners() {
  document.removeEventListener ('mousemove', resize, true);
  document.mouseup ('mousemove', removeListeners, true);
}*/

//let mouseElement = null;

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.drawNote = this.drawNote.bind(this);
    this.OnResizeStop = this.OnResizeStop.bind(this);
    //this.onClick = this.onClick.bind(this);
    this.state = {
      /*selectedNotes: [],
       */
      mousePosition: null,
      xPos: 60,
      yPos: 100
    };
    this.resizing = false;
    const { trackId, instrumentId, pianoKeys } = this.props;
    this.trackId = trackId;
    this.instrumentId = instrumentId;
    this.pianoKeys = pianoKeys;
  }

  /* onClick(evt) {
    evt.preventDefault();
    debugger
    this.props.setSelectedNotes(evt.target.noteIndex);

    return false;
  }*/

  OnResizeStop(index, duration) {
    return (evt, direction, refToElement, delta, position) => {
      evt.preventDefault();
      const newNoteLength = duration + delta.width / 80;
      this.props.changeSequencedNote(index, null, newNoteLength, null);
    };
  }

  drawNote(note, id, index) {
    const {
      trackId,
      instrumentId,
      pianoKeys,
      gridWidthPixels,
      gridHeightPixels
    } = this.props;
    const { selectedNotes, setSelectedNotes } = this.props;

    let xPos = (note.beat_time - 1) * 4 * gridWidthPixels;

    const pianoKeyIndex = pianoKeys.findIndex(
      o => o.midiNumber === note.midiNumber
    );
    const yPos = pianoKeyIndex * gridHeightPixels;

    const noteWidth = note.duration * gridWidthPixels * 4;
    const onClick = this.onClick;

    return (
      <Rnd
        key={"id" + id}
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        }}
        onResizeStop={this.OnResizeStop(index, note.duration)}
        style={{ zIndex: 1 }}
        size={{ width: noteWidth, height: gridHeightPixels }}
        position={{ x: xPos, y: yPos }}
        onDragStop={(evt, data) => {
          evt.preventDefault();

          const dragToKeyIndex = data.lastY / gridHeightPixels;
          const newMidiNumber = pianoKeys[dragToKeyIndex].midiNumber;

          const newBeatNumber = data.lastX / (gridWidthPixels * 4) + 1;
          if (data.deltaX === 0 && data.deltaY === 0) {
            //this.props.setSelectedNotes(trackId, instrumentId, [index]);
            setSelectedNotes([index]);

            /*this.setState({
              selectedNotes: [index]
            })*/
          } else {
            this.props.changeSequencedNote(
              index,
              newMidiNumber,
              note.duration,
              newBeatNumber
            );
          }
          return false;
        }}
        dragGrid={[gridWidthPixels, gridHeightPixels]}
      >
        <Note
          onClick={onClick}
          noteIndex={index}
          noteWidth={"100%"}
          isSelected={selectedNotes.indexOf(index) > -1}
        />
      </Rnd>
    );
  }

  render() {
    const { notes, noteGridWidth } = this.props;
    const drawNote = this.drawNote;

    if (notes)
      return (
        <NotesBlock blockWidth={noteGridWidth + "px"}>
          {notes.map((note, index) =>
            drawNote(note, note.midiNumber + "-" + index, index)
          )}
        </NotesBlock>
      );
    else return null;
  }
}

export default Notes;
