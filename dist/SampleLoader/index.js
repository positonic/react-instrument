"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var audioContext = null;

function init(passedAudioContext, bufferFiles) {
  return new Promise(function (resolve, reject) {
    audioContext = passedAudioContext ? passedAudioContext : new AudioContext();
    var bufferFileArray = [];

    for (var bufferFileName in bufferFiles) {
      if (bufferFiles.hasOwnProperty(bufferFileName)) {
        bufferFileArray.push(getBufferFilePromise({
          name: bufferFileName,
          path: bufferFiles[bufferFileName]
        }));
      }
    }

    Promise.all(bufferFileArray).then(function (buffers) {
      resolve(buffers);
    });
  });
}

;

var getBufferFilePromise = function getBufferFilePromise(buffer) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', buffer.path, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
      audioContext.decodeAudioData(request.response).then(function (decodedBuffer) {
        resolve({
          buffer: decodedBuffer,
          name: buffer.name
        });
      });
    };

    request.send();
  });
};
/*
var getBufferFile = function (buffer, callback) {

  var request = new XMLHttpRequest();

  request.open('GET', buffer.path, true);
  request.responseType = 'arraybuffer';

  request.onload = function () {

    audioContext.decodeAudioData(request.response).then(function (decodedBuffer) {

      callback({ buffer: decodedBuffer, name: buffer.name });

    });

  };

  request.send();
};*/