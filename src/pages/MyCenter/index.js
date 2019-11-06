import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import CreateSong from '@/components/CreateSong'
import SongsGrid from '@/components/SongsGrid'
import Iconpath from '@/utils/iconpath'

class Recommend extends React.Component {
    state = {
        playNav: [
            { icon: Iconpath.music_black, title: '本地音乐(0)' },
            { icon: Iconpath.video, title: '最近播放(15)' },
            { icon: Iconpath.dw, title: '下载管理(0)' },
            { icon: Iconpath.fm, title: '我的电台(2)' },
            { icon: Iconpath.collect, title: '我的收藏(1)' }
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
            { icon: Iconpath.calendar, title: '私人FM' },
            { icon: Iconpath.radio_1, title: '最嗨电音' },
            { icon: Iconpath.a, title: 'ACG专区' },
            { icon: Iconpath.space, title: 'Sati空间' },
            { icon: Iconpath.rate_2_fill, title: '私人推荐' },
            { icon: Iconpath.rate_1_fill, title: '因乐交友' },
        ]
        const { playNav } = this.state
        return (
            <div className='myCenter layout'>
                <div className='topNav dbc'>
                    {
                        topNav.map((item, index) =>
                            <NavLink key={index} to='/' className='dd-vh'>
                                <img className='icon' src={item.icon} alt='' />
                                <span>{item.title}</span>
                            </NavLink>
                        )
                    }
                </div>
                <div className='playList'>
                    {
                        playNav.map((item, index) =>
                            <NavLink key={index} to='/' className='da play-item'>
                                <img src={item.icon} alt='' />
                                <span>{item.title}</span>
                            </NavLink>
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