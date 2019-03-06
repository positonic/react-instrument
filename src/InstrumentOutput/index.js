import {Filter} from "./audio/Filter";

export function outputChannel(audioContext, filters, mainOutput) {
  if(!mainOutput) throw Error('Must pass some sort of mainOutput');
  //let filterConnection;
  let filterNodes;

  if (filters && filters.length > 0) {
    let FilterUtil = Filter(audioContext);

    filterNodes = FilterUtil.setUpFilters(filters, mainOutput);

    //filterConnection = filterNodes.length > 0 ? filterNodes[0] : mainOutput;
  } else {
    return [mainOutput];
  }

  const updateValue = (filterIndex, whichArray) => {

    whichArray.forEach((update) => {
      //filterNodes[filterIndex][update.field].value = update.value;
      filterNodes[filterIndex][update.field].setValueAtTime(update.value, audioContext.currentTime);
    })


    console.log('after', filterNodes);

    //filterConnection = filterNodes.length > 0 ? filterNodes[0] : mainOutput;

    return filterNodes;
  }

  return {
    /*input: filterConnection,*/
    updateValue: updateValue,
    filterNodes: filterNodes
  };
}
