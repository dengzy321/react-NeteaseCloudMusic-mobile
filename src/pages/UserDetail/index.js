import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'
import Dynamic from '@/components/Dynamic'

// 用户主页
function UserHome(props) {
    return (
        <div className='userHome'>
            
        </div>
    )
}

class UserDetail extends React.Component {
    state = {
        userId: '',
        curActive: 1,
        count: 0, // 动态数量
        userInfo: {}, //用户信息
        userEvent: [], //用户动态
    }
    componentDidMount() {
        this.setState({
            userId: this.props.location.state.id
        }, () =>{
            this.initUserEvent()
            this.initUserDetail()
        })
    }
    // 获取用户信息
    initUserDetail = () => {
        let { userId } = this.state
        http.getUserDetail({ uid: userId }).then(res => {
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
    // 切换tab
    onChange = (index) => {
        if (index == 0) this.initUserDetail()
        else this.initUserEvent()
        this.setState({
            curActive: index
        })
    }
    render() {
        const { curActive, userInfo, userEvent, count } = this.state
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
                            <UserHome {...this.props} userInfo={userInfo} /> : <Dynamic {...this.props} list={userEvent} />
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