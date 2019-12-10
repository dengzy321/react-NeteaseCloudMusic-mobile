import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'

class DjHot extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div className='djHot'>
                <ul className='djHot-ul'>
                    {
                        data.map((item, index) =>
                            <li className='djHot-li da' key={index}>
                                {item.rank && <span className='index' style={index<3? {color: '#FF392D'}:{color: '#999'}}>{index + 1}</span>}
                                <img className='pic' src={item.picUrl}/>
                                <div className='info ddb'>
                                    <h3 className='name to-line'>{item.name}</h3>
                                    <h5 className='nickname to-line'>{item.dj.nickname}</h5>
                                    <p className='da'>
                                        <img className='icon' src={Iconpath.hot}/>
                                        <span className='subCount'>{item.subCount}</span>
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
)(DjHot)