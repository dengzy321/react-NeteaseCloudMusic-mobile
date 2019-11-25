import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';

let timer = null
class AudioController extends React.Component {
    componentDidMount() {
        // console.log('AudioController===',this)
        if(this.props.isPlayMusic) this.musicCountdown()
    }
    componentWillReceiveProps(nextProps){
        clearInterval(timer)
        if(nextProps.isPlayMusic){
            this.musicCountdown()
            this.myAudio.play()
        }else{
            clearInterval(timer)
            this.myAudio.pause()
        }
    }
    musicCountdown = () =>{
        timer = setInterval(() =>{
            this.props.setPlayTime(this.props.surplusDuration - 1000)
            if(this.props.surplusDuration < 0) clearInterval(timer)
        }, 1000)
    }
    render(){
        const { curSongUrl } = this.props
        return(
            <div className='audioController'>
               <audio controls muted className='myAudio' ref={(el) => this.myAudio = el}>
                    <source src={curSongUrl} type="audio/ogg" />
                    <source src={curSongUrl} type="audio/mpeg" />
                    <source src={curSongUrl} type="audio/mp3" />
                </audio>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(AudioController)