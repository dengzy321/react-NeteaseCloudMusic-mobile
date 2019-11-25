import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'

class PlayTab extends React.Component {
    state = {
        playState: false,
    }
    componentDidMount(){
        this.setState({
            playState: this.props.isPlayMusic
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            playState: nextProps.isPlayMusic
        })
    }
    // 切换播放
    changePlay = (event) =>{
        event.stopPropagation()
        this.props.playMusic()
        this.setState(state =>({
            playState: !state.playState
        }))
    }
    render() {
        const { playState, songUrl, songId } = this.state
        const { curPlaySong } = this.props
        return(
            <div className='playTab da' onClick={() => this.props.history.push({pathname: '/playPlatform', query:{id:songId}})}>
                <img className='coverImg' src={curPlaySong.artists[0].img1v1Url} />
                <div className='songsInfo'>
                    <p className='songsName to-line'>{curPlaySong.name}</p>
                    <p className='tip'>横滑可以切换上下首</p>
                </div>
                <img className='playBtn' onClick={this.changePlay} src={playState? Iconpath.play_start_$666:Iconpath.play_stop_$666} />
                <img className='playMenu' src={Iconpath.play_menu_$666} />
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PlayTab)