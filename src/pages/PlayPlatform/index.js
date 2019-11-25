import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import { Progress } from 'antd-mobile';

let timer = null
class PlayPlatform extends React.Component {
    state = {
        playState: false,
        loopType: 0,
        isCollect: false,
        surplusDuration: 0, //剩余歌曲播放时长
        playDuration: '', //歌曲播放时长txt
        curplayTime: '00:00',  // 歌曲当前播放时长txt
        playPercentage: 0, //播放百分比
    }
    componentDidMount() {
        const { curPlaySong, surplusDuration, isPlayMusic, curSongUrl } = this.props
        let min = '', second = '', min2 = '', second2 = ''
        min = parseInt(curPlaySong.duration / (60 * 1000))
        second = parseInt(curPlaySong.duration / 1000) % 60

        if (curSongUrl) {
            min2 = parseInt(surplusDuration / (60 * 1000))
            second2 = parseInt(surplusDuration / 1000) % 60
        }

        this.setState({
            playState: isPlayMusic,
            playDuration: `${min > 9 ? min : '0' + min}:${second > 9 ? second : '0' + second}`,
            curplayTime: curSongUrl ? `${min2 > 9 ? min2 : '0' + min2}:${second2 > 9 ? second2 : '0' + second2}` : '00:00',
            surplusDuration: curSongUrl ? surplusDuration : curPlaySong.duration,
            playPercentage: curSongUrl ? (curPlaySong.duration - surplusDuration) / curPlaySong.duration : 0
        })

        if (!curSongUrl) this.initSongUrl(curPlaySong.id)
        if (isPlayMusic) this.durationCountdown()
        console.log(this)
    }
    componentWillUnmount() {
        this.props.setPlayTime(this.state.surplusDuration)
    }
    // 获取歌曲url
    initSongUrl = (id) => {
        http.getSongUrl({ id }).then(res => {
            this.props.addSongUrl(res.data[0].url)
            this.props.setPlayTime(this.state.surplusDuration)
            this.props.playMusic()
            this.setState({
                playState: true
            }, () => this.durationCountdown())
        })
    }
    // 切换播放
    changePlay = () => {
        const { playState } = this.state
        clearInterval(timer)
        if (!playState) this.durationCountdown()
        this.setState(state => ({
            playState: !state.playState
        }))
        this.props.playMusic()
    }
    // 播放时间倒计时
    durationCountdown = () => {
        timer = setInterval(() => {
            let alreadyPlayTime = this.props.curPlaySong.duration - this.state.surplusDuration //已经播放时间
            let min = '', second = ''
            min = parseInt(alreadyPlayTime / (60 * 1000))
            second = parseInt(alreadyPlayTime / (60 * 1000)) == 0 ? alreadyPlayTime / 1000 : alreadyPlayTime / 1000 % 60

            this.setState(state => ({
                curplayTime: `${min > 9 ? min : '0' + min}:${second > 9 ? second : '0' + second}`,
                surplusDuration: state.surplusDuration - 1000,
                playPercentage: (alreadyPlayTime / this.props.curPlaySong.duration) * 100
            }), () => {
                if (this.state.surplusDuration < 0) {
                    this.props.playMusic()
                    clearInterval(timer)
                    this.setState({
                        playState: false,
                        surplusDuration: this.props.curPlaySong.duration,
                        curplayTime: '00:00',
                        playPercentage: 0
                    })
                }
            })
        }, 1000)
    }
    // 点击切换歌曲
    onSwitchMusic = (type) => {
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
    onComment = () => {
        this.props.history.push({
            pathname: '/Comment',
            query: { curPlaySong: this.props.curPlaySong }
        })
    }
    render() {
        const { playState, loopType, isCollect, playPercentage, playDuration, curplayTime } = this.state
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
                        <p className='comment' onClick={this.onComment}>
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
                        <img onClick={this.onSwitchMusic.bind(this, 'per')} className='per' src={Iconpath.next_fill} />
                        <img onClick={this.changePlay} className='play' src={playState ? Iconpath.play_start_$fff : Iconpath.play_stop_$fff} />
                        <img onClick={this.onSwitchMusic.bind(this, 'next')} className='next' src={Iconpath.next_fill} />
                        <img className='playList' src={Iconpath.playList_$fff} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PlayPlatform)