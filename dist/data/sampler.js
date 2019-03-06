"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  currentInstrument: 'distBass1c',
  isMuted: false,
  notes: [[{
    beat_time: 1,
    duration: 8,
    midiNumber: 60,
    on: 1
  }], [{
    beat_time: 1,
    duration: 3.5,
    midiNumber: 60,
    on: 1
  }, {
    beat_time: 5,
    duration: 1.5,
    midiNumber: 64,
    on: 1
  }, {
    beat_time: 6.5,
    duration: 2.475,
    midiNumber: 60,
    on: 1
  }, {
    beat_time: 9,
    duration: 3.9875,
    midiNumber: 64,
    on: 1
  }, {
    beat_time: 13,
    duration: 4,
    midiNumber: 62,
    on: 1
  }]],
  beatsPerLoop: 16,
  view: 'grid',
  showEffects: false,
  name: 'Sampler',
  notesIndex: 1,
  showMoreSettings: false,
  avatar: '/images/micro-brute.jpg',
  type: 'simpler',
  filters: [{
    active: true,
    type: 'filter',
    props: {
      type: 'lowpass',
      value: 1000,
      Q: 10
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Delay',
    props: {
      feedback: 0.45,
      delayTime: 150,
      wetLevel: 0.25,
      dryLevel: 1,
      cutoff: 2000,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Chorus',
    props: {
      rate: 1.5,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Phaser',
    props: {
      rate: 1.2,
      depth: 0.3,
      feedback: 0.2,
      stereoPhase: 30,
      baseModulationFrequency: 700,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Overdrive',
    props: {
      outputGain: 0.5,
      drive: 0.7,
      curveAmount: 1,
      algorithmIndex: 0,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Compressor',
    props: {
      threshold: -1,
      makeupGain: 1,
      attack: 1,
      release: 0,
      ratio: 4,
      knee: 5,
      automakeup: true,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Filter',
    props: {
      frequency: 440,
      Q: 1,
      gain: 0,
      filterType: 'lowpass',
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Tremolo',
    props: {
      intensity: 0.3,
      rate: 4,
      stereoPhase: 0,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'WahWah',
    props: {
      automode: true,
      baseFrequency: 0.5,
      excursionOctaves: 2,
      sweep: 0.2,
      resonance: 10,
      sensitivity: 0.5,
      bypass: 0
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Bitcrusher',
    props: {
      bits: 4,
      normfreq: 0.1,
      bufferSize: 4096
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'MoogFilter',
    props: {
      cutoff: 0.065,
      resonance: 3.5,
      bufferSize: 4096
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'PingPongDelay',
    props: {
      wetLevel: 0.5,
      feedback: 0.3,
      delayTimeLeft: 150,
      delayTimeRight: 200
    }
  }, {
    active: false,
    type: 'filter',
    tunaType: 'Panner',
    props: {
      pan: 0
    }
  }],
  selected_notes: [4],
  gain: 15
};
exports.default = _default;