import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'

class SearchRadio extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div className='searchRadio'>
                <ul className='radio-ul'>
                    {
                        data.map((item, index) =>
                            <li key={index} className='radio-li'>
                                <Link to='#' className='da'>
                                    <img className='avatar' src={item.picUrl} />
                                    <div className='info'>
                                        <p className='name to-line'>{item.name}</p>
                                        <p className='nickname'>{item.dj.nickname}</p>
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
)(SearchRadio)