import * as Voice from "./Voice";

const Source = (audioContext) => {
  const me = {
    setupOscillators(oscillatorConfigurations) {
      let oscillators = [];
      oscillatorConfigurations.forEach(osc => {
        oscillators.push(me.createOscillator(osc));
      });

      return oscillators;
    },
    createOscillator(oscConfig) {
      let vco = audioContext.createOscillator();
      vco.type = oscConfig.type;
      vco = me.applyTuning(vco, oscConfig.tuning);
      vco = me.setPipeLengthOnOscillator(vco, oscConfig.pipeLength);
      vco.gain = oscConfig.gain;
      vco.frequencyWithoutPipeLength = oscConfig.gain;
      vco.gainNode = me.addOscillatorGain(vco, 0);

      return vco;
    },
    connectInputToOutput: (oscillatorGain, output) => {
      oscillatorGain.connect(output);
    },

    addOscillatorGain(vco, vcoGain) {
      var vcoGainControl = audioContext.createGain();
      vcoGainControl.gain.value = vcoGain / 100;
      vco.connect(vcoGainControl);

      return vcoGainControl;
    },

    applyTuning(vco, tuning) {
      if (tuning !== 0) {
        vco.detune.value = tuning;
      }

      return vco;
    },

    setPipeLengthOnOscillator(vco, pipeLength) {
      if (pipeLength !== 0) {
        vco.pipeLength = pipeLength;
      }

      return vco;
    },

    applyPipeLength: (frequency, pipeLength) => {
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
    play: (
      time,
      noteLengthInSeconds,
      frequency, output, oscillators, ampEnvelope
    ) => {

      let attackTime = audioContext.currentTime + ampEnvelope.attack / 100;
      let sustainPercentage = ampEnvelope.sustain / 100;
      let decayPercentage = ampEnvelope.decay / 100;
      let release = audioContext.currentTime + ampEnvelope.release / 10.0;

      let voices = [];   //A voice is an array of IVoice = oscillators or sources and vcas
      oscillators.forEach(osc => {

        let oscGain = osc.gain / 100;
        let sustainVolume = sustainPercentage * oscGain;
        let envAttackEnd = audioContext.currentTime + (attackTime/20);

        //Start of Amp envelope:
        osc.gainNode.gain.value = 0.0;
        osc.gainNode.gain.setValueAtTime( 0.0, audioContext.currentTime );
        //Before - oscGainNode.gain.linearRampToValueAtTime(oscGain, attackTime);
        osc.gainNode.gain.linearRampToValueAtTime(oscGain, envAttackEnd);
        osc.gainNode.gain.setTargetAtTime(
          sustainVolume,
          envAttackEnd,
          ((decayPercentage) + 0.001)
        );
        //End Amp envelope

        me.connectInputToOutput(osc.gainNode, output[0]);

        me.start(osc, time, noteLengthInSeconds, frequency)

        let voice = Voice.createVoice(osc, osc.gainNode);
        voice.attack = attackTime;
        voice.sustain = ampEnvelope.sustain;
        voice.decay = ampEnvelope.decay;
        voice.release = release;


        voices.push(voice);

      });

      return voices;
    },

    start: (vco, time, noteLengthInSeconds, frequency) => {
      vco.frequency.value = me.applyPipeLength(frequency, vco.pipeLength);
      vco.frequencyWithoutPipeLength = frequency;
      vco.start(time);

      //If it's sequenced, schedule a stop time
      if (noteLengthInSeconds !== 0) {
        vco.stop(time + noteLengthInSeconds);
      }

      return vco;

    }
  }

  return me;
}

export { Source }