import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import Radio from '@/components/Radio'

function CommentItem({ data = [], commentsId }) {
    // 点赞
    function onLive(item) {
        http.getCommentLike({
            id: commentsId,
            cid: item.commentId,
            t: item.liked? 0:1,
            tpye: 0
        }).then(res => {
            data.forEach(item2 => {
                if(item2 == item) item2.liked = item2.liked? 0:1
            })
        })
    }

    data.forEach(item => {
        let date = new Date(item.time)
        let year = date.getFullYear()
        let min = date.getMonth() + 1
        let d = date.getDay()
        item.publishTime = `${year}年${min >= 10 ? min : '0' + min}月${d >= 10 ? d : '0' + d}日`
        item.likeCount = item.likedCount >= 100000 ? (item.likedCount / 10000).toFixed(1) + '万' : item.likedCount
    })
    return (
        <div className='commentItem'>
            <ul className='comment-ul'>
                {
                    data.map((item, index) => (
                        <li className='comment-li' key={index}>
                            <div className='userInfo da'>
                                <img className='avatar' src={item.user.avatarUrl} />
                                <p className='flex'>
                                    <span className='nickname'>{item.user.nickname}</span>
                                    <span className='time'>{item.publishTime}</span>
                                </p>
                                <p className='liveCount da' onClick={onLive.bind(this, item)}>
                                    <span className='count'>{item.likeCount}</span>
                                    <img className='live-icon' src={item.liked ? Iconpath.live_red : Iconpath.live_$999} />
                                </p>
                            </div>
                            <div className='content'>{item.content}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

class Comment extends React.Component {
    state = {
        hotComments: [],
        newComments: [],
        page: 0,
        commentsId: '',
        inputComment: ''
    }
    componentDidMount() {
        const { id } = this.props.location.query.curPlaySong
        this.setState({
            commentsId: id
        }, () => this.initData())

    }
    // 获取评论
    initData = () => {
        const { page, commentsId, newComments } = this.state
        http.getMusicComment({
            id: commentsId,
            limit: 20,
            offset: page
        }).then(res => {
            if (res.hotComments) {
                this.setState({
                    hotComments: res.hotComments
                })
            }
            if (res.comments.length != 0) {
                this.setState({
                    newComments: [...res.comments, ...newComments],
                    page: page + 1
                })
            }
        })
    }
    // 滚动加载
    onScroll = (e) => {
        if (window.globa.onReachBottom(e)) this.initData()
    }

    // 输入评论内容
    onInputComment = (e) =>{
        this.setState({
            inputComment: e.target.value
        })
    }
    // 发送评论
    onSend = () =>{
        const { commentsId, inputComment } = this.state
        if(!inputComment) return
        http.sendComment({
            t: 1,
            tpye: 0,
            id: commentsId,
            content: inputComment
        }).then(res =>{
            
        })
    }
    render() {
        const { hotComments, newComments, commentsId, inputComment } = this.state
        const { location } = this.props
        return (
            <div className='myComment' onScroll={this.onScroll}>
                <div className='header da'>
                    <img className='coverImg' src={location.query.curPlaySong.album.artist.img1v1Url} />
                    <div className='songInfo'>
                        <p className='name'>{location.query.curPlaySong.name}</p>
                        <p className='artist'>{location.query.curPlaySong.artists[0].name}</p>
                    </div>
                    <img className='arrow-rigth' src={Iconpath.arrow_rigth_$999} />
                </div>
                <div className='commentContent'>
                    <h3 className='title'>精彩评论</h3>
                    <CommentItem data={hotComments} commentsId={commentsId} />
                </div>
                <div className='commentContent'>
                    <h3 className='title'>最新评论</h3>
                    <CommentItem data={newComments} commentsId={commentsId} />
                </div>
                <div className='editContent da'>
                    <input className='input' type='text' placeholder='听说爱评论的人粉丝多' onChange={this.onInputComment}/>
                    <button className='btn' style={inputComment? {color:'#333'}:{}} onClick={this.onSend}>发送</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Comment)