import React from 'react';
import styled from "styled-components";

const TimelineBox = styled.div`
  height: 40px; 
  line-height: 40px; 
  font-size: 14px;
  background: #151313; 
  position: relative;
  color: white;
`;

const TimeNumber = styled.div`
  position: absolute;
`;

const Timeline = (props) => {

  function printBeats(noBeats) {
    let timeNumbers = [];

    const tickWidth = 22.5;
    const beatWidth = tickWidth * 4;

    for(let i=0;i<noBeats;i++)
    {
      timeNumbers.push(<TimeNumber key={i} style={{ left: (75+(i*beatWidth)) }}>{i+1}</TimeNumber>);
      timeNumbers.push(<TimeNumber key={i+'.'} style={{ left: (100+(i*beatWidth)) }}>.</TimeNumber>);
      timeNumbers.push(<TimeNumber key={i+'.2'} style={{ left: (120+(i*beatWidth)) }}>.</TimeNumber>);
      timeNumbers.push(<TimeNumber key={i+'.3'} style={{ left: (140+(i*beatWidth)) }}>.</TimeNumber>);
    }

    return timeNumbers;
  }
  return (
    <TimelineBox>
      {printBeats(props.noBeats)}

      <svg className="gsuiTimeline-cursor" width="16" height="10" style={{ left: 0}}>
        <polygon points="2,2 8,8 14,2"></polygon>
      </svg>
    </TimelineBox>
  )
}
export default Timeline;