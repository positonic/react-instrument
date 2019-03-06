"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timerID = null;
var interval = 100;

onmessage = function onmessage(e) {
  if (e.data == 'start') {
    timerID = setInterval(function () {
      postMessage('tick');
    }, interval);
  } else if (e.data.interval) {
    /*console.log("setting interval");*/
    interval = e.data.interval;
    /*console.log("interval="+interval);*/

    if (timerID) {
      clearInterval(timerID);
      timerID = setInterval(function () {
        postMessage('tick');
      }, interval);
    }
  } else if (e.data == 'stop') {
    /*console.log("stopping");*/
    clearInterval(timerID);
    timerID = null;
  }
};

postMessage('Happy heartbeat message');
var _default = {};
exports.default = _default;