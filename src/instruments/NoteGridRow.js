import React from 'react';

let mouseElement = null;

class NoteGridRow extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  subPeriodClick(key) {
    const { changeGridSequence } = this.props;
    const beatNumber = key[1] / 4 + 1;

    changeGridSequence(key, 0.25, beatNumber);
  }

  subPeriodMouseDown(key) {
    mouseElement = key;
  }

  subPeriodChange(key) {

    const { changeGridSequence } = this.props;

    if(key && mouseElement) {
      let noteLength = 1;
      let sendKey = key;

      if (key[0] !== mouseElement[0] || key[1] !== mouseElement[1]) {
        noteLength = key[1] - mouseElement[1] + 1; //Number of quarter notes
        sendKey[1] = mouseElement[1];
      }
      const beatNumber = key[1] / 4 + 1;

      //This is in ticks - let lengthInBeats = noteLength / 4;
      let lengthInBeats = noteLength / 4;

      changeGridSequence(sendKey, lengthInBeats, beatNumber);

      mouseElement = null;
    }

  }

  render() {

    const { isSharp, pianoKey, beats } = this.props;
    const { midiNumber } = pianoKey;

    let className = isSharp ? 'sharp pianoKey' : 'pianoKey';
    className = midiNumber === 60 ? className+' middleC' : className;
    return (
      <tr>
        <td className={className} />
        {this.renderRows(beats * 4)}
      </tr>
    );
  }

  renderRows(noSubPeriods) {
    var subPeriods = [];

    for (var i = 0; i < noSubPeriods; i++) {
      subPeriods.push(this.renderSubPeriod(i));
    }
    return subPeriods;
  }

  renderSubPeriod(subPeriodId) {
    const { pianoKey } = this.props;
    const { midiNumber } = pianoKey;

    return (
      <td
        key={subPeriodId}
        onTouchStart={this.subPeriodClick.bind(this, [midiNumber, subPeriodId])}
        onMouseDown={this.subPeriodMouseDown.bind(this, [
          midiNumber,
          subPeriodId
        ])}
        onMouseUp={this.subPeriodChange.bind(this, [midiNumber, subPeriodId])}
      />
    );
  }

  getNoteWidth(durationInBeats) {
    return durationInBeats * (22.5 * 4) + 'px';
  }
};

/*
const NoteGridRowF = (props) => {

  const subPeriodClick = (key) => {
    const { changeGridSequence } = props;
    const beatNumber = key[1] / 4 + 1;

    changeGridSequence(key, 0.25, beatNumber);
  }

  const subPeriodMouseDown = (key) => {
    mouseElement = key;
  }

  const subPeriodChange = (key) => {

    const { changeGridSequence } = props;

    if(key && mouseElement) {
      let noteLength = 1;
      let sendKey = key;

      if (key[0] !== mouseElement[0] || key[1] !== mouseElement[1]) {
        noteLength = key[1] - mouseElement[1] + 1; //Number of quarter notes
        sendKey[1] = mouseElement[1];
      }
      const beatNumber = key[1] / 4 + 1;

      //This is in ticks - let lengthInBeats = noteLength / 4;
      let lengthInBeats = noteLength / 4;

      changeGridSequence(sendKey, lengthInBeats, beatNumber);

      mouseElement = null;
    }

  }
  const renderRows = (noSubPeriods) => {
    var subPeriods = [];

    for (var i = 0; i < noSubPeriods; i++) {
      subPeriods.push(renderSubPeriod(i));
    }
    return subPeriods;
  }

  const renderSubPeriod = (subPeriodId) => {
    const { pianoKey } = props;
    const { midiNumber } = pianoKey;

    return (
      <td
        key={subPeriodId}
        onTouchStart={subPeriodClick.bind(this, [midiNumber, subPeriodId])}
        onMouseDown={subPeriodMouseDown.bind(this, [
          midiNumber,
          subPeriodId
        ])}
        onMouseUp={subPeriodChange.bind(this, [midiNumber, subPeriodId])}
      />
    );
  }

  const getNoteWidth = (durationInBeats) => {
    return durationInBeats * (20 * 4) + 'px';
  }

  const { isSharp, pianoKey, beats } = props;
  const { midiNumber } = pianoKey;

  let className = isSharp ? 'sharp pianoKey' : 'pianoKey';
  className = midiNumber === 60 ? className+' middleC' : className;

  return (
    <tr>
      <td className={className} />
      {renderRows(beats * 4)}
    </tr>
  );


};
*/

export default NoteGridRow;