/* eslint import/no-webpack-loader-syntax: off */
import {
  getLoopTick
} from '../utils';
import NanoEvents from 'nanoevents';
import HeartBeatWorker from './workers/HeartBeat.worker.js';

const emitter = new NanoEvents();
const workerInstance = new HeartBeatWorker();

let loopTick = []; // [4 => 1, 8 => 5, 16 => 5]
let numberOfTicks = 0;
let audioContext = null;
let isPlaying = false;
let current16thNote;
let bpm = 120.0;
let lookahead = 25.0;
let scheduleAheadTime = 0.2;
let nextNoteTime = 0.0;
let tickListeners = [];

export function subscribeToTicks(instrumentId, listenerCallback) {
  tickListeners[instrumentId] = listenerCallback;
}

let onTick = function(tickListeners) {

  return function(number) {
    tickListeners.forEach(listener => {
      listener(number);
    });
  };
};
emitter.on('tick', onTick(tickListeners));

export function init(context, output) {
  audioContext = context;

  //noSubNotesPerBeat = initNoSubNotesPerBeat;

  workerInstance.onmessage = function(e) {
    if (e.data === 'tick') {
      scheduler();
    }
  };
  workerInstance.postMessage({ interval: lookahead });
}

function nextNote() {

  let secondsPerBeat = 60.0 / bpm;

  nextNoteTime += 0.25 * secondsPerBeat;

  current16thNote++;
  if (current16thNote === numberOfTicks) {
    current16thNote = 0;
  }
  loopTick = getLoopTick(current16thNote);
}

function scheduleNote(tickNumber, time) {
  let tick = {
    tickNumber,
    time,
    bpm,
    loopTick
  };

  emitter.emit('tick', tick);
}

function scheduler() {
  // while there are notes that will need to play before the next interval,
  // schedule them and advance the pointer.
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    scheduleNote(current16thNote, nextNoteTime);

    nextNote();
  }
}

export function play() {

  isPlaying = !isPlaying;

  if (isPlaying) {
    current16thNote = 0;
    loopTick = getLoopTick(0);
    nextNoteTime = audioContext.currentTime;

    workerInstance.postMessage('start');
    return 'stop';
  } else {
    workerInstance.postMessage('stop');
    return 'play';
  }
}
export function stop() {
  if (isPlaying && workerInstance !== null) {
    workerInstance.postMessage('stop');
  }
}

export function playingNow() {
  return isPlaying;
}
