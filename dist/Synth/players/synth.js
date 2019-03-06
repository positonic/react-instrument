"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.synthPlayer = synthPlayer;

var _MidiMap = require("../../AudioUtils/MidiMap");

var _AudioUtils = require("../../AudioUtils");

var _Oscillator = require("../../AudioUtils/Oscillator");

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
        var frequency = (0, _AudioUtils.getFrequencyOfNote)(note);
        if (typeof time === "undefined") time = 0;
        var noteLengthInSeconds = noteLengthBeats && bpm ? (0, _AudioUtils.getNoteLengthSecondsFromBeats)(noteLengthBeats, bpm) : 0;
        var sourceVoice = (0, _Oscillator.Source)(audioContext);
        var voice = sourceVoice.play(time, noteLengthInSeconds, frequency, filters, oscillators, envelopes[1]);
        playingVoices[midiNumber] = voice;
        return playingVoices;
      }
    }
  };
}