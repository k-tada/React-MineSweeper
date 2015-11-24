import React from 'react';
import Table from './Table.js';
import Level from './Level.js';

export default class MineSweeper extends React.Component {
  constructor(props) {
    super(props);
    this.opts = {
      easy   : {level : "easy",   mineNum : 10,  size : [9 , 9]},
      normal : {level : "normal", mineNum : 40,  size : [16, 16]},
      hard   : {level : "hard",   mineNum : 100, size : [16, 30]},
      initial: {openNum: 0, flagNum: 0, time: 0, status: "playing"}
    };
    this.levels = ['easy', 'normal', 'hard'];
    this.default_level = 'easy';
    this.state = Object.assign(this.opts[this.default_level], this.opts.initial);
  }

  componentWillMount() {
    this.interval = null;
  }

  componentWillUpdate() {
    if(this.state.status === "playing"){
      this.judge();
    }
  }

  judge() {
    if(this.state.openNum >= this.fieldSize() - this.state.mineNum){
      this.setState({status: "clear"});
    }
  }

  fieldSize() {
    return this.state.size[0] * this.state.size[1];
  }

  gameOver() {
    this.setState({status: "gameover"});
  }

  tick() {
    if(this.state.openNum > 0 && this.state.status === "playing"){
      this.setState({time: this.state.time + 1});
    }
  }

  reset() {
    clearInterval(this.interval);
    this.setState(this.opts.initial);
  }

  setLevel(level) {
    clearInterval(this.interval);
    this.setState(Object.assign(this.opts[level], this.opts.initial));
  }

  addOpenNum() {
    if(this.state.openNum === 0){
      this.interval = setInterval(this.tick.bind(this), 1000);
    }
    this.setState({openNum : ++ this.state.openNum});
  }

  checkFlagNum(update) {
    this.setState({flagNum: this.state.flagNum + update});
  }

  render() {
    return (
      <div>
        <Level levels={this.levels} level={this.state.level} setLevel={this.setLevel.bind(this)} />
        <div className={"MineSweeper " + this.state.level}>
          <span className="MineSweeper__flagNum"> {this.state.mineNum - this.state.flagNum}</span>
          <span className="MineSweeper__face" onClick={this.reset.bind(this)}>
            <span className={"button " + this.state.status}></span>
          </span>
          <span className="MineSweeper__time"> {this.state.time}</span>
          <Table openNum={this.state.openNum}
                 mineNum={this.state.mineNum}
                 size={this.state.size}
                 gameOver={this.gameOver.bind(this)}
                 addOpenNum={this.addOpenNum.bind(this)}
                 checkFlagNum={this.checkFlagNum.bind(this)}
          />
        </div>
      </div>
    );
  }
}
