"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LittleFatty = _interopRequireDefault(require("../controls/LittleFatty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterPanel = function FilterPanel(props) {
  function setFilterValue(filterId, property, value) {
    props.updateSynthFilter(filterId, property, value);
  }

  return _react.default.createElement("div", null, _react.default.createElement("div", {
    className: "module"
  }, _react.default.createElement("h5", null, "LP"), _react.default.createElement(_LittleFatty.default, {
    width: 45,
    height: 45,
    fatId: 0,
    name: 'cutoff',
    setValue: setFilterValue,
    defaultValue: 1000,
    value: props.cutoff,
    unit: 10,
    max: 1000,
    min: 0,
    fatProperty: 'filter'
  }), _react.default.createElement("br", null), _react.default.createElement(_LittleFatty.default, {
    width: 45,
    height: 45,
    fatId: 0,
    name: 'Q',
    setValue: setFilterValue,
    defaultValue: 10,
    value: props.resonance,
    unit: 1,
    max: 40,
    min: 0,
    fatProperty: 'resonance'
  })));
};

var _default = FilterPanel;
/*
export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 1000
    };
    this.setFilterValue = this.setFilterValue.bind(this);
  }

  setFilterValue(filterId, property, value) {
    this.props.updateSynthFilter(
      filterId,
      property,
      value
    );
  }

  render() {
    return (
      <div className="filterPanel module">
        <h5>filter</h5>

        <LittleFatty
          fatId={0}
          name={'cutoff'}
          setValue={this.setFilterValue}
          defaultValue={1000}
          unit={10}
          max={1000}
          min={0}
          fatProperty={'filter'}
        />
        {/!*<LittleFatty fatId={0} name={"Q"} setValue={this.setFilterValue} defaultValue={10} unit={1} max={20} min={0} fatProperty={"Q"}/>*!/}
      </div>
    );
  }
}
*/

exports.default = _default;