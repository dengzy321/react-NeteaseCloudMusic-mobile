import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'

class SearchVideoList extends React.Component {
    state = {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps){
        nextProps.data.forEach(item =>{
            let minute, second;
            minute = parseInt(item.durationms / (1000*60))
            second = item.durationms % 60
            item.time = `${minute >= 10? minute : '0' + minute}:${second >= 10? second : '0' + second}`
            item.playNum = item.playTime >= 100000? parseInt(item.playTime/10000)+'万' : item.playTime
        })
    }
     // 查看视频
    onViode = (vid) => {
        this.props.history.push({
            pathname: '/VideoComment',
            state: { vid: vid }
        })
    }
    render() {
        const { data } = this.props;
        return (
            <div className='searchVideoList'>
                <ul className='video-ul'>
                    {
                        data.map((item, index) =>
                            <li key={index} className='video-li da' onClick={this.onViode.bind(this, item.vid)}>
                                <Link to='#' className='da'>
                                    <div className='coverUrl'>
                                        <img src={item.coverUrl} />
                                        <p className='playNum'>
                                            <img className='icon' src={Iconpath.icon_video} />
                                            <span>{item.playNum}</span>
                                        </p>
                                    </div>
                                    <div className='videoInfo'>
                                        <h3 className='title'>{item.title}</h3>
                                        <p>
                                            <span className='durationms'>{item.time}</span>
                                            <span className='userName'>{item.creator[0].userName}</span>    
                                        </p>
                                    </div>
                                </Link>
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