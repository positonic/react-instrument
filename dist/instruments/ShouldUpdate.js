"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackDataChanged = exports.sampleBuffersUpdates = exports.instrumentsChanged = void 0;

var instrumentsChanged = function instrumentsChanged(nextProps, props) {
  return nextProps.instruments !== props.instruments;
};

exports.instrumentsChanged = instrumentsChanged;

var trackDataChanged = function trackDataChanged(nextProps, props) {
  return nextProps.tracks !== props.tracks;
};

exports.trackDataChanged = trackDataChanged;

var sampleBuffersUpdates = function sampleBuffersUpdates(nextState, state) {
  if (typeof nextState.tracks === 'undefined' || typeof state.tracks === 'undefined') debugger;

  if (nextState.tracks.samplesBuffers && state.tracks.samplesBuffers) {
    return nextState.tracks.samplesBuffers.length !== state.tracks.samplesBuffers.length;
  } else {
    return nextState.tracks.samplesBuffers !== state.tracks.samplesBuffers;
  }
};

exports.sampleBuffersUpdates = sampleBuffersUpdates;