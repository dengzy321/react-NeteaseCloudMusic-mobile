import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'

class DjProgram extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div className='djProgram'>
                <ul className='djProgram-ul'>
                    {
                        data.map((item, index) =>
                            <li className='djProgram-li da' key={index}>
                                {item.rank && <span className='index' style={index<3? {color: '#FF392D'}:{color: '#999'}}>{index + 1}</span>}
                                <img className='pic' src={item.rank? item.program.coverUrl:item.picUrl}/>
                                <div className='info'>
                                    <h5 className='name to-line'>{item.rank? item.program.name:item.name}</h5>
                                    <p className='creator da'>
                                        <img className='avatar' src={item.rank? item.program.dj.avatarUrl:item.dj.avatarUrl}/>
                                        <b className='nickname'>{item.rank? item.program.dj.nickname:item.dj.nickname}</b>
                                        <img className='icon' src={Iconpath.hot}/>
                                        <b className='subCount'>{item.rank? item.program.subscribedCount:item.subCount}</b>
                                    </p>
                                </div>
                                <img className='icon-play' src={Iconpath.play}/>
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
)(DjProgram)