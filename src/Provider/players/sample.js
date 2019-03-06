function PlaySample(audioContext, samples, output) {
    let sampleMap;

    if (typeof samples !== "undefined") {
        if (samples === null) debugger;
        sampleMap = samples.reduce(function(map, sample) {
            map[sample.name] = sample.buffer;
            return map;
        }, {});
    }

    return function(instrument, time, noteLengthInSeconds, detune) {
        if (typeof sampleMap === "undefined") debugger;
        let buffer = sampleMap[instrument];

        var source = audioContext.createBufferSource(); // creates a sound source
        source.buffer = buffer; // tell the source which sound to play

        if (detune !== 0) {
            source.detune.value = detune;
        }
        let gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        source.connect(gain); // connect the source to the audioContext's destination (the speakers)
        gain.connect(output);

        source.start(time);

        if (noteLengthInSeconds) {
            source.stop(time + noteLengthInSeconds);
        }

        return source;
    };
}

export function samplePlayer(audioContext, output, loadedSamplesBuffers) {
    let playSample = PlaySample(audioContext, loadedSamplesBuffers, output);

    /**
     * Instrument is for the drum machine - 'bass' etc
     */
    return function(midiNumber, time, noteLengthInSeconds, bpm, instrument) {
        const cent = 100;
        const baseMidi = 60; //48;

        let detune = 0;
        if (typeof midiNumber !== "undefined") {
            if (midiNumber === baseMidi) detune = 0;
            else {
                detune = (midiNumber - baseMidi) * cent;
            }
        }
        // console.log('PlaySamples ', Instrument, time, noteLengthInSeconds, detune);

        let voice = playSample(instrument, time, noteLengthInSeconds, detune);

        return voice;
    };
}