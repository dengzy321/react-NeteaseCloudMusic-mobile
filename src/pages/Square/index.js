import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import Iconpath from '@/utils/iconpath'
import WaterfallList from '@/components/WaterfallList'
import Dynamic from '@/components/Dynamic'

// 广场组件
function MySquare(data,props){
    return(
        <div className='mySquare'>
            <div className='ms-header'>
                <p className='da'>
                    <span className='name'>云村热评墙</span>
                    <img className='arrow_right' src={Iconpath.arrow_right_$fff} />
                </p>
                <p className='tip'>笑咪咪，今日最搓心评论，你看过几条？</p>
            </div>
            <WaterfallList list={data} {...props}/>
        </div>
    )
}

class Square extends React.Component {
    state = {
        waterVideoArr: [],
        waterFallPage: 0,
        dynamicArr: [],
        curIndex: 0
    }
    componentWillMount(){
        this.initWaterVideo()
    }
    // 获取瀑布流数据（热门话题）
    initWaterVideo() {
        let { waterVideoArr, waterFallPage } = this.state
        http.getFirstMv({
            limit: 30,
            offset: 0
        }).then(res => {
            if (res.data.lenght != 0) {
                waterFallPage ++
            }
            this.setState({
                waterVideoArr: [...waterVideoArr, ...res.data],
                waterFallPage
            })
        })
    }
    // 获取动态信息数据
    initDynamicInfo() {
        const { dynamicArr } = this.state
        http.getDynamicInfo({ pagesize: 20 }).then(res => {
            res.event.forEach(item => {
                item.json = JSON.parse(item.json)
                if(item.type == 22) item.json.event.json = JSON.parse(item.json.event.json)
            })
            this.setState({
                dynamicArr: [...dynamicArr, ...res.event]
            })
        })
    }
    // 改变tab
    onChange = (curIndex) => {
        if (curIndex == 0) this.initWaterVideo()
        else this.initDynamicInfo()
        this.setState({ curIndex })
    }
    // 滚动加载更多
    onScroll = (e)  =>{
        const { curIndex } = this.state
        if (window.global.onReachBottom(e)) {
            if (curIndex == 0) this.initWaterVideo()
            else this.initDynamicInfo()
        }
    }
    render() {
        const { curIndex, waterVideoArr, dynamicArr } = this.state
        return (
            <div className='square' onScroll={this.onScroll}>
                <div className='nav dcc'>
                    <span className={curIndex == 0 ? 'navActive' : ''} onClick={this.onChange.bind(this,0)}>MV</span>
                    <span className={curIndex == 1? 'navActive':''} onClick={this.onChange.bind(this,1)}>动态</span>
                </div>
                {curIndex == 0 ? MySquare(waterVideoArr, this.props) : <Dynamic {...this.props} list={dynamicArr}/> }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Square)