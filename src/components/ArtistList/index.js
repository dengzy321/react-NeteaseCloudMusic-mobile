import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'


class ArtistList extends React.Component {
    render() {
        const { data } = this.props  
        return(
            <div className='artistList'>
                <ul>
                {
                    data.map((item, index) =>
                        <li key={index} className='artist-li da'>
                            <img className='avatar' src={item.img1v1Url} />
                            <span className='da userInfo'>
                                <b className='name'>{item.name}</b>
                                <img className='icon' src={Iconpath.user_fill} />
                            </span>
                            <button className='btn da'>+ 关注</button>
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
)(ArtistList)