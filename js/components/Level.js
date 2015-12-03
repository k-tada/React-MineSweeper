import React from 'react';

export default class Level extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var levels = this.props.levels.map((l, i) => {
      return (
        <label key={"level" + i}><input type="radio" name="level" onChange={this.props.setLevel.bind(this, l)} checked={this.props.level === l} />{l}</label>
      );
    });
    return (
      <div className="MineSweeper__level">
        {levels}
      </div>
    );
  }
}

