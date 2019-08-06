# Fluent React Instrument - A react based sequencer UI and keyboard

For a live demo, check out the instruments on the [Fluent Synth](https://fluentsynth.com).

If you want to have fun builing an instrument with the web audio api, this component gives you all of the UI that you will need.

You can create your own custom <Provider> which will take care of making the sounds, and pass it into the Fluent react-instrument, which will give you:

- a sequencer interface

![react instrument](http://jamespfarrell.com/images/projects/react-instrument.png)

- a midi enabled keyboard

![react instrument](http://jamespfarrell.com/images/projects/fluent-keyboard.png)

To use run:

`npm install react-instrument`

Then configure the keyboard like so:

```javascript
import SequencedInstrument from 'react-instrument';

const instrumentConfig = {
  provider: SynthProvider,
  parameters: SynthParameters,
  audioContext: this.props.audioContext,
  mainOutput: this.props.mainOutput,
  timeSequencer: this.props.timeSequencer,
  instrument: instrument,
  instrumentId: instrumentIndex,
  instrumentNames: [],
  currentInstrument: instrument.currentInstrument,
  samplesBuffers: this.props.tracks.samplesBuffers,
  gainNode: this.props.instrumentGainNodes[instrumentIndex],
  isArmed: this.props.tracks.armedInstrument === instrumentIndex,
  showInstrument:
    this.props.tracks.showAllInstruments || this.props.tracks.armedInstrument === instrumentIndex,
  bpm: this.props.bpm,

  changeGridSequence: this.changeGridSequence,
  changeSequencedKeyboardInstrument: this.changeSequencedKeyboardInstrument,
  deleteInstrument: this.deleteInstrument,
  setArmedInstrument: this.setArmedInstrument,
  setInstrumentGain: this.setInstrumentGain,
  changeSequencedKeyboardView: this.changeSequencedKeyboardView,
  changeBeatsPerLoop: this.changeBeatsPerLoop,
  toggleShowEffects: this.toggleShowEffects
};

<SequencedInstrument config={instrumentConfig} />;
```

See the demo project for 2 example Providers (full instruments)

- One synthesizer
- One sampler

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
