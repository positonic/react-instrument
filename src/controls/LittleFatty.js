import React from 'react';
import styled from "styled-components";

const Knob = styled.span`
 width: ${props => props.width+'px' || '64px'};
 height: ${props => props.height+'px' || '64px'};
	display: inline-block;
	cursor: pointer;
	margin: 0;
	padding: 0;
	background: url("/images/LittlePhatty.png");
	background-size: 100% 10100%;
`;

//var knobImage = require('./images/LittlePhatty.png');

export function getSpriteOffset(value, max, height) {
  return -1 * Math.round((value / max) * 100) * height;
}

class LittleFatty extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    const width = (props.width) ? props.width : 64;
    const height = (props.height) ? props.height : 64;
    this.state = {
      enable: true,
      hover: false,
      sensitivity: 1,
      src: null,
      bgsrc: null,
      /*value: this.props.value,*/
      unit: this.props.unit,
      fatProperty: this.props.fatProperty,
      defvalue: 0,
      min: this.props.min,
      max: this.props.max,
      step: 1,
      log: 0,
      units: null,
      width: width,
      height: height,
      diameter: null,
      sprites: 0,
      aluetip: 1,
      tootip: null,
      colors: 'setupImage',
      vtflag: 0,
      ctlStep: 1
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.pointerOut = this.pointerOut.bind(this);
    this.pointermove = this.pointermove.bind(this);
    this.pointerDown = this.pointerDown.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }



  enable() {
    if (!this.state.enabled) return;
    this.setState({ hover: 1 });
  }

  mouseOver() {
    if (!this.state.enable) return;

    this.setState({ hover: 1 });
  }

  mouseOut() {
    if (!this.state.enable) return;

    this.setState({ hover: 0 });
    this.setState({ values: [] });

    this.sendevent();
    this.redraw();
  }

  cancel() {

    if(this._isMounted) {
      this.setState({ press: 0, vtflag: 0 });
      //this.showtip();
      this.setState({ startPosX: null, startPosY: null });
    }
    window.removeEventListener('mousemove', this.boundPointermove, true);
    window.removeEventListener('touchmove', this.boundPointermove, true);
    window.removeEventListener('mouseup', this.boundCancel, true);
    window.removeEventListener('touchend', this.boundCancel, true);
    window.removeEventListener('touchcancel', this.boundCancel, true);
    document.body.removeEventListener('touchstart', this.preventScroll, false);

    //This is set as we drage this.props.setValue(this.props.fatId, this.state.fatProperty, this.props.value);
  }

  pointerDown(e) {
    if (!this.state.enable) return;

    this.boundPointermove = this.pointermove.bind(null);
    this.boundCancel = this.cancel.bind(null);
    /* this.boundPointermove = this.pointermove.bind(this);
     this.boundCancel = this.cancel.bind(this);*/
    /*if (e.ctrlKey || e.metaKey) {
        this.setValue(parseFloat(this.defvalue));
    }
    else {*/
    this.setState({ startPosX: e.pageX });
    this.setState({ startPosY: e.pageY });
    this.setState({ startVal: this.props.value });
    window.addEventListener('mousemove', this.boundPointermove, true);
    window.addEventListener('touchmove', this.pointermove, true);
    //}
    window.addEventListener('mouseup', this.boundCancel, true);
    window.addEventListener('touchend', this.boundCancel, true);
    window.addEventListener('touchcancel', this.boundCancel, true);
    //document.body.addEventListener('touchstart', this.preventScroll);
    this.setState({ press: 1, vtflag: 1 });
    //this.ttflag = 0;
    // this.showtip();
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  applyUnit(value, unit) {
    //return value;
    //return value * unit;
    return unit * Math.round(value / unit);
  }

  pointermove(event) {
    /*if(event.touches)
      e = event.touches[0];*/
    /*if(this.state.lastShift !== event.shiftKey) {
        this.state.lastShift = event.shiftKey;
        this.state.startPosX = event.pageX;
        this.state.startPosY = event.pageY;
        this.state.startVal = this.statevent.value;
    }*/

    var offset =
      (this.state.startPosY - event.pageY - this.state.startPosX + event.pageX) *
      this.state.sensitivity;
    var value =
      this.state.min +
      (((this.state.startVal +
        ((this.state.max - this.state.min) * offset) / ((event.shiftKey ? 4 : 1) * 128) -
        this.state.min) /
        this.state.ctlStep) |
        0) *
        this.state.ctlStep;
    var roundedValue = this.applyUnit(value, this.state.unit);

    var outputValue =
      roundedValue < this.state.min
        ? this.state.min
        : roundedValue > this.state.max
        ? this.state.max
        : roundedValue;

    this.props.setValue(this.props.fatId, this.state.fatProperty, outputValue);

    /* console.log("this.state.min - " + this.state.min);
     console.log("this.state.startVal - " + this.state.startVal);
     console.log("this.state.max - " + this.state.max);
     console.log("offset - " + offset);
     console.log("event.shiftKey - " + event.shiftKey);
     console.log("this.state.ctlStep - " + this.state.ctlStep);
*/
    /*console.log("OUTPUT VALUE -> " + outputValue);*/
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  /*pointerUp: function(e) {
      var e = event.nativeEvent;
      debugger
      if(this.state.enable) {
          this.state.press = 0;
          this.state.values=[];
          /!*this.sendevent();
          this.redraw();*!/
      }
      e.preventDefault();
  },
*/
  pointerOut() {
    let updatedState = {};
    updatedState.ttflag = 0;
    if (this.state.press === 0) updatedState.vtflag = 0;
    this.setState(updatedState);
  }
  click(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  sendevent() {
    var notes = [];
    for (var i = 0, j = this.state.valuesold.length; i < j; ++i) {
      if (this.state.values.indexOf(this.state.valuesold[i]) < 0)
        notes.push([0, this.state.valuesold[i]]);
    }
    for (i = 0, j = this.state.values.length; i < j; ++i) {
      if (this.state.valuesold.indexOf(this.state.values[i]) < 0)
        notes.push([1, this.state.values[i]]);
    }
    if (notes.length) {
      this.setState({ valuesold: this.values });
      for (i = 0; i < notes.length; ++i) {
        this.state.setdispvalues(notes[i][0], notes[i][1]);
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('change', true, true);
        ev.note = notes[i];
        this.state.dispatchEvent(ev);
      }
    }
  }
  redraw() {
    var range = this.max - this.min;
    var style = this.$['wac-knob'].style;
    if (this.sprites) {
      var offset = (((this.sprites * (this.value - this.min)) / range) | 0) * this.height;
      style.backgroundPosition = '0px -' + offset + 'px';
      style.transform = 'rotate(0deg)';
    } else {
      var deg = 270 * ((this.value - this.min) / range - 0.5);
      style.transform = 'rotate(' + deg + 'deg)';
    }
  }
  showtip() {
    var vs = this.$['wac-valuetip'].style;
    var ts = this.$['wac-tooltip-box'].style;
    if (this.valuetip && this.vtflag) {
      if (this.vtim) {
        clearTimeout(this.vtim);
        this.vtim = null;
      }
      vs.display = 'inline-block';
      setTimeout(
        function() {
          this.opacity = 0.9;
        }.bind(vs),
        50
      );
    } else if (vs.opacity) {
      vs.opacity = 0;
      this.vtim = setTimeout(
        function() {
          if (this.vtflag === 0) this.$['wac-valuetip'].style.display = 'none';
        }.bind(this),
        500
      );
    }
    if (this.tooltip && this.ttflag) {
      ts.display = 'block';
      setTimeout(
        function() {
          this.opacity = 0.8;
        }.bind(ts),
        100
      );
    } else if (ts.opacity) {
      ts.opacity = 0;
      setTimeout(
        function() {
          this.display = 'none';
        }.bind(ts),
        500
      );
    }
  }
  render() {
    return (
      <div
        className="littleFatty"
        onMouseOver={this.mouseOver}
        onMouseDown={this.pointerDown}
        onMouseOut={this.pointerOut}
        onClick={this.click}
      >
        <Knob
          width={this.state.width}
          height={this.state.height}
          style={{
            backgroundPosition:
              '0px ' + getSpriteOffset(this.props.value, this.state.max, this.state.height) + 'px'
          }}
        />
        <div>{this.props.name}</div>
      </div>
    );
  }
}

export default LittleFatty;
