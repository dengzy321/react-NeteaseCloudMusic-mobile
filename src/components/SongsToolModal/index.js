import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'

class SongsToolModal extends React.Component {
    state = {
        showModal: false,
        endAnimation: false, //结束动画
        modalHeight: 0,
        startpageY: 0,
        offsetY: 0,
    }
    componentDidMount() {
        const { showModal } = this.state
        if (showModal) document.getElementById('songsToolModal').addEventListener('touchmove', this.touchMove, { passive: false });
        this.setState({
            modalHeight: document.getElementById('smInner').offsetHeight / 10
        })
    }
    // 开始移动时
    touchStart = (event) => {
        event.persist()
        this.setState({
            startpageY: parseInt(event.touches[0].pageY)
        })
    }
    // 移动过程
    touchMove = (event) => {
        event.persist()
        event.preventDefault()
        if (event.touches[0].pageY >= this.state.startpageY) {
            this.setState({
                offsetY: (parseInt(event.touches[0].pageY) - this.state.startpageY) / 10
            })
        }
    }
    // 移动结束时
    touchEnd = (event) => {
        const { startpageY, modalHeight, endAnimation } = this.state
        event.persist()
        if ((parseInt(event.changedTouches[0].pageY) - startpageY) / 5 >= modalHeight) {
            this.setState({ endAnimation: true })
            setTimeout(() =>{
                this.props.onShowSongsTool()
                this.setState({ endAnimation: false })
            }, 100)
        }
        else this.setState({ offsetY: 0 })
    }
    render() {
        const { Header = '' , data } = this.props
        const { showModal, offsetY, endAnimation } = this.state
        return (
            <div className='songsToolModal' id='songsToolModal' onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                <div className={`sm-inner ${endAnimation? 'endAniClass':''}`} id='smInner' style={{ transform: `translateY(${offsetY}rem)` }} >
                    <div className='head da'>{Header}</div>
                    <div className='tool-list'>
                        <ul>
                            {
                                data.map((item, index) =>
                                    <li key={index} className='tool-li da'>
                                        <img className='icon' src={item.icon} />
                                        <span className='li-name'>{item.name}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongsToolModal)