import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { http } from '../../api/http'
import * as actions from '../../store/actions';
import { Tabs } from 'antd-mobile';
import Iconpath from '../../utils/iconpath'

class Square extends React.Component {
    state = {

    }
    componentDidMount(){
        const el = document.getElementsByClassName('waterfall-li')
        console.log(el)
    }
    render(){
        const { list } = this.props
        return(
            <div className='waterfallList'>
                <ul className='waterfall-ul da'>
                    {
                        list.map(({data}, index) =>{
                            return(
                                <li key={index} className='waterfall-li'>
                                    <Link to='/'>
                                        <div className='pic-box'>
                                            <img className='coverUrl' src={data.coverUrl} />
                                            <img className='icon' src={Iconpath.icon_video} />
                                        </div>
                                        <h3 className='title to-2line'>{data.title}</h3>
                                        <p className='da footer'>
                                            <img className='avatarUrl' src={data.creator.avatarUrl} />
                                            <span className='name to-line'>{data.creator.nickname}</span>
                                            <span>2440赞</span>
                                            <img className='more-icon' src={Iconpath.more_gray} />
                                        </p>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Square)