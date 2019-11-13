import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'

class MyCom_1 extends React.Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

class Test extends React.Component {
    state = {
        
    }
    componentDidMount() {
        console.log('componentDidMount===', this)
    }
    render() {
        return (
            <div className='test'>
                <MyCom_1></MyCom_1>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Test)