import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
// import { Player } from 'video-react';
// import 'node_modules/video-react/dist/video-react.css';

class Dynamic extends React.Component {
    render(){
        const { list } = this.props;
        return(
            <div className='dynamic'>
                <ul>
                    {
                        list.map(({data}, index) =>{
                            return (
                                <li key={index} className='dynamic-li'>
                                    <div className='header da'>
                                        <div className='avatar-box'>
                                            <img className='avatar' src={data.creator.avatarUrl} />
                                            <img className='icon' src={Iconpath.vip_fill} />
                                        </div>
                                        <div className='userInfo'>
                                            <p className='da'>
                                                <span className='name'>{data.creator.nickname}</span>
                                                <span className='tip da'>
                                                    <img className='icon' src={Iconpath.vip} />
                                                    <b>年</b>
                                                </span>
                                                <span className='type'>发布视频：</span>
                                            </p>
                                            <p className='liveCount'>19.8万粉丝</p>
                                        </div>
                                        <button className='follow'>+关注</button>
                                    </div>
                                    <div className='content'>{data.description? data.description : data.title}</div>
                                    <div className='video'>
                                        <video poster={data.coverUrl} controls>
                                            <source src={data.urlInfo.url} type="video/mp4" />
                                            <source src={data.urlInfo.url} type="video/ogg" />
                                            您的浏览器不支持 video 标签。
                                        </video>
                                    </div>
                                    <div className='footer da'>
                                        <span className='forward da'>
                                            <img src={Iconpath.forward} />
                                            <b>{data.shareCount}</b>
                                        </span>
                                        <span className='comment da'>
                                            <img src={Iconpath.comment} />
                                            <b>{data.commentCount}</b>
                                        </span>
                                        <span className='live da'>
                                            <img src={Iconpath.live} />
                                            <b>{data.praisedCount}</b>
                                        </span>
                                    </div>
                                </li>
                            )                   
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Dynamic)