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

class Square extends React.Component {
    state = {
        waterVideoArr: []
    }
    componentWillMount(){
        this.initWaterVideo()
    }
    initWaterVideo(){
        http.getVideoTabs().then(res =>{
            http.getVideoGroup({ id: 3100 }).then(res2 =>{
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
    render() {
        
        const tabs = [
            { title: '广场' },
            { title: '动态' }
        ]
        return (
            <div className='square layout'>
                <Tabs
                    tabs={tabs}
                    tabBarActiveTextColor='#E82202'
                    tabBarInactiveTextColor='#333'
                    >
                    {this.MySquare(this.props)}
                </Tabs>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Square)