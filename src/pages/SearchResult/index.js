import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import SearchSongs from '@/components/SearchSongs'
import SearchVideoList from '@/components/SearchVideoList'
import SearchArtist from '@/components/SearchArtist'
import SearchAlbum from '@/components/SearchAlbum'
import SearchSongSheet from '@/components/SearchSongSheet'
import SearchRadio from '@/components/SearchRadio'
import SearchUserList from '@/components/SearchUserList'
import SearchTotal from '@/components/SearchTotal'

class SearchResult extends React.Component {
    state = {
        searchValue: '', 
        historyValue: '', // 历史搜索值
        curActive: 0,
        curShowComponent: '',
        curPageType: 1018,
        page: 0, //页码
        songsData: [],
        videosData: [],
        artistsData: [],
        albumsData: [],
        playlistsData: [],
        userprofilesData: [],
        djRadiosData: [],
        totalData: []
    }
    componentDidMount() {
        this.setState({
            searchValue: this.props.location.query.keywords
        }, () => this.initData())
    }
    initData = () =>{
        const { searchValue, historyValue, page, curPageType } = this.state
        this.props.addSearchHistory(searchValue? searchValue:historyValue)
        http.getSearch({
            keywords: searchValue? searchValue:historyValue,
            type: curPageType,
            limit: 20,
            offset: page
        }).then(res => {
            if (res.result.order) {
                console.log(res.result.order.length)
                if (res.result.order.length < 8 && curPageType == 1018) this.CurComponent(0)
                else if (Object.keys(res.result).length > 10) {
                    this.setState({
                        totalData: res.result,
                        historyValue: searchValue? searchValue:historyValue
                    }, () => this.CurComponent(curPageType))
                }
            }else {
                let attrName = Object.keys(res.result)[0].indexOf('Count') == -1 ? Object.keys(res.result)[0] : Object.keys(res.result)[1]
                this.setState({
                    [attrName + 'Data']: [...this.state[attrName + 'Data'], ...res.result[attrName]],
                    page: res.result[attrName].length > 0 ? page + 1 : page,
                    historyValue: searchValue? searchValue:historyValue
                }, () => this.CurComponent(curPageType))
            }
        })
    }
    // 搜索输入框
    onChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    // 键盘回车搜索
    onKeyUp = (e) =>{
        if(e.keyCode != 13) return
        this.initData()
    }
    // 删除输入框的值
    onClear = () => {
        this.setState({
            searchValue: ''
        })
    }
    // 点击tab切换
    onSelect = (index, type) => {
        this.setState({
            curActive: index,
            curShowComponent: '',
            curPageType: type
        }, () => this.initData())
    }
    // 滚动加载更多
    onScroll = (e) => {
        if (window.globa.onReachBottom(e) && this.state.curPageType != 1018) this.initData()
    }
    // 确定渲染那个组件
    CurComponent = (type) =>{
        const {
            searchValue,
            songsData,
            albumsData,
            videosData,
            artistsData,
            playlistsData,
            userprofilesData,
            djRadiosData,
            totalData
        } = this.state
        const { history } = this.props
        let com = <div className='noContent'>未找到和“{searchValue}”相关的内容</div>
        switch (type) {
            case 1018:
                com = totalData.length != 0? <SearchTotal data={totalData} onChange={this.onSelect}  history={history}/> : com
                break;
            case 1: 
                com = songsData.length != 0 ? <SearchSongs data={songsData} history={history}/> : com
                break;
            case 10: 
                com = albumsData.length != 0 ? <SearchAlbum data={albumsData}/> : com
                break;
            case 1014: 
                com = videosData.length != 0 ? <SearchVideoList data={videosData}/> : com
                break;
            case 100: 
                com = artistsData.length != 0 ? <SearchArtist data={artistsData}/> : com
                break;
            case 1000: 
                com = playlistsData.length != 0 ? <SearchSongSheet data={playlistsData}/> : com
                break;
            case 1002: 
                com = userprofilesData.length != 0 ? <SearchUserList data={userprofilesData}/> : com
                break;
            case 1009: 
                com = djRadiosData.length != 0 ? <SearchRadio data={djRadiosData}/> : com
                break;
            default:
                break;
        }
        this.setState({
            curShowComponent: com,
            curPageType: type
        })
    }
    render() {
        const {
            searchValue,
            curActive,
            curShowComponent,
        } = this.state;
        const navList = [
            { name: '综合', type: 1018 },
            { name: '单曲', type: 1 },
            { name: '专辑', type: 10 },
            { name: '歌手', type: 100 },
            { name: '歌单', type: 1000 },
            { name: '用户', type: 1002 },
            { name: '电台', type: 1009 },
            { name: '视频', type: 1014 },
            { name: 'MV', type: 1004 },
            { name: '歌词', type: 1006 },
        ]
        return (
            <div className='searchResult' onScroll={this.onScroll}>
                <div className='searchBox'>
                    <div  className='search da'>
                        <input type='search' onKeyUp={this.onKeyUp} onChange={this.onChange} value={searchValue} placeholder='请输入要搜索的内容' />
                        {searchValue && <img onClick={this.onClear} className='clear' src={Iconpath.close_$333} />}
                    </div>
                </div>
                <div className='navTab'>
                    <ul className='nav-ul da'>
                        {
                            navList.map((item, index) =>
                                <li onClick={this.onSelect.bind(this, index, item.type)} className={`nav-li ${curActive == index ? 'active' : ''}`} key={index}>{item.name}</li>
                            )
                        }
                    </ul>
                </div>
                {curShowComponent}
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SearchResult)