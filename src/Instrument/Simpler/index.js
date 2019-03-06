import React from 'react';
import SequencedKeyboard from '../SequencedKeyboard';
import SampleProvider from './SampleProvider';
import * as Instrument from '../Instrument';
import Effects from "../Effects";

export default function(props) {
  const Parameters = null;
  const SimplerWithSequencedKeyboard = Instrument.withSequencedKeyboard(
    SequencedKeyboard,
    SampleProvider,
    Parameters,
    Effects,
    props
  );

  return (
    <SimplerWithSequencedKeyboard
      audioContext={props.audioContext}
      instrumentNames={props.instrumentNames}
      currentInstrument={props.currentInstrument}
      mainOutput={props.mainOutput}
      onToggle={props.onToggle}
      instrument={props.instrument}
      timeSequencer={props.timeSequencer}
      isArmed={true}
      showInstrument={(true)}
      samplesBuffers={props.samplesBuffers}
      instrumentGainNode={props.instrumentGainNode}
      changeSequencedKeyboardInstrument={props.changeSequencedKeyboardInstrument}
      instrumentId={props.instrumentId}
    />
  );
}
