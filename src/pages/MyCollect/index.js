import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'

const tab = [
    { title: '专辑' },
    { title: 'mv' },
    { title: '歌手' }
]

function ArtistModule(props) {
    const location = (id) =>{
        props.history.push({
            pathname: '/userDetail',
            state : { id }
        })
    }

    if (props.data.length == 0) return <div className='empty'>暂无数据...</div>
    return (
        <div className='artistModule'>
            <ul className='album-ul'>
                {
                    props.data.map((item, index) =>
                        <li key={index} className='album-li da' onClick={location.bind(this,item.id)}>
                            <p className='picBox'>
                                <img className='pic' src={item.picUrl} />
                            </p>
                            <p className='info'>
                                <span className='name'>{item.name}</span>
                                <span className='artist'>专辑：{item.albumSize} MV: {item.mvSize}</span>
                            </p>
                            <img className='icon' src={Iconpath.more_gray} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

function MvModule(props) {
        // 打开mv
    const onMvDetail = (vid) =>{
        props.history.push({
            pathname: '/videoComment',
            state: { vid }
        })
    }
    if (props.data.length == 0) return <div className='empty'>暂无数据...</div>
    return (
        <div className='mvModule'>
            <ul className='album-ul'>
                {
                    props.data.map((item, index) =>
                        <li key={index} className='album-li da' onClick={onMvDetail.bind(this, item.vid)}>
                            <p className='picBox'>
                                <img className='icon-video' src={Iconpath.icon_video} />   
                                <img className='pic' src={item.coverUrl} />
                            </p>
                            <p className='info'>
                                <span className='name to-2line'>{item.title}</span>
                                <span className='artist'>by {item.creator[0].userName}</span>
                            </p>
                            <img className='icon' src={Iconpath.more_gray} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

function AlbumModule(props) {
    const location = (id) =>{
        props.history.push({
            pathname: '/albumDetail',
            state : { id }
        })
    }

    if (props.data.length == 0) return <div className='empty'>暂无数据...</div>
    return (
        <div className='albumModule'>
            <ul className='album-ul'>
                {
                    props.data.map((item, index) =>
                        <li key={index} className='album-li da' onClick={location.bind(this,item.id)}>
                            <p className='picBox'>
                                <span className='bg'></span>
                                <img className='pic' src={item.picUrl} />
                            </p>
                            <p className='info'>
                                <span className='name'>{item.name}</span>
                                <span className='artist'>{item.artists[0].name}</span>
                            </p>
                            <img className='icon' src={Iconpath.more_gray} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

class MyCollect extends React.Component {
    state = {
        curActive: 0,
        artistList: [],
        mvList: [],
        albumList: [],
    }
    componentDidMount() {
        document.title = '我的收藏'
        this.initAlbumSublist()
    }
    // 获取收藏的歌手列表 
    initArtistSublist() {
        http.getArtistSublist().then(res => {
            this.setState({
                artistList: res.data
            })
        })
    }
    // 获取收藏的mv列表 
    initMvSublist() {
        http.getMvSublist().then(res => {
            this.setState({
                mvList: res.data
            })
        })
    }
    // 获取收藏的专辑列表 
    initAlbumSublist() {
        http.getAlbumSublist().then(res => {
            this.setState({
                albumList: res.data
            })
        })
    }
    // 切换tab
    onChange(index) {
        this.setState({
            curActive: index
        })
        if (index == 0) this.initAlbumSublist()
        else if (index == 1) this.initMvSublist()
        else if (index == 2) this.initArtistSublist()
    }
    render() {
        let { curActive, artistList, mvList, albumList } = this.state
        return (
            <div className='myCollect'>
                <div className='tab da'>
                    {
                        tab.map((item, index) =>
                            <p className={`item ${curActive == index ? 'active' : ''}`} key={index} onClick={this.onChange.bind(this, index)}>{item.title}</p>
                        )
                    }
                </div>
                <div className='content'>
                    {
                        curActive == 0 ? <AlbumModule {...this.props} data={albumList} /> :
                            curActive == 1 ? <MvModule {...this.props} data={mvList} /> : <ArtistModule {...this.props} data={artistList} />
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(MyCollect)