import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Carousel } from 'antd-mobile';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'
import DjHotPopular from '@/components/DjHotPopular'


class DjPopularHours extends React.Component {
    state = {
        updateTime: 0, // 更新时间
        popularHours: []
    }
    componentDidMount() {
        if(this.props.location.state.index == 0) this.initDjPopularHours()
        else this.initDjNewcomer()
    }
    // 获取24小时主播榜
    initDjPopularHours = () =>{
        http.getDjPopularHours({
            limit: 30
        }).then(res =>{
            let d = new Date(res.updateTime)
            let mon = d.getMonth() >= 9 ?  d.getMonth() + 1 : '0' + d.getMonth()
            let day = d.getDate() >=10? d.getDate() : '0' + d.getDate()

            this.setState({
                popularHours: res.toplist,
                updateTime: mon + '月' + day + '日'
            })
        })
    }
    // 获取主播新人榜
    initDjNewcomer = () =>{
        http.getDjNewcomer({
            limit: 30
        }).then(res =>{
            let d = new Date(res.updateTime)
            let mon = d.getMonth() >= 9 ?  d.getMonth() + 1 : '0' + d.getMonth()
            let day = d.getDate() >=10? d.getDate() : '0' + d.getDate()

            this.setState({
                popularHours: res.toplist,
                updateTime: mon + '月' + day + '日'
            })
        })
    }
    render() {
        let { popularHours, updateTime } = this.state
        if(popularHours.length == 0) return <Loading/>
        return (
            <div className='djPopularHours'>
                <div className='header'>
                    <span>更新时间：{updateTime}</span>
                </div>
                <DjHotPopular data={popularHours}/>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjPopularHours)