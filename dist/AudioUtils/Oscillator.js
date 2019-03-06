"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = void 0;

var Voice = _interopRequireWildcard(require("../Synth/Voice"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var Source = function Source(audioContext) {
  var me = {
    setupOscillators: function setupOscillators(oscillatorConfigurations) {
      var oscillators = [];
      oscillatorConfigurations.forEach(function (osc) {
        oscillators.push(me.createOscillator(osc));
      });
      return oscillators;
    },
    createOscillator: function createOscillator(oscConfig) {
      var vco = audioContext.createOscillator();
      vco.type = oscConfig.type;
      vco = me.applyTuning(vco, oscConfig.tuning);
      vco = me.setPipeLengthOnOscillator(vco, oscConfig.pipeLength);
      vco.gain = oscConfig.gain;
      vco.frequencyWithoutPipeLength = oscConfig.gain;
      vco.gainNode = me.addOscillatorGain(vco, 0);
      return vco;
    },
    connectInputToOutput: function connectInputToOutput(oscillatorGain, output) {
      oscillatorGain.connect(output);
    },
    addOscillatorGain: function addOscillatorGain(vco, vcoGain) {
      var vcoGainControl = audioContext.createGain();
      vcoGainControl.gain.value = vcoGain / 100;
      vco.connect(vcoGainControl);
      return vcoGainControl;
    },
    applyTuning: function applyTuning(vco, tuning) {
      if (tuning !== 0) {
        vco.detune.value = tuning;
      }

      return vco;
    },
    setPipeLengthOnOscillator: function setPipeLengthOnOscillator(vco, pipeLength) {
      if (pipeLength !== 0) {
        vco.pipeLength = pipeLength;
      }

      return vco;
    },
    applyPipeLength: function applyPipeLength(frequency, pipeLength) {
      return frequency / (parseInt(pipeLength, 10) / 8);
    },

    /**
     * Returns a Voice, which is an array of sources
     * @param time
     * @param noteLength
     * @param frequency
     * @param attackTime
     * @param sustainPercentage
     * @param decayPercentage
     * @param releaseTime
     * @returns {Array} array of sources / oscillatorys
     */
    play: function play(time, noteLengthInSeconds, frequency, output, oscillators, ampEnvelope) {
      var attackTime = audioContext.currentTime + ampEnvelope.attack / 100;
      var sustainPercentage = ampEnvelope.sustain / 100;
      var decayPercentage = ampEnvelope.decay / 100;
      var release = audioContext.currentTime + ampEnvelope.release / 10.0;
      var voices = []; //A voice is an array of IVoice = oscillators or sources and vcas

      oscillators.forEach(function (osc) {
        var oscGain = osc.gain / 100;
        var sustainVolume = sustainPercentage * oscGain;
        var envAttackEnd = audioContext.currentTime + attackTime / 20; //Start of Amp envelope:

        osc.gainNode.gain.value = 0.0;
        osc.gainNode.gain.setValueAtTime(0.0, audioContext.currentTime); //Before - oscGainNode.gain.linearRampToValueAtTime(oscGain, attackTime);

        osc.gainNode.gain.linearRampToValueAtTime(oscGain, envAttackEnd);
        osc.gainNode.gain.setTargetAtTime(sustainVolume, envAttackEnd, decayPercentage + 0.001); //End Amp envelope

        me.connectInputToOutput(osc.gainNode, output[0]);
        me.start(osc, time, noteLengthInSeconds, frequency);
        var voice = Voice.createVoice(osc, osc.gainNode);
        voice.attack = attackTime;
        voice.sustain = ampEnvelope.sustain;
        voice.decay = ampEnvelope.decay;
        voice.release = release;
        voices.push(voice);
      });
      return voices;
    },
    start: function start(vco, time, noteLengthInSeconds, frequency) {
      vco.frequency.value = me.applyPipeLength(frequency, vco.pipeLength);
      vco.frequencyWithoutPipeLength = frequency;
      vco.start(time); //If it's sequenced, schedule a stop time

      if (noteLengthInSeconds !== 0) {
        vco.stop(time + noteLengthInSeconds);
      }

      return vco;
    }
  };
  return me;
};

exports.Source = Source;