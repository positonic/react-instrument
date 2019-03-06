"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

function create(audioContext, output, initValue) {
  var mainSynthGain = audioContext.createGain();
  mainSynthGain.gain.value = initValue / 100;
  mainSynthGain.connect(output);
  return mainSynthGain;
}