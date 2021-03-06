import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import { Progress, Toast } from 'antd-mobile';
import Loading from '@/components/Loading'

let timer = null, titleTimer
const rootAudio = document.getElementById('rootAudio')  // audio播放器
class PlayPlatform extends React.Component {
    state = {
        playState: false,
        loopType: 0, // 切换循环状态
        isCollect: false,
        durationTxt: '',  // 歌曲总播放时长txt
        curplayTimeTxt: '',  // 歌曲当前播放时长txt
        playPercentage: 0, //播放百分比
        songDetail: {}, // 歌曲详情
    }
    componentDidMount() {
        const { location, curPlaySong } = this.props
        if (location.state) {
            this.initSongUrl(location.state.id)
            this.initSongDetail(location.state.id)
        } else {
            titleTimer = window.global.onScrollTitle(curPlaySong.name)
            this.setState({
                songDetail: curPlaySong
            }, () => this.playInfoHandle())
        }
    }
    componentWillUnmount(){
        clearInterval(titleTimer)
    }
    // 获取歌曲详情
    initSongDetail = (ids) => {
        http.getSongDetail({ ids }).then(res => {
            this.props.addPlaySong(res.songs[0])
            this.props.addLatestPlay(res.songs[0])
            titleTimer = window.global.onScrollTitle(res.songs[0].name)
            if(res.songs[0].dt >= 100000) res.songs[0].commentCount = parseInt(res.songs[0].dt / 100000) + '万'
            this.setState({
                songDetail: res.songs.length > 0? res.songs[0] : {}
            }, () => this.playInfoHandle())
        })
    }
    // 获取歌曲url
    initSongUrl = (id) => {
        http.getSongUrl({ id }).then(res => {
            if (res.data[0].url) this.props.addSongUrl(res.data[0].url)
            else{
                Toast.fail('该歌曲不能播放', 1.5)
                setTimeout(() => {
                    this.props.history.goBack()
                }, 1500)
            }            
        })
    }
    // 播放信息处理（时间，进度条等 ）
    playInfoHandle = () => {
        const { songDetail } = this.state
        // 处理播放总时长
        let totalTime, tMin, tSecond;
        tMin = parseInt(songDetail.dt / (1000 * 60))
        tSecond = parseInt(songDetail.dt / 1000) % 60
        totalTime = `${tMin >= 10 ? tMin : '0' + tMin}:${tSecond >= 10 ? tSecond : '0' + tSecond}`

        this.setState({
            playState: !rootAudio.paused,
            durationTxt: totalTime,
            curplayTimeTxt: rootAudio.currentTime > 0 ? this.playTimeHandle() : '00:00',
            playPercentage: rootAudio.currentTime / (songDetail.dt / 1000) * 100
        })

        if (!rootAudio.paused) {
            timer = setInterval(() => {
                this.setState({
                    curplayTimeTxt: this.playTimeHandle(),
                    playPercentage: rootAudio.currentTime / (songDetail.dt / 1000) * 100
                })
            }, 1000)
        }
    }
    // 处理已播放时间txt(实现倒计时)
    playTimeHandle = () => {
        let timeTxt, min, second;
        min = parseInt(rootAudio.currentTime / 60)
        second = rootAudio.currentTime > 60 ? parseInt(rootAudio.currentTime % 60) : parseInt(rootAudio.currentTime)
        timeTxt = `${min >= 10 ? min : '0' + min}:${second >= 10 ? second : '0' + second}`
        return timeTxt
    }
    // 切换播放
    changePlay = () => {
        const { songDetail } = this.state

        if (rootAudio.paused) {
            Toast.loading('拼命播放中...', 999)
            let watchPlay = setInterval(() => {
                if (rootAudio.currentTime > 0) {
                    Toast.hide()
                    clearInterval(watchPlay)
                }
            }, 100)

            rootAudio.play()
            timer = setInterval(() => {
                this.setState({
                    curplayTimeTxt: this.playTimeHandle(),
                    playPercentage: rootAudio.currentTime / (songDetail.dt / 1000) * 100
                })
            }, 1000)
            this.setState({ playState: true })
        }
        else {
            rootAudio.pause()
            clearInterval(timer)
            this.setState({ playState: false })
        }
    }
    // 快进控制
    onTouchMove = (e) => {

    }
    // 点击切换歌曲
    onSwitchMusic = (type) => {

    }
    // 切换循环
    onLoop = () => {
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
        let { songDetail } = this.state
        this.props.history.push({
            pathname: '/comment',
            state: { 
                id: this.props.curPlaySong.id,
                type: 'song',
                data: {
                    avatar: songDetail.al.picUrl,
                    artist: songDetail.ar[0].name,
                    name: songDetail.name
                }
            }
        })
    }
    render() {
        const { playState, loopType, isCollect, playPercentage, durationTxt, curplayTimeTxt, songDetail } = this.state
        if (Object.keys(songDetail).length == 0) return <Loading />
        return (
            <div className='playPlatform'>
                <div className='header da'>
                    <img className='arrowLeft' src={Iconpath.arrow_left_$fff} onClick={() => this.props.history.goBack()} />
                    <div className='songInfo'>
                        <p className='name'>{songDetail.name}</p>
                        <p className='artist'>
                            {
                                songDetail.ar.map((aItem, aIndex) =>
                                    <b key={aIndex}>{aItem.name}{aIndex + 1 != songDetail.ar.length && '/'}</b>
                                )
                            }
                        </p>
                    </div>
                    <img className='share' src={Iconpath.share_$fff} />
                </div>
                <div className='content dd-vh'>
                    <div className='songCoverBox dd-vh'>
                        <img className='songCoverImg active' style={{ animationPlayState: playState ? 'running' : 'paused' }} src={songDetail.al.picUrl} />
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
                            <b>{songDetail.commentCount}</b>
                        </p>
                        <img className='more' src={Iconpath.more_$fff} />
                    </div>
                    <div className='center dbc' onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
                        <span className='time'>{curplayTimeTxt}</span>
                        <Progress className='progress' percent={playPercentage} position="normal" appearTransition />
                        <span className='time'>{durationTxt}</span>
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