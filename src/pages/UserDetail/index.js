import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'
import Dynamic from '@/components/Dynamic'
import provinceJson from '@/utils/provinceJson'

// 用户主页
function UserHome(props) {
    let { userInfo, songSheetList } = props
    return (
        <div className='userHome'>
            <div className='userInfo'>
                <h3 className='title'>基本信息</h3>
                <div className=''>
                    <p>
                        <span>村龄：</span>
                        <span>{userInfo.profile.alreadyCreatetYear}年 （{userInfo.profile.createYear}年{userInfo.profile.createtMonth}月注册）</span>
                    </p>
                    <p>
                        <span>年龄：</span>
                        <span>{userInfo.profile.birthdayTxt}后 狮子座</span>
                    </p>
                    <p>
                        <span>地区：</span>
                        <span>{userInfo.profile.provinceName} {userInfo.profile.cityName}</span>
                    </p>
                </div>
            </div>
            <div className='songSheetList'>
                <h3 className='title'>创建的歌单</h3>
                <ul className='ss-ul'>
                    {
                        songSheetList.map((item,index) =>
                            <li key={index} className='ss-li da' onClick={() => props.history.push({pathname: '/SongSheetDetail', state:{ id: item.id }})}>
                                <img className='pic' src={item.coverImgUrl}/>
                                <p className='info ddc-h'>
                                    <span className='name'>{item.name}</span>
                                    <span className='count'>{item.trackCount}首，播放{item.playCount}次</span>
                                </p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

class UserDetail extends React.Component {
    state = {
        userId: '',
        curActive: 0,
        count: 0, // 动态数量
        userInfo: {}, //用户信息
        userEvent: [], //用户动态
        songSheetList: [], //用户歌单列表
    }
    componentDidMount() {
        this.setState({
            userId: this.props.location.state.id
        }, () =>{
            this.initUserEvent()
            this.initUserDetail()
            this.initUserSongs()
        })
    }
    // 获取用户信息
    initUserDetail = () => {
        let { userId } = this.state
        http.getUserDetail({ uid: userId }).then(res => {
            // 处理省份城市
            provinceJson.forEach(pItem =>{
                if(pItem.code == res.profile.province){
                    res.profile.provinceName = pItem.name
                    pItem.cityList.forEach(aItem =>{
                        if(aItem.code == res.profile.city){
                            res.profile.cityName = aItem.name
                        }
                    })
                }
            })
            // 处理创建时间和生日
            const d0 = new Date()
            const d1 = new Date(res.profile.createTime)
            res.profile.createYear = d1.getFullYear()
            res.profile.createtMonth = d1.getMonth() + 1
            res.profile.alreadyCreatetYear = d0.getFullYear() - d1.getFullYear()

            const d2 = new Date(res.profile.birthday)
            res.profile.birthdayTxt = d2.getFullYear()

            this.setState({
                userInfo: res
            })
        })
    }
    // 获取用户动态
    initUserEvent = () => {
        let { userId } = this.state
        http.getUserEvent({ uid: userId }).then(res => {
            res.events.forEach(item => {
                item.json = JSON.parse(item.json)
            })
            this.setState({
                userEvent: res.events,
                count: res.size
            })
        })
    }
    // 获取用户歌单
    initUserSongs = () =>{
        let { userId } = this.state
        http.getUserSongs({ uid: userId }).then(res =>{
            this.setState({
                songSheetList: res.playlist.slice(0,4)
            })
        })
    }
    // 切换tab
    onChange = (index) => {
        if (index == 0) this.initUserDetail()
        else this.initUserEvent()
        this.setState({
            curActive: index
        })
    }
    render() {
        const { curActive, userInfo, userEvent, count, songSheetList } = this.state
        if (Object.keys(userInfo).length == 0) return <Loading />
        return (
            <div className='userDetail'>
                <div className='ud-header'>
                    <img className='pic' src={userInfo.profile.backgroundUrl} />
                    <div className='info'>
                        <img className='avatar' src={userInfo.profile.avatarUrl} />
                        <h3 className='nickname'>{userInfo.profile.nickname}</h3>
                        <div className='da'>
                            <p className='flex ddc-h'>
                                <span className='da followCount'>
                                    <b>关注1991</b>
                                    <b>粉丝15974</b>
                                </span>
                                <span className='da'>
                                    <b className='birthday'>95后</b>
                                    <b className='level'>Lv.10</b>
                                </span>
                            </p>
                            <p className='btn da'>
                                <button className='follow'>+关注</button>
                                <button className='sendNews da'>
                                    <img className='icon' src={Iconpath.news2_$fff} />
                                    <b>发私信</b>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mainContent'>
                    <div className='mcHeader da'>
                        <span className={curActive == 0 ? 'active' : ''} onClick={this.onChange.bind(this, 0)}>主页</span>
                        <span className={curActive == 1 ? 'active' : ''} onClick={this.onChange.bind(this, 1)}>动态<b className='count'>{count}</b></span>
                    </div>
                    {
                        curActive == 0 ?
                            <UserHome {...this.props} userInfo={userInfo} songSheetList={songSheetList} /> : <Dynamic {...this.props} list={userEvent} />
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(UserDetail)