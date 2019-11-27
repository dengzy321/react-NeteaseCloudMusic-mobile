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
        this.initHotSearch()
    }
    // 初始化热搜
    initHotSearch() {
        http.getHotSearch().then(res => {
            this.setState({ hotSearchData: res.data })
        })
    }
    // 键盘回车搜索
    onKeyUp = (e) =>{
        if(e.keyCode != 13) return
        this.props.history.push({
            pathname: '/SearchResult',
            query: { keywords: e.target.value }
        })
        this.props.addSearchHistory(e.target.value)
    }
    render() {
        const { hotSearchData } = this.state;
        const { searchHistory, addSearchHistory, removeSearchHistory } = this.props
        return (
            <div className='mySearch'>
                <div className='header da'>
                    <div className='input'>
                        <input type="search" placeholder='最爱还是你 - 唐禹哲'  onKeyUp={this.onKeyUp}/>
                    </div>
                    <Link style={{ backgroundImage: `URL(${Iconpath.user_search})` }} className='user_search_icon' to='/artistCategory' />
                </div>
                <div className='mySearchContent'>
                    {searchHistory.length != 0 &&
                        <div className='searchHistory'>
                            <div className='history-header dbc'>
                                <h3>历史记录</h3>
                                <img onClick={() => removeSearchHistory()} className='icon-clear' src={Iconpath.clear} alt="" />
                            </div>
                            <div className='history da'>
                                <div className='history-ul'>
                                    {
                                        searchHistory.map((item, index) =>
                                            <Link className='history-li' to={{ pathname: '/SearchResult', state: { keywords: item } }} key={index}>{item}</Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className='songsHotSearchBox'>
                        <h3>热搜榜</h3>
                        <SongsHotSearch data={hotSearchData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Search)
