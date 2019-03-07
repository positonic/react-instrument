import React from "react";
import NoteGridRow from "./NoteGridRow";
import styled from "styled-components";
import Notes from "./Notes";
import { getBeatFromTick, getLoopBeat } from "./utils";

const NoteGridBackground = styled.div`
  background: url('/images/grid.png') repeat;
  width: ${props => (props.gridWidth ? props.gridWidth + "px" : "1440px")}
  height: 2300px;
  margin-left: 80px;
`;

const NoteGridBlock = styled.div`
  left: 0;
  position: relative;
`;

const PianoKey = styled.div`
  height: 19px;
  background-color: ${props =>
    props.isMiddleC ? "floralwhite" : "whitesmoke"};
  width: 100%;
  border-bottom: 1px solid #d8d7dd;
  color: #333;
  font-size: 13px;
  line-height: 20px;
  text-align: right;
`;

const PianoKeyHolder = styled.div`
  height: 19px;
  width: 100%;
  background-color: whitesmoke;
  border-bottom: 1px solid #d8d7dd;
`;

const PianoKeyBlack = styled.div`
  height: 19px;
  background-color: black;
  width: 66%;
  border-bottom: 1px solid #d8d7dd;
`;

const PianoBlock = styled.div`
  float:left;
  background-image: linear-gradient( 90deg,
		var( --gsuiKeys-whiteKey-colorA ),
		var( --gsuiKeys-whiteKey-colorB ) )
  background-color: white;
  width: 80px;
  height: 700px;
`;

const Child = styled.div`
  height: 2300px;
  position: relative;
`;

class NoteGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      bpm: this.props.bpm,
      stylusInterval: null
    };

    this.xGridSize = 22.5;
    this.yGridSize = 20;

    this.beatPixels = props.gridWidthPixels * 4;

    this.canvas = React.createRef();
    this.noteGridScroller = React.createRef();
    this.xpos = 0;

    this.drawPlayingStylus = this.drawPlayingStylus.bind(this);
    this.calculateXPos = this.calculateXPos.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.changeGridSequence = this.changeGridSequence.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.convertMouseToCoordinates = this.convertMouseToCoordinates.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.mouseDown = {};
  }

  calculateWidth(beatsPerLoop) {
    this.gridWidthPixels = this.props.gridWidthPixels
      ? this.props.gridWidthPixels
      : 22.5;
    return this.props.ticksPerBeat * beatsPerLoop * this.gridWidthPixels;
  }

  renderKeys(pianoKeys) {
    let rows = [];

    this.props.pianoKeys.forEach((pianoKey, index) => {
      rows.push(this.renderKey(pianoKey, index));
    });

    return rows;
  }

  renderKey(pianoKey, i) {
    if (pianoKey.isSharp) {
      return (
        <PianoKeyHolder key={i}>
          <PianoKeyBlack />
        </PianoKeyHolder>
      );
    } else {
      if (pianoKey.note.indexOf("C") > -1) {
        return (
          <PianoKeyHolder key={i}>
            <PianoKey isMiddleC={pianoKey.midiNumber === 60}>
              {pianoKey.note}{" "}
            </PianoKey>
          </PianoKeyHolder>
        );
      } else {
        return (
          <PianoKeyHolder key={i}>
            <PianoKey />
          </PianoKeyHolder>
        );
      }
    }
  }

  onKeyDown(evt) {
    const { selectedNotes, deleteSelectedNotes } = this.props;
    if (evt.key === "Delete") {
      //This was the actioncreator - deleteSelectedNotes(trackId, instrumentId, selectedNotes);
      deleteSelectedNotes(selectedNotes);
    }
  }

  componentDidMount() {
    let canvas = this.canvas.current;

    this.canvasContext = canvas.getContext("2d");
    this.canvasContext.translate(18.75 + 4, 0); // make 0, next to the piano keys
    this.canvasContext.globalAlpha = 0.8;
    //this.canvasContext.strokeStyle = '#FFFF00';
    this.canvasContext.strokeStyle = "#FFF";
    this.canvasContext.lineWidth = 1;

    window.fluent.emitter.on("togglePlay", this.togglePlay);
    document.addEventListener("keydown", this.onKeyDown);

    if (this.props.firstRender) {
      setTimeout(() => {
        const highestNoteMidiNumber = Math.max.apply(
          Math,
          this.props.instrumentNotes.map(function(o) {
            return o.midiNumber;
          })
        );

        const highestPianoMidiNumber = 127;
        const differenceToTop = highestPianoMidiNumber - highestNoteMidiNumber;
        const keyHeight = 20;
        const noKeysToPadTop = 10;
        this.noteGridScroller.current.scrollTop =
          (differenceToTop - noKeysToPadTop) * keyHeight;
      }, 500);
    }
  }

  togglePlay(playObj) {
    if (playObj.isPlaying === true) {
      const stylusInterval = setInterval(() => {
        requestAnimationFrame(this.drawPlayingStylus);
      }, 1000 / 60);

      this.setState({
        startTime: playObj.startTime,
        bpm: playObj.bpm,
        stylusInterval: stylusInterval
      });
    } else {
      clearInterval(this.state.stylusInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.stylusInterval);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  calculateXPos() {
    const secondsPassed =
      this.props.audioContext.currentTime - this.state.startTime;
    const beatsPerSecond = this.state.bpm / 60;
    const beatsPassed = secondsPassed * beatsPerSecond;

    let loopBeat = getLoopBeat(beatsPassed, this.props.beatsPerLoop);

    let xPos = (loopBeat * this.beatPixels) / 4; // why div 4? Makes no sense - but works

    return xPos;
  }

  drawPlayingStylus() {
    if (this.canvas.current)
      this.canvasContext.clearRect(-2, 0, this.canvas.current.width, 2321);
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.xpos, 0);
    this.canvasContext.lineTo(this.xpos, 2321);
    this.canvasContext.stroke();

    this.xpos = this.calculateXPos();
  }

  convertMouseToCoordinates(event, eventType) {
    const canvas = this.canvas.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return { x: x, y: y };
  }

  onMouseDown(event) {
    this.mouseDown = this.convertMouseToCoordinates(event, "down");
  }

  getMidiNumberFromYCoOrdinate(yCoOrd) {
    const rowNo = Math.ceil(yCoOrd / this.yGridSize);
    const indexOffsetRowNo = rowNo - 1;
    const lastMidiNote = 127; //Highest at the top;

    const midiRowNo = lastMidiNote - indexOffsetRowNo;

    return midiRowNo;
  }

  getBeatNumberFromXCoOrdinate(xCoOrd) {
    const tickNo = Math.ceil(xCoOrd / this.xGridSize);

    return getBeatFromTick(tickNo - 1);
  }

  onMouseUp(event) {
    const beatNumber = this.getBeatNumberFromXCoOrdinate(this.mouseDown.x);
    const midiNumber = this.getMidiNumberFromYCoOrdinate(this.mouseDown.y);

    const mouseUpCoOrdinates = this.convertMouseToCoordinates(event, "up");

    const xDif = mouseUpCoOrdinates.x - this.mouseDown.x;

    const noteLengthTicks = xDif / this.xGridSize;
    const noteLengthBeats = noteLengthTicks / 4;

    this.changeGridSequence(midiNumber, noteLengthBeats, beatNumber);
  }

  changeGridSequence(midiNumber, noteLengthBeats, beatNumber) {
    const { changeGridSequence, instrumentId } = this.props;
    changeGridSequence(midiNumber, instrumentId, noteLengthBeats, beatNumber);
  }

  render() {
    const {
      beatsPerLoop,
      instrumentNotes,
      trackId,
      instrumentId,
      pianoKeys,
      setSelectedNotes,
      selectedNotes
    } = this.props;

    const gridWidth = this.calculateWidth(beatsPerLoop);

    return (
      <div className={this.props.className} ref={this.noteGridScroller}>
        <Child>
          <canvas
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            ref={this.canvas}
            width={gridWidth}
            height="660"
          />
          <NoteGridBlock>
            <PianoBlock>{this.renderKeys(pianoKeys)}</PianoBlock>
            <NoteGridBackground gridWidth={gridWidth} />
            <Notes
              onKeyDown={this.onKeyPress}
              onKeyPress={this.onKeyPress}
              selectedNotes={selectedNotes}
              setSelectedNotes={setSelectedNotes}
              pianoKeys={pianoKeys}
              beatsPerLoop={beatsPerLoop}
              notes={instrumentNotes}
              trackId={trackId}
              instrumentId={instrumentId}
              changeSequencedNote={this.props.changeSequencedNote}
              gridWidthPixels={this.props.gridWidthPixels}
              gridHeightPixels={this.props.gridHeightPixels}
              noteGridWidth={gridWidth}
            />
          </NoteGridBlock>
        </Child>
      </div>
    );
  }
}

export default styled(NoteGrid)`
  canvas {
    position: absolute;
    z-index: 1;
    margin-left: 80px;
    height: 2300px;
  }
  width: 1520px;
  overflow: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox
`;
