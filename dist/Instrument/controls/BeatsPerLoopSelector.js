"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _styles = require("@material-ui/core/styles");

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  tickChanger: {
    color: 'white !important',
    position: 'absolute',
    top: '20px',
    right: '20px',
    textAlign: 'right',
    '& label': {
      left: 'auto'
    }
  }
};
var theme = (0, _styles.createMuiTheme)({
  palette: {
    type: 'dark'
  },
  typography: {
    useNextVariants: true
  }
});

var BeatsPerLoopSelector = function BeatsPerLoopSelector(props) {
  var classes = props.classes;
  return _react.default.createElement(_styles.MuiThemeProvider, {
    theme: theme
  }, _react.default.createElement(_FormControl.default, {
    className: classes.tickChanger
  }, _react.default.createElement(_InputLabel.default, {
    htmlFor: "age-helper"
  }, "Beats"), _react.default.createElement(_Select.default, {
    value: props.noLoopBeats,
    onChange: props.changeNumberOfBeatsLoop,
    input: _react.default.createElement(_Input.default, {
      name: "age",
      id: "age-helper"
    })
  }, _react.default.createElement(_MenuItem.default, {
    value: 4
  }, "4"), _react.default.createElement(_MenuItem.default, {
    value: 8
  }, "8"), _react.default.createElement(_MenuItem.default, {
    value: 16
  }, "16"), _react.default.createElement(_MenuItem.default, {
    value: 32
  }, "32"), _react.default.createElement(_MenuItem.default, {
    value: 64
  }, "64"))));
};

var BeatsPerLoopSelectorWrapped = (0, _styles.withStyles)(styles)(BeatsPerLoopSelector);
var _default = BeatsPerLoopSelectorWrapped;
exports.default = _default;