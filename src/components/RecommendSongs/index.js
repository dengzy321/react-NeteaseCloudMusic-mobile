import React from 'react';
import { Link } from 'react-router-dom'
import './index.css';
import { Grid } from 'antd-mobile';
import { http } from '@/api/http'
import SongsGrid from '../SongsGrid'

class RecommendSongs extends React.Component {
    state = {
        recommendArr: [],
        newDishArr: [],
        curActive: 0
    }
    componentDidMount() {
        this.initSongs()
        this.initNewDish()
    }
    // 初始化推荐歌单列表
    initSongs = () =>{
        http.getRecommendSongs({ limit: 6 }).then(res => {
            res.result.forEach(item => {
                let c = item.playCount
                if (c >= 100000000) item.playCount = parseInt(c / 100000000) + '亿'
                else if (c >= 10000) item.playCount = parseInt(c / 100000) + '万'
            })
            this.setState({ recommendArr: res.result })
        })
    }
    // 初始化新碟数据
    initNewDish = () =>{
        if(this.state.curActive == 1) return
        http.getNewDish({ limit: 3 }).then(res =>{
            this.setState({
                newDishArr: res.albums,
                curActive: 1
            })
        })
    }
    // 初始化新歌数据
    initNewSongs = () =>{
        if(this.state.curActive == 2) return
        let arr = []
        http.getNewAlbum().then(res =>{
            res.albums.forEach((item, index) => {
                if (index < 3) arr.push(item)
            })
            this.setState({
                newDishArr: arr,
                curActive: 2
            })
        })
    }
    // 打开歌单详情
    onSongShootDetail = (id) => {
        this.props.history.push({
            pathname: '/SongSheetDetail',
            state: { id }
        })
    }
    // 打开专辑
    onNewAlbum = (id) => {
        // this.props.history.push({
        //     pathname: '/playPlatform',
        //     state: { id }
        // })
    }
    // 打开新碟
    onNewDish = (id) => {
        // this.props.history.push({
        //     pathname: '/playPlatform',
        //     state: { id }
        // })
    }
    render() {
        const { recommendArr, newDishArr, curActive=1 } = this.state
        return (
            <div className='recommendSongs'>
                <div className='recommend'>
                    <div className='re-header dbc'>
                        <span className='title'>推荐歌单</span>
                        <Link to='/songSheetSquare' className='more'>歌单广场</Link>
                    </div>
                    <SongsGrid data={recommendArr} coverImgUrl='picUrl' toLocation={this.onSongShootDetail}/>
                </div>
                <div className='new-songs'>
                    <div className='ns-header dbc'>
                        <p className='title'>
                            <span className={curActive == 1? 'activeTitle':''} onClick={this.initNewDish}>新碟</span>
                            <span className={curActive == 2? 'activeTitle':''} onClick={this.initNewSongs}>专辑</span>
                        </p>
                        <Link to='/' className='more'>更多新碟</Link>
                    </div>
                    <SongsGrid data={newDishArr} toLocation={curActive == 1 ? this.onNewDish : this.onNewAlbum} coverImgUrl='picUrl'/>
                </div>
            </div>
        )
    }
}

export default RecommendSongs;