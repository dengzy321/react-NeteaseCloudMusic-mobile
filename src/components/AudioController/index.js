import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';

class AudioController extends React.Component {
    render(){
        const { curSongUrl } = this.props
        return(
            <div className='myAudio'>
               <audio controls id='rootAudio' ref={el => window.rootAudio = el}>
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