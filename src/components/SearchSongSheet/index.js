import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'

class SearchSongSheet extends React.Component {
    componentWillReceiveProps(nextProps){
        nextProps.data.forEach(item =>{
            
        })
    }
    render() {
        const { data } = this.props
        return (
            <div className='searchSongSheet'>
                <ul className='album-ul'>
                    {
                        data.map((item, index) =>
                            <li key={index} className='album-li'>
                                <Link to='#' className='da'>
                                    <img className='avatar' src={item.coverImgUrl} />
                                    <div className='info'>
                                        <p className='name to-line'>{item.name}</p>
                                        <p className='da tool'>
                                            <span className='trackCount'>{item.trackCount}首</span>
                                            <span className='creator'>{item.creator.nickname}</span>
                                            <span className='playCount'>播放{item.playCount}次</span>
                                        </p>

                                    </div>
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
)(SearchSongSheet)