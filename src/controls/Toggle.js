import React from 'react'
import {Switch} from './Switch'

class Toggle extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        on: props.on
      };
  }

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  render() {
    const {on} = this.state
    return <Switch on={on} onClick={this.toggle} />
  }
}

function Usage({
                 onToggle = (...args) => console.log('onToggle', ...args),
               }) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
