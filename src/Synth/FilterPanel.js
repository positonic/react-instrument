import React from 'react';
import LittleFatty from '../controls/LittleFatty';

const FilterPanel = (props) => {
  function setFilterValue(filterId, property, value) {
    props.updateSynthFilter(
      filterId,
      property,
      value
    );
  }

  return (
    <div>
      <div className="module">
        <h5>LP</h5>

        <LittleFatty
          width={45}
          height={45}
          fatId={0}
          name={'cutoff'}
          setValue={setFilterValue}
          defaultValue={1000}
          value={props.cutoff}
          unit={10}
          max={1000}
          min={0}
          fatProperty={'filter'}
        />
        {/*<LittleFatty fatId={0} name={"Q"} setValue={this.setFilterValue} defaultValue={10} unit={1} max={20} min={0} fatProperty={"Q"}/>*/}
        <br/>
        <LittleFatty
          width={45}
          height={45}
          fatId={0}
          name={'Q'}
          setValue={setFilterValue}
          defaultValue={10}
          value={props.resonance}
          unit={1}
          max={40}
          min={0}
          fatProperty={'resonance'}
        />
        {/*<LittleFatty fatId={0} name={"Q"} setValue={this.setFilterValue} defaultValue={10} unit={1} max={20} min={0} fatProperty={"Q"}/>*/}
      </div>
    </div>
  );
}

export default FilterPanel;
/*
export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 1000
    };
    this.setFilterValue = this.setFilterValue.bind(this);
  }

  setFilterValue(filterId, property, value) {
    this.props.updateSynthFilter(
      filterId,
      property,
      value
    );
  }

  render() {
    return (
      <div className="filterPanel module">
        <h5>filter</h5>

        <LittleFatty
          fatId={0}
          name={'cutoff'}
          setValue={this.setFilterValue}
          defaultValue={1000}
          unit={10}
          max={1000}
          min={0}
          fatProperty={'filter'}
        />
        {/!*<LittleFatty fatId={0} name={"Q"} setValue={this.setFilterValue} defaultValue={10} unit={1} max={20} min={0} fatProperty={"Q"}/>*!/}
      </div>
    );
  }
}
*/
