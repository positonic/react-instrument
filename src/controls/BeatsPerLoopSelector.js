import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const styles = {
  tickChanger: {
    color: 'white !important',
    position: 'absolute',
    top: '20px',
    right: '20px',
    textAlign: 'right',
    '& label': {
      left: 'auto'
    },
  }
};

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    useNextVariants: true
  }
});
const BeatsPerLoopSelector = props => {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.tickChanger}>
        <InputLabel htmlFor="age-helper">Beats</InputLabel>
        <Select
          value={props.noLoopBeats}
          onChange={props.changeNumberOfBeatsLoop}
          input={<Input name="age" id="age-helper" />}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
          <MenuItem value={64}>64</MenuItem>
        </Select>
      </FormControl>
    </MuiThemeProvider>
  );
};
let BeatsPerLoopSelectorWrapped = withStyles(styles)(BeatsPerLoopSelector);

export default BeatsPerLoopSelectorWrapped;
