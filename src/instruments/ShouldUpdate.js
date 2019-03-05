const instrumentsChanged = (nextProps, props) => {
  return nextProps.instruments !== props.instruments;
}
const trackDataChanged = (nextProps, props) => {
  return nextProps.tracks !== props.tracks;
}
const sampleBuffersUpdates = (nextState, state) => {
  if(typeof nextState.tracks === 'undefined' || typeof state.tracks === 'undefined') debugger

  if(nextState.tracks.samplesBuffers && state.tracks.samplesBuffers) {
    return nextState.tracks.samplesBuffers.length !== state.tracks.samplesBuffers.length
  } else {
    return nextState.tracks.samplesBuffers !== state.tracks.samplesBuffers
  }

}

export { instrumentsChanged, sampleBuffersUpdates, trackDataChanged }