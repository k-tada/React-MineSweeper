import React from 'react';
import Row from './Row.js';

export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows : this.createTable(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.openNum > nextProps.openNum || this.props.size[1] !== nextProps.size[1]){
      this.setState({
        rows : this.createTable(nextProps)
      });
    }
  }

  createTable(props) {
    var mineTable = [];
    for(var row = 0; row < props.size[0]; row++){
      mineTable.push([]);
      for(var col = 0; col < props.size[1]; col++){
        mineTable[row].push({
          x : col,
          y : row,
          count : 0,
          isOpened : false,
          hasMine : false,
          hasFlag : false
        });
      }
    }
    for(var i = 0; i < props.mineNum; i++){
      var cell = mineTable[Math.floor(Math.random()*props.size[0])][Math.floor(Math.random()*props.size[1])];
      if(cell.hasMine){
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return mineTable;
  }

  open(cell) {
    if( ! this.state.rows[cell.y][cell.x].isOpened){
      this.props.addOpenNum();
    }

    var num = this.countMines(cell);
    this.state.rows[cell.y][cell.x].isOpened = true;
    this.state.rows[cell.y][cell.x].count    = num;
    this.state.rows[cell.y][cell.x].hasFlag  = false;

    if(cell.hasMine){
      this.state.rows[cell.y][cell.x].count = "b";
      this.props.gameOver();
    }
    this.setState({rows : this.state.rows});

    if(this.state.rows[cell.y][cell.x].hasFlag){
      this.props.checkFlagNum(-1);
    }

    if( ! cell.hasMine && num === 0){
      this.openAround(cell);
    }
  }

  mark(cell) {
    this.state.rows[cell.y][cell.x].hasFlag = ! this.state.rows[cell.y][cell.x].hasFlag;
    this.setState({rows : this.state.rows});
    this.props.checkFlagNum(this.state.rows[cell.y][cell.x].hasFlag ? 1 : -1);
  }

  countMines(cell) {
    var aroundMinesNum = 0;
    this.doProcForArrount(cell, (r, c) => {
      // 爆弾
      if( this.state.rows[r][c].hasMine ){
        aroundMinesNum ++;
      }
    });
    return aroundMinesNum;
  }

  // 自セルが空の場合は周囲のセルも開く
  openAround(cell){
    var _rows = this.state.rows;
    this.doProcForArrount(cell, (r, c) => {
      if(
          ! this.state.rows[r][c].hasMine &&   // 爆弾以外
          ! this.state.rows[r][c].isOpened     // 開いてないセル
      ){
        this.open(_rows[r][c]);
      }
    });
  }

  is_in(targ, min, max) {
    return min <= targ && targ <= max;
  }

  doProcForArrount(cell, proc) {
    for(var row = -1; row <= 1; row++){
      for(var col = -1; col <= 1; col++){
        var targ = { row: cell.y + row, col: cell.x + col };
        if(
          ! (row === 0 && col === 0)                         // 自セル以外
          && this.is_in(targ.row, 0, this.props.size[0] - 1) // 範囲行内
          && this.is_in(targ.col, 0, this.props.size[1] - 1) // 範囲列内
        ){
          proc(targ.row, targ.col);
        }
      }
    }
  }

  render() {
    var Rows = this.state.rows.map((row, index) => {
      return(
        <Row cells={row} open={this.open.bind(this)} mark={this.mark.bind(this)} />
      );
    });
    return(
      <table className="Table">
        <tbody>
          {Rows}
        </tbody>
      </table>
    );
  }
}
