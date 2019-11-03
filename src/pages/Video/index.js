import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import './index.css';
import { http } from '../../api/http'
import VideoList from '../../components/VideoList'
import Tabs from '../../components/Tabs'
import { Toast } from 'antd-mobile';

class Video extends React.Component {
    state = {
        tabs: []
    }
    componentWillMount() {
        this.initNavData()
    }
    initNavData() {
        http.getVideoTabs().then(res => {
            res.data.forEach(item => {
                item.Component = VideoList
                item.title = item.name
                item.videoData = []
            })
            this.setState({ tabs: res.data })
            this.initListData(0, res.data[0].id)
        }) 
    }
    initListData(index, id) {
        const { tabs } = this.state
        Toast.loading()
        http.getVideoGroup({ id }).then(res => {
            if (res.code == 200) {
                Toast.hide()
                tabs[index].videoData = res.datas
                this.setState({ tabs })
            }
        })
    }
    onClick = (index) => {
        const { tabs } = this.state
        tabs.videoData = this.initListData(index, tabs[index].id)
        this.setState({ tabs })
    }
    render() {
        const { tabs } = this.state
        return (
            <div className='video layout'>
                {tabs.length > 0 && <Tabs data={tabs} onClick={this.onClick} onChange={this.onClick} />}
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Video)