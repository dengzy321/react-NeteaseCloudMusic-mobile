import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import { Grid } from 'antd-mobile';
import Iconpath from '@/utils/iconpath'

class SongsGrid extends React.Component {
    render(){
        const { data=[], columnNum=3, coverImgUrl } = this.props
        return(
            <Grid
                data={data}
                columnNum={columnNum}
                hasLine={false}
                square={false}
                renderItem={item => (
                    <div to='/' className='songsGrid'>
                        <div className='pic-box'>
                            <img className='pic' src={item[coverImgUrl]} alt="" />
                            {
                                item.playCount && 
                                <p className='videoCount da'>
                                    <img className='icon_video' src={Iconpath.icon_video} alt="" />
                                    <span>{item.playCount}</span>
                                </p>
                            }
                        </div>
                        <p className='to-2line title'>{item.name}</p>
                    </div>
                )}
            />
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(SongsGrid)