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
import Loading from '@/components/Loading'

class SongSheetDetail extends React.Component {
    state = {
        show: false,
        curSongsInfo: {},
        recommendList: [], //推荐歌曲列表
        curDate: {}, // 当前时间
    }
    componentDidMount() {
        let { curDate } = this.state
        document.title = '每日推荐'
        this.initRecommendedDaily()

        let d = new Date()
        curDate = {
            day: d.getDay() + 1 >= 10 ? d.getDay() + 1 : '0' +(d.getDay() + 1),
            month: d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' +(d.getMonth() + 1),
        }
        this.setState({ curDate })
    }
    // 获取歌单详情
    initRecommendedDaily = (id) => {
        http.getRecommendedDaily().then(res => {
            this.setState({
                recommendList: res.recommend
            })
        })
    }
    // 打开播放控制台
    openPlay = (id) =>{
        this.props.history.push({
            pathname: '/playPlatform',
            state: { id }
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
        let { recommendList } = this.state
        this.setState(state => ({
            curSongsInfo: index >= 0 ? recommendList[index] : {},
            show: !state.show
        }))
    }
    render() {
        const { recommendList, curDate, curSongsInfo, show } = this.state
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
        if(recommendList.length == 0) return <Loading/>
        return (
            <div className='songSheetDetail'>
                <div className='header'>
                    <img className='coverImg' src={recommendList[0].album.picUrl} />
                    <p className='curDate'>
                        <span className='day'>{curDate.day}</span>
                        <span className='month'>/{curDate.month}</span>
                    </p>
                </div>

                <div className='mainContent'>
                    <div className='mcHeader da'>
                        <img className='icon' src={Iconpath.play_stop_$666} />
                        <span className='flex'>播放全部</span>
                        <span className='moreSelect da'>
                            <img className='icon-more' src={Iconpath.menu_$666} />
                            <b>多选</b>
                        </span>
                    </div>
                    <div className='detail-ul'>
                        <ul>
                            {
                                recommendList.map((item, index) =>
                                    <li key={index} className='detail-li da' onClick={this.openPlay.bind(this, item.id)}>
                                        <span className='index'>{index + 1}</span>
                                        <div className='info da'>
                                            <img className='coverImg' src={item.album.picUrl} />
                                            <div className='flex'>
                                                <p className='name to-line'>{item.name}</p>
                                                <p className='da infoDetail to-line'>
                                                    {item.fee == 1 && <img className='icon-vip' src={Iconpath.vip2_red} />}
                                                    {item.copyright == 2 && <img className='icon-sole' src={Iconpath.sole_red} />}
                                                    {item.pop == 100 && <img className='icon-hq' src={Iconpath.hq} />}
                                                    <span className='creator da'>{item.artists[0].name}</span>
                                                    <span className='nameSmall'>- {item.name}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <img className='icon-play' src={Iconpath.play} onClick={this.onMvVideo.bind(this, 5436712)} />
                                        <img className='icon-more' src={Iconpath.more_gray} onClick={this.onOpenTool.bind(this, index)} />
                                    </li>
                                )
                            }
                        </ul>
                        <SongsToolModal show={show} data={toolData} closeFN={this.onOpenTool}>
                            {Object.keys(curSongsInfo).length != 0 &&
                                <div className='toolHeader'>
                                    <div className='songsInfo da'>
                                        <img className='avatar' src={curSongsInfo.album.picUrl} />
                                        <div className='flex'>
                                            <p className='name'>{curSongsInfo.name}</p>
                                            <p className='artist'>{curSongsInfo.artists[0].name}</p>
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