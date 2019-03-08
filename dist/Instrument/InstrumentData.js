"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameMidiNoteSameBeat = isSameMidiNoteSameBeat;
exports.buildNewNotes = buildNewNotes;
exports.buildChangedNotes = buildChangedNotes;
exports.deleteNotes = deleteNotes;
exports.isSameMidiNote = isSameMidiNote;

var _immutable = require("immutable");

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function getNoteFromMidiNumberBeatNumber(
  instrumentNotes,
  midiNumber,
  beatNumber
) {
  return instrumentNotes && instrumentNotes.length
    ? instrumentNotes.find(function(o) {
        return isSameMidiNote(o, midiNumber) && o.beat_time === beatNumber;
      })
    : undefined;
}

function isSameMidiNoteSameBeat(midiNumber, beatNumber) {
  return function(note) {
    return note.midiNumber === midiNumber && note.beat_time === beatNumber;
  };
}

function buildNewNotes(
  instrumentNotes,
  midiNumber,
  beatNumber,
  noteLengthBeats
) {
  var newInstrumentNotes;
  var changedNote = getNoteFromMidiNumberBeatNumber(
    instrumentNotes,
    midiNumber,
    beatNumber
  );

  if (typeof changedNote === "undefined") {
    //create new note
    var newNote = {};
    newNote.beat_time = beatNumber;
    newNote.duration = noteLengthBeats;
    newNote.midiNumber = midiNumber;
    newNote.on = 1;
    instrumentNotes.push(newNote);
    newInstrumentNotes = instrumentNotes;
  } else {
    var imInstrumentNotes = (0, _immutable.fromJS)(instrumentNotes);
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

function buildChangedNotes(
  instrumentNotes,
  index,
  midiNumber,
  beatNumber,
  noteLengthBeats
) {
  var newInstrumentNotes;
  var changedNote = instrumentNotes[index];

  if (typeof changedNote === "undefined") {
    console.log("Error shouldnt come here");
  } else {
    var imInstrumentNotes = (0, _immutable.fromJS)(instrumentNotes);
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

function deleteNotes(instrumentNotes, notesToDelete) {
  var imInstrumentNotes = (0, _immutable.fromJS)(instrumentNotes);
  notesToDelete.forEach(function(noteIndex) {
    imInstrumentNotes = imInstrumentNotes.delete(noteIndex);
  });
  return imInstrumentNotes.toJS();
}

function isSameMidiNote(note, midiNumber) {
  if (!_typeof(note.get) === "function") {
    return note.get("midiNumber") === midiNumber;
  }

  return note.midiNumber === midiNumber && typeof midiNumber !== "undefined";
}
