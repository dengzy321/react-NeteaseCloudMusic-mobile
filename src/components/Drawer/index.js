import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import Iconpath from '../../utils/iconpath'

class Drawer extends React.Component {
    state = {
        innerTimer: false
    }
    componentDidMount() {
        console.log('componentDidMount==', this.props.showDrawer)
        if (this.props.showDrawer) {
            setTimeout(() => {
                this.setState({
                    innerTimer: true
                })
            }, 1)
        }
    }
    onClose = (event) => {
        event.persist()
        this.setState({
            innerTimer: false
        })
        setTimeout(() => {
            this.props.changeShowStatus()
        }, 10)
    }
    render() {
        const { innerTimer } = this.state
        return (
            <div className='drawer' onClick={this.onClose}>
                <div className='inner' style={{ transform: `translateX(${innerTimer? '0':'-100'}rem)` }}>

                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Drawer)