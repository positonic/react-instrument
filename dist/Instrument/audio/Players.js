"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.samplePlayer = samplePlayer;
exports.synthPlayer = synthPlayer;

var _MidiMap = require("./MidiMap");

var _utils = require("../utils");

var _Oscillator = require("./Oscillator");

function PlaySample(audioContext, samples, output) {
  var sampleMap;

  if (typeof samples !== "undefined") {
    if (samples === null) debugger;
    sampleMap = samples.reduce(function (map, sample) {
      map[sample.name] = sample.buffer;
      return map;
    }, {});
  }

  return function (instrument, time, noteLengthInSeconds, detune) {
    if (typeof sampleMap === "undefined") debugger;
    var buffer = sampleMap[instrument];
    var source = audioContext.createBufferSource(); // creates a sound source

    source.buffer = buffer; // tell the source which sound to play

    if (detune !== 0) {
      source.detune.value = detune;
    }

    var gain = audioContext.createGain();
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

function samplePlayer(audioContext, output, loadedSamplesBuffers) {
  var playSample = PlaySample(audioContext, loadedSamplesBuffers, output);
  /**
   * Instrument is for the drum machine - 'bass' etc
   */

  return function (midiNumber, time, noteLengthInSeconds, bpm, instrument) {
    var cent = 100;
    var baseMidi = 60; //48;

    var detune = 0;

    if (typeof midiNumber !== "undefined") {
      if (midiNumber === baseMidi) detune = 0;else {
        detune = (midiNumber - baseMidi) * cent;
      }
    } // console.log('PlaySamples ', Instrument, time, noteLengthInSeconds, detune);


    var voice = playSample(instrument, time, noteLengthInSeconds, detune);
    return voice;
  };
}

function synthPlayer(audioContext, config) {
  var envelopes = config.envelopes,
      isMuted = config.isMuted;
  var playingVoices = {};
  return function (midiNumber, time, noteLengthBeats, bpm, currentInstrument, filters, oscillators) {
    if (!isMuted) {
      if (typeof midiNumber === "undefined") {
        console.log("midiNumber cant be undefined", (midiNumber, time, noteLengthBeats, bpm));
        throw Error("midiNumber cant be undefined");
      } else {
        var note = _MidiMap.midiMap[midiNumber];
        if (!note) debugger;
        var frequency = (0, _utils.getFrequencyOfNote)(note);
        if (typeof time === "undefined") time = 0;
        var noteLengthInSeconds = noteLengthBeats && bpm ? (0, _utils.getNoteLengthSecondsFromBeats)(noteLengthBeats, bpm) : 0;
        var sourceVoice = (0, _Oscillator.Source)(audioContext);
        var voice = sourceVoice.play(time, noteLengthInSeconds, frequency, filters, oscillators, envelopes[1]);
        playingVoices[midiNumber] = voice;
        return playingVoices;
      }
    }
  };
}