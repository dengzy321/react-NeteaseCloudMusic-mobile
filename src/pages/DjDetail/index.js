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

function DetailModule(props) {
    return (
        <div className='detailModule'>

        </div>
    )
}

function ProgramModule(props) {
    return (
        <div className='programModule'>
            <div className='detail-ul'>
                <ul>
                    {
                        props.data.map((item, index) =>
                            <li key={index} className='detail-li da' onClick={this.openPlay.bind(this, item.id)}>
                                <span className='index'>{item.serialNum}</span>
                                <div className='info'>
                                    <h3 className='name'>{item.name}</h3>
                                    <p className=''>
                                        <span className='time'></span>
                                        <img className='icon-more' src={Iconpath.more_gray}/>
                                    </p>
                                </div>
                                <img className='icon-more' src={Iconpath.more_gray} onClick={this.onOpenTool.bind(this, index)} />
                            </li>
                        )
                    }
                </ul>
                <SongsToolModal show={show} data={toolData} closeFN={this.onOpenTool}>
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
                </SongsToolModal>
            </div>
        </div>
    )
}

class DjDetail extends React.Component {
    state = {
        curActive: 1, //当前激活项
        count: 0,
        programList: []
    }
    componentDidMount() {
        document.title = '电台详情'
        this.initDjProgram(this.props.history.location.state.id)
        this.initDjDetail(this.props.history.location.state.id)
    }
    // 获取详情
    initDjProgram = (rid) => {
        http.getDjProgram({ rid }).then(res => {
            this.setState({
                count: res.count,
                programsList: res.programs
            })
        })
    }
    // 获取电台详情
    initDjDetail = (rid) => {
        http.getDjDetail({ rid }).then(res => {

        })
    }
    render() {
        const { programList, curActive, count } = this.state
        if (programList.length == 0) return <Loading />
        return (
            <div className='djDetail'>
                <div className='header'>
                    <img className='coverImg' src={recommendList[0].album.picUrl} />
                    <p className='curDate'>
                        <span className='day'>{curDate.day}</span>
                        <span className='month'>/{curDate.month}</span>
                    </p>
                </div>

                <div className='mainContent'>
                    <div className='mcHeader da'>
                        <span>详情</span>
                        <span>节目<b className='count'>16</b></span>
                    </div>
                    {curActive == 0 ? <DetailModule {...this.props} /> : <ProgramModule data={programList} count={count} {...this.props} />}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjDetail)