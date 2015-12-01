import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMine  : props.cell.hasMine,
      hasFlag  : props.cell.hasFlag,
      isOpened : props.cell.isOpened,
      count    : 0
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpened : nextProps.cell.isOpened,
      hasMine  : nextProps.cell.hasMine,
      hasFlag  : nextProps.cell.hasFlag,
      count    : nextProps.cell.count
    });
  }
  open() {
    this.props.open(this.props.cell);
  }
  mark(e) {
    e.preventDefault();
    if(!this.state.isOpened){
      this.props.mark(this.props.cell);
    }
  }
  render() {
    var divCls = "Cell__cover";

    if(this.state.isOpened){
      divCls += " Cell__cover--opened";
    }

    var spanCls = "";
    var sts = '';

    if(this.state.isOpened) {
      if(this.state.hasMine) {
        sts = "bomb";
      } else {
        sts = "open";
      }
    } else if(this.state.hasFlag) {
      sts = "flag";
    }

    switch (sts) {
      case "open" : spanCls = "Cell__number" + this.state.count; break;
      case "bomb" : spanCls = "Cell__bomb"; break;
      case "flag" : spanCls = "Cell__flag"; break;
      default : // Do Nothing
    }

    return (
      <td className="Cell" onClick={this.open.bind(this)} onContextMenu={this.mark.bind(this)}>
        <div className={divCls}>
        <span className={spanCls}>
        {
          sts == "open" ? this.state.count : // オープン
          sts == "bomb" ? 'b' :              // 爆弾
          sts == "flag" ? 'f' :              // フラグ
          ''                                 // それ以外
        }
        </span>
        </div>
      </td>
    );
  }
}
