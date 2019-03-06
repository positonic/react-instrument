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
  gain: number;
  isArmed: boolean;
  showInstrument: boolean;

  changeGridSequence: (midiNumber: number, instrumentId: number, instrument: any, noteLengthBeats: number, beatNumber: number) => void;
  changeSequencedKeyboardInstrument: (instrumentId: number, value: number) => void;
  deleteInstrument: (instrumentId: number) => void;
  setArmedInstrument: (instrumentId: number) => void;
  setInstrumentGain: (instrumentId: number, value: number) => void;
  changeSequencedKeyboardView: (instrumentId: number, view: string) => void;
}

export default InstrumentConfig;
