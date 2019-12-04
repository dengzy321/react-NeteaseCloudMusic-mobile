import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { ColorExtractor } from 'react-color-extractor'

let titleTimer = null
class SongSheetDetail extends React.Component {
    state = {
        songSheetInfo: {},
        bgColor: []
    }
    componentDidMount() {
        this.initSongSheetDetail(this.props.location.state.id)
        console.log(this)
    }
    // 获取歌单详情
    initSongSheetDetail = (id) => {
        http.getSongSheetDetail({ id }).then(res => {
            window.global.onScrollTitle(res.playlist.name, titleTimer)
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
    render() {
        const { songSheetInfo, bgColor } = this.state
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
                        <p className='songSheetInfo-r'>
                            <h3 className='title'>{songSheetInfo.name}</h3>
                            <div className='creator da'>
                                <img className='avatar' src={songSheetInfo.creator && songSheetInfo.creator.avatarUrl} alt="" />
                                <span className='nickname'>{songSheetInfo.creator && songSheetInfo.creator.nickname}</span>
                                <img className='icon' src={Iconpath.arrow_right_$fff} alt="" />
                            </div>
                            <div className='description da'>
                                <span className='to-line'>{songSheetInfo.description}</span>
                                <img src={Iconpath.arrow_right_$fff} alt="" />
                            </div>
                        </p>
                    </div>
                    <div className='handleItem da'>
                        <p className='hi-li ddc-v'>
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
                                                <img className='icon-sole' src={Iconpath.sole_red} />
                                                <img className='icon-vip' src={Iconpath.vip2_red} />
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
                                        <img className='icon-play' src={Iconpath.play} />
                                        <img className='icon-more' src={Iconpath.more_gray} />
                                    </li>
                                )
                            }
                        </ul>
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