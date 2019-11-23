import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import { Progress, Button } from 'antd-mobile';

let timer = null
class PlayPlatform extends React.Component {
    state = {
        playState: false,
        songUrl: '',
        loopType: 0,
        isCollect: false,
        duration: 0, //歌曲播放时长
        playDuration: '', //歌曲播放时长txt
        curplayTime: '00:00',  // 歌曲当前播放时长 txt
        playPercentage: 0, //播放百分比
    }
    componentDidMount() {
        const { curPlaySong } = this.props
        let min = '', second = ''
        min = parseInt(curPlaySong.duration / (60 * 1000))
        second = parseInt(curPlaySong.duration / 1000) % 60

        this.setState({
            playDuration: `${min > 9 ? min : '0' + min}:${second > 9 ? second : '0' + second}`,
            duration: curPlaySong.duration
        })
        this.initSongUrl(curPlaySong.id)
        console.log(this)
    }
    // 获取歌曲url
    initSongUrl = (id) => {
        http.getSongUrl({ id }).then(res => {
            this.setState({ songUrl: res.data[0].url })
        })
    }
    // 切换播放
    changePlay = () => {
        const { playState, duration } = this.state
        const { curPlaySong } = this.props
        if (playState) {
            this.myAudio.pause()
            clearInterval(timer)
        }
        else {
            this.myAudio.play()
            timer = setInterval(() =>{
                this.durationCountdown()
            }, 1000)
        }
        this.setState(state => ({
            playState: !state.playState
        }))
    }
    // 播放时间倒计时
    durationCountdown = () => {
        let alreadyPlayTime = this.props.curPlaySong.duration - this.state.duration //已经播放时间
        let min = '', second = ''
        min = parseInt(alreadyPlayTime / (60 * 1000))
        second = parseInt(alreadyPlayTime / (60 * 1000)) == 0 ? alreadyPlayTime / 1000 : alreadyPlayTime / 1000 % 60

        this.setState(state => ({
            curplayTime: `${min > 9 ? min : '0' + min}:${second > 9 ? second : '0' + second}`,
            duration: state.duration - 1000,
            playPercentage: (alreadyPlayTime / this.props.curPlaySong.duration) * 100
        }), () =>{
            if(this.state.duration < 0){
                this.myAudio.pause()
                clearInterval(timer)
                this.setState({
                    playState: false,
                    duration: this.props.curPlaySong.duration,
                    curplayTime: '00:00',
                    playPercentage: 0
                })
            }
        })
    }
    // 切换歌曲
    onSwitch = (type) => {
        if (type == 'per') {

        }
        if (type == 'next') {

        }
    }
    // 切换循环
    onLoop = () => {
        console.log(2112)
        this.setState(state => ({
            loopType: state.loopType == 0 ? 1 : state.loopType == 1 ? 2 : 0
        }))
    }
    // 点击收藏
    onCollect = () => {
        this.setState(state => ({
            isCollect: !state.isCollect
        }))
    }
    // 打开评论页面
    openComment = () =>{
        this.props.history.push({
            pathname: '/Comment',
            query:{ curPlaySong: this.props.curPlaySong }
        })
    }
    render() {
        const { playState, songUrl, loopType, isCollect, playPercentage, playDuration, curplayTime } = this.state
        const { curPlaySong } = this.props
        return (
            <div className='playPlatform'>
                <div className='header da'>
                    <img className='arrowLeft' src={Iconpath.arrow_left_$fff} onClick={() => this.props.history.goBack()} />
                    <div className='songInfo'>
                        <p className='name'>{curPlaySong.name}</p>
                        <p className='artist'>{curPlaySong.artists[0].name} ></p>
                    </div>
                    <img className='share' src={Iconpath.share_$fff} />
                </div>
                <div className='content dd-vh'>
                    <div className='songCoverBox dd-vh'>
                        <img className='songCoverImg active' style={{ animationPlayState: playState ? 'running' : 'paused' }} src={curPlaySong.artists[0].img1v1Url} />
                        <img className='music-controller' style={{ transform: `rotate(${playState ? '-4deg' : '-40deg'})` }} src={Iconpath.music_controller} />
                    </div>
                </div>
                <div className='footer'>
                    <div className='top dbc'>
                        <img onClick={this.onCollect} className='collection' src={isCollect ? Iconpath.collection_live_red : Iconpath.collection_live_$fff} />
                        <img className='download' src={Iconpath.download_$fff} />
                        <img className='dts' src={Iconpath.dts} />
                        <p className='comment' onClick={this.openComment}>
                            <img className='share' src={Iconpath.comment_$fff} />
                            <b>11万</b>
                        </p>
                        <img className='more' src={Iconpath.more_$fff} />
                    </div>
                    <div className='center dbc'>
                        <span className='time'>{curplayTime}</span>
                        <Progress className='progress' percent={playPercentage} position="normal" appearTransition />
                        <span className='time'>{playDuration}</span>
                    </div>
                    <div className='bottom dbc'>
                        <img onClick={this.onLoop} className='randomPlay' src={Iconpath.randomPlay_$fff} />
                        <img onClick={this.onSwitch.bind(this, 'per')} className='per' src={Iconpath.next_fill} />
                        <img onClick={this.changePlay} className='play' src={playState ? Iconpath.play_start_$fff : Iconpath.play_stop_$fff} />
                        <img onClick={this.onSwitch.bind(this, 'next')} className='next' src={Iconpath.next_fill} />
                        <img className='playList' src={Iconpath.playList_$fff} />
                    </div>
                    <audio controls className='myAudio' ref={(el) => this.myAudio = el}>
                        <source src={songUrl} type="audio/ogg" />
                        <source src={songUrl} type="audio/mpeg" />
                        <source src={songUrl} type="audio/mp3" />
                    </audio>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PlayPlatform)