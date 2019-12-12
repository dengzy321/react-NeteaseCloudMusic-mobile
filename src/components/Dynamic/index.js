import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'

class Dynamic extends React.Component {
    state = {
        list: []
    }
    componentWillReceiveProps(nextProps) {
        nextProps.list.forEach(item => {
            if(item.type == 22) item.json.event.json.msg = this.replaceStr(item.json.event.json.msg)
            item.json.msg = this.replaceStr(item.json.msg)
        })
        this.setState({
            list: nextProps.list
        })
        console.log(nextProps.list)
    }
    // 替换replace
    replaceStr = (strHtml) =>{
        strHtml = `<div>${strHtml}</div>`
        // 匹配 # ... #
        strHtml = strHtml.replace(/#(\S*)#/g, '<b class="txtLight">#$1#</b>')  
        // 匹配 @ ...
        strHtml = strHtml.replace(/@(\s*)(\S*)\s/g, '<b class="txtLight">@$2 </b>')  
        // 匹配http链接
        const reg=/(http:\/\/)?(https:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g;
        strHtml = strHtml.replace(reg,`<a href="http://$3" class="txtLight"><img class="link" src="${Iconpath.link}">网页链接</a>`)
        return strHtml
    }
    // 点击关注
    onFollow = (id, followStatus) =>{
        let { list } = this.state
        http.changeFollowUser({
            id: id,
            t: followStatus? 0 : 1
        }).then(res =>{
            list.forEach(item =>{
                if(item.user.userId == id) item.user.followed = followStatus? false : true
            })
            this.setState({ list })
        })
    }
    // 打开播放器
    onPlayMusicHandle = (item) => {
        this.props.history.push({
            pathname: '/playPlatform',
            state: { id: item.id }
        })
    }
    // 查看视频
    onViode = (vid) => {
        this.props.history.push({
            pathname: '/VideoComment',
            state: { vid: vid }
        })
    }
    render() {
        const { list } = this.state;
        if(list.length == 0) return <Loading/>
        return (
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
                                            {item.type == 35 && <span className='type'></span>}
                                            {item.type == 39 && <span className='type'>发布视频：</span>}
                                        </p>
                                        <p className='liveCount'>19.8万粉丝</p>
                                    </div>
                                    <button className='follow' onClick={this.onFollow.bind(this, item.user.userId, item.user.followed)}>{item.user.followed? '已关注':'+关注'}</button>
                                </div>
                                <div className='content' dangerouslySetInnerHTML={{ __html: item.json.msg }}></div>
                                {
                                    item.type == 18 &&
                                    <div className='publishModal'>
                                        <div className='coverImg'>
                                            <img className='img' src={item.json.song.artists[0].picUrl} alt="" />
                                        </div>
                                        <div className='creatorBox da' onClick={this.onPlayMusicHandle.bind(this, item)}>
                                            <img className='avatar' src={item.json.song.artists[0].img1v1Url} alt="" />
                                            <p className='ddc-h'>
                                                <span className='artist'>{item.json.song.artists[0].name}</span>
                                                <span className='name'>{item.json.song.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    item.type == 19 &&
                                    <div className='publishModal'>
                                        <div className='coverImg'>
                                            <img className='img' src={item.json.album.picUrl} alt="" />
                                        </div>
                                        <div className='creatorBox da'>
                                            <img className='avatar' src={item.json.album.img80x80} alt="" />
                                            <p className='ddc-h'>
                                                <span className='artist'>{item.json.album.artist.name}</span>
                                                <span className='name'>{item.json.album.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    item.type == 22 &&
                                    <div className='forwardModal'>
                                        <div className='content'  dangerouslySetInnerHTML={{ __html: item.json.event.json.msg }}></div>
                                        <div className='coverImg'>
                                            <img className='img' src={item.json.event.json.song.album.picUrl} alt="" />
                                        </div>
                                        <div className='creatorBox da'>
                                            <img className='avatar' src={item.json.event.json.song.album.img80x80} alt="" />
                                            <p className='ddc-h'>
                                                <span className='artist'>{item.json.event.json.song.album.artists[0].name}</span>
                                                <span className='name'>{item.json.event.json.song.album.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    item.type == 39 &&
                                    <div className='videoModal'>
                                        <div className='coverImg' onClick={this.onViode.bind(this, item.json.video.videoId)}>
                                            <img className='img' src={item.json.video.coverUrl} alt="" />
                                            <img className='icon' src={Iconpath.play} alt="" />
                                        </div>
                                        <div className='creatorBox da'>
                                            <img className='avatar' src={item.json.video.coverUrl} alt="" />
                                            <p className='ddc-h'>
                                                <span className='artist'>{item.json.video.creator.signature}</span>
                                                <span className='name'>{item.json.video.title}</span>
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