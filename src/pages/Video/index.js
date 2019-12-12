import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import VideoList from '@/components/VideoList'
import { Tabs } from 'antd-mobile';

class Video extends React.Component {
    state = {
        tabs: [],
        curIndex: 0,
        listData: []
    }
    componentWillMount() {
        this.initNavData()
    }
    // 获取 tab
    initNavData() {
        http.getVideoTabs().then(res => {
            res.data.forEach(item => {
                item.title = item.name
            })
            this.setState({
                tabs: res.data.slice(1,10)
            }, () => this.initListData(this.state.tabs[0].id))
        }) 
    }
    // 获取列表数据
    initListData(id) {
        http.getVideoGroup({ id }).then(res => {
            this.setState({
                // listData: res.datas
            })
        })
    }
    // 切换改变
    onChange = (item, index) => {
        this.setState({
            curIndex: index,
            listData: []
        })
        this.initListData(item.id)
    }
    render() {
        const { tabs, curIndex, listData } = this.state
        return (
            <div className='myVideo'>
                <Tabs tabs={tabs} page={curIndex} swipeable={false} onChange={this.onChange}>
                    <VideoList data={listData} {...this.props}/>
                </Tabs>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Video)