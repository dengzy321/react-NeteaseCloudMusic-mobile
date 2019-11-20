import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'

class SearchUserList extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div className='searchUserList'>
                <ul className='user-ul'>
                    {
                        data.map((item, index) =>
                            <li key={index} className='user-li'>
                                <Link to='#' className='da'>
                                    <img className='avatar' src={item.avatarUrl} />
                                    <div className='info'>
                                        <p className='name to-line'>{item.nickname}</p>
                                        <p className='signature to-line'>{item.signature}</p>
                                    </div>
                                    <button className='btn'>+ 关注</button>
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
)(SearchUserList)