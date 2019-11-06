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
    initSongs = () =>{
        http.getRecommendSongs({ limit: 6 }).then(res =>{
            if(res.code == 200) this.setState({ recommendArr: res.result })
        })
    }
    initNewDish = () =>{
        if(this.state.curActive == 1) return
        http.getNewDish({ limit: 3 }).then(res =>{
            if(res.code == 200) {
                this.setState({
                    newDishArr: res.albums,
                    curActive: 1
                })
            }
        })
    }
    initNewSongs = () =>{
        if(this.state.curActive == 2) return
        let arr = []
        http.getNewSongs().then(res =>{
            if(res.code == 200) {
                res.albums.forEach((item, index) =>{
                    if(index < 3) arr.push(item) 
                })
                this.setState({
                    newDishArr: arr,
                    curActive: 2
                })
            }
        })
    }
    render() {
        const { recommendArr, newDishArr, curActive=1 } = this.state
        return (
            <div className='recommendSongs'>
                <div className='recommend'>
                    <div className='re-header dbc'>
                        <span className='title'>推荐歌单</span>
                        <Link to='/' className='more'>歌单广场</Link>
                    </div>
                    <SongsGrid data={recommendArr} coverImgUrl='picUrl'/>
                </div>
                <div className='new-songs'>
                    <div className='ns-header dbc'>
                        <p className='title'>
                            <span className={curActive == 1? 'activeTitle':''} onClick={this.initNewDish}>新碟</span>
                            <span className={curActive == 2? 'activeTitle':''} onClick={this.initNewSongs}>新歌</span>
                        </p>
                        <Link to='/' className='more'>更多新碟</Link>
                    </div>
                    <SongsGrid data={newDishArr} coverImgUrl='picUrl'/>
                </div>
            </div>
        )
    }
}

export default RecommendSongs;