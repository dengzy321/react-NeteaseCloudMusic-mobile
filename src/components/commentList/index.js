import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'

export default function CommentItem({ data = [], commentsId }) {
    // 点赞
    function onLive(item) {
        http.getCommentLike({
            id: commentsId,
            cid: item.commentId,
            t: item.liked ? 0 : 1,
            tpye: 0
        }).then(res => {
            data.forEach(item2 => {
                if (item2 == item) item2.liked = item2.liked ? 0 : 1
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
    // if(data.length == 0) return <Loading/>
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