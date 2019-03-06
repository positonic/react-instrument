import * as React from "react";
import styled from "styled-components";
const PipeLengthSelectBox = styled.span`
  vertical-align: top;
  display: inline-block;
  line-height: 21px;
  position: absolute;
  right: 0;
`;


const PipeLengthSelect: any = (props: any) => {

  const lengths = [32, 16, 8, 4, 2, 1];

  function handleChangeChk(event: any) :any {
    console.log('event', event);
    props.setValue(props.oscId, props.field, event.target.value);
  }

  return (
      <PipeLengthSelectBox>
        <select value={props.value} onChange={handleChangeChk}>
          {lengths.map((length, key) => <option key={key} value={length}>{length}</option>)}
        </select>
      </PipeLengthSelectBox>

  );
};

export default PipeLengthSelect;
