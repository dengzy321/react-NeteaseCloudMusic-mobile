import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'
import RelatedVideo from '@/components/SearchVideoList'
import CommentList from '@/components/commentList'

class MvDetail extends React.Component {
    state = {
        mvid: '',
        mvInfo: {},
        inputComment: '',
        isFollowUser: false,
        comments: {},
        simiMv: []
    }
    componentDidMount() {
        this.setState({
            mvid: this.props.location.state.id
        }, () =>{
            this.initMvDetail()
            this.initComment()
            this.initSimiMv()
        })
    }
    // 获取mv详情
    initMvDetail() {
        let { mvid } = this.state
        http.getMvDetail({ mvid }).then(res => {
            this.setState({
                mvInfo: res.data
            })
        })
    }
    // 获取评论
    initComment(){
        let { mvid } = this.state
        http.getCommentMv({ id: mvid }).then(res => {
            this.setState({
                comments: {
                    comments: res.comments,
                    hotComments: res.hotComments,
                    commentId: res.userId
                }
            })
        })
    }
    // 相似 mv
    initSimiMv(){
        let { mvid } = this.state
        http.getSimiMv({ mvid }).then(res => {
            this.setState({
                simiMv: res.mvs
            })
        })
    }
    // 改变vid
    onChangeMv = (id) => {
        this.setState({
            mvid: id,
            comments: {},
            mvInfo: {},
            simiMv: []
        }, () => {
            this.initMvDetail()
            this.initComment()
            this.initSimiMv()
        })
    }
    // 关注
    followUser(){

    }
    // 输入评论
    onInputComment(){

    }
    // 发送评论
    onSend(){

    }
    render() {
        let { mvInfo, inputComment, isFollowUser, comments, simiMv } = this.state
        if (Object.keys(mvInfo).length == 0) return <Loading />
        return (
            <div className='mvDetail'>
                <video ref={el => this.myVideo = el} style={{ width: '100%' }} poster={mvInfo.cover} controls x5-playsinline="" playsinline="" webkit-playsinline="" preload="auto">
                    <source src={mvInfo.brs['1080']} type="video/mp4" />
                    <source src={mvInfo.brs['1080']} type="video/ogg" />
                </video>

                <div className='videoInfo'>
                    <p className='videoTitle'>{mvInfo.name}</p>
                    <div className='videoGroup'>
                        <ul className='videoGroup-ul da'>
                            <li className='playCount-li'>{mvInfo.playCount}人观看</li>
                            {/* {
                                videoInfo.videoGroup.map((item, index) => {
                                    return <li className='videoGroup-li' key={index}>{item.name}</li>
                                })
                            } */}
                        </ul>
                    </div>
                    <div className='handleTool'>
                        <ul className='handleTool-ul dbc'>
                            <li className='handleTool-li dd-vh'>
                                <img className='live' src={mvInfo.praised ? Iconpath.live_red_fill : Iconpath.live_$333} />
                                <span style={mvInfo.praised ? { color: '#FF392D' } : {}}>{mvInfo.likeCount}</span>
                            </li>
                            <li className='handleTool-li dd-vh'>
                                <img className='collect' src={mvInfo.collected ? Iconpath.collect_red : Iconpath.collect_$333} />
                                <span style={mvInfo.collected ? { color: '#FF392D' } : {}}>{mvInfo.subCount}</span>
                            </li>
                            <li className='handleTool-li dd-vh'>
                                <img className='comment' src={Iconpath.comment_$333} />
                                <span>{mvInfo.commentCount}</span>
                            </li>
                            <li className='handleTool-li dd-vh'>
                                <img className='share' src={Iconpath.share_$333} />
                                <span>{mvInfo.shareCount}</span>
                            </li>
                        </ul>
                    </div>
                    <div className='creator da'>
                        <img className='avatar' src={mvInfo.cover} />
                        <span className='nickname'>{mvInfo.artists[0].name}</span>
                        <button className='btn' onClick={this.followUser.bind(this, mvInfo.artists[0].id)}>+ {isFollowUser == 0 ? '关注' : '已关注'}</button>
                    </div>
                </div>
                {/* <div className='relatedVideo'>
                    <h3 className='myTitle'>相关MV</h3>
                    <RelatedVideo type='0' data={simiMv} onChangeVid={this.onChangeMv} {...this.props} />
                </div> */}
                {comments.hotComments.length > 0 &&
                    <div className='commentContent'>
                        <h3 className='title'>精彩评论</h3>
                        <CommentList data={comments.hotComments} commentsId={comments.commentId} />
                    </div>
                }
                {comments.comments.length > 0 &&
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
)(MvDetail)