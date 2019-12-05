import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'
import { Tabs, Carousel } from 'antd-mobile';

class SongSheetSquare extends React.Component {
    state = {
        tabs: [],
        sortData: {}, //分类数据
        slideIndex: 0,
        songSheetList: []
    }
    componentDidMount() {
        this.setState({
            tabs: this.props.songSheetSort
        })
        this.initSongSheetSort()
        this.initSongSheet(this.props.songSheetSort[0])
    }
    // 获取歌单分类
    initSongSheetSort = () => {
        http.getSongSheetSort().then(res => {
            res.sub.forEach(item => {
                item.title = item.name
                if (item.playCount >= 100000000) item.playCount = parseInt(item.playCount / 100000000) + '亿'
                else if (item.playCount >= 10000) item.playCount = parseInt(item.playCount / 10000) + '万'
            })
            this.setState({
                sortData: res
            })
        })
    }
    // 获取分类下的歌单
    initSongSheet = (params) => {
        http.getSortSongSheetList({
            order: 'hot',
            cat: params.title,
            limit: 30
        }).then(res => {
            this.setState({
                songSheetList: res.playlists
            })
        })
    }
    // 切换tab
    onChange = (params) => {
        this.initSongSheet(params)
    }
    // 打开歌单分类
    onSort = () =>{
        this.props.history.push({
            pathname: '/songSheetSort',
            state: {
                sortData: this.state.sortData
            }
        })
    }
    render() {
        const { tabs, songSheetList } = this.state
        if (tabs.length == 0) return <Loading />
        return (
            <div className='songSheetSquare'>
                <div className='sortBtn' onClick={this.onSort}>
                    <img src={Iconpath.sort_$666} />
                </div>
                <Tabs tabs={tabs} {...this.props} onChange={this.onChange}>
                    {/* <Carousel className="space-carousel"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.8}
                        autoplay
                        infinite
                        afterChange={index => this.setState({ slideIndex: index })}
                    >
                        {
                            songSheetList.map((item, index) =>{
                                return index < 3 &&  
                                <div key={index} className=''>
                                    
                                </div>
                            })
                        }
                    </Carousel> */}
                    <div className=''>
                        <ul className='songSheet-ul da'>
                            {
                                songSheetList.map((item, index) =>
                                    <li key={index} className='songSheet-li'>
                                        <p className='coverImgBox'>
                                            <span className='playCount da'>
                                                <img className='icon' src={Iconpath.icon_video} />
                                                <b className='count'>{item.playCount}</b>
                                            </span>
                                            <img className='coverImg' src={item.coverImgUrl} />
                                        </p>
                                        <h5 className='name to-2line'>{item.name}</h5>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongSheetSquare)
