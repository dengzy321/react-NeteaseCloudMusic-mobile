import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'

class VideoList extends React.Component {
    render() {
        const { data = [], history } = this.props
        return (
            <div className='videoList'>
                <ul>
                   {
                        data.map(({ data }, index) =>
                            <li key={index} className='video-li'>
                                <div className='video-box'>
                                    <video poster={data.coverUrl} controls x5-playsinline="" playsinline="" webkit-playsinline="" preload="auto">
                                        <source src={data.urlInfo.url} type="video/mp4" />
                                        <source src={data.urlInfo.url} type="video/ogg" />
                                    </video>
                                </div>
                                <h3 className='title to-line'>{data.title}</h3>
                                <div className='footer da'>
                                    <img className='avatar' src={data.creator.avatarUrl} alt="" />
                                    <span className='nickname'>{data.creator.nickname}</span>
                                    <span className='live'>
                                        <img src={Iconpath.live} alt="" />
                                        <b>{data.praisedCount}</b>
                                    </span>
                                    <span className='comment' onClick={() => history.push({ pathname: '/VideoComment', state: { vid: data.vid }})}>
                                        <img src={Iconpath.comment} alt="" />
                                        <b>{data.commentCount}</b>
                                    </span>
                                    <img className='more' src={Iconpath.more_gray} alt=""/>
                                </div>
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
)(VideoList)