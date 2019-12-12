import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'

class VideoList extends React.Component {
    state = {
        videoList: []
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            videoList: nextProps.data
        })
    }
    // 点赞
    onLive = (id, praisedStatus) => {
        http.changeResourceLive({
            type: 5,
            t: praisedStatus ? 0 : 1,
            id: id
        }).then(res => {
            let { videoList } = this.state
            videoList.forEach(({ data }) => {
                if (data.vid == id) {
                    data.praised = !data.praised
                    data.praisedCount = data.praisedCount + 1
                }
            })
            this.setState({ videoList })
        })
    }
    render() {
        const { videoList } = this.state
        if (videoList.length == 0) return <Loading/>
        return (
            <div className='videoList'>
                <ul>
                    {
                        videoList.map(({ data }, index) =>
                            <li key={index} className='video-li'>
                                <div className='video-box'>
                                    <video poster={data.coverUrl} controls x5-playsinline="" playsinline="" webkit-playsinline="" preload="auto">
                                        <source src={data.urlInfo.url} type="video/mp4" />
                                        <source src={data.urlInfo.url} type="video/ogg" />
                                    </video>
                                </div>
                                <h3 className='title to-line'>{data.title}</h3>
                                <div className='footer da'>
                                    <img className='avatar' src={data.creator.avatarUrl} />
                                    <span className='nickname'>{data.creator.nickname}</span>
                                    <span className='live' onClick={this.onLive.bind(this, data.vid, data.praised)}>
                                        <img src={data.praised ? Iconpath.live_red_fill : Iconpath.live} />
                                        <b style={data.praised ? { color: '#FF392D' } : {}}>{data.praisedCount}</b>
                                    </span>
                                    <span className='comment' onClick={() => this.props.history.push({ pathname: '/VideoComment', state: { vid: data.vid } })}>
                                        <img src={Iconpath.comment} />
                                        <b>{data.commentCount}</b>
                                    </span>
                                    <img className='more' src={Iconpath.more_gray} />
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