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
            <div className='djHotPopular'>
                <ul className='djHotPopular-ul'>
                    {
                        data.map((item, index) =>
                            <li className='djHotPopular-li da' key={index}>
                                <span className='index' style={index < 3? {color: '#FF392D'}:{}}>{index + 1}</span>
                                <p className='picBox'>
                                    <img className='pic' src={item.picUrl}/>
                                    {item.dj.vipType > 0 && <img className='icon-vip' src={Iconpath.vip_fill}/>}
                                </p>
                                <span className='nickname to-line'>{item.name}</span>
                                <img className='icon-hot' src={Iconpath.hot}/>
                                <span className='subCount'>{item.subCount}</span>
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