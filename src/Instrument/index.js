import React from 'react';
import SequencedKeyboard from './SequencedKeyboard';
import * as Instrument from './Instrument';
import Effects from "./Effects";

export default function(props) {
  const { config } = props;

  const Parameters = null;
  const InstrumentWithSequencedKeyboard = Instrument.withSequencedKeyboard(
    SequencedKeyboard,
    config.provider,
    Parameters,
    Effects,
    config
  );

  return (
    <InstrumentWithSequencedKeyboard
      audioContext={config.audioContext}
      instrumentNames={config.instrumentNames}
      currentInstrument={config.currentInstrument}
      mainOutput={config.mainOutput}
      onToggle={config.onToggle}
      instrument={config.instrument}
      timeSequencer={config.timeSequencer}
      isArmed={config.isArmed}
      showInstrument={config.showInstrument}
      samplesBuffers={config.samplesBuffers}
      instrumentGainNode={config.instrumentGainNode}
      changeSequencedKeyboardInstrument={config.changeSequencedKeyboardInstrument}
      instrumentId={config.instrumentId}
    />
  );
}
