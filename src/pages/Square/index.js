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
        http.getDynamicInfo({ pagesize: 30 }).then(res =>{
            res.event.forEach(item => {
                item.json = JSON.parse(item.json)
            })
            console.log(res.event)
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
    onChange = (curIndex) => {
        if (curIndex == 1) this.initWaterVideo(4104)
        this.setState({ curIndex })
    }
    render() {
        const { curIndex, waterVideoArr } = this.state
        return (
            <div className='square layout'>
                <div className='nav dcc'>
                    <span className={curIndex == 0 ? 'navActive' : ''} onClick={this.onChange.bind(this,0)}>广场</span>
                    <span className={curIndex == 1? 'navActive':''} onClick={this.onChange.bind(this,1)}>动态</span>
                </div>
                { curIndex == 0 ? this.MySquare(waterVideoArr) : <Dynamic list={waterVideoArr}/> }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Square)