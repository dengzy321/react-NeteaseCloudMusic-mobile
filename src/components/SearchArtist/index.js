import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'

class SearchArtist extends React.Component {
    render() {
        const { data } = this.props  
        return(
            <div className='searchArtist'>
                <ul className='artist-ul'>
                {
                    data.map((item, index) =>
                        <li key={index} className='artist-li da'>
                            <Link to='#' className='da flex'>
                                <img className='avatar' src={item.img1v1Url} />
                                <p className='name'>{item.name}</p>
                                <p className='joinStatus'>
                                    <img className='icon' src={Iconpath.user_fill} />
                                    <span>已入驻</span>
                                </p>
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
)(SearchArtist)