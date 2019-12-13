import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 线条
function Lines() {
  return (
    <div className='lines dcc'>
      <p className='da'>
        <span className="lines-1"></span>
        <span className="lines-2"></span>
        <span className="lines-3"></span>
        <span className="lines-4"></span>
      </p>
      <p className='tip'>努力加载中...</p>
    </div>
  )
}

// 圆点
function Dot() {
  return (
    <div className="dot dcc">
      <span className="item-1"></span>
      <span className="item-2"></span>
      <span className="item-3"></span>
      <span className="item-4"></span>
      <span className="item-5"></span>
    </div>
  )
}


export default class Loading extends React.Component {
  render() {
    const { type = 0 } = this.props

    let child
    if (type == 0) child = <Lines/>
    else if (type == 1) child = <Dot/>

    return ReactDOM.createPortal(
      <div className='custom-loading'>{child}</div>,
      document.getElementById('modal-root')
    )
  }
}