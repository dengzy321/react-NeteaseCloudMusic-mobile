import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '../../api/http'
import * as actions from '../../store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'

class SongsToolModal extends React.Component {
    state = {
        showModal: false,
        startpageY: 0,
        offsetY: 0
    }
    componentDidMount() {
        const { showModal } = this.state
        if (showModal) document.getElementById("smInner").addEventListener('touchmove', this.touchMove, { passive: false });
        this.setState({ showModal: this.props.showStatus })
    }
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps===', this.props)
        this.setState({ showModal: this.props.showStatus })
    }
    touchStart = (event) => {
        event.persist()
        this.setState({
            startpageY: parseInt(event.touches[0].pageY)
        })
    }
    touchMove = (event) =>{
        event.preventDefault()
        if (event.touches[0].pageY >= this.state.startpageY) {
            this.setState({
                offsetY: (parseInt(event.touches[0].pageY) - this.state.startpageY) / 10
            })
        }
    }
    touchEnd = (event) => {
        event.persist()
        if ((parseInt(event.changedTouches[0].pageY) - this.state.startpageY) / 10 >= 20) this.setState({ showModal: false })
        else this.setState({ offsetY: 0 })
    }
    render(){
        const { list = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], header = '' } = this.props
        const { showModal, offsetY } = this.state
        return (
            <div className='bbb'>
               {
                    showModal && 
                    <div className='songsToolModal'>
                        <div className='sm-inner'
                        id='smInner'
                        onTouchStart={this.touchStart} 
                        onTouchEnd={this.touchEnd}
                        style={{ transform: `translateY(${offsetY}rem)` }}
                        >
                            <div className='head da'>
                                <span>tool头</span>
                            </div>
                            <div className='tool-list'>
                                <ul>
                                    {
                                        list.map((item,index) =>{
                                            return(
                                                <li key={index} className='tool-li da'>
                                                    <img className='icon' src={require('../../assets/create.png')} />
                                                    <span className='li-name'>创建歌单</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
               }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongsToolModal)