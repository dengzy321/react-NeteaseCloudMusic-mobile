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
import DjProgram from '@/components/DjProgram'


class DjProgramHours extends React.Component {
    state = {
        updateTime: 0, // 更新时间
        programHours: []
    }
    componentDidMount() {
        this.initDjProgramHours()
    }
    // 获取节目数据
    initDjProgramHours = () =>{
        http.getDjProgramHours({
            limit: 30
        }).then(res =>{
            let d = new Date(res.updateTime)
            let mon = d.getMonth() >= 9 ?  d.getMonth() + 1 : '0' + d.getMonth()
            let day = d.getDate() >=10? d.getDate() : '0' + d.getDate()

            this.setState({
                programHours: res.toplist,
                updateTime: mon + '月' + day + '日'
            })
        })
    }
    render() {
        let { programHours, updateTime } = this.state
        if(programHours.length == 0) return <Loading/>
        return (
            <div className='djProgramHours'>
                <div className='header'>
                    <span>更新时间：{updateTime}</span>
                </div>
                <DjProgram data={programHours}/>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjProgramHours)