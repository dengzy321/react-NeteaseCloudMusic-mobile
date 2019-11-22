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
        songUrl: '',
        songId: 144364
    }
    componentDidMount(){
        this.initSongUrl(144364)
    }
    initSongUrl = (id) =>{
        http.getSongUrl({ id }).then(res =>{
            this.setState({ songUrl: res.data[0].url })
        })
    }
    // 切换播放
    changePlay = (event) =>{
        event.stopPropagation()
        if(this.state.playState) this.myAudio.pause()
        else this.myAudio.play()
        this.setState(state =>({
            playState: !state.playState
        }))
    }
    render() {
        const { playState, songUrl, show, songId } = this.state
        const { data } = this.props  
        return(
            <div className='playTab da' onClick={() => this.props.history.push({pathname: '/playPlatform', query:{id:songId}})}>
                <img className='coverImg' src={require('@/static/5.jpg')} />
                <div className='songsInfo'>
                    <p className='songsName'>病态</p>
                    <p className='tip'>横滑可以切换上下首</p>
                </div>
                <img className='playBtn' onClick={this.changePlay} src={playState? Iconpath.play_start_$666:Iconpath.play_stop_$666} />
                <img className='playMenu' src={Iconpath.play_menu_$666} />
                <audio controls className='myAudio' ref={(el) => this.myAudio = el}>
                    <source src={songUrl} type="audio/ogg"/>
                    <source src={songUrl} type="audio/mpeg"/>
                    <source src={songUrl} type="audio/mp3"/>
                </audio>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PlayTab)