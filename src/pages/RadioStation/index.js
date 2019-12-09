import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Carousel } from 'antd-mobile';
import Loading from '@/components/Loading'
import DjProgram from '@/components/DjProgram'

const sortTab = [
    { name: '电台分类', icon: Iconpath.dj_sort },
    { name: '电台排行', icon: Iconpath.dj_rank },
    { name: '付费精品', icon: Iconpath.dj_vip },
    { name: '主播学院', icon: Iconpath.dj_college }
]

// type =>>> 1: 节目   2: 推荐电台
const batchApiId = [
    { id: 2001, name: '创作|翻唱', type: 1 },
    { id: 3, name: '情感调频', type: 2 },
    { id: 10002, name: '3D|电子', type: 1 },
    { id: 2, name: '音乐故事', type: 2 },
    { id: 3001, name: '二次元', type: 1 },
    { id: 10001, name: '有声书', type: 2 },
    { id: 453050, name: '知识技能', type: 1 },
    { id: 453051, name: '商业财经', type: 2 },
    { id: 11, name: '人文历史', type: 1 },
    { id: 13, name: '外语世界', type: 2 }
]

class RadioStation extends React.Component {
    state = {
        bannerArr: [],
        batchHttpData: [], //批量请求数据
    }
    componentDidMount() {
        this.initBanner()
        this.batchHttp()
    }
    // 获取banner
    initBanner = () => {
        http.getDjBanner().then(res => {
            this.setState({ bannerArr: res.data })
        })
    }
    // 批量请求
    batchHttp = () => {
        let { batchHttpData } = this.state
        batchApiId.forEach((item, index) => {
            if (item.type == 1) {
                http.getDjRecommendType({
                    type: item.id
                }).then(res => {
                    batchHttpData[index] = {
                        title: item.name,
                        type: item.type,
                        list: res.djRadios
                    }
                    this.setState({ batchHttpData })
                })
            } else {
                http.getDjRadioHot({
                    cateId: item.id
                }).then(res => {
                    batchHttpData[index] = {
                        title: item.name,
                        type: item.type,
                        list: res.djRadios.slice(0,3)
                    }
                    this.setState({ batchHttpData })
                })
            }
        })

        setTimeout(() => {
            console.log(this.state.batchHttpData)
        }, 3000)
    }
    render() {
        const { bannerArr, batchHttpData } = this.state
        if (batchHttpData.length == 0) return <Loading />
        return (
            <div className='radioStation'>
                <div className='banner'>
                    <Carousel autoplay infinite>
                        {
                            bannerArr.map((item, index) =>
                                <div className='banner-item' key={index} onClick={() => window.location.href = item.url}>
                                    <img className='pic' src={item.pic} />
                                    <span className='typeTitle'>{item.typeTitle}</span>
                                </div>
                            )
                        }
                    </Carousel>
                </div>
                <div className='sortTab'>
                    <ul className='dbc'>
                        {
                            sortTab.map((item, index) =>
                                <li className='sortTab-li dd-vh' key={index}>
                                    <img className='icon' src={item.icon} />
                                    <b className='name'>{item.name}</b>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className=''>
                    {
                        batchHttpData.map((item, index) =>
                            item.type == 1 ?
                                <div className=''>
                                    <p className='header dbc'>
                                        <span className='title'>{item.title} ></span>
                                        <button className='btn'>全部</button>
                                    </p>
                                    <DjProgram data={item}/>
                                </div> :
                                <div className='hotDjList' key={index}>
                                    <p className='header dbc'>
                                        <span className='title'>{item.title} ></span>
                                        <button className='btn'>全部</button>
                                    </p>
                                    <ul className='hotDjList-ul df'>
                                        {
                                            item.list.map((lItem, lIndex) =>
                                                <li className='hotDjList-li' key={lIndex}>
                                                    <p className='picBox'>
                                                        <img className='pic' src={lItem.picUrl} />
                                                        <b className='tip'>精品</b>
                                                    </p>
                                                    <h5 className='name'>{lItem.name}</h5>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(RadioStation)