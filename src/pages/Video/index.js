import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import VideoList from '@/components/VideoList'
import { Tabs, Toast } from 'antd-mobile';

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
            res.data = res.data.filter(item => {
                item.title = item.name
                if(item.name.length == 4) return item
            })
            this.setState({
                tabs: res.data
            }, () => this.initListData(res.data[0].id))
        }) 
    }
    // 获取列表数据
    initListData(id) {
        let { tabs, curIndex } = this.state
        http.getVideoGroup({ id }).then(res => {
            if (res.code == 200) {
                if (res.datas.length == 0) {
                    Toast.offline('暂无视频, 正在切换下一栏目', 1.5)
                    setTimeout(() => {
                        this.onChange(tabs[curIndex + 1], curIndex + 1)
                    }, 1500)
                } else {
                    this.setState({
                        listData: res.datas
                    })
                }
            } else {
                Toast.offline('登录观看更多内容...', 1.5)
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 1500)
            }
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