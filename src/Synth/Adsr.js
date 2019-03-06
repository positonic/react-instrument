import React from 'react';
import LittleFatty from '../controls/LittleFatty';
//import Envelope from 'envelope-generator';

export default class Adsr extends React.Component {
  constructor(props) {
    super(props);
    this.setAdsrValue = this.setAdsrValue.bind(this);
    this.state = {
      envelope: this.props.defaultValue
    };
  }

  getButtonText() {
    return this.state.isPlaying ? (
      <i className="fa fa-stop-circle fa-6" aria-hidden="true" />
    ) : (
      <i className="fa fa-play-circle fa-6" aria-hidden="true" />
    );
    //return (this.state.isPlaying ?  this.playingText: this.stoppedText);
  }

  setAdsrValue(envelopeId, property, value) {
    this.props.setValue(this.props.envelopeId, property, value);
  }
  render() {
    const {values} = this.props;

    return (
      <div className="filterPanel module">
        <span>{this.props.controls}</span>
        <LittleFatty
          width={45}
          height={45}
          fatId={0}
          name={'attack'}
          setValue={this.setAdsrValue}
          value={values.attack}
          defaultValue={0}
          unit={1}
          max={100}
          min={0}
          fatProperty={'attack'}
        />
        <br/>
        <LittleFatty
          width={45}
          height={45}
          fatId={0}
          name={'decay'}
          setValue={this.setAdsrValue}
          value={values.decay}
          defaultValue={0}
          unit={1}
          max={100}
          min={0}
          fatProperty={'decay'}
        />
        <br/>
        <LittleFatty
          width={45}
          height={45}
          fatId={0}
          name={'sustain'}
          setValue={this.setAdsrValue}
          value={values.sustain}
          defaultValue={0}
          unit={1}
          max={100}
          min={0}
          fatProperty={'sustain'}
        />
        <br/>
        <LittleFatty
          width={45}
          height={45}
          fatId={0}
          name={'release'}
          setValue={this.setAdsrValue}
          value={values.release}
          defaultValue={0}
          unit={1}
          max={100}
          min={0}
          fatProperty={'release'}
        />
      </div>
    );
  }
}
