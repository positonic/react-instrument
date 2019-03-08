import { fromJS } from "immutable";

function getNoteFromMidiNumberBeatNumber(
  instrumentNotes,
  midiNumber,
  beatNumber
) {
  return instrumentNotes && instrumentNotes.length
    ? instrumentNotes.find(
        o => isSameMidiNote(o, midiNumber) && o.beat_time === beatNumber
      )
    : undefined;
}

export function isSameMidiNoteSameBeat(midiNumber, beatNumber) {
  return function(note) {
    return note.midiNumber === midiNumber && note.beat_time === beatNumber;
  };
}

export function buildNewNotes(
  instrumentNotes,
  midiNumber,
  beatNumber,
  noteLengthBeats
) {
  let newInstrumentNotes;

  let changedNote = getNoteFromMidiNumberBeatNumber(
    instrumentNotes,
    midiNumber,
    beatNumber
  );

  if (typeof changedNote === "undefined") {
    //create new note
    let newNote = {};
    newNote.beat_time = beatNumber;
    newNote.duration = noteLengthBeats;
    newNote.midiNumber = midiNumber;
    newNote.on = 1;
    instrumentNotes.push(newNote);
    newInstrumentNotes = instrumentNotes;
  } else {
    let imInstrumentNotes = fromJS(instrumentNotes);
    newInstrumentNotes = imInstrumentNotes
      .update(
        imInstrumentNotes.findIndex(
          isSameMidiNoteSameBeat(midiNumber, beatNumber)
        ),
        function(item) {
          return item.set("on", !item.get("on"));
        }
      )
      .toJS();
  }

  return newInstrumentNotes;
}

export function buildChangedNotes(
  instrumentNotes,
  index,
  midiNumber,
  beatNumber,
  noteLengthBeats
) {
  let newInstrumentNotes;

  let changedNote = instrumentNotes[index];

  if (typeof changedNote === "undefined") {
    console.log("Error shouldnt come here");
  } else {
    let imInstrumentNotes = fromJS(instrumentNotes);
    newInstrumentNotes = imInstrumentNotes
      .update(
        instrumentNotes.findIndex(
          isSameMidiNoteSameBeat(midiNumber, beatNumber)
        ),
        function(item) {
          item = beatNumber ? item.set("beat_time", beatNumber) : item;
          item = noteLengthBeats ? item.set("duration", noteLengthBeats) : item;
          item = midiNumber ? item.set("midiNumber", midiNumber) : item;
          return item;
        }
      )
      .toJS();
  }

  return newInstrumentNotes;
}
export function deleteNotes(instrumentNotes, notesToDelete) {
  let imInstrumentNotes = fromJS(instrumentNotes);

  notesToDelete.forEach(noteIndex => {
    imInstrumentNotes = imInstrumentNotes.delete(noteIndex);
  });

  return imInstrumentNotes.toJS();
}

export function isSameMidiNote(note, midiNumber) {
  if (!typeof note.get === "function") {
    return note.get("midiNumber") === midiNumber;
  }
  return note.midiNumber === midiNumber && typeof midiNumber !== "undefined";
}
