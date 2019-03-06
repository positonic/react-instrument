import React from "react";
import "react-piano/dist/styles.css";
import FilterPanel from "./FilterPanel";
import Adsr from "./Adsr";
import styled from "styled-components";
import Oscillator from "./Oscillator";

class Parameters extends React.Component {
  constructor(props) {
    super(props);

    this.updateSynthFilter = this.updateSynthFilter.bind(this);
    this.setOscValue = this.setOscValue.bind(this);
    this.updateSynthFilter = this.updateSynthFilter.bind(this);
    this.setWaveFormValue = this.setWaveFormValue.bind(this);
    this.setAdsrValue = this.setAdsrValue.bind(this);

    this.state = {
      view: "grid",
      ampEnvelope: {
        attackTime: 0.1,
        decayTime: 3,
        sustainLevel: 0.4,
        releaseTime: 0.1
      }
    };
  }

  setWaveFormValue(event, property) {
    /*this.setFatValue(this.setValue(event.target.dataset.value, property);*/
    this.setOscValue(
      property.oscId,
      property.field,
      event.target.dataset.value
    );
  }

  setOscValue(oscId, property, value) {
    console.log("setOscValue(oscId, property, value)", oscId, property, value);
    this.props.updateSynthOscState(oscId, property, value);
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  setAdsrValue(envelopeId, property, value) {
    const { updateEnvelopeState } = this.props;

    updateEnvelopeState(envelopeId, property, value);
  }

  updateSynthFilter(filterId, property, value) {
    this.props.updateSynthFilterState(filterId, property, value);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(
      "this.nextProps.osc1.tuning",
      nextProps.instrument.oscillators[0].tuning
    );
    return true;
  }

  render() {
    //const { instrument } = this.state;
    const { instrument } = this.props;

    const lowPassFilterValue = instrument.filters[0].props.value;
    const resonanceFilterValue = instrument.filters[0].props.Q;
    const ampEnvelope = instrument.envelopes[1];

    return (
      <div className={this.props.className + " sequencedSynth layout1"}>
        <div className="body machine">
          <div
            style={{
              float: "left"
            }}
          >
            <div className="clearBoth sources slot">
              <Oscillator
                oscNo={1}
                oscIndex={0}
                name="o1"
                setOscValue={this.setOscValue}
                setWaveFormValue={this.setWaveFormValue}
                oscillator={instrument.oscillators[0]}
                tuning={instrument.oscillators[0].tuning}
                classNames="source osc osc1 clearfix module"
              />
              <Oscillator
                oscNo={2}
                oscIndex={1}
                name="o2"
                setOscValue={this.setOscValue}
                setWaveFormValue={this.setWaveFormValue}
                oscillator={instrument.oscillators[1]}
                tuning={instrument.oscillators[1].tuning}
                classNames="source osc osc1 osc2-m osc2 clearfix module"
              />
            </div>{" "}
            <div className="filters slot">
              <FilterPanel
                cutoff={lowPassFilterValue}
                resonance={resonanceFilterValue}
                updateSynthFilter={this.updateSynthFilter}
              />{" "}
            </div>{" "}
            <div className="envelopes slot">
              {" "}
              {/* <Adsr envelopeId={0} defaultValue={this.state.filterEnvelope} setValue={this.setAdsrValue} context={this.props.context} controls="filter"/>*/}{" "}
              <Adsr
                envelopeId={1}
                setValue={this.setAdsrValue}
                defaultValue={this.state.ampEnvelope}
                values={ampEnvelope}
                controls="amp"
              />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

const styledParameters = styled(Parameters)`
  width: 100%;
  font-size: 20px;
  .machine {
    font-size: 20px;
  }
  h5 {
    font-size: 20px;
  }
  .littleFatty {
    text-align: center;
  }
  color: white;
  font-size: 1.5em;
  margin: 10px auto 0;
  position: relative;

  .machine {
    font-size: 20px;
  }

  .body {
    position: relative;
    float: left;
    width: 100%;
  }
  .machine {
    background: url(/images/background-grey.jpg) repeat-x;
    padding: 10px;
  }
  .sources {
    display: inline-block;
  }
  .clearBoth {
    clear: both;
  }
  .module {
    background: #222;
    border: 1px solid #474545;
    padding: 8px;
    position: relative;
  }
  .osc2 {
    float: left;
    clear: left;
  }
  .osc2-m {
    margin-top: 10px;
  }
  .module {
    background: #222;
    border: 1px solid #474545;
    padding: 8px;
    position: relative;
  }
  .sequencedSynth .filters {
    display: inline-block;
    vertical-align: top;
  }
  .envelopes {
    display: inline-block;
    vertical-align: top;
  }
  .layout1 .envelopes {
    width: 16%;
  }
  .layout1 .envelopes .module {
    display: inline-block;
  }
  .filters {
    display: inline-block;
    vertical-align: top;
  }
  .envelopes {
    display: inline-block;
    vertical-align: top;
  }
  .layout1 .envelopes {
    width: 16%;
  }
  .layout1 .envelopes .module {
    display: inline-block;
  }
`;

export default styledParameters;
