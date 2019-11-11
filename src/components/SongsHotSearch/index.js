import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Toast } from 'antd-mobile';
import { ThemeContext } from '@/pages/Search'

class SongsHotSearch extends React.Component {
    componentDidMount() {
        console.log('songsHotSearch===c', this)
    }
    static contextType = ThemeContext;
    render() {
        return (
            <div className='songsHotSearch'>

            </div>
        )
    }
}


export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongsHotSearch)
