import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import { Tabs } from 'antd-mobile';
import Loading from '@/components/Loading'
import DjProgram from '@/components/DjProgram'
import DjHotPopular from '@/components/DjHotPopular'
import DjHot from '@/components/DjHot'

const tabs = [
    { title: '主播榜' },
    { title: '节目榜' },
    { title: '电台榜' }
];

// 节目榜模块
function ProgramModule(props) {
    if (props.programHours.length == 0 || props.programRanking.length == 0) return <div className='loading dcc'><Loading /></div>
    return (
        <div className=''>
            <div className='hoursRankimg'>
                <div className='header da'>
                    <span className='title'>24小时榜</span>
                    <img className='arrowRigth' src={Iconpath.arrow_rigth} />
                </div>
                <ul className='hoursRankimg-ul dbc'>
                    {
                        props.programHours.map((item, index) =>
                            <li className='hoursRankimg-li' key={index}>
                                <p className='picBox'>
                                    <b className='index'>{index + 1}</b>
                                    <img className='pic' src={item.program.coverUrl} />
                                    <img className='icon' src={Iconpath.play2} />
                                </p>
                                <h5 className='name to-2line'>{item.program.name}</h5>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='programList'>
                <div className='header da'>
                    <span className='title'>最热节目</span>
                </div>
                <DjProgram data={props.programRanking} />
            </div>
        </div>
    )
}

// 主播榜
function PopularModule(props) {
    if (props.popularHours.length == 0 || props.hotPopular.length == 0) return <div className='loading dcc'><Loading /></div>
    return (
        <div className=''>
            <div className='hoursRankimg'>
                {
                    props.popularHours.map((item, index) =>
                        <div key={index}>
                            <div className='header da'>
                                <span className='title'>{item.title}</span>
                                <img className='arrowRigth' src={Iconpath.arrow_rigth} />
                            </div>
                            <ul className='hoursRankimg-ul dbc'>
                                {
                                    item.sub.map((sItem, sIndex) =>
                                        <li className='hoursRankimg-li' key={sIndex}>
                                            <p className='picBox'>
                                                <b className='index'>{sIndex + 1}</b>
                                                <img className='popularHours-pic' src={sItem.picUrl} />
                                                {sItem.dj.vipType > 0 && <img className='icon-vip' src={Iconpath.vip_fill} />}
                                            </p>
                                            <h5 className='name to-2line'>{sItem.name}</h5>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
            <div className='programList'>
                <div className='header da'>
                    <span className='title'>最热主播</span>
                </div>
                <DjHotPopular data={props.hotPopular} />
            </div>
        </div>
    )
}

// 电台榜
function DjModule(props) {
    if (props.payRanking.length == 0 || props.hotDjRanking.length == 0) return <div className='loading dcc'><Loading /></div>
    return (
        <div className=''>
            <div className='hoursRankimg'>
                <div className='header da'>
                    <span className='title'>付费精品榜</span>
                    <img className='arrowRigth' src={Iconpath.arrow_rigth} />
                </div>
                <ul className='hoursRankimg-ul dbc'>
                    {
                        props.payRanking.map((item, index) =>
                            <li className='hoursRankimg-li' key={index}>
                                <p className='picBox'>
                                    <b className='index'>{index + 1}</b>
                                    <img className='pic' src={item.picUrl} />
                                    <img className='icon' src={Iconpath.play2} />
                                </p>
                                <h5 className='name to-2line'>{item.name}</h5>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='programList'>
                <div className='header da'>
                    <span className='title'>最热电台</span>
                </div>
                <DjHot data={props.hotDjRanking} />
            </div>
        </div>
    )
}

class DjRanking extends React.Component {
    state = {
        curTab: 1,
        programHours: [], // 24小时节目榜
        programRanking: [], // 最热节目
        hotPopular: [], //最热主播
        popularHours: [], // 24小时主播  && 新人榜
        hotDjRanking: [], //热门电台榜
        payRanking: [], //付费榜
    }
    componentDidMount() {
        this.initDjProgramHours()
        this.initDjProgramRanking()
    }
    // 24小时节目榜
    initDjProgramHours = () => {
        http.getDjProgramHours().then(res => {
            this.setState({
                programHours: res.toplist.slice(0, 3)
            })
        })
    }
    // 节目榜
    initDjProgramRanking = () => {
        http.getDjProgramRanking().then(res => {
            console.log(res)
            this.setState({
                programRanking: res.toplist
            })
        })
    }
    // 24小时主播榜
    initDjPopularHours = () => {
        let { popularHours } = this.state
        http.getDjPopularHours().then(res => {
            popularHours[0] = {
                title: '24小时榜',
                sub: []
            }
            popularHours[0].sub = res.toplist.slice(0, 3)
            this.setState({ popularHours })
        })
    }
    // 主播新人榜
    initDjNewcomer = () => {
        let { popularHours } = this.state
        http.getDjNewcomer().then(res => {
            popularHours[1] = {
                title: '新人榜',
                sub: []
            }
            popularHours[1].sub = res.toplist.slice(0, 3)
            this.setState({ popularHours })
        })
    }
    // 最热主播榜
    initDjHotpopular = () => {
        http.getDjHotpopular().then(res => {
            this.setState({
                hotPopular: res.toplist
            })
        })
    }
    // 付费精品
    initDjHotPay = () => {
        http.getDjHotPay().then(res => {
            this.setState({
                payRanking: res.toplist.slice(0,3)
            })
        })
    }
    // 热门电台榜
    initDjHotRanking = () => {
        http.getDjHotRanking().then(res => {
            this.setState({
                hotDjRanking: res.toplist
            })
        })
    }
    // 切换tab
    onChange = (item, index) => {
        if(index == 0){
            this.initDjProgramHours()
            this.initDjProgramRanking()
        }
        else if(index == 1){
            this.initDjPopularHours()
            this.initDjNewcomer()
            this.initDjHotpopular()
        }
        else if(index == 2){
            this.initDjHotRanking()
            this.initDjHotPay()
        }
        this.setState({
            curTab: index
        })
    }
    render() {
        const { curTab, programHours, programRanking, hotPopular, popularHours, payRanking, hotDjRanking } = this.state
        return (
            <div className='djRanking'>
                <Tabs tabs={tabs} page={curTab} onChange={this.onChange}>
                    {
                        curTab == 0 ?
                            <PopularModule popularHours={popularHours} hotPopular={hotPopular} {...this.props} /> :
                            curTab == 1 ?
                                <ProgramModule programHours={programHours} programRanking={programRanking} {...this.props} /> :
                                <DjModule payRanking={payRanking} hotDjRanking={hotDjRanking} {...this.props} />
                    }
                </Tabs>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjRanking)