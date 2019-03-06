import React from 'react';
import SequencedKeyboard from './SequencedKeyboard';
import * as Instrument from './Instrument';
import Effects from "./Effects";

export default function(props) {
  const { config } = props;

  const InstrumentWithSequencedKeyboard = Instrument.withSequencedKeyboard(
    SequencedKeyboard,
    config.provider,
    config.parameters,
    config.effects
  );
  /* audioContext={config.audioContext}
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
      instrumentId={config.instrumentId}
      gainNode={config.gainNode}

      changeGridSequence={config.changeGridSequence}
      changeSequencedKeyboardInstrument={config.changeSequencedKeyboardInstrument}
      changeSequencedKeyboardView={config.changeSequencedKeyboardView}
*/

  return (
    <InstrumentWithSequencedKeyboard
      {...config}
    />
  );
}
