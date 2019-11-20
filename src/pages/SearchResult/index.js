import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Songs from '@/components/Songs'
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
        curActive: 0,
        curShowComponent: '',
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
        }, () => this.initData(1018))
    }
    initData(type) {
        const { searchValue } = this.state
        http.getSearch({
            keywords: searchValue,
            type: type,
            limit: 30
        }).then(res => {
            if (Object.keys(res.result).length > 10) {
                this.setState({
                    totalData: res.result
                }, () => this.CurComponent(type))
            } else {
                let attrName = Object.keys(res.result)[0].indexOf('Count') == -1 ? Object.keys(res.result)[0] : Object.keys(res.result)[1]
                this.setState({
                    [attrName + 'Data']: res.result[attrName]
                }, () => this.CurComponent(type))
            }
        })
    }
    // 搜索输入框
    onChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    // 删除输入框的值
    onClear = () => {
        this.setState({
            searchValue: ''
        })
    }
    // 点击tab切换
    onSelect = (index, type) => {
        this.initData(type)
        this.setState({
            curActive: index,
            curShowComponent: ''
        })
    }
    // 确定渲染那个组件
    CurComponent = (type) =>{
        const {
            songsData,
            albumsData,
            videosData,
            artistsData,
            playlistsData,
            userprofilesData,
            djRadiosData,
            totalData
        } = this.state
        let com = ''
        switch (type) {
            case 1018:
                com = <SearchTotal data={totalData} onChange={this.onSelect}/>
                break;
            case 1: 
                com = <Songs data={songsData}/>
                break;
            case 10: 
                com = <SearchAlbum data={albumsData}/>
                break;
            case 1014: 
                com = <SearchVideoList data={videosData}/>
                break;
            case 100: 
                com = <SearchArtist data={artistsData}/>
                break;
            case 1000: 
                com = <SearchSongSheet data={playlistsData}/>
                break;
            case 1002: 
                com = <SearchUserList data={userprofilesData}/>
                break;
            case 1009: 
                com = <SearchRadio data={djRadiosData}/>
                break;
            default:
                break;
        }
        this.setState({
            curShowComponent: com
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
            <div className='searchResult'>
                <div className='search da'>
                    <input onChange={this.onChange} value={searchValue} placeholder='请输入要搜索的内容' />
                    {searchValue && <img onClick={this.onClear} className='clear' src={Iconpath.close_$333} />}
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
                <div className='content'>
                    {curShowComponent}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SearchResult)