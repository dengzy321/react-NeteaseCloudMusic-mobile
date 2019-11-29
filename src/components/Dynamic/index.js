import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'

class Dynamic extends React.Component {
    state = {
        list: []
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.list)
        nextProps.list.forEach(item => {
            item.json.msg = item.json.msg.replace(/#(\S*)#/g, '<b className="txtLight">#$1#</b>')
            console.log(item.json.msg)
        })
        this.setState({
            list: nextProps.list
        })
    }
    onPlayMusic = (id) => {
        
    }
    render(){
        const { list } = this.state;
        return(
            <div className='dynamic'>
                <ul>
                    {
                        list.map((item, index) =>
                            <li key={index} className='dynamic-li'>
                                <div className='header da'>
                                    <div className='avatar-box'>
                                        <img className='avatar' src={item.user.avatarUrl} />
                                        <img className='icon' src={Iconpath.vip_fill} />
                                    </div>
                                    <div className='userInfo'>
                                        <p className='da'>
                                            <span className='name'>{item.user.nickname}</span>
                                            <span className='tip da'>
                                                <img className='icon' src={Iconpath.vip} />
                                                <b>年</b>
                                            </span>
                                            {item.type == 17 && <span className='type'></span>}
                                            {item.type == 18 && <span className='type'>分享单曲：</span>}
                                            {item.type == 19 && <span className='type'>分享专辑：</span>}
                                            {item.type == 22 && <span className='type'>转发：</span>}
                                            {item.type == 35 && <span className='type'>文字：</span>}
                                            {item.type == 39 && <span className='type'>发布视频：</span>}
                                        </p>
                                        <p className='liveCount'>19.8万粉丝</p>
                                    </div>
                                    <button className='follow'>+关注</button>
                                </div>
                                <div className='content'>{item.json.msg}</div>
                                {
                                    item.type == 18 &&
                                    <div className='publishSong'>
                                        <img src={item.json.song.artists[0].picUrl} alt="" />
                                        <div className='creatorBox da'>
                                            <img className='avatar' src={item.json.song.artists[0].img1v1Url} alt="" />
                                            <p className='ddc-h' onClick={this.onPlayMusic.bind(this,item.json.song.id)}>
                                                <span className='artist'>{item.json.song.artists[0].name}</span>
                                                <span className='name'>{item.json.song.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    item.type == 19 &&
                                    <div className='publishAlbum'>
                                        <img src={item.json.album.picUrl} alt="" />
                                        <div className='creatorBox da'>
                                            <img className='avatar' src={item.json.album.img80x80} alt="" />
                                            <p className='ddc-h'>
                                                <span className='artist'>{item.json.album.artist.name}</span>
                                                <span className='name'>{item.json.album.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                <div className='footer da'>
                                    <span className='forward da'>
                                        <img src={Iconpath.forward} />
                                        <b>{item.info.shareCount}</b>
                                    </span>
                                    <span className='comment da'>
                                        <img src={Iconpath.comment} />
                                        <b>{item.info.commentCount}</b>
                                    </span>
                                    <span className='live da'>
                                        <img src={Iconpath.live} />
                                        <b>{item.info.likedCount}</b>
                                    </span>
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
)(Dynamic)