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

class Square extends React.Component {
    state = {
        waterVideoArr: [],
        dynamicArr: [],
        curIndex: 0
    }
    componentWillMount(){
        this.initWaterVideo(3100)
        this.initDynamicInfo()
    }
    // 获取瀑布流数据
    initWaterVideo(id){
        // http.getVideoTabs().then(res =>{
        //     http.getVideoGroup({ id: id }).then(res2 =>{
        //         this.setState({ waterVideoArr: res2.datas })
        //     })
        // })
        http.getHotTopic({ limit: 30 }).then(res =>{
            // this.setState({ waterVideoArr: res2.datas })
        })
    }
    // 获取动态信息数据
    initDynamicInfo() {
        const { dynamicArr } = this.state
        http.getDynamicInfo({ pagesize: 20 }).then(res =>{
            res.event.forEach(item => {
                item.json = JSON.parse(item.json)
                if(item.type == 22) item.json.event.json = JSON.parse(item.json.event.json)
            })
            this.setState({
                dynamicArr: [...dynamicArr, ...res.event]
            })
        })
    }
    // 广场组件
    MySquare(data){
        return(
            <div className='mySquare'>
                <div className='ms-header'>
                    <p className='da'>
                        <span className='name'>云村热评墙</span>
                        <img className='arrow_right' src={Iconpath.arrow_right_$fff} />
                    </p>
                    <p className='tip'>笑咪咪，今日最搓心评论，你看过几条？</p>
                </div>
                <WaterfallList list={data}/>
            </div>
        )
    }
    // 改变tab
    onChange = (curIndex) => {
        if (curIndex == 0) this.initWaterVideo(4104)
        else this.initDynamicInfo()
        this.setState({ curIndex })
    }
    // 滚动加载更多
    onScroll = (e)  =>{
        const { curIndex } = this.state
        if(window.global.onReachBottom(e)){
            if (curIndex == 0) this.initWaterVideo(4104)
            else this.initDynamicInfo()
        }
    }
    render() {
        const { curIndex, waterVideoArr, dynamicArr } = this.state
        return (
            <div className='square' onScroll={this.onScroll}>
                <div className='nav dcc'>
                    <span className={curIndex == 0 ? 'navActive' : ''} onClick={this.onChange.bind(this,0)}>广场</span>
                    <span className={curIndex == 1? 'navActive':''} onClick={this.onChange.bind(this,1)}>动态</span>
                </div>
                {curIndex == 0 ? this.MySquare(waterVideoArr) : <Dynamic {...this.props} list={dynamicArr}/> }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Square)