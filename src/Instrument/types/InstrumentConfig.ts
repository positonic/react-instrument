interface InstrumentConfig {
  provider: any;
  parameters?: any;
  audioContext: AudioContext;
  effects?: any;
  mainOutput: GainNode;
  timeSequencer: any;
  instrument: any;
  instrumentId: number;
  instrumentNames: string[];
  currentInstrument: string;
  samplesBuffers: [];
  gainNode: GainNode;
  gain: number;
  isArmed: boolean;
  showInstrument: boolean;
  bpm: number;

  changeGridSequence: (midiNumber: number, instrumentId: number, instrument: any, noteLengthBeats: number, beatNumber: number) => void;
  changeBeatsPerLoop: (instrumentId: number, value: number) => void;
  toggleShowEffects: (instrumentId: number) => void;
  changeSequencedKeyboardInstrument: (instrumentId: number, value: number) => void;
  deleteInstrument: (instrumentId: number) => void;
  setArmedInstrument: (instrumentId: number) => void;
  setInstrumentGain: (instrumentId: number, value: number) => void;
  changeSequencedKeyboardView: (instrumentId: number, view: string) => void;
  toggleFilter: (instrumentId: number, filterIndex: number) => void;
}

export default InstrumentConfig;
