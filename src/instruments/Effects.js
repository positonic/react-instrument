import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

const FilterBox = styled.a`
  display: block;
  width: 49%;
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

  toggleFilter(trackId, instrumentId, filterIndex) {
    alert('Check shouldComponentUpdate in Instrument.js, its not updating at present.')
    return (evt) => {
      this.props.toggleFilter(trackId, instrumentId, filterIndex);
    };
  }
  render() {
    const {trackId, instrumentId} = this.props;

    return (
      <div className={this.props.className+' clearBoth'}>
        {this.props.instrument.filters.map((filter, index) => {
          const type = filter.hasOwnProperty('tunaType') ? filter.tunaType : filter.type;
          return <Filter type={type} active={filter.active}
                         onChange={this.toggleFilter(trackId, instrumentId, index)}/>;
        })}
        <br className='clearBoth'/>
      </div>
    );

  }
}
const StyledEffects = styled(Effects)`
 
`;

export default StyledEffects;
