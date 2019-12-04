import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import SearchVideoList from '@/components/SearchVideoList'
import SearchSongSheet from '@/components/SearchSongSheet'
import SearchArtist from '@/components/SearchArtist'
import SearchAlbum from '@/components/SearchAlbum'
import SearchRadio from '@/components/SearchRadio'
import SearchUserList from '@/components/SearchUserList'
import SongsToolModal from '@/components/SongsToolModal'

class SearchTotal extends React.Component {
    state = {
        show: false,
        curSongsInfo: '',
    }
    onOpenTool = (index) => {
        const { song } = this.props.data
        this.setState(state => ({
            show: !state.show,
            curSongsInfo: song.songs[index]
        }))
    }
    // 打开播放歌曲控制台
    onPlayMusicHandle = (item) => {
        this.props.history.push({
            pathname: '/playPlatform',
            state: {id: item.id}
        })
    }
    render() {
        const { show, curSongsInfo } = this.state
        const { data, onChange, history } = this.props
        const toolData = [
            { name: '下一首播放', icon: Iconpath.album },
            { name: '收藏到歌单', icon: Iconpath.favorites_$333 },
            { name: '下载', icon: Iconpath.download },
            { name: '评论', icon: Iconpath.news },
            { name: '分享', icon: Iconpath.share_$333 },
            { name: '歌手：邢林团', icon: Iconpath.singer },
            { name: '专辑', icon: Iconpath.album },
            { name: '设为铃声', icon: Iconpath.bell_$333 },
            { name: '购买歌曲', icon: Iconpath.shopCart_$333 },
            { name: '查看视频', icon: Iconpath.play_$333 },
            { name: '隐蔽歌曲或歌单', icon: Iconpath.close_circular_$333 }
        ]
        return (
            <div className='searchTotal'>
                {data.song &&
                    <div className='songsModule'>
                        <div className='header da'>
                            <span className='title'>单曲</span>
                            <p className='totalBtn da'>
                                <img src={Iconpath.video} />
                                <span>播放全部</span>
                            </p>
                        </div>
                        <div className='searchContent'>
                            <ul className='songs-ul'>
                                {
                                    data.song.songs.map((item, index) =>
                                        <li key={index} className='songs-li da' onClick={this.onPlayMusicHandle.bind(this, item)}>
                                            <div className='songsInfo'>
                                                <p className='name to-line'>{item.name}</p>
                                                <p className='des to-line'>{item.ar[0].name}{item.al.name && ' - ' + item.al.name}</p>
                                            </div>
                                            <img className='play' src={Iconpath.play} />
                                            <img onClick={this.onOpenTool.bind(this, index)} className='more' src={Iconpath.more_gray} />
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <button className='moreText' onClick={() => onChange(1, 1)}>{data.song.moreText} ></button>
                    </div>
                }
                {data.video &&
                    <div className='videoModule'>
                        <div className='header da'>
                            <span className='title'>视频</span>
                        </div>
                        <div className='searchContent'>
                            <SearchVideoList data={data.video.videos} history={history}/>
                        </div>
                        <button className='moreText' onClick={() => onChange(7, 1014)}>{data.video.moreText} ></button>
                    </div>
                }
                {data.playList &&
                    <div className='songsSheetModule'>
                        <div className='header da'>
                            <span className='title'>歌单</span>
                        </div>
                        <div className='searchContent'>
                            <SearchSongSheet data={data.playList.playLists} />
                        </div>
                        <button className='moreText' onClick={() => onChange(4, 1000)}>{data.playList.moreText} ></button>
                    </div>
                }
                {data.sim_query &&
                    <div className='correlateModule'>
                        <div className='header da'>
                            <span className='title'>相关搜索</span>
                        </div>
                        <div className='searchContent'>
                            <ul className='correlate-ul da'>
                                {
                                    data.sim_query.sim_querys.map((item, index) =>
                                        <li key={index} className='correlate-li'>{item.keyword}</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                }
                {data.mlog &&
                    <div className='mlogModule'>
                        <div className='header da'>
                            <span className='title'>Mlog</span>
                        </div>
                        <div className='searchContent'>
                            <ul className='mlog-ul da'>
                                {
                                    data.mlog.mlogs.map((item, index) =>
                                        <li key={index} className='mlog-li'>
                                            <div className='shareUrl'>
                                                <img className='coverImg' src={item.resource.mlogBaseData.coverUrl} />
                                                <img className='icon' src={Iconpath.icon_video} />
                                            </div>
                                            <p className='name'>{item.matchFieldContent}</p>
                                            <p className='dbc'>
                                                <span className='da'>
                                                    <img className='avatarUrl' src={item.resource.userProfile.avatarUrl} />
                                                    <b className='nickname'>{item.resource.userProfile.nickname}</b>
                                                </span>
                                                <span className='likedCount'>{item.resource.mlogExtVO.likedCount}赞</span>
                                            </p>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <button className='moreText'>{data.mlog.moreText} ></button>
                    </div>
                }
                {data.artist &&
                    <div className='artistModule'>
                        <div className='header da'>
                            <span className='title'>歌手</span>
                        </div>
                        <div className='searchContent'>
                            <SearchArtist data={data.artist.artists} />
                        </div>
                        <button className='moreText' onClick={() => onChange(3, 100)}>{data.artist.moreText} ></button>
                    </div>
                }
                {data.album &&
                    <div className='albumModule'>
                        <div className='header da'>
                            <span className='title'>专辑</span>
                        </div>
                        <div className='searchContent'>
                            <SearchAlbum data={data.album.albums} />
                        </div>
                        <button className='moreText' onClick={() => onChange(2, 10)}>{data.album.moreText} ></button>
                    </div>
                }
                {data.djRadio &&
                    <div className='radioModule'>
                        <div className='header da'>
                            <span className='title'>电台</span>
                        </div>
                        <div className='searchContent'>
                            <SearchRadio data={data.djRadio.djRadios} />
                        </div>
                        <button className='moreText' onClick={() => onChange(6, 1009)}>{data.djRadio.moreText} ></button>
                    </div>
                }
                {data.user &&
                    <div className='userModule'>
                        <div className='header da'>
                            <span className='title'>用户</span>
                        </div>
                        <div className='searchContent'>
                            <SearchUserList data={data.user.users} />
                        </div>
                        <button className='moreText' onClick={() => onChange(5, 1002)}>{data.user.moreText} ></button>
                    </div>
                }
                <SongsToolModal show={show} data={toolData} closeFN={this.onOpenTool}>
                    {curSongsInfo &&
                        <div className='toolHeader'>
                            <div className='songsInfo da'>
                                <img className='avatar' src={curSongsInfo.al.picUrl} />
                                <div className='flex'>
                                    <p className='name'>{curSongsInfo.al.name}</p>
                                    <p className='artist'>{curSongsInfo.ar[0].name}</p>
                                </div>
                                <button className='btn'>vip首开5元</button>
                            </div>
                            <div className='tip'>开通vip畅享千万曲库下载特权</div>
                        </div>
                    }
                </SongsToolModal>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SearchTotal)