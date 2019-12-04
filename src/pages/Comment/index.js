import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import CommentList from '@/components/commentList'

class Comment extends React.Component {
    state = {
        hotComments: [],
        newComments: [],
        page: 0,
        commentsId: '',
        inputComment: ''
    }
    componentWillMount() {
        this.setState({
            commentsId: this.props.curPlaySong.id
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
        if (window.global.onReachBottom(e)) this.initData()
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
    render() {
        const { hotComments, newComments, commentsId, inputComment } = this.state
        const { curPlaySong } = this.props
        return (
            <div className='myComment' onScroll={this.onScroll}>
                <div className='header da'>
                    <img className='coverImg' src={curPlaySong.al.picUrl} />
                    <div className='songInfo'>
                        <p className='name'>{curPlaySong.al.name}</p>
                        <p className='artist'>
                            {
                                curPlaySong.ar.map((aItem, aIndex) =>
                                    <b>{aItem.name}{aIndex+1 != curPlaySong.ar.length && '/'}</b>
                                )
                            }
                        </p>
                    </div>
                    <img className='arrow-rigth' src={Iconpath.arrow_rigth_$999} />
                </div>
                <div className='commentContent'>
                    <h3 className='title'>精彩评论</h3>
                    <CommentList data={hotComments} commentsId={commentsId} />
                </div>
                <div className='commentContent'>
                    <h3 className='title'>最新评论</h3>
                    <CommentList data={newComments} commentsId={commentsId} />
                </div>
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
)(Comment)