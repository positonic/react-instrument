"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputChannel = outputChannel;

var _Filter = require("./audio/Filter");

function outputChannel(audioContext, filters, mainOutput) {
  if (!mainOutput) throw Error('Must pass some sort of mainOutput'); //let filterConnection;

  var filterNodes;

  if (filters && filters.length > 0) {
    var FilterUtil = (0, _Filter.Filter)(audioContext);
    filterNodes = FilterUtil.setUpFilters(filters, mainOutput); //filterConnection = filterNodes.length > 0 ? filterNodes[0] : mainOutput;
  } else {
    return [mainOutput];
  }

  var updateValue = function updateValue(filterIndex, whichArray) {
    whichArray.forEach(function (update) {
      //filterNodes[filterIndex][update.field].value = update.value;
      filterNodes[filterIndex][update.field].setValueAtTime(update.value, audioContext.currentTime);
    });
    console.log('after', filterNodes); //filterConnection = filterNodes.length > 0 ? filterNodes[0] : mainOutput;

    return filterNodes;
  };

  return {
    /*input: filterConnection,*/
    updateValue: updateValue,
    filterNodes: filterNodes
  };
}