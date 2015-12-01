import React from 'react';
import Cell from './Cell.js';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  render(){
    var Cells = this.props.cells.map((cell, index) => {
      return(
        <Cell cell={cell} open={this.props.open} mark={this.props.mark} />
      );
    });
    return (
      <tr>
        {Cells}
      </tr>
    );
  }
}
