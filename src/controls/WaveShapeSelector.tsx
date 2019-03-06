import * as React from "react";
import styled from "styled-components";


const WaveHolder = styled.span`
  height: ${props => (props.isOpen ? 'auto' : '25px')};
  display: inline-block;
  position: absolute;
  margin: 0 20px 0 10px;
  background-color: #333;
  padding: 3px;
  overflow: hidden;
  
  .waveSawtooth {
    background-image: url(/images/oscillator_saw_black_30.png);
  }
  .waveSquare {
    background-image: url(/images/oscillator_square_black_30.png);
  }
  .waveSine {
    background-image: url(/images/oscillator_sine_black_30.png);
  }
  .waveTriangle {
    background-image: url(/images/oscillator_triangle_black_30.png);
  }
  input {
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    position: absolute;
    z-index: 999;
  }
  input:active + .waveFormLabel,
  .waveHolder input:active + .waveFormLabel {
    opacity: 0.9;
  }

  input:checked + .waveFormLabel,
  .waveHolder input:checked + .waveFormLabel {
    -webkit-filter: none;
    -moz-filter: none;
    filter: none;
  }

  label {
    
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    width: 20px;
    height: 20px;
    -webkit-transition: all 100ms ease-in;
    -moz-transition: all 100ms ease-in;
    transition: all 100ms ease-in;
    -webkit-filter: brightness(1.8) grayscale(1) opacity(0.7);
    -moz-filter: brightness(1.8) grayscale(1) opacity(0.7);
    filter: brightness(1.8) grayscale(1) opacity(0.7);
  }

  label:hover {
    -webkit-filter: brightness(1.2) grayscale(0.5) opacity(0.9);
    -moz-filter: brightness(1.2) grayscale(0.5) opacity(0.9);
    filter: brightness(1.2) grayscale(0.5) opacity(0.9);
  }

  img {
    width: 20px;
  }
`;

const WaveForm = styled.label`
  border: ${props => props.isActive ? "1px solid #FFFF00" : 'auto'};
`;
const WaveFormShape = (props) => {

  return (
    <span style={{display: 'block', width: '20px'}}>
      <input
        id={props.id}
        defaultChecked={true}
        type="radio"
        name={"waveform" + props.oscNo}
        value={props.shape}
      />
      <WaveForm
        isActive={(props.shape === props.oscillator.type)}
        onTouchStart={(evt) => props.setWaveFormValue(evt, {oscId: props.oscIndex, field: 'type'})}
        onClick={(evt) => props.setWaveFormValue(evt, {oscId: props.oscIndex, field: 'type'})}
        className={props.id}
        htmlFor={props.id}
        data-value={props.shape}
      />
    </span>
  )
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface IWaveShapeSelectorProps {
  oscIndex: number;
  oscillator: any;
  oscNo: number;
  setWaveFormValue: (event: object, property: any) => void;
}

interface IWaveShapeSelectorState {
  isOpen: boolean;
  waveforms: string[];
}

class WaveShapeSelector extends React.Component<IWaveShapeSelectorProps, IWaveShapeSelectorState> {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      waveforms: ['sawtooth', 'square', 'sine', 'triangle']
    }
    this.setIsOpen = this.setIsOpen.bind(this);
  }

  setIsOpen(evt) {
    evt.preventDefault();

    const {isOpen} = this.state;

    console.log('setIsOpen', isOpen);

    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const {oscillator} = this.props;

    return (
      <WaveHolder onClick={this.setIsOpen} isOpen={this.state.isOpen}>
        <WaveFormShape id={"wave"+capitalizeFirstLetter(oscillator.type)} oscIndex={this.props.oscIndex} shape={oscillator.type} oscNo={this.props.oscNo}
                       oscillator={oscillator} setWaveFormValue={this.props.setWaveFormValue}/>
        {this.state.waveforms.map(waveform => {
          if(waveform !== oscillator.type) {
            return <WaveFormShape key={waveform} id={"wave"+capitalizeFirstLetter(waveform)} oscIndex={this.props.oscIndex} shape={waveform} oscNo={this.props.oscNo}
                                  oscillator={oscillator} setWaveFormValue={this.props.setWaveFormValue}/>;
          } else {
            return null;
          }
        })}
      </WaveHolder>
    );
  }
}

/*const WaveShapeSelector: any = (props: any) => {

  const {oscillator} = props;
  //['sawtooth', 'square', 'sine', 'triangle'].map();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
      <WaveHolder isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <WaveFormShape id={"wave"+capitalizeFirstLetter(oscillator.type)} oscIndex={props.oscIndex} shape={oscillator.type} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
        <WaveFormShape id="waveSquare" oscIndex={props.oscIndex} shape={'square'} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
        <WaveFormShape id="waveSine" oscIndex={props.oscIndex} shape={'sine'} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
        <WaveFormShape id="waveTriangle" oscIndex={props.oscIndex} shape={'triangle'} oscNo={props.oscNo}
                       oscillator={oscillator} setWaveFormValue={props.setWaveFormValue}/>
      </WaveHolder>
  );
};*/

export default WaveShapeSelector;
