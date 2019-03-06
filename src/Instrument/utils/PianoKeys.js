/**
 * Sourced from:
 *   - https://upload.wikimedia.org/wikipedia/commons/a/ad/Piano_key_frequencies.png
 *   - http://www.phy.mtu.edu/~suits/notefreqs.html
 *
 **/
const PianoKeys = [
  {
    frequency: 16.35,
    isSharp: false,
    note: 'C0',
    midiNumber: 12
  },
  {
    frequency: 17.32,
    isSharp: true,
    note: 'C#0',
    midiNumber: 13
  },
  {
    frequency: 18.35,
    isSharp: false,
    note: 'D0',
    midiNumber: 14
  },
  {
    frequency: 19.45,
    isSharp: true,
    note: 'D#0',
    midiNumber: 15
  },
  {
    frequency: 20.6,
    isSharp: false,
    note: 'E0',
    midiNumber: 16
  },
  {
    frequency: 21.83,
    isSharp: false,
    note: 'F0',
    midiNumber: 17
  },
  {
    frequency: 23.12,
    isSharp: true,
    note: 'F#0',
    midiNumber: 18
  },
  {
    frequency: 24.5,
    isSharp: false,
    note: 'G0',
    midiNumber: 19
  },
  {
    frequency: 25.96,
    isSharp: true,
    note: 'G#0',
    midiNumber: 20
  },
  {
    frequency: 27.5,
    isSharp: false,
    note: 'A0',
    midiNumber: 21
  },
  {
    frequency: 29.14,
    isSharp: true,
    note: 'A#0',
    midiNumber: 22
  },
  {
    frequency: 30.87,
    isSharp: false,
    note: 'B0',
    midiNumber: 23
  },

  {
    note: 'C1',
    frequency: 	32.70,
    midiNumber: 24,
    isSharp: false
  },
  {
    note: 'C#1',
    frequency: 	34.65,
    midiNumber: 25,
    isSharp: true
  },
  {
    note: 'D1',
    frequency: 36.71,
    midiNumber: 26,
    isSharp: false
  },
  {
    note: 'D#1',
    frequency: 38.89,
    midiNumber: 27,
    isSharp: true
  },
  {
    note: 'E1',
    frequency: 41.20,
    midiNumber: 28,
    isSharp: false
  },
  {
    note: 'F1',
    frequency: 43.65,
    midiNumber: 29,
    isSharp: false
  },
  {
    note: 'F#1',
    frequency: 46.25,
    midiNumber: 30,
    isSharp: true
  },
  {
    note: 'G1',
    frequency: 49.00,
    midiNumber: 31,
    isSharp: false
  },
  {
    note: 'G#1',
    frequency: 	51.91,
    midiNumber: 32,
    isSharp: true
  },
  {
    note: 'A1',
    frequency: 55.00,
    midiNumber: 33,
    isSharp: false
  },
  {
    note: 'A#1',
    frequency: 58.27,
    midiNumber: 34,
    isSharp: true
  },
  {
    note: 'B1',
    frequency: 61.74,
    midiNumber: 35,
    isSharp: false
  },
  {
    note: 'C2',
    frequency: 65.41,
    midiNumber: 36,
    isSharp: false
  },
  {
    note: 'C#2',
    frequency: 69.30,
    midiNumber: 37,
    isSharp: true
  },
  {
    note: 'D2',
    frequency: 73.42,
    midiNumber: 38,
    isSharp: false
  },
  {
    note: 'D#2',
    frequency: 77.78,
    midiNumber: 39,
    isSharp: true
  },
  {
    note: 'E2',
    frequency: 82.41,
    midiNumber: 40,
    isSharp: false
  },
  {
    note: 'F2',
    frequency: 87.31,
    midiNumber: 41,
    isSharp: false
  },
  {
    note: 'F#2',
    frequency: 92.50,
    midiNumber: 42,
    isSharp: true
  },
  {
    note: 'G2',
    frequency: 98.00,
    midiNumber: 43,
    isSharp: false
  },
  {
    note: 'G#2',
    frequency: 103.83,
    midiNumber: 44,
    isSharp: true
  },
  {
    note: 'A2',
    frequency: 110.00,
    midiNumber: 45,
    isSharp: false
  },
  {
    note: 'A#2',
    frequency: 116.54,
    midiNumber: 46,
    isSharp: true
  },
  {
    note: 'B2',
    frequency: 123.47,
    midiNumber: 47,
    isSharp: false
  },
  {
    note: 'C3',
    frequency: 130.81,
    midiNumber: 48,
    isSharp: false
  },
  {
    note: 'C#3',
    frequency: 138.59,
    midiNumber: 49,
    isSharp: true
  },
  {
    note: 'D3',
    frequency: 146.83,
    midiNumber: 50,
    isSharp: false
  },
  {
    note: 'D#3',
    frequency: 155.56,
    midiNumber: 51,
    isSharp: true
  },
  {
    note: 'E3',
    frequency: 164.81,
    midiNumber: 52,
    isSharp: false
  },
  {
    note: 'F3',
    frequency: 174.61,
    midiNumber: 53,
    isSharp: false
  },
  {
    note: 'F#3',
    frequency: 185.00,
    midiNumber: 54,
    isSharp: true
  },
  {
    note: 'G3',
    frequency: 196.00,
    midiNumber: 55,
    isSharp: false
  },
  {
    note: 'G#3',
    frequency: 207.65,
    midiNumber: 56,
    isSharp: true
  },
  {
    note: 'A3',
    frequency: 220.00,
    midiNumber: 57,
    isSharp: false
  },
  {
    note: 'A#3',
    frequency: 233.08,
    midiNumber: 58,
    isSharp: true
  },
  {
    note: 'B3',
    frequency: 246.94,
    midiNumber: 59,
    isSharp: false
  },
  {
    note: 'C4',
    frequency: 261.63,
    midiNumber: 60,
    isSharp: false
  },
  {
    note: 'C#4',
    midiNumber: 61,
    frequency: 277.18,
    isSharp: true
  },
  {
    note: 'D4',
    midiNumber: 62,
    frequency: 293.66,
    isSharp: false
  },
  {
    note: 'D#4',
    midiNumber: 63,
    frequency: 311.13,
    isSharp: true
  },
  {
    note: 'E4',
    midiNumber: 64,
    frequency: 329.63,
    isSharp: false
  },
  {
    note: 'F4',
    midiNumber: 65,
    frequency: 349.23,
    isSharp: false
  },
  {
    note: 'F#4',
    midiNumber: 66,
    frequency: 369.99,
    isSharp: true
  },
  {
    note: 'G4',
    midiNumber: 67,
    frequency: 392.00,
    isSharp: false
  },
  {
    note: 'G#4',
    midiNumber: 68,
    frequency: 415.30,
    isSharp: true
  },
  {
    note: 'A4',
    midiNumber: 69,
    frequency: 440.00,
    isSharp: false
  },
  {
    note: 'A#4',
    midiNumber: 70,
    frequency: 466.16,
    isSharp: true
  },
  {
    note: 'B4',
    midiNumber: 71,
    frequency: 493.88,
    isSharp: false
  },
  {
    note: 'C5',
    midiNumber: 72,
    frequency: 523.25,
    isSharp: false
  },
  {
    note: 'C#5',
    midiNumber: 73,
    frequency: 554.37,
    isSharp: true
  },
  {
    note: 'D5',
    midiNumber: 74,
    frequency: 587.33,
    isSharp: false
  },
  {
    note: 'D#5',
    midiNumber: 75,
    frequency: 622.25,
    isSharp: true
  },
  {
    note: 'E5',
    midiNumber: 76,
    frequency: 659.26,
    isSharp: false
  },
  {
    note: 'F5',
    midiNumber: 77,
    frequency: 698.46,
    isSharp: false
  },
  {
    note: 'F#5',
    midiNumber: 78,
    frequency: 739.99,
    isSharp: true
  },
  {
    note: 'G5',
    midiNumber: 79,
    frequency: 783.99,
    isSharp: false
  },
  {
    note: 'G#5',
    midiNumber: 80,
    frequency: 830.61,
    isSharp: true
  },
  {
    note: 'A5',
    midiNumber: 81,
    frequency: 880.00,
    isSharp: false
  },
  {
    note: 'A#5',
    midiNumber: 82,
    frequency: 932.33,
    isSharp: true
  },
  {
    note: 'B5',
    midiNumber: 83,
    frequency: 987.77,
    isSharp: false
  },
  {
    note: 'C6',
    midiNumber: 84,
    frequency: 1046.50,
    isSharp: false
  },
  {
    note: 'C#6',
    midiNumber: 85,
    frequency: 1108.73,
    isSharp: true
  },
  {
    note: 'D6',
    midiNumber: 86,
    frequency: 1174.66,
    isSharp: false
  },
  {
    note: 'D#6',
    midiNumber: 87,
    frequency: 1244.51,
    isSharp: true
  },
  {
    note: 'E6',
    midiNumber: 88,
    frequency: 1318.51,
    isSharp: false
  },
  {
    note: 'F6',
    midiNumber: 89,
    frequency: 1396.91,
    isSharp: false
  },
  {
    note: 'F#6',
    midiNumber: 90,
    frequency: 1479.98,
    isSharp: true
  },
  {
    note: 'G6',
    midiNumber: 91,
    frequency: 1567.98,
    isSharp: false
  },
  {
    note: 'G#6',
    midiNumber: 92,
    frequency: 1661.22,
    isSharp: true
  },
  {
    note: 'A6',
    midiNumber: 93,
    frequency: 1760.00,
    sSharp: false
  },
  {
    note: 'A#6',
    midiNumber: 94,
    frequency: 1864.66,
    isSharp: true
  },
  {
    note: 'B6',
    midiNumber: 95,
    frequency: 1975.53,
    isSharp: false
  },
  {
    note: 'C7',
    midiNumber: 96,
    frequency: 2093.00,
    isSharp: false
  },
  {
    note: 'C#7',
    midiNumber: 97,
    frequency: 2217.46,
    isSharp: true
  },
  {
    note: 'D7',
    midiNumber: 98,
    frequency: 2349.32,
    isSharp: false
  },
  {
    note: 'D#7',
    midiNumber: 99,
    frequency: 2489.02,
    isSharp: true
  },
  {
    note: 'E7',
    midiNumber: 100,
    frequency: 2637.02,
    isSharp: false
  },
  {
    note: 'F7',
    midiNumber: 101,
    frequency: 2793.83,
    isSharp: false
  },
  {
    note: 'F#7',
    midiNumber: 102,
    frequency: 2959.96,
    isSharp: true
  },
  {
    note: 'G7',
    midiNumber: 103,
    frequency: 3135.96,
    isSharp: false
  },
  {
    note: 'G#7',
    midiNumber: 104,
    frequency: 3322.44,
    isSharp: true
  },
  {
    note: 'A7',
    midiNumber: 105,
    frequency: 3520.00,
    isSharp: false
  },
  {
    note: 'A#7',
    midiNumber: 106,
    frequency: 3729.31,
    isSharp: true
  },
  {
    note: 'B7',
    midiNumber: 107,
    frequency: 3951.07,
    isSharp: false
  },
  {
    note: 'C8',
    midiNumber: 108,
    frequency: 4186.01,
    isSharp: false
  },
  {
    note: 'C#8',
    midiNumber: 109,
    frequency: 4434.92,
    isSharp: true
  },
  {
    note: 'D8',
    midiNumber: 110,
    frequency: 4698.64,
    isSharp: false
  },
  {
    note: 'D#8',
    midiNumber: 111,
    frequency: 4978.03,
    isSharp: true
  },
  {
    note: 'E8',
    midiNumber: 112,
    frequency: 5274.04,
    isSharp: false
  },
  {
    note: 'F8',
    midiNumber: 113,
    frequency: 5587.65,
    isSharp: false
  },
  {
    note: 'F#8',
    midiNumber: 114,
    frequency: 5919.91,
    isSharp: true
  },
  {
    note: 'G8',
    midiNumber: 115,
    frequency: 6271.93,
    isSharp: false
  },
  {
    note: 'G#8',
    midiNumber: 116,
    frequency: 6644.88,
    isSharp: true
  },
  {
    note: 'A8',
    midiNumber: 117,
    frequency: 7040.00,
    isSharp: false
  },
  {
    note: 'A#8',
    midiNumber: 118,
    frequency: 7458.62,
    isSharp: true
  },
  {
    note: 'B8',
    midiNumber: 119,
    frequency: 7902.13,
    isSharp: false
  },
  {
    note: 'C9',
    midiNumber: 120,
    frequency: 8372.02,
    isSharp: false
  },
  {
    note: 'C#9',
    midiNumber: 121,
    frequency: 8869.84,
    isSharp: true
  },
  {
    note: 'D9',
    midiNumber: 122,
    frequency: 9397.27,
    isSharp: false
  },
  {
    note: 'D#9',
    midiNumber: 123,
    frequency: 9956.06,
    isSharp: true
  },
  {
    note: 'E9',
    midiNumber: 124,
    frequency: 10548.08,
    isSharp: false
  },
  {
    note: 'F9',
    midiNumber: 125,
    frequency: 11175.30,
    isSharp: false
  },
  {
    note: 'F#9',
    midiNumber: 126,
    frequency: 11839.82,
    isSharp: true
  },
  {
    note: 'G9',
    midiNumber: 127,
    frequency: 12543.85,
    isSharp: false
  }
].reverse();

export { PianoKeys, getFrequencyFromKeyIndex };

function getFrequencyFromKeyIndex(index) {
  return PianoKeys[index].frequency;
}
