"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeToTicks = subscribeToTicks;
exports.init = init;
exports.play = play;
exports.stop = stop;
exports.playingNow = playingNow;

var _utils = require("../utils");

var _nanoevents = _interopRequireDefault(require("nanoevents"));

var _HeartBeatWorker = _interopRequireDefault(require("./workers/HeartBeat.worker.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-webpack-loader-syntax: off */
var emitter = new _nanoevents.default();
var workerInstance = new _HeartBeatWorker.default();
var loopTick = []; // [4 => 1, 8 => 5, 16 => 5]

var numberOfTicks = 0;
var audioContext = null;
var isPlaying = false;
var current16thNote;
var bpm = 120.0;
var lookahead = 25.0;
var scheduleAheadTime = 0.2;
var nextNoteTime = 0.0;
var tickListeners = [];

function subscribeToTicks(instrumentId, listenerCallback) {
  tickListeners[instrumentId] = listenerCallback;
}

var onTick = function onTick(tickListeners) {
  return function (number) {
    tickListeners.forEach(function (listener) {
      listener(number);
    });
  };
};

emitter.on('tick', onTick(tickListeners));

function init(context, output) {
  audioContext = context; //noSubNotesPerBeat = initNoSubNotesPerBeat;

  workerInstance.onmessage = function (e) {
    if (e.data === 'tick') {
      scheduler();
    }
  };

  workerInstance.postMessage({
    interval: lookahead
  });
}

function nextNote() {
  var secondsPerBeat = 60.0 / bpm;
  nextNoteTime += 0.25 * secondsPerBeat;
  current16thNote++;

  if (current16thNote === numberOfTicks) {
    current16thNote = 0;
  }

  loopTick = (0, _utils.getLoopTick)(current16thNote);
}

function scheduleNote(tickNumber, time) {
  var tick = {
    tickNumber: tickNumber,
    time: time,
    bpm: bpm,
    loopTick: loopTick
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

function play() {
  debugger;
  isPlaying = !isPlaying;

  if (isPlaying) {
    current16thNote = 0;
    loopTick = (0, _utils.getLoopTick)(0);
    nextNoteTime = audioContext.currentTime;
    workerInstance.postMessage('start');
    return 'stop';
  } else {
    workerInstance.postMessage('stop');
    return 'play';
  }
}

function stop() {
  if (isPlaying && workerInstance !== null) {
    workerInstance.postMessage('stop');
  }
}

function playingNow() {
  return isPlaying;
}