import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import RelatedVideo from '@/components/SearchVideoList'
import CommentList from '@/components/commentList'

class VideoComment extends React.Component {
    state = {
        tabs: [],
        comments: {},
        videoInfo: {},
        relatedVideo: [],
        url: '',
        inputComment: '',
        isFollowUser: 0, //关注用户
    }
    componentDidMount() {
        console.log(this)
        this.initVideoDetail()
        this.initVideoUrl()
        this.initVideoComment()
        this.initRelatedVideo()
    }
    // 获取视频详情
    initVideoDetail = () => {
        http.getVideoDetail({
            id: this.props.location.state.vid
        }).then(res => {
            res.data.praised = false
            res.data.collected = false
            this.setState({ videoInfo: res.data })
        })
    }
    // 获取视频播放地址
    initVideoUrl = () => {
        http.getVideoUrl({
            id: this.props.location.state.vid
        }).then(res => {
            this.setState({
                url: res.urls[0].url
            })
        })
    }
    // 获取视频评论
    initVideoComment = () => {
        http.getVideoComment({
            id: this.props.location.state.vid,
            limit: 20,
            offset: 0
        }).then(res => {
            this.setState({ comments: res })
        })
    }
    // 获取相关视频
    initRelatedVideo = () => {
        http.getRelatedVideo({
            id: this.props.location.state.vid
        }).then(res => {
            this.setState({ relatedVideo: res.data })
        })
    }
    // 滚动加载
    onScroll = (e) => {
        if (window.globa.onReachBottom(e)) this.initVideoComment()
    }
    // 输入评论内容
    onInputComment = (e) => {
        this.setState({
            inputComment: e.target.value
        })
    }
    // 发送评论
    onSend = () => {
        const { commentsId, inputComment } = this.state
        if (!inputComment) return
        http.sendComment({
            t: 1,
            tpye: 0,
            id: commentsId,
            content: inputComment
        }).then(res => {

        })
    }
    // 关注用户
    followUser = (id) => {
        http.changeFollowUser({
            id: id,
            t: this.state.isFollowUser == 0? 1:0
        }).then(res => {
            this.setState(state => ({
                isFollowUser: state.isFollowUser == 0 ? 1 : 0
            }))
        })
    }
    // 点赞
    onLive = (id,praisedStatus) =>{
        http.changeResourceLive({
            type: 5,
            t: praisedStatus? 0 : 1,
            id: id
        }).then(res =>{
            let { videoInfo } = this.state
            videoInfo.praised = !videoInfo.praised
            videoInfo.praisedCount = praisedStatus? videoInfo.praisedCount - 1  : videoInfo.praisedCount + 1
            this.setState({ videoInfo })
        })
    }
    // 收藏视频
    onCollect = (id,collectedStatus) =>{
        http.collectVideo({
            id: id,
            t: collectedStatus? 0 : 1,
        }).then(res =>{
            let { videoInfo } = this.state
            videoInfo.collected = !videoInfo.collected
            videoInfo.subscribeCount = collectedStatus? videoInfo.subscribeCount - 1  : videoInfo.subscribeCount + 1
            this.setState({ videoInfo })
        })
    }
    render() {
        const { url, comments, relatedVideo, videoInfo, inputComment, isFollowUser } = this.state
        return (
            <div className='videoComment'>
                <video ref={el => this.myVideo = el} style={{ width: '100%' }} poster={videoInfo.coverUrl} controls x5-playsinline="" playsinline="" webkit-playsinline="" preload="auto">
                    <source src={url} type="video/mp4" />
                    <source src={url} type="video/ogg" />
                </video>
                {Object.keys(videoInfo).length > 0 && 
                    <div className='videoInfo'>
                        <p className='videoTitle'>{videoInfo.title}</p>
                        <div className='videoGroup'>
                            <ul className='videoGroup-ul da'>
                                <li className='playCount-li'>{videoInfo.playTime}人观看</li>
                                {
                                    videoInfo.videoGroup.map((item, index) => {
                                        return <li className='videoGroup-li' key={index}>{item.name}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='handleTool'>
                            <ul className='handleTool-ul dbc'>
                                <li className='handleTool-li dd-vh' onClick={this.onLive.bind(this, videoInfo.vid,videoInfo.praised)}>
                                    <img className='live' src={videoInfo.praised? Iconpath.live_red_fill:Iconpath.live_$333} />
                                    <span style={videoInfo.praised? {color:'#FF392D'}:{}}>{videoInfo.praisedCount}</span>
                                </li>
                                <li className='handleTool-li dd-vh' onClick={this.onCollect.bind(this, videoInfo.vid,videoInfo.collected)}>
                                    <img className='collect' src={videoInfo.collected? Iconpath.collect_red:Iconpath.collect_$333} />
                                    <span style={videoInfo.collected? {color:'#FF392D'}:{}}>{videoInfo.subscribeCount}</span>
                                </li>
                                <li className='handleTool-li dd-vh'>
                                    <img className='comment' src={Iconpath.comment_$333} />
                                    <span>{videoInfo.commentCount}</span>
                                </li>
                                <li className='handleTool-li dd-vh'>
                                    <img className='share' src={Iconpath.share_$333} />
                                    <span>{videoInfo.shareCount}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='creator da'>
                            <img className='avatar' src={videoInfo.creator.avatarUrl} />
                            <span className='nickname'>{videoInfo.creator.nickname}</span>
                            <button className='btn' onClick={this.followUser.bind(this, videoInfo.creator.userId)}>+ {isFollowUser == 0 ? '关注' :'已关注'}</button>
                        </div>
                    </div>
                }
                <div className='relatedVideo'>
                    <h3 className='myTitle'>相关视频</h3>
                    <RelatedVideo data={relatedVideo}/>
                </div>
                {comments.hotComments &&
                    <div className='commentContent'>
                        <h3 className='title'>精彩评论</h3>
                        <CommentList data={comments.hotComments} commentsId={comments.commentId} />
                    </div>
                }
                {comments.comments &&
                    <div className='commentContent'>
                        <h3 className='title'>最新评论</h3>
                        <CommentList data={comments.comments} commentsId={comments.commentId} />
                    </div>
                }
                <div className='editContent da'>
                    <input className='input' type='text' placeholder='听说爱评论的人粉丝多' onChange={this.onInputComment} />
                    <button className='btn' style={inputComment ? { color: '#333' } : {}} onClick={this.onSend}>发送</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(VideoComment)