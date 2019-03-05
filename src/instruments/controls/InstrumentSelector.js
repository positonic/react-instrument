import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const Selector = styled.select`
  position: absolute;
  right: 20px;
  top: 86px;
`;
const InstrumentSelector = props => {
  const { changeInstrument, instruments, currentInstrument } = props;

  return (
    <Selector className="dmInstrumentSelect" onChange={changeInstrument} value={currentInstrument}>
      {instruments.map((instrument, key) => {
        return (
          <option key={key} value={instrument}>
            {instrument}
          </option>
        );
      })}
    </Selector>
  );
};
InstrumentSelector.propTypes = {
  changeInstrument: PropTypes.func.isRequired,
  instruments: PropTypes.array.isRequired
};

export default InstrumentSelector;
