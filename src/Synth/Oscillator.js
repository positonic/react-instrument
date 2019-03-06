import PipeLengthSelect from '../controls/PipeLengthSelect';
import React from "react";
import styled from "styled-components";
import LittleFatty from '../controls/LittleFatty';
import WaveShapeSelector from "../controls/WaveShapeSelector";

const OscName = styled.span`
  vertical-align: top;
`;

const OscillatorBox = styled.div`
  .littleFatty {
    display: inline-block;
    font-size: 12px;
    margin-left: 8px;
    margin-top: 10px;
    text-align: center;
  }
`;


const Oscillator = (props) => {

  const { oscillator } = props;

  return (
    <OscillatorBox className={props.classNames}>
      <div style={{ position: 'relative'}}>
        <OscName>{props.name}</OscName>
        <WaveShapeSelector oscIndex={props.oscIndex} oscillator={oscillator} oscNo={props.oscNo} setWaveFormValue={props.setWaveFormValue}/>
        <PipeLengthSelect
          setValue={props.setOscValue}
          field={'pipeLength'}
          oscId={props.oscIndex}
          value={oscillator.pipeLength}
        />
      </div>
      <LittleFatty
            width={45}
            height={45}
            fatId={props.oscIndex}
            name={'tuning'}
            setValue={props.setOscValue}
            value={props.tuning}
            defaultValue={700}
            unit={100}
            max={1200}
            min={0}
            fatProperty={'tuning'}
          />
        <LittleFatty
          width={45}
          height={45}
          fatId={props.oscIndex}
          name={'gain'}
          setValue={props.setOscValue}
          value={oscillator.gain}
          defaultValue={20}
          unit={1}
          max={100}
          min={0}
          fatProperty={'gain'}
        />
    </OscillatorBox>

  )
}

export default Oscillator;