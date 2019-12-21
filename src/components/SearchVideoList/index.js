import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'

class SearchVideoList extends React.Component {
    state = {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        nextProps.data.forEach(item => {
            let durationms = item.durationms? item.durationms : item.duration
            let minute, second;
            minute = parseInt(durationms / (1000 * 60))
            second = durationms % 60
            item.time = `${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`
            item.playNum = item.playTime >= 100000 ? parseInt(item.playTime / 10000) + '万' : item.playTime
        })
    }
    // 查看视频
    onViode = (vid) => {
        if(this.props.type == 0){
            this.props.onChangeVid(vid)
        }else{
            this.props.history.replace({
                pathname: '/VideoComment',
                state: { vid }
            })
        }
    }
    render() {
        const { data } = this.props;
        if (data.length == 0) return <Loading />
        return (
            <div className='searchVideoList'>
                <ul className='video-ul'>
                    {
                        data.map((item, index) =>
                            <li key={index} className='video-li da' onClick={this.onViode.bind(this, item.vid? item.vid:item.id)}>
                                <div className='coverUrl'>
                                    <img src={item.coverUrl? item.coverUrl : item.cover} />
                                    <p className='playNum'>
                                        <img className='icon' src={Iconpath.icon_video} />
                                        <span>{item.playNum}</span>
                                    </p>
                                </div>
                                <div className='videoInfo'>
                                    <h3 className='title'>{item.title? item.title:item.name}</h3>
                                    <p>
                                        <span className='durationms'>{item.time}</span>
                                        <span className='userName'>{item.creator? item.creator[0].userName:item.artists[0].userName}</span>
                                    </p>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SearchVideoList)