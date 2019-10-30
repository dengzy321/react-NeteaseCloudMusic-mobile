import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'
import { http } from '../../api/http'
import * as actions from '../../store/actions';
import './index.css';
import CreateSong from '../../components/CreateSong'
import SongsGrid from '../../components/SongsGrid'

class Recommend extends React.Component {
    state = {
        playNav: [
            { icon: require('../../assets/music_black.png'), title: '本地音乐(0)' },
            { icon: require('../../assets/video.png'), title: '最近播放(15)' },
            { icon: require('../../assets/dw.png'), title: '下载管理(0)' },
            { icon: require('../../assets/fm.png'), title: '我的电台(2)' },
            { icon: require('../../assets/collect.png'), title: '我的收藏(1)' }
        ],
        recommendArr: [],
        showRecommend: true
    }
    componentWillMount() {
        this.initRecommend()
    }
    initRecommend(){
        http.getBoutiqueSongs({ limit: 6 }).then(res =>{
            if(res.code == 200) this.setState({ recommendArr: res.playlists })
        })
    }
    onClose(){
        this.setState({ showRecommend: !this.state.showRecommend })
    }
    render() {
        const topNav = [
            { icon: require('../../assets/calendar.png'), title: '私人FM' },
            { icon: require('../../assets/calendar.png'), title: '最嗨电音' },
            { icon: require('../../assets/calendar.png'), title: 'ACG专区' },
            { icon: require('../../assets/calendar.png'), title: 'Sati空间' },
            { icon: require('../../assets/calendar.png'), title: '私人推荐' },
            { icon: require('../../assets/calendar.png'), title: '因乐交友' },
        ]
        const { playNav } = this.state
        return (
            <div className='myCenter layout'>
                <div className='topNav dbc'>
                    {
                        topNav.map((item, index) => {
                            return (
                                <NavLink key={index} to='/' className='dd-vh'>
                                    <img className='icon' src={item.icon} alt='' />
                                    <span>{item.title}</span>
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div className='playList'>
                    {
                        playNav.map((item, index) => {
                            return (
                                <NavLink key={index} to='/' className='da play-item'>
                                    <img src={item.icon} alt='' />
                                    <span>{item.title}</span>
                                </NavLink>
                            )
                        })
                    }
                </div>
                <CreateSong />
                {
                    this.state.showRecommend &&
                    <div className='recommend'>
                        <div className='head da'>
                            <img className='icon-heart' src={require('../../assets/heart.png')} />
                            <span className='title'>推荐歌单</span>
                            <img className='close' onClick={this.onClose.bind(this)} src={require('../../assets/close_#ccc.png')} />
                        </div>
                        <SongsGrid data={this.state.recommendArr} coverImgUrl='coverImgUrl'/>
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