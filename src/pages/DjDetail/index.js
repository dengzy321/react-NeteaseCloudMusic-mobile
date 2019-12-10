import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'
import SongsToolModal from '@/components/SongsToolModal'

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

// 详情模块
function DetailModule(props) {
    return (
        <div className='detailModule'>
             
        </div>
    )
}

// 节目模块
function ProgramModule(props) {
    if (props.data.length == 0) return <Loading />
    return (
        <div className='programModule'>
            <div className='detail-ul'>
                <ul>
                    {
                        props.data.map((item, index) =>
                            <li key={index} className='detail-li da'>
                                <span className='index'>{item.serialNum}</span>
                                <div className='flex'>
                                    <h3 className='name to-line'>{item.name}</h3>
                                    <p className='info da'>
                                        <span className='date'>{item.date}</span>
                                        <img className='icon-play3' src={Iconpath.play3}/>
                                        <span>{item.listenerCount}</span>
                                        <img className='icon-time' src={Iconpath.time}/>
                                        <span className='time'>{item.time}</span>
                                    </p>
                                </div>
                                <img className='icon-more' src={Iconpath.more_gray}/>
                            </li>
                        )
                    }
                </ul>
                {/* <SongsToolModal show={props.show} data={props.toolData} closeFN={this.props.onOpenTool}>
                    {Object.keys(props.curSongsInfo).length != 0 &&
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
                </SongsToolModal> */}
            </div>
        </div>
    )
}

class DjDetail extends React.Component {
    state = {
        curActive: 1, //当前激活项
        count: 0,
        programsList: [],
        detailObj: {}
    }
    componentDidMount() {
        document.title = '电台详情'
        this.initDjProgram(this.props.history.location.state.id)
        this.initDjDetail(this.props.history.location.state.id)
    }
    // 获取详情
    initDjProgram = (rid) => {
        http.getDjProgram({ rid }).then(res => {
            res.programs.forEach(item => {
                let d = new Date(item.createTime)
                item.date = `${d.getMonth() >= 10 ? d.getMonth() + 1 : '0' + d.getMonth() + 1}-${d.getMonth() >= 10 ? d.getDate() : '0' + d.getDate()}`
                let t = item.duration
                item.time = `${parseInt(t / (1000 * 60)) >= 10 ? parseInt(t / (1000 * 60)) : '0' + parseInt(t / (1000 * 60))}:${parseInt((t / 1000) % 60) >= 10 ? parseInt((t / 1000) % 60) : '0' + parseInt((t / 1000) % 60)}`
            })
            this.setState({
                count: res.count,
                programsList: res.programs
            })
        })
    }
    // 获取电台详情
    initDjDetail = (rid) => {
        http.getDjDetail({ rid }).then(res => {
            this.setState({
                detailObj: res.djRadio
            })
        })
    }
    //  切换tab
    onChange = (index) => {
        this.setState({ curActive: index })
    }
    render() {
        const { programsList, detailObj, curActive, count } = this.state
        return (
            <div className='djDetail'>
                <div className='header'>
                    <img className='pic' src={detailObj.picUrl} />
                    <div className='da info'>
                        <p className='flex'>
                            <h3 className='rcmdText'>{detailObj.rcmdText}</h3>
                            <span className='subCount'>{detailObj.subCount}已订阅</span>
                        </p>
                        <button className='btn dcc'>
                            {/* <img className='pic' src={detailObj.picUrl} /> */}
                            <span>订阅</span>
                        </button>
                    </div>
                </div>
                <div className='mainContent'>
                    <div className='mcHeader da'>
                        <span className={curActive == 0 ? 'active' : ''} onClick={this.onChange.bind(this, 0)}>详情</span>
                        <span className={curActive == 1 ? 'active' : ''} onClick={this.onChange.bind(this, 1)}>节目<b className='count'>{count}</b></span>
                    </div>
                    {curActive == 0 ? <DetailModule data={detailObj} {...this.props} /> : <ProgramModule data={programsList} count={count} {...this.props} />}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjDetail)