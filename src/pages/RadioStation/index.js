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
    { name: '电台分类', icon: Iconpath.dj_sort, url: 'djSort' },
    { name: '电台排行', icon: Iconpath.dj_rank, url: 'djRanking' },
    { name: '付费精品', icon: Iconpath.dj_vip, url: '' },
    { name: '主播学院', icon: Iconpath.dj_college, url: 'https://h5.iplay.163.com/st/college/' }
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
    { id: 13, name: '外语世界', type: 2 },
    { id: 12, name: '旅途|城市', type: 2 },
    { id: 5, name: '脱口秀', type: 2 },
    { id: 4001, name: '校园|教育', type: 2 },
]

class RadioStation extends React.Component {
    state = {
        bannerArr: [],
        batchHttpData: [], //批量请求数据
        sortList: []
    }
    componentDidMount() {
        this.initBanner()
        this.initDjRecommend()
        this.initDjPaygift()
        this.batchHttp()
        this.initDjCatelist()
    }
    // 获取banner
    initBanner = () => {
        http.getDjBanner().then(res => {
            this.setState({ bannerArr: res.data })
        })
    }
    // 获取推荐电台
    initDjRecommend = () => {
        let { batchHttpData } = this.state
        http.getDjRecommend().then(res => {
            batchHttpData[0] = {
                title: '电台推荐',
                type: 2,
                list: res.djRadios.slice(0, 3)
            }
            this.setState({ batchHttpData })
        })
    }
    // 获取付费精选
    initDjPaygift = () => {
        let { batchHttpData } = this.state
        http.getDjPaygift().then(res => {
            batchHttpData[1] = {
                title: '精品推荐',
                pay: true,
                type: 2,
                list: res.data.list.slice(0, 3)
            }
            this.setState({ batchHttpData })
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
                    batchHttpData[index + 2] = {
                        title: item.name,
                        type: item.type,
                        list: res.djRadios.slice(0, 4)
                    }
                    this.setState({ batchHttpData })
                })
            } else {
                http.getDjRadioHot({
                    cateId: item.id
                }).then(res => {
                    batchHttpData[index + 2] = {
                        title: item.name,
                        type: item.type,
                        list: res.djRadios.slice(0,3)
                    }
                    this.setState({ batchHttpData })
                })
            }
        })
    }
    // 获取分类
    initDjCatelist = () => {
        http.getDjCatelist().then(res => {
            res.categories.forEach((item, index) => {
                item.icon = Iconpath[`dj_${index + 1}`]
            })
            let obj1 = {
                title: '热门分类',
                sub: res.categories.slice(0, 7)
            }
            let obj2 = {
                title: '更多分类',
                sub: res.categories.slice(7, 100)
            }
            this.setState({
                sortList: [obj1, obj2]
            })
        })
    }
    // 跳转路由
    toLocation = (url) => {
        if (url.indexOf('http') != -1) {
            window.location.href = url
        } else {
            this.props.history.push({
                pathname: `/${url}`
            })
        }
    }
    render() {
        const { bannerArr, batchHttpData, sortList } = this.state
        if (batchHttpData.length < 15 || sortList.length == 0 || bannerArr.length == 0) return <Loading />
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
                                <li className='sortTab-li dd-vh' key={index} onClick={this.toLocation.bind(this,item.url)}>
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
                                        <button className='btn'>全部播放</button>
                                    </p>
                                    <DjProgram data={item.list} {...this.props}/>
                                </div> :
                                <div className='hotDjList' style={item.pay ? { background: 'linear-gradient(#F8F1DE,#FFF)' } : {}} key={index}>
                                    <p className='header dbc'>
                                        <span className='title'>{item.title} ></span>
                                        <button className='btn'>全部播放</button>
                                    </p>
                                    <ul className='hotDjList-ul df'>
                                        {
                                            item.list.map((lItem, lIndex) =>
                                                <li className='hotDjList-li' key={lIndex} onClick={() => this.props.history.push({pathname: '/djDetail', state: { id: lItem.id }})}>
                                                    <p className='picBox'>
                                                        <img className='pic' src={lItem.picUrl} />
                                                        {lItem.radioFeeType == 2 && <b className='tip'>付费精品</b>}
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
                <div className='djSort'>
                    {
                        sortList.map((item, index) =>
                            <div key={index} className='sort-item'>
                                <h3 className='title'>{item.title}</h3>
                                <ul className='sort-ul da'>
                                    {
                                        item.sub.map((sItem, sIndex) =>
                                            <li className='da sort-li' key={sIndex}>
                                                <img className='icon' src={sItem.icon} />
                                                <span className='name'>{sItem.name}</span>
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