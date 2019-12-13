import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Toast } from 'antd-mobile';
import Loading from '@/components/Loading'

class SongsHotSearch extends React.Component {
    componentDidMount() {
        
    }
    render() {
        const { data, addSearchHistory } = this.props;
        if(data.length == 0) return <Loading/>
        return (
            <div className='songsHotSearch'>
                <ul>
                    {
                        data.map((item, index) =>
                            <li className='da hotSearch-li' key={index}  onClick={() => addSearchHistory(item.searchWord)}>
                                <Link to={{ pathname: '/SearchResult', state: { keywords: item.searchWord }}} className='da flex'>
                                    <span className='index' style={index < 3 ? { color: 'FF1D12' } : {}}>{index + 1}</span>
                                    <div className=''>
                                        <p className='da'>
                                            <span className='searchWord'>{item.searchWord}</span>
                                            {item.iconUrl && <img style={item.iconType == 5 ? { width: '1rem' } : {}} className='iconUrl' src={item.iconUrl} alt="" />}
                                        </p>
                                        <p className='content'>{item.content}</p>
                                    </div>
                                    <span className='score'>{item.score}</span>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}


export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongsHotSearch)
