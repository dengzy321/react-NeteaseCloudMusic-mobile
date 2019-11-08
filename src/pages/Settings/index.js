import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Toast, Switch } from 'antd-mobile';
import Modal from '@/components/Modal'

class Settings extends React.Component {
    state = {
        listArr: [
            {
                title: '网络',
                children: [
                    { title: '使用2G/3G/4G/网络播放', tip: '视频Mlog播放不受此设置影响', switchStatus: 1 },
                    { title: '使用2G/3G/4G/网络下载', switchStatus: 1 },
                    { title: '动态页中Wi-Fi下自动播放视频', switchStatus: 2 },
                    { title: '视频页中Wi-Fi下连续播放', switchStatus: 2 }
                ]
            },
            {
                title: '播放和下载',
                children: [
                    { title: '在线播放音质', statusTxt: '自动' },
                    { title: '下载音质', statusTxt: '极高' },
                    { title: '鲸云音效' },
                    { title: '视频解码模式', statusTxt: '默认设置' },
                    { title: '视频后台播放', switchStatus: 1 },
                    { title: '边听边存', statusTxt: '未开启' },
                    { title: '设置下载目录', statusTxt: '存储卡1' },
                    { title: '缓存设置' },
                    { title: '允许与其他应用同时播放', switchStatus: 1 },
                    { title: '直播内容推荐', switchStatus: 2 },
                    { title: '音乐黑名单' }
                ]
            },
            {
                title: '账号和隐私',
                children: [
                    { title: '账号和绑定设置' },
                    { title: '消息和隐私设置' },
                    { title: '登录保护' }
                ]
            },
            {
                title: '工具',
                children: [
                    { title: '桌面歌词', switchStatus: 1 },
                    { title: '显示歌词翻译', tip: '外文歌词有翻译时，显示中文翻译', switchStatus: 1 },
                    { title: '跑步FM离线包', tip: '连接Wi-Fi，自动缓存跑步歌曲', switchStatus: 1 },
                    { title: '桌面小部件' },
                    { title: '锁屏显示', statusTxt: '云音乐锁屏' },
                    { title: '通知栏样式', statusTxt: '云音乐通知栏（自动）' },
                    { title: '切换语言', statusTxt: '默认' },
                    { title: '侧边栏管理' },
                    { title: '自动下载最新安装包', statusTxt: '仅Wi-Fi网络' }
                ]
            },
            {
                title: '音乐硬件',
                children: [
                    { title: '耳机线控切歌', statusTxt: '已开启' },
                    { title: '消息和隐私设置', statusTxt: '未开启' },
                    { title: '智能硬件' }
                ]
            },
            {
                title: '关于',
                children: [
                    { title: '云音乐新手指南' },
                    { title: '帮助与反馈' },
                    { title: '关于网易云音乐' }
                ]
            },
        ],
        isLogin: false,
        showModal: false
    }
    componentWillMount(){
        const { userInfo } = this.props
        if(Object.keys(userInfo).length){
            this.setState({
                isLogin: true
            })
        }
    }
    // 切换开关
    onChangeSwitch = (index, index2) =>{
        // 说明 === >    switchStatus:    1： 未开启状态   2：开启状态
        const { listArr } = this.state
        listArr[index].children[index2].switchStatus = listArr[index].children[index2].switchStatus == 1? 2 : 1
        this.setState({ listArr })
    }
    // 点击确定
    comfirnFN = () =>{
        this.setState({
            showModal: false
        })
        http.logout().then(res =>{
            Toast.success('退出成功')
            this.props.saveUserInfo({}) // 退出登录清空store里面的userInfo数据
            setTimeout(() => {
                this.props.history.push('/login')
            }, 2000);
        })
    }
    // 点击取消
    cancelFN = () =>{
        this.setState({
            showModal: false
        })
    }
    render() {
        const { listArr, isLogin, showModal } = this.state
        return (
            <div className='mySettings'>
                <ul>
                    {
                        listArr.map((item, index) =>
                            <li key={index} className='parent-li'>
                                <h5 className='p-title'>{item.title}</h5>
                                <ul className='child-ul'>
                                    {
                                        item.children.map((item2, index2) =>
                                            <li className='child-li da' key={index2}>
                                                <div className='flex'>
                                                    <h4 className='c-title'>{item2.title}</h4>
                                                    <span className='tip'>{item2.tip}</span>
                                                </div>
                                                <div className='status'>
                                                    {item2.statusTxt && <span className='txt'>{item2.statusTxt}</span>}
                                                    {item2.switchStatus && <Switch color='#E82202' onClick={this.onChangeSwitch.bind(this, index, index2)} checked={item2.switchStatus == 1 ? false : true} />}
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                </ul>
                { isLogin && <button className='btn' onClick={() => { this.setState({ showModal: true }) }}>切换账号</button> }

                {/* modal */}
                <Modal 
                    show={showModal}
                    content='确定退出当前账号吗？'
                    comfirnFN={this.comfirnFN}
                    cancelFN={this.cancelFN}
                />
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Settings)