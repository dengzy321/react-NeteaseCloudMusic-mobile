import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'
import { http } from '../../api/http'
import * as actions from '../../store/actions';
import { Tabs } from 'antd-mobile';
import Iconpath from '../../utils/iconpath'
import WaterfallList from '../../components/WaterfallList'
import Dynamic from '../../components/Dynamic'

class Square extends React.Component {
    state = {
        waterVideoArr: [],
        curIndex: 0
    }
    componentWillMount(){
        this.initWaterVideo(3100)
    }
    initWaterVideo(id){
        http.getVideoTabs().then(res =>{
            http.getVideoGroup({ id: id }).then(res2 =>{
                if(res2.code == 200) this.setState({ waterVideoArr: res2.datas })
            })
        })
    }
    // 广场组件
    MySquare(props){
        const { waterVideoArr } = this.state;  
        return(
            <div className='mySquare'>
                <div className='ms-header'>
                    <p className='da'>
                        <span className='name'>云村热评墙</span>
                        <img className='arrow_right' src={Iconpath.arrow_right_$fff} />
                    </p>
                    <p className='tip'>笑咪咪，今日最搓心评论，你看过几条？</p>
                </div>
                <WaterfallList list={waterVideoArr}/>
            </div>
        )
    }
    onChange = ({title}) =>{
        if(title == '动态') this.initWaterVideo(4104)
        this.setState({ curIndex: title == '广场'? 0 : 1 })
    }
    render() {
        const tabs = [
            { title: '广场' },
            { title: '动态' }
        ]
        const { curIndex, waterVideoArr } = this.state
        return (
            <div className='square layout'>
                <Tabs
                    tabs={tabs}
                    tabBarActiveTextColor='#E82202'
                    tabBarInactiveTextColor='#333'
                    onChange={this.onChange}
                    >
                        { curIndex == 0 ? this.MySquare(this.props) : <Dynamic list={waterVideoArr}/> }
                </Tabs>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Square)