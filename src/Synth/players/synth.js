import {midiMap} from "../../AudioUtils/MidiMap";
import {getFrequencyOfNote, getNoteLengthSecondsFromBeats} from "../../AudioUtils";
import {Source} from "../../AudioUtils/Oscillator";

export function synthPlayer(audioContext, config) {
    const { /*oscillators, */ envelopes, isMuted } = config;
    let playingVoices = {};
    return function(
        midiNumber,
        time,
        noteLengthBeats,
        bpm,
        currentInstrument,
        filters,
        oscillators
    ) {
        if (!isMuted) {
            if (typeof midiNumber === "undefined") {
                console.log(
                    "midiNumber cant be undefined",
                    (midiNumber, time, noteLengthBeats, bpm)
                );
                throw Error("midiNumber cant be undefined");
            } else {
                let note = midiMap[midiNumber];
                if (!note) debugger;
                let frequency = getFrequencyOfNote(note);

                if (typeof time === "undefined") time = 0;

                let noteLengthInSeconds =
                    noteLengthBeats && bpm
                        ? getNoteLengthSecondsFromBeats(noteLengthBeats, bpm)
                        : 0;

                let sourceVoice = Source(audioContext);

                let voice = sourceVoice.play(
                    time,
                    noteLengthInSeconds,
                    frequency,
                    filters,
                    oscillators,
                    envelopes[1]
                );
                playingVoices[midiNumber] = voice;

                return playingVoices;
            }
        }
    };
}
