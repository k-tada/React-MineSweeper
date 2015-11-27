import React from 'react';
import Flag from './status_bar/Flag.js'
import Face from './status_bar/Face.js'
import Time from './status_bar/Time.js'

export default class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="MineSweeper__StatusBar">
        <Flag num={this.props.flagNum} />
        <Face reset={this.props.reset.bind(this)} status={this.props.status} />
        <Time time={this.props.time} />
      </div>
    );
  }
}

