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
                        data.list.map((item, index) =>
                            <li className='djProgram-li da' key={index}>
                                <img className='pic' src={item.picUrl}/>
                                <div className='info'>
                                    <h5 className='name'>{item.name}</h5>
                                    <p className='creator da'>
                                        <img className='avatar' src={item.dj.avatarUrl}/>
                                        <b className='nickname'>{item.dj.nickname}</b>
                                        <img className='icon' src={Iconpath.hot}/>
                                        <b className='subCount'>{item.subCount}</b>
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
)(DjProgram)