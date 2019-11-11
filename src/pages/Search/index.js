import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Toast } from 'antd-mobile';
import SongsHotSearch from '@/components/SongsHotSearch'

export const ThemeContext = React.createContext('deng');

class Search extends React.Component { 
    componentDidMount() {
        console.log('Search====',this)
    }
    render() {
        return (
            <ThemeContext.Provider value='dengzy'>
                <div className='mySearch'>
                    <SongsHotSearch/>
                </div>
            </ThemeContext.Provider>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Search)
    