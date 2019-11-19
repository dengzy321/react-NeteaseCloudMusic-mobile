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

class Search extends React.Component { 
    state = {
        hotSearchData: []
    }
    componentDidMount() {
        console.log('Search====', this)
        this.initHotSearch()
    }
    // 初始化热搜
    initHotSearch() {
        http.getHotSearch().then(res => {
            this.setState({ hotSearchData: res.data })
        })
    }
    render() {
        const { hotSearchData } = this.state;
        return (
            <div className='mySearch'>
                <div className='header da'>
                    <div className='input'>
                        <input type="text" placeholder='最爱还是你 - 唐禹哲'/>
                    </div>
                    <img className='user_search_icon' src={Iconpath.user_search} alt=""/>
                </div>
                <div className='searchHistory'>
                    <div className='history-header da'>
                        <h3>历史记录</h3>
                        <img src="" alt=""/>
                    </div>
                    <div className='history-ul da'>
                        <span>明日方舟</span>
                        <span>明日方舟</span>
                        <span>明日方舟</span>
                        <span>明日方舟</span>
                        <span>明日方舟</span>
                        <span>明日方舟</span>
                        <span>明日方舟</span>
                    </div>
                </div>
                <div className='songsHotSearchBox'>
                    <h3>热搜榜</h3>
                    <SongsHotSearch data={hotSearchData} />
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Search)
    