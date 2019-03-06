import React from 'react';
import { Toggle } from './Toggle';
import { Switch } from './Switch';
import styled from 'styled-components';
import LittleFatty from './LittleFatty';
import PlayButton from "./PlayButton";

class InstrumentWires extends React.Component {
  constructor(props) {
    super(props);
    const { gainValue } = this.props;

    this.state = {
      gainValue
    }

  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {

    if(nextState.gainValue !== this.state.gainValue) {
      return true;
    } else {
      return false;
    }

  }


  render() {
    const { setInstrumentGain } = this.props;

    const setVolumeValue = (oscId, property, value) => {
      this.setState({gainValue: value})
      setInstrumentGain(value);

    };

    /*const moveVolumeValue = (oscId, property, value) => {
      this.setState({gainValue: value})
    };*/

    return (
      <div className={this.props.className}>
        <Toggle on={!this.props.isMuted} onToggle={this.props.onToggle}>
          {({ on, toggle }) => (
            <div>
              {on ? 'The button is on' : 'The button is off'}
              <Switch on={on} onClick={toggle} />
              <hr />
              <button aria-label="custom-button" onClick={toggle}>
                {on ? 'on' : 'off'}
              </button>
            </div>
          )}
        </Toggle>
        <br />
        <LittleFatty
          width={45}
          height={45}
          fatId={1}
          setValue={setVolumeValue}
          value={this.state.gainValue}
          defaultValue={20}
          unit={1}
          max={100}
          min={0}
          fatProperty={'gain'}
        />
        {/*<PlayButton playButtonClick={this.props.play} isPlaying={this.props.isPlaying} class="drumMachinePlay" />*/}

      </div>
    );
  }
};
export default styled(InstrumentWires)`
  display: inline-block;
  width: 100%;
  padding: 20px;
  button i {
    font-size: 50px;
  }

  button.toggle-btn {
    margin-right: 5px;
  }
  text-align: center;
  .littleFatty {
    margin-top: 20px;
  }

  .switch {
    display: inline-block;
  }
  float: left;
`;
