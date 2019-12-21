import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import CreateSong from '@/components/CreateSong'
import SongsGrid from '@/components/SongsGrid'
import Iconpath from '@/utils/iconpath'
import { Toast } from 'antd-mobile';

const topNav = [
    { icon: Iconpath.calendar, title: '私人FM' },
    { icon: Iconpath.radio_1, title: '最嗨电音' },
    { icon: Iconpath.a, title: 'ACG专区' },
    { icon: Iconpath.space, title: 'Sati空间' },
    { icon: Iconpath.rate_2_fill, title: '私人推荐' },
    { icon: Iconpath.rate_1_fill, title: '因乐交友' },
]

class Recommend extends React.Component {
    state = {
        playNav: [
            { icon: Iconpath.music_black, title: '本地音乐(0)', url: 'localSongs' },
            { icon: Iconpath.video, title: '最近播放(0)' },
            { icon: Iconpath.dw, title: '下载管理(0)' },
            { icon: Iconpath.fm, title: '我的电台(0)', url: 'myDj' },
            { icon: Iconpath.collect, title: '我的收藏(0)', url: 'myCollect' }
        ],
        recommendArr: [],
        showRecommend: true
    }
    componentDidMount() {
        this.initRecommend()
        this.initUserSubcount()
    }
    // 获取推荐dj列表
    initRecommend() {
        http.getBoutiqueSongs({ limit: 6 }).then(res => {
            this.setState({
                recommendArr: res.playlists
            })
        })
    }
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    initUserSubcount = () => {
        let { playNav } = this.state
        http.getUserSubcount().then(res => {
            playNav[0].title = `本地音乐(${res.createdPlaylistCount})`
            playNav[1].title = `最近播放(${res.newProgramCount})`
            playNav[2].title = `下载管理(${res.subPlaylistCount})`
            playNav[3].title = `我的电台(${res.djRadioCount})`
            playNav[4].title = `我的收藏(${res.programCount})`
            this.setState({ playNav })
        })
    }
    // 点击关闭推荐列表
    onClose() {
        this.setState({
            showRecommend: !this.state.showRecommend
        })
    }
    // 点击跳转
    toLocation = (id) =>{
        this.props.history.push({
            pathname: '/SongSheetDetail',
            state: { id }
        })
    }
    // 点击tab栏
    onTab(){
        Toast.offline('功能待开发')
    }
    render() {
        const { playNav } = this.state
        return (
            <div className='myCenter layout'>
                <div className='topNav dbc'>
                    {
                        topNav.map((item, index) =>
                            <p key={index} className='dd-vh' onClick={this.onTab}>
                                <img className='icon' src={item.icon} alt='' />
                                <span>{item.title}</span>
                            </p>
                        )
                    }
                </div>
                <div className='playList'>
                    {
                        playNav.map((item, index) =>
                            <Link key={index} to={'/' + item.url} className='da play-item'>
                                <img src={item.icon} alt='' />
                                <span>{item.title}</span>
                            </Link>
                        )
                    }
                </div>
                <CreateSong />
                {
                    this.state.showRecommend &&
                    <div className='recommend'>
                        <div className='head da'>
                            <img className='icon-heart' src={Iconpath.heart} />
                            <span className='title'>推荐歌单</span>
                            <img className='close' onClick={this.onClose.bind(this)} src={Iconpath.close_$ccc} />
                        </div>
                        <SongsGrid data={this.state.recommendArr} toLocation={this.toLocation} coverImgUrl='coverImgUrl' />
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Recommend)