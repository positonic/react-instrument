export default {
  currentInstrument: 'Synthesizer',
  isMuted: false,
  notes: [
    [
      { on: 1, duration: 0.9750000000000001, midiNumber: 84, beat_time: 1 },
      { beat_time: 2.5, duration: 0.5, midiNumber: 84, on: 1 },
      { beat_time: 3, duration: 1, midiNumber: 84, on: 1 },
      { beat_time: 4.5, duration: 0.5, midiNumber: 84, on: 1 },
      { beat_time: 5, duration: 1, midiNumber: 84, on: 1 },
      { beat_time: 6.5, duration: 0.5, midiNumber: 84, on: 1 },
      { beat_time: 7, duration: 1, midiNumber: 84, on: 1 },
      { beat_time: 8, duration: 1, midiNumber: 86, on: 1 },
      { beat_time: 9, duration: 1, midiNumber: 88, on: 1 },
      { beat_time: 10.5, duration: 0.5, midiNumber: 88, on: 1 },
      { beat_time: 11, duration: 1, midiNumber: 88, on: 1 },
      { beat_time: 12.5, duration: 0.5, midiNumber: 88, on: 1 },
      { beat_time: 13, duration: 1, midiNumber: 88, on: 1 },
      { beat_time: 14.5, duration: 0.5, midiNumber: 88, on: 1 },
      { beat_time: 15, duration: 1, midiNumber: 88, on: 1 },
      { beat_time: 16, duration: 1, midiNumber: 86, on: 1 }
    ],
    [{ on: 1, duration: 3, midiNumber: 74, beat_time: 1 }]
  ],
  instrumentId: 2,
  envelopes: [
    { for: 'filter', attack: 10, decay: 10, sustain: 10, release: 10 },
    { for: 'amp', attack: 10, decay: 15, sustain: 30, release: 21 }
  ],
  beatsPerLoop: 16,
  view: 'grid',
  showEffects: false,
  name: 'Synth 1',
  notesIndex: 0,
  oscillators: [
    { type: 'sawtooth', pipeLength: '32', gain: 20, filter: 1000, tuning: 0 },
    { type: 'triangle', pipeLength: '32', gain: 52, filter: 1000, tuning: 700 }
  ],
  showMoreSettings: true,
  avatar: '/images/micro-brute.jpg',
  type: 'sequencedSynth',
  filters: [
    { active: true, type: 'filter', props: { type: 'lowpass', value: 840, Q: 10 } },
    {
      active: true,
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
    },
    {
      active: true,
      type: 'filter',
      tunaType: 'Chorus',
      props: { rate: 1.5, feedback: 0.2, delay: 0.0045, bypass: 0 }
    },
    {
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
    },
    {
      active: false,
      type: 'filter',
      tunaType: 'Overdrive',
      props: { outputGain: 0.5, drive: 0.7, curveAmount: 1, algorithmIndex: 0, bypass: 0 }
    },
    {
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
    },
    {
      active: false,
      type: 'filter',
      tunaType: 'Filter',
      props: { frequency: 440, Q: 1, gain: 0, filterType: 'lowpass', bypass: 0 }
    },
    {
      active: false,
      type: 'filter',
      tunaType: 'Tremolo',
      props: { intensity: 0.3, rate: 4, stereoPhase: 0, bypass: 0 }
    },
    {
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
    },
    {
      active: false,
      type: 'filter',
      tunaType: 'Bitcrusher',
      props: { bits: 4, normfreq: 0.1, bufferSize: 4096 }
    },
    {
      active: false,
      type: 'filter',
      tunaType: 'MoogFilter',
      props: { cutoff: 0.065, resonance: 3.5, bufferSize: 4096 }
    },
    {
      active: false,
      type: 'filter',
      tunaType: 'PingPongDelay',
      props: { wetLevel: 0.5, feedback: 0.3, delayTimeLeft: 150, delayTimeRight: 200 }
    },
    { active: false, type: 'filter', tunaType: 'Panner', props: { pan: 0 } }
  ],
  selected_notes: [15],
  parent_instrument_id: null,
  gain: 20
};