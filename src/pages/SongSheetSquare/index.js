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

function SongSheetList(props) {
    // 打开歌单详情
    const onSongSheetDetail = (id) => {
        props.history.push({
            pathname: '/SongSheetDetail',
            state: { id }
        })
    }
    if (props.data.length == 0) return <Loading />
    return (
        <div className=''>
            {props.curIndex == 0 &&
                <Carousel className="space-carousel"
                    frameOverflow="visible"
                    cellSpacing={10}
                    slideWidth={0.8}
                    dots={false}
                    autoplay
                    infinite
                    afterChange={index => props.onCarousel(index)}
                >
                    {props.carouselArr.map((item, index) => (
                        <div className='carousel' key={index} style={props.carouselIndex == index ? { top: '-1rem' } : {}} onClick={onSongSheetDetail.bind(this, item.id)}>
                            <img className='coverImg' src={item.coverImgUrl} />
                        </div>
                    ))}
                </Carousel>
            }
            <ul className='songSheet-ul da' style={props.curIndex == 0 ? { paddingTop: '2rem' } : {}}>
                {
                    props.data.map((item, index) =>
                        <li key={index} className='songSheet-li' onClick={onSongSheetDetail.bind(this, item.id)}>
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
    )
}

class SongSheetSquare extends React.Component {
    state = {
        limit: 30,
        tabs: [],
        curIndex: 0,
        carouselIndex: 0,
        sortData: {}, //分类数据
        slideIndex: 0,
        songSheetList: [],
        carouselArr: []
    }
    componentDidMount() {
        this.setState({
            tabs: this.props.songSheetSort
        })
        this.initSongSheetSort()
        this.initSongSheet()
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
    initSongSheet = () => {
        let { carouselArr, curIndex, limit } = this.state
        http.getSortSongSheetList({
            order: 'hot',
            cat: this.props.songSheetSort[curIndex].title,
            limit: limit
        }).then(res => {
            if (curIndex == 0) carouselArr = res.playlists.splice(0, 5)
            this.setState({
                songSheetList: res.playlists,
                carouselArr
            })
        })
    }
    // 滚动加载更多
    onScroll = (e) => {
        if (window.global.onReachBottom(e)) {
            this.setState(state => ({
                limit: state.limit + 30
            }), this.initSongSheet())
        }
    }
    // 切换tab
    onChange = (params, index) => {
        this.setState({
            curIndex: index,
            limit: 30,
            songSheetList: []
        })
        this.initSongSheet(params)
    }
    // 切换 Carousel
    onCarousel = (index) =>{
        this.setState({ carouselIndex: index })
    }
    // 打开歌单分类
    onSort = () => {
        this.props.history.push({
            pathname: '/songSheetSort',
            state: {
                sortData: this.state.sortData
            }
        })
    }
    render() {
        const { tabs, songSheetList, carouselArr, curIndex, carouselIndex } = this.state
        if (tabs.length == 0) return <Loading />
        return (
            <div className='songSheetSquare' onScroll={this.onScroll}>
                <div className='sortBtn' onClick={this.onSort}>
                    <img src={Iconpath.sort_$666} />
                </div>
                <Tabs tabs={tabs} {...this.props} page={curIndex} onChange={this.onChange}>
                    <SongSheetList 
                    data={songSheetList} 
                    curIndex={curIndex} 
                    carouselArr={carouselArr} 
                    carouselIndex={carouselIndex} 
                    onCarousel={this.onCarousel} {...this.props} />
                </Tabs>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongSheetSquare)
