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
            playState: !window.rootAudio.paused
        })
    }
    // 切换播放
    changePlay = (e) => {
        e.stopPropagation();
        if(window.rootAudio.paused){
            window.rootAudio.play()
            this.setState({ playState: true })
        }
        else {
            window.rootAudio.pause()
            this.setState({ playState: false })
        }
    }
    render() {
        const { playState, songId } = this.state
        const { curPlaySong } = this.props
        return(
            <div className='playTab da' onClick={() => this.props.history.push({pathname: '/playPlatform', query:{id:songId}})}>
                <img className='coverImg active' style={{ animationPlayState: playState ? 'running' : 'paused' }} src={curPlaySong.artists[0].img1v1Url} />
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