import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import Iconpath from '@/utils/iconpath'
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

class LatestPlay extends React.Component {
    state = {
        curSongsInfo: {},
        show: false,
        latestPlay: []
    }
    componentDidMount() {
        document.title = '最新播放'
        console.log(this)
        this.setState({
            latestPlay: this.props.latestPlay
        })
    }
    // 打开歌曲tool
    onOpenTool = (index, event) => {
        if (index >= 0) event.stopPropagation()
        this.setState(state => ({
            show: !state.show,
            curSongsInfo: index >= 0 ? this.state.latestPlay[index] : {}
        }))
    }
    // 打开播放歌曲控制台
    onPlayMusicHandle = (item) => {
        this.props.history.push({
            pathname: '/playPlatform',
            state: { id: item.id }
        })
    }
    render() {
        const { latestPlay, curSongsInfo, show } = this.state
        if (latestPlay.length == 0) return <div className='empty'>暂无播放记录...</div>
        return (
            <div className='latestPlay'>
                <div className='header da'>
                    <img className='icon-video' src={Iconpath.video} />
                    <span className='name'>全部播放</span>
                    <span className='count'>（共{latestPlay.length}）</span>
                </div>
                <ul className='song-ul'>
                    {
                        latestPlay.map((item, index) =>
                            <li key={index} className='song-li da' onClick={this.onPlayMusicHandle.bind(this, item)}>
                                <img className='avatar' src={item.al.picUrl} />
                                <div className='info'>
                                    <p className='name to-line'>{item.name}</p>
                                    <p className='artist to-line'>{item.ar[0].name} - {item.name}</p>  
                                </div>
                                <img className='icon-more' src={Iconpath.more_gray} onClick={this.onOpenTool.bind(this, index)} />
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
                                    <p className='name'>{curSongsInfo.name}</p>
                                    <p className='artist'>{curSongsInfo.ar[0].name}</p>
                                </div>
                                <button className='btn'>vip首开5元</button>
                            </div>
                            <div className='tip'>开通vip畅享千万曲库下载特权</div>
                        </div>
                    }
                </SongsToolModal>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(LatestPlay)