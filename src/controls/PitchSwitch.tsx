import * as React from "react";
import styled from "styled-components";
const PipeLength = styled.input`
  cursor: pointer
`;

const PitchSwitch: any = (props: any) => {

  const lengths = [32, 16, 8, 4, 2, 1];

  function handleChangeChk(event: any) :any {
    console.log('event', event);
    props.setValue(props.oscId, props.field, event.target.value);
  }

  return (
    <div className={'pitchSwitch'}>
      {lengths.map((length, key) => {
        return <div key={'key'+key} className={'pipe'}>
          <PipeLength
            checked={Number(props.value) === Number(length)}
            onChange={handleChangeChk}
            type="radio"
            value={length}
          /><label>{length}</label>

        </div>
      })}
    </div>
  );
};

export default PitchSwitch;
