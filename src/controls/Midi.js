const midiMessages = [];
midiMessages[141] = 'Note on';
midiMessages[128] = 'Note off';

let noteOnCallback = null;
let noteOffCallback = null;

/* message.data = [midiMessageType, keyPressed, velocity ] */
function onMIDIMessage (message) {

    const midiActionType = message.data[0];
    const midiNumber = message.data[1];

    if (midiActionType === 144 && midiNumber > 0) {
        noteOnCallback(midiNumber);
    }

    if (message.data[0] === 128 || message.data[2] === 0) {
        noteOffCallback(midiNumber);
    }
}
/*

function midiNoteToFrequency (note) {
    return Math.pow(2, ((note - 69) / 12)) * 440;
}
*/

export function SetMidiCallbacks(midi, noteOn, noteOff)
{
    noteOnCallback = noteOn;
    noteOffCallback = noteOff;

    var inputs = midi.inputs.values();

    for (var input = inputs.next();
         input && !input.done;
         input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }

    return inputs;
};
export function MIDIFailure(err)
{
    console.log( "MIDI not initialized - error encountered:" + err.code );
    alert('midi failed');
};
