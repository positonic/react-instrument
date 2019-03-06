export function create(audioContext, output, initValue) {

  const mainSynthGain = audioContext.createGain();
  mainSynthGain.gain.value = initValue / 100;
  mainSynthGain.connect(output);

  return mainSynthGain;
}