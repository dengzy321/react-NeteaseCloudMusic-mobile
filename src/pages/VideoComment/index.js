import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Player from 'xgplayer';

class VideoComment extends React.Component {
    state = {
        tabs: [],
        listData: [],
        url: ''
    }
    componentDidMount() {
        console.log(this)
        this.initVideoDetail()
        this.initVideoUrl()
    }
    initVideoDetail = () => {
        http.getVideoUrl({
            id: this.props.location.query.vid
        }).then(res => {
            
        })
    }
    initVideoUrl = () => {
        http.getVideoUrl({
            id: this.props.location.query.vid
        }).then(res => {
            this.setState({
                url: res.urls[0].url
            }, () => this.myVideo.play())
        })
    }
    render() {
        const { tabs, listData } = this.state
        return (
            <div className='videoComment'>
                <video style={{ width: '100%' }} ref={el => this.myVideo = el} src={this.state.url} controls="true" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto"></video>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(VideoComment)