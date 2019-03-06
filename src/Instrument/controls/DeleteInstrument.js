import './switch.styles.css';
import React from 'react';
import styled from "styled-components";

const DeleteInstrument = ({ className, deleteInstrument }) => {
  function onClick(evt) {
    deleteInstrument();
  }

  return (
    <a className={className} onClick={onClick}>
      <i className="fa fa-times-circle" />
    </a>
  );
};
const StyledDeleteInstrument = styled(DeleteInstrument)`
  position: absolute;
  top: 2px;
  right: 7px;
  cursor: pointer;
  
  i {
    font-size: 20px;
  }
  i:hover {
    color: #01A9E8;
    }
`;

export default StyledDeleteInstrument ;
