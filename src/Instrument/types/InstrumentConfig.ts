interface InstrumentConfig {
  provider: any;
  audioContext: AudioContext;
  mainOutput: GainNode;
  timeSequencer: any;
  instrument: any;
  instrumentId: number;
  instrumentNames: string[];
  currentInstrument: string;
  samplesBuffers: [];
  gainNode: GainNode;
  changeSequencedKeyboardView: () => void;
  isArmed: boolean;
  showInstrument: boolean;
}

export default InstrumentConfig;
