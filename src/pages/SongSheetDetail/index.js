import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Toast } from 'antd-mobile';

class SongSheetDetail extends React.Component { 
    state = {
        songSheetInfo: {},
        songSheetList: []
    }
    componentDidMount() {
        this.initSongSheetDetail(this.props.location.state.id)
    }
    initSongSheetDetail = (id) =>{
        http.getSongSheetDetail({ id }).then(res =>{
            this.setState({
                songSheetInfo: res.playlist,
                songSheetList: res.privileges
            })
        })
    }
    render() {
        const { songSheetInfo, songSheetList } = this.state
        return (
            <div className='songSheetDetail'>
                <div className='header' style={{ backgroundImage: `url(${songSheetInfo.backgroundCoverUrl ? songSheetInfo.backgroundCoverUrl : songSheetInfo.coverImgUrl})` }}>
                    <div className='songSheetInfo da'>
                        <p className='coverImgBox'>
                            <img className='coverImg' src={songSheetInfo.coverImgUrl} alt="" />
                            <span className='icon da'>
                                <img src={Iconpath.icon_video} alt="" />
                                <b>{songSheetInfo.playCount}</b>
                            </span>
                        </p>
                        <p className='songSheetInfo-r ddb'>
                            <h3 className='title'>{songSheetInfo.name}</h3>
                            <div className='creator da'>
                                <img className='avatar' src={songSheetInfo.creator && songSheetInfo.creator.avatarUrl} alt="" />
                                <span className='nickname'>{songSheetInfo.creator && songSheetInfo.creator.nickname}</span>
                                <img className='icon' src={Iconpath.arrow_rigth_$999} alt=""/>
                            </div>
                            <div className='description da'>
                                <span>{songSheetInfo.description}</span>
                                <img src={Iconpath.arrow_rigth_$999} alt="" />
                            </div>
                        </p>
                    </div>
                    <div className='handleItem da'>
                        <p className='hi-li ddc-v'>
                            <img src={Iconpath.news_$fff} alt="" />
                            <b>{songSheetInfo.commentCount}</b>
                        </p>
                        <p className='hi-li  ddc-v'>
                            <img src={Iconpath.share_$fff} alt="" />
                            <b>{songSheetInfo.shareCount}</b>
                        </p>
                        <p className='hi-li  ddc-v'>
                            <img src={Iconpath.dw_$fff} alt="" />
                            <b>下载</b>
                        </p>
                        <p className='hi-li  ddc-v'>
                            <img src={Iconpath.more_select_$fff} alt="" />
                            <b>多选</b>
                        </p>
                    </div>
                </div>

                <div className='mainContent'>
                    <div className='mcHeader'>我是头部</div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongSheetDetail)