import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { ColorExtractor } from 'react-color-extractor'
import SongsToolModal from '@/components/SongsToolModal'

let titleTimer
class SongSheetDetail extends React.Component {
    state = {
        show: false,
        songSheetInfo: {},
        curSongsInfo: {},
        bgColor: []
    }
    componentDidMount() {
        this.initSongSheetDetail(this.props.location.state.id)
    }
    componentWillUnmount(){
        clearInterval(titleTimer)
    }
    // 获取歌单详情
    initSongSheetDetail = (id) => {
        http.getSongSheetDetail({ id }).then(res => {
            titleTimer = window.global.onScrollTitle(res.playlist.name)
            this.setState({
                songSheetInfo: res.playlist
            })
        })
    }
    // 获取图片的颜色
    getColors = (color) => {
        this.setState({ bgColor: color })
    }
    // 打开播放控制台
    openPlay = (id) =>{
        this.props.history.push({
            pathname: '/playPlatform',
            state: { id }
        })
    }
    // 打开评论
    openComment = () =>{
        let { songSheetInfo } = this.state
        this.props.history.push({
            pathname: '/comment',
            state: { 
                id: this.props.location.state.id,
                type: 'songSheet',
                data: {
                    avatar: songSheetInfo.coverImgUrl,
                    artist: songSheetInfo.creator.nickname,
                    name: songSheetInfo.name
                } 
            }
        })
    }
    // 打开Mv视频
    onMvVideo = (id, event) => {
        event.stopPropagation()
        http.getMvUrl({ id })
    }
    // 打开歌曲tool
    onOpenTool = (index, event) => {
        if (index >=0) event.stopPropagation()
        let { songSheetInfo } = this.state
        this.setState(state => ({
            curSongsInfo: index >= 0 ? songSheetInfo.tracks[index] : {},
            show: !state.show
        }))
    }
    render() {
        const { songSheetInfo, curSongsInfo, bgColor, show } = this.state
        console.log(curSongsInfo)
        const toolData = [
            { name: '下一首播放', icon: Iconpath.album },
            { name: '收藏到歌单', icon: Iconpath.favorites_$333 },
            { name: '下载', icon: Iconpath.download },
            { name: '评论', icon: Iconpath.news },
            { name: '分享', icon: Iconpath.share_$333 },
            { name: '歌手：邢林团', icon: Iconpath.singer },
            { name: '专辑', icon: Iconpath.album },
            { name: '设为铃声', icon: Iconpath.bell_$333 },
            { name: '购买歌曲', icon: Iconpath.shopCart_$333 },
            { name: '查看视频', icon: Iconpath.play_$333 },
            { name: '隐蔽歌曲或歌单', icon: Iconpath.close_circular_$333 }
        ]
        return (
            <div className='songSheetDetail'>
                <ColorExtractor getColors={this.getColors}>
                    <img src={songSheetInfo.backgroundCoverUrl ? songSheetInfo.backgroundCoverUrl : songSheetInfo.coverImgUrl} style={{ display: 'none' }} />
                </ColorExtractor>
                <div className='header' style={{ background: `linear-gradient(45deg, ${bgColor[0]}, ${bgColor[1]})` }}>
                    <div className='songSheetInfo da'>
                        <p className='coverImgBox'>
                            <img className='coverImg' src={songSheetInfo.coverImgUrl} alt="" />
                            <span className='icon da'>
                                <img src={Iconpath.icon_video} alt="" />
                                <b>{songSheetInfo.playCount}</b>
                            </span>
                        </p>
                        <div className='songSheetInfo-r'>
                            <p className='title'>{songSheetInfo.name}</p>
                            <p className='creator da'>
                                <img className='avatar' src={songSheetInfo.creator && songSheetInfo.creator.avatarUrl} alt="" />
                                <span className='nickname'>{songSheetInfo.creator && songSheetInfo.creator.nickname}</span>
                                <img className='icon' src={Iconpath.arrow_right_$fff} alt="" />
                            </p>
                            <p className='description da'>
                                <span className='to-line'>{songSheetInfo.description}</span>
                                <img src={Iconpath.arrow_right_$fff} alt="" />
                            </p>
                        </div>
                    </div>
                    <div className='handleItem da'>
                        <p className='hi-li ddc-v' onClick={this.openComment}>
                            <img src={Iconpath.news_$fff} alt="" />
                            <b>{songSheetInfo.commentCount}</b>
                        </p>
                        <p className='hi-li  ddc-v'>
                            <img src={Iconpath.share_$fff} alt="" />
                            <b>{songSheetInfo.shareCount}</b>
                        </p>
                        <p className='hi-li  ddc-v'>
                            <img src={Iconpath.dw_$fff} alt="" />
                            <b>下载</b>
                        </p>
                        <p className='hi-li  ddc-v'>
                            <img src={Iconpath.more_select_$fff} alt="" />
                            <b>多选</b>
                        </p>
                    </div>
                </div>

                <div className='mainContent'>
                    <div className='mcHeader da'>
                        <img className='icon' src={Iconpath.play_stop_$666} />
                        <span>播放全部</span>
                        <span className='trackCount'>(共{songSheetInfo.trackCount}首)</span>
                        <span className='subscribedCount'>+收藏({songSheetInfo.subscribedCount})</span>
                    </div>
                    <div className='detail-ul'>
                        <ul>
                            {songSheetInfo.tracks &&
                                songSheetInfo.tracks.map((item, index) =>
                                    <li key={index} className='detail-li da' onClick={this.openPlay.bind(this, item.id)}>
                                        <span className='index'>{index + 1}</span>
                                        <div className='info'>
                                            <p className='name to-line'>{item.name}</p>
                                            <p className='da infoDetail to-line'>
                                                {item.fee == 1 && <img className='icon-vip' src={Iconpath.vip2_red} />}
                                                {item.copyright == 2 && <img className='icon-sole' src={Iconpath.sole_red} />}
                                                {item.pop == 100 && <img className='icon-hq' src={Iconpath.hq} />}
                                                <span className='creator da'>
                                                    {
                                                        item.ar.map((aItem, aIndex) =>
                                                            <b key={aIndex}>{aItem.name} {aIndex + 1 != item.ar.length && '/'}</b>
                                                        )
                                                    }
                                                </span> 
                                                <span className='nameSmall'>- {item.name}</span>
                                            </p>
                                        </div>
                                        {item.mv > 0 && <img className='icon-play' src={Iconpath.play} onClick={this.onMvVideo.bind(this, 5436712)}/>}
                                        <img className='icon-more' src={Iconpath.more_gray} onClick={this.onOpenTool.bind(this, index)}/>
                                    </li>
                                )
                            }
                        </ul>
                        <SongsToolModal show={show} data={toolData} closeFN={this.onOpenTool}>
                            {Object.keys(curSongsInfo).length != 0 &&
                                <div className='toolHeader'>
                                    <div className='songsInfo da'>
                                        <img className='avatar' src={curSongsInfo.al.picUrl} />
                                        <div className='flex'>
                                            <p className='name'>{curSongsInfo.al.name}</p>
                                            <p className='artist'>{curSongsInfo.ar[0].name}</p>
                                        </div>
                                        <button className='btn'>vip首开5元</button>
                                    </div>
                                    <div className='tip'>开通vip畅享千万曲库下载特权</div>
                                </div>
                            }
                        </SongsToolModal>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongSheetDetail)