"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PadBars = PadBars;
exports.getMaxInstrumentLength = getMaxInstrumentLength;
exports.getSequenceLengthFromNotes = getSequenceLengthFromNotes;
exports.getNoteLengthSecondsFromBeats = getNoteLengthSecondsFromBeats;
exports.getBeatFromTick = getBeatFromTick;
exports.getSequencedNotes = getSequencedNotes;
exports.convertTickToLoopTick = convertTickToLoopTick;
exports.getViewTickNumber = getViewTickNumber;
exports.getLoopLengthTicks = getLoopLengthTicks;
exports.getLoopBeat = getLoopBeat;
exports.getViewBeatNumber = getViewBeatNumber;
exports.getViewBeatFromBeat = getViewBeatFromBeat;
exports.getLoopTick = getLoopTick;
exports.getLoopBeatAll = getLoopBeatAll;
exports.getFrequencyOfNote = getFrequencyOfNote;
exports.validLoopLengths = void 0;
var validLoopLengths = [4, 8, 16, 32, 64, 128];
exports.validLoopLengths = validLoopLengths;

function needsPadding(instrument, maxLength) {
  return instrument.length < maxLength;
}
/**
 * if a look is 16 and the full length is 64 :
 * 64/16 - 4
 * @param instrument
 * @param maxLength
 * @returns {boolean}
 */


function noLoopsToFill(instrument, maxLength) {
  return maxLength / instrument.length;
}
/**
 *
 * @param numberOfTicks The number of ticks (usually 4 per beat)
 * @returns {function(*=): Array}
 * @constructor
 */


function PadBars(numberOfTicks) {
  return function (multiLengthInstruments) {
    var maxInstrumentLength = getMaxInstrumentLength(multiLengthInstruments);
    var maxLength = numberOfTicks > maxInstrumentLength ? numberOfTicks : maxInstrumentLength; //console.log('maxLength is ', maxLength);

    var paddedArray = [];
    multiLengthInstruments.forEach(function (instrument, key) {
      //console.log(instrument.length);
      if (needsPadding(instrument, maxLength)) {
        var paddingArray = [];

        for (var i = 0; i < noLoopsToFill(instrument, maxLength); i++) {
          paddingArray = paddingArray.concat(instrument);
        }

        paddedArray.push(paddingArray);
      } else {
        paddedArray.push(instrument);
      }
    });
    /*paddedArray.forEach((instrument, key) => {
      console.log('---------- key ---------- instrument is ', instrument.length);
    })*/

    return paddedArray;
  };
}
/**
 * This takes in fixed instrument.sequences and returns the longest one
 */


function getMaxInstrumentLength(multiLengthInstruments) {
  var maxLength = 0;
  multiLengthInstruments.forEach(function (instrument) {
    if (instrument.length > maxLength) {
      maxLength = instrument.length;
    }
  });
  return maxLength;
}
/**
 * using instrument.notes [ beat_time: 1 ] - figure out the length of the loop
 */


function getSequenceLengthFromNotes(multiLengthInstruments) {
  var highestBeat = multiLengthInstruments.reduce(function (highestBeat, note) {
    if (note.beat_time > highestBeat) {
      return note.beat_time;
    } else {
      return highestBeat;
    }
  }, 0);
  var i = 0;
  var foundHit = false;

  do {
    if (validLoopLengths[i] + 1 > highestBeat) foundHit = true;else {
      i = i + 1;
    }
  } while (!foundHit);

  return validLoopLengths[i];
}

function getNoteLengthSecondsFromBeats(noteLengthBeats, bpm) {
  var noteLengthInSeconds = 0;

  if (typeof noteLengthBeats !== "undefined") {
    noteLengthInSeconds = noteLengthBeats * (60 / bpm);
  }

  return noteLengthInSeconds;
}

function getBeatFromTick(current16thNote) {
  return current16thNote / 4 + 1;
}

function getSequencedNotes(notes, loopTick) {
  var beatTime = getBeatFromTick(loopTick);
  var hasNotes = notes.filter(function (o) {
    return o.beat_time === beatTime;
  });
  return hasNotes;
}
/**
 * Converts:
 * 0 > 0
 *
 * @param tick
 * @returns {number}
 */


function convertTickToLoopTick(tick, ticksPerLoop) {
  return tick - Math.floor(tick / ticksPerLoop) * ticksPerLoop;
}
/**
 * Tick from 0 - 15 is easy
 * If tick is 16 and view frame is 16 then we want to return 0
 * If tick is 17, then we return 1
 * If tick is 18, then we return 2
 */


function getViewTickNumber(tick, ticksPerLoop) {
  return convertTickToLoopTick(tick, ticksPerLoop);
}

function getLoopLengthTicks(tickNumber, ticksPerLoop) {
  if (ticksPerLoop > tickNumber) {
    return tickNumber;
  } else {
    return getViewTickNumber(tickNumber, ticksPerLoop);
  }
}

function getLoopBeat(beat, beatsPerLoop) {
  //console.log('beat, beatsPerLoop, ', beat, beatsPerLoop);
  //Co-ordinates start at 0, so make coOrdinateBeat beat - 1
  //let coOrdinateBeat = beat - 1;
  return beat - Math.floor(beat / beatsPerLoop) * beatsPerLoop;
}
/**
 * Tick from 0 - 15 is easy
 * If tick is 16 and view frame is 16 then we want to return 0
 * If tick is 17, then we return 1
 * If tick is 18, then we return 2
 */


function getViewBeatNumber(tick, ticksPerLoop) {
  return tick + 1 - Math.floor(tick / ticksPerLoop) * ticksPerLoop;
}

function getViewBeatFromBeat(beat, beatsPerView) {
  return beat / beatsPerView;
}

function getLoopTick(currentTick) {
  var loopBeat = [];
  validLoopLengths.forEach(function (loopLengthBeats) {
    var loopLengthTicks = loopLengthBeats * 4;
    var viewTickNumber = getViewTickNumber(currentTick, loopLengthTicks);
    loopBeat[loopLengthBeats] = viewTickNumber;
  });
  return loopBeat;
}

function getLoopBeatAll(current16thNote) {
  var loopBeat = [];
  validLoopLengths.forEach(function (loopLengthBeats) {
    //if(loopLengthBeats === 16 ) debugger
    var loopLengthTicks = loopLengthBeats * 4;
    var viewTickNumber = getViewTickNumber(current16thNote, loopLengthTicks);
    loopBeat[loopLengthBeats] = viewTickNumber;
  });
  return loopBeat;
}
/**
 * Get frequency of a given note.
 * @param  {string} note Musical note to convert into hertz.
 * @return {number} Frequency of note in hertz.
 */


function getFrequencyOfNote(note) {
  var notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
      key_number,
      octave;

  if (note.length === 3) {
    octave = note.charAt(2);
  } else {
    octave = note.charAt(1);
  }

  key_number = notes.indexOf(note.slice(0, -1));

  if (key_number < 3) {
    key_number = key_number + 12 + (octave - 1) * 12 + 1;
  } else {
    key_number = key_number + (octave - 1) * 12 + 1;
  }

  return 440 * Math.pow(2, (key_number - 49) / 12);
}