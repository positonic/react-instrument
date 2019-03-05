import { PianoKeys } from '../instruments/utils/PianoKeys';
import Errors from '../../Errors/Errors';
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
  let instrumentsToPlay = instruments.filter(o => o.isSolo === true);

  if (instrumentsToPlay.length > 0) return instrumentsToPlay;
  else {
    return instruments.filter(o => o.isMuted !== true);
  }
}
export function convertToPlay(trackInstruments, mainOutput, audioContext) {
  let sequences = [];

  trackInstruments = instrumentsToPlay(trackInstruments);

  trackInstruments.forEach(instrument => {
    if (instrument.type === 'sequencedSynth' || instrument.type === 'midiFont') {
      instrument = convertNotesToSequences(instrument);
    }

    if (typeof instrument.sequences !== 'undefined' && instrument.sequences.length) {
      try {
          instrument.sequences.forEach(noteSequence => {
            let sequence = [];

            if (noteSequence && noteSequence.length) {
              noteSequence.forEach(sequenceNotes => {
                if (typeof instrument.Play === 'function') {
                  let newSequenceNotes = Object.assign(sequenceNotes, {
                    playSequence: instrument.Play(audioContext, mainOutput)
                  });
                  sequence.push(newSequenceNotes);
                } else if(instrument.type === 'midiFont') {
                  let newSequenceNotes = Object.assign(sequenceNotes, {
                    type: instrument.type,
                    instrumentName: instrument.instrumentName,
                    playerName: instrument.type+'-'+instrument.instrumentName
                  });
                  sequence.push(newSequenceNotes);
                } else {
                  throw Errors.instrumentHasNoPlayFunction();
                }


              });
            }

            sequences.push(sequence);
          });
        /**/
      } catch (error) {
        console.log(error);
        debugger
      }
    } else {
      console.log('Why No sequences for ', instrument);
    }

    //notes.push(newSequences);
  });

  return sequences;
}

export function convertNotesToSequences(instrument) {

  if(!instrument) throw Errors.instrumentHasNoDefaultConfig();

  const validBeatLengths = [4, 8, 16, 32, 64, 128];

  let maxBeat = Math.max.apply(
    Math,
    instrument.notes.map(function(o) {
      return o.beat_time;
    })
  );

  let noBeats = 0;
  let ticksPerBeat = 4;
  validBeatLengths.forEach(beatLength => {
    if (!noBeats && beatLength >= maxBeat) noBeats = beatLength;
  });
  let noTicks = noBeats * ticksPerBeat;

  let blankNote = {
    on: false,
    duration: 0,
    frequency: null,
    midiNumber: null,
    beat_time: null
  };
  if (instrument.notes) {
    let sequences = [];
    PianoKeys.forEach(key => {
      let sequence = [];
      for (let i = 0; i < noTicks; i++) {
        const beatNumber = i / 4 + 1;

        //console.log('beatNumber is ', beatNumber);
        const note = instrument.notes.find(
          o => o.beat_time === beatNumber && o.midiNumber === key.midiNumber
        );
        if (note) {
          sequence.push(note);
        } else {
          sequence.push(blankNote);
        }

        // i=0;beatTime=1
        // i=1;beatTime=1.25
        // i=2;beatTime=1.5
        // i=3;beatTime=1.75
        instrument.sequences = sequences;
      }
      sequences.push(sequence);
    });
  }
  return instrument;
}
