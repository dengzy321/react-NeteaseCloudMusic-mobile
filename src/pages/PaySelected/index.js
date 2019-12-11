import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'

class PaySelected extends React.Component {
    state = {
        payList: [],
        page: 0, //分页
    }
    componentDidMount() {
        document.title = '付费精选'
        this.initDjPaygift()
    }
    // 获取 付费精选
    initDjPaygift = () =>{
        let { page, payList } = this.state
        http.getDjPaygift({
            limit: 30,
            offset: page
        }).then(res =>{
            if(res.data.list.length > 0){
                this.setState({
                    payList: [...payList, ...res.data.list],
                    page: page + 1
                })
            }
        })
    }
    // 滚动加载更多
    onScroll = (el) =>{
        if(window.global.onReachBottom(el)){
            this.initDjPaygift()
        }
    }
    render() {
        const { payList } = this.state
        if (payList.length == 0) return <div className='loading'><Loading/></div>
        return (
            <div className='paySelected' onScroll={this.onScroll}>
                <ul className='paySelected-ul'>
                    {
                       payList.map((item, index) =>
                        <li key={index} className='paySelected-li da'>
                            <img className='pic' src={item.picUrl}/>
                            <div className='info'>
                                <h3 className='name'>{item.name}</h3>
                                <p className='rcmdText'>{item.rcmdText}</p>
                                <p className='new'>最新上线</p>
                                <p className='money'>¥ {item.originalPrice / 100}</p>
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
)(PaySelected)