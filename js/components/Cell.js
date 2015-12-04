import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }
  open() {
    this.props.open(this.props.cell);
  }
  mark(e) {
    e.preventDefault();
    if(!this.props.cell.isOpened){
      this.props.mark(this.props.cell);
    }
  }
  render() {
    var divCls = "Cell__cover";

    if(this.props.cell.isOpened){
      divCls += " Cell__cover--opened";
    }

    var spanCls = "";
    var sts = '';

    if(this.props.cell.isOpened) {
      if(this.props.cell.hasMine) {
        sts = "bomb";
      } else {
        sts = "open";
      }
    } else if(this.props.cell.hasFlag) {
      sts = "flag";
    }

    switch (sts) {
      case "open" : spanCls = "Cell__number" + this.props.cell.count; break;
      case "bomb" : spanCls = "Cell__bomb"; break;
      case "flag" : spanCls = "Cell__flag"; break;
      default : // Do Nothing
    }

    return (
      <td className="Cell" onClick={this.open.bind(this)} onContextMenu={this.mark.bind(this)}>
        <div className={divCls}>
        <span className={spanCls}>
        {
          sts == "open" ? this.props.cell.count : // オープン
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
