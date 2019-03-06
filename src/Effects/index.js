import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

const FilterBox = styled.a`
  display: block;
`;

const Filter = props => {
  return (
    <FilterBox>
      <Checkbox value={props.checked} checked={props.active === true} onChange={props.onChange} />
      {props.type}
    </FilterBox>
  );
};
class Effects extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(instrumentId, filterIndex) {
    //alert('Check shouldComponentUpdate in Instrument.js, its not updating at present.')
    return (evt) => {
      this.props.toggleFilter(instrumentId, filterIndex);
    };
  }
  render() {
    const {instrumentId} = this.props;

    return (
      <div className={this.props.className+' clearBoth'}>
        <h3>Filters</h3>
        {this.props.instrument.filters.map((filter, index) => {
          const type = filter.hasOwnProperty('tunaType') ? filter.tunaType : filter.type;
          return <Filter key={index} type={type} active={filter.active}
                         onChange={this.toggleFilter(instrumentId, index)}/>;
        })}
        <br className='clearBoth'/>
      </div>
    );

  }
}
const StyledEffects = styled(Effects)`

`;

export default StyledEffects;
