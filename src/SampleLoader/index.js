var audioContext = null;

export function init (passedAudioContext, bufferFiles) {

  return new Promise((resolve, reject) => {

    audioContext = passedAudioContext ? passedAudioContext : new AudioContext();

    let bufferFileArray = [];
    for(let bufferFileName in bufferFiles)
    {
      if (bufferFiles.hasOwnProperty(bufferFileName)){
        bufferFileArray.push(getBufferFilePromise({ name: bufferFileName, path: bufferFiles[bufferFileName] }));
      }

    }

    Promise.all(bufferFileArray).then((buffers) => {
      resolve(buffers)
    });


  });


};

var getBufferFilePromise = function (buffer) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open('GET', buffer.path, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {

      audioContext.decodeAudioData(request.response).then(function (decodedBuffer) {

        resolve({buffer: decodedBuffer, name: buffer.name});

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
