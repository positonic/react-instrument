"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToPlay = convertToPlay;
exports.convertNotesToSequences = convertNotesToSequences;

var _PianoKeys = require("../instruments/utils/PianoKeys");

var _Errors = _interopRequireDefault(require("../../Errors/Errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This takes in all instruments and returns the following json format which is playable by TimeSequencer:
 *
 * [
 *   {
 *     notes: [
 *             {
 *                duration:1.5,
 *                frequency: 110,
 *                instrument: 'kick',
 *                on: 1
 *                poly: false
 *               }
 *            ],
 *      player: function() {
 *
 *      }
 *    },
 *    {
 *      notes: [
 *        {
 *          beat_time: 1
            duration: 1.5
            frequency: 110
            insnst: null
            on: 1
            poly: true
            synthId: 0
            track_intrumetrument_id: 2
 *        }
 *      ],
 *      player: function() {
 *
 *      }
 *    }

 *
 */
function instrumentsToPlay(instruments) {
  var instrumentsToPlay = instruments.filter(function (o) {
    return o.isSolo === true;
  });
  if (instrumentsToPlay.length > 0) return instrumentsToPlay;else {
    return instruments.filter(function (o) {
      return o.isMuted !== true;
    });
  }
}

function convertToPlay(trackInstruments, mainOutput, audioContext) {
  var sequences = [];
  trackInstruments = instrumentsToPlay(trackInstruments);
  trackInstruments.forEach(function (instrument) {
    if (instrument.type === 'sequencedSynth' || instrument.type === 'midiFont') {
      instrument = convertNotesToSequences(instrument);
    }

    if (typeof instrument.sequences !== 'undefined' && instrument.sequences.length) {
      try {
        instrument.sequences.forEach(function (noteSequence) {
          var sequence = [];

          if (noteSequence && noteSequence.length) {
            noteSequence.forEach(function (sequenceNotes) {
              if (typeof instrument.Play === 'function') {
                var newSequenceNotes = Object.assign(sequenceNotes, {
                  playSequence: instrument.Play(audioContext, mainOutput)
                });
                sequence.push(newSequenceNotes);
              } else if (instrument.type === 'midiFont') {
                var _newSequenceNotes = Object.assign(sequenceNotes, {
                  type: instrument.type,
                  instrumentName: instrument.instrumentName,
                  playerName: instrument.type + '-' + instrument.instrumentName
                });

                sequence.push(_newSequenceNotes);
              } else {
                throw _Errors.default.instrumentHasNoPlayFunction();
              }
            });
          }

          sequences.push(sequence);
        });
        /**/
      } catch (error) {
        console.log(error);
        debugger;
      }
    } else {
      console.log('Why No sequences for ', instrument);
    } //notes.push(newSequences);

  });
  return sequences;
}

function convertNotesToSequences(instrument) {
  if (!instrument) throw _Errors.default.instrumentHasNoDefaultConfig();
  var validBeatLengths = [4, 8, 16, 32, 64, 128];
  var maxBeat = Math.max.apply(Math, instrument.notes.map(function (o) {
    return o.beat_time;
  }));
  var noBeats = 0;
  var ticksPerBeat = 4;
  validBeatLengths.forEach(function (beatLength) {
    if (!noBeats && beatLength >= maxBeat) noBeats = beatLength;
  });
  var noTicks = noBeats * ticksPerBeat;
  var blankNote = {
    on: false,
    duration: 0,
    frequency: null,
    midiNumber: null,
    beat_time: null
  };

  if (instrument.notes) {
    var sequences = [];

    _PianoKeys.PianoKeys.forEach(function (key) {
      var sequence = [];

      var _loop = function _loop(i) {
        var beatNumber = i / 4 + 1; //console.log('beatNumber is ', beatNumber);

        var note = instrument.notes.find(function (o) {
          return o.beat_time === beatNumber && o.midiNumber === key.midiNumber;
        });

        if (note) {
          sequence.push(note);
        } else {
          sequence.push(blankNote);
        } // i=0;beatTime=1
        // i=1;beatTime=1.25
        // i=2;beatTime=1.5
        // i=3;beatTime=1.75


        instrument.sequences = sequences;
      };

      for (var i = 0; i < noTicks; i++) {
        _loop(i);
      }

      sequences.push(sequence);
    });
  }

  return instrument;
}