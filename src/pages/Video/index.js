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
        listData: []
    }
    componentWillMount() {
        this.initNavData()
    }
    initNavData() {
        http.getVideoTabs().then(res => {
            res.data.forEach(item => {
                item.title = item.name
            })
            this.setState({ tabs: res.data })
            this.initListData(res.data[0].id)
        }) 
    }
    initListData(id) {
        http.getVideoGroup({ id }).then(res => {
            this.setState({
                listData: res.datas
            })
        })
    }
    // 切换改变
    onChange = (obj) => {
        this.initListData(obj.id)
    }
    render() {
        const { tabs, listData } = this.state
        return (
            <div className='myVideo'>
                <Tabs tabs={tabs} onChange={this.onChange}>
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