import { midiMap } from "./MidiMap";
import { getNoteLengthSecondsFromBeats, getFrequencyOfNote } from '../utils';
import { Source } from "./Oscillator";

function PlaySample(audioContext, samples, output) {
  let sampleMap;

  if (typeof samples !== "undefined") {
    if (samples === null) debugger;
    sampleMap = samples.reduce(function(map, sample) {
      map[sample.name] = sample.buffer;
      return map;
    }, {});
  }

  return function(instrument, time, noteLengthInSeconds, detune) {
    if (typeof sampleMap === "undefined") debugger;
    let buffer = sampleMap[instrument];

    var source = audioContext.createBufferSource(); // creates a sound source
    source.buffer = buffer; // tell the source which sound to play

    if (detune !== 0) {
      source.detune.value = detune;
    }
    let gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    source.connect(gain); // connect the source to the audioContext's destination (the speakers)
    gain.connect(output);

    source.start(time);

    if (noteLengthInSeconds) {
      source.stop(time + noteLengthInSeconds);
    }

    return source;
  };
}

export function samplePlayer(audioContext, output, loadedSamplesBuffers) {
  let playSample = PlaySample(audioContext, loadedSamplesBuffers, output);

  /**
   * Instrument is for the drum machine - 'bass' etc
   */
  return function(midiNumber, time, noteLengthInSeconds, bpm, instrument) {
    const cent = 100;
    const baseMidi = 60; //48;

    let detune = 0;
    if (typeof midiNumber !== "undefined") {
      if (midiNumber === baseMidi) detune = 0;
      else {
        detune = (midiNumber - baseMidi) * cent;
      }
    }
    // console.log('PlaySamples ', Instrument, time, noteLengthInSeconds, detune);

    let voice = playSample(instrument, time, noteLengthInSeconds, detune);

    return voice;
  };
}

export function synthPlayer(audioContext, config) {
  const { /*oscillators, */ envelopes, isMuted } = config;
  let playingVoices = {};
  return function(
    midiNumber,
    time,
    noteLengthBeats,
    bpm,
    currentInstrument,
    filters,
    oscillators
  ) {
    if (!isMuted) {
      if (typeof midiNumber === "undefined") {
        console.log(
          "midiNumber cant be undefined",
          (midiNumber, time, noteLengthBeats, bpm)
        );
        throw Error("midiNumber cant be undefined");
      } else {
        let note = midiMap[midiNumber];
        if (!note) debugger;
        let frequency = getFrequencyOfNote(note);

        if (typeof time === "undefined") time = 0;

        let noteLengthInSeconds =
          noteLengthBeats && bpm
            ? getNoteLengthSecondsFromBeats(noteLengthBeats, bpm)
            : 0;

        let sourceVoice = Source(audioContext);

        let voice = sourceVoice.play(
          time,
          noteLengthInSeconds,
          frequency,
          filters,
          oscillators,
          envelopes[1]
        );
        playingVoices[midiNumber] = voice;

        return playingVoices;
      }
    }
  };
}
