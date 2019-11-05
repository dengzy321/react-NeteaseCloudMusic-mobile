import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '../../utils/iconpath'

class Drawer extends React.Component {
    state = {
        innerTimer: false
    }
    componentDidMount() {
        console.log('componentDidMount==', this.props.showDrawer)
        if (this.props.showDrawer) {
            setTimeout(() => {
                this.setState({
                    innerTimer: true
                })
            }, 1)
        }
    }
    onClose = (event) => {
        event.persist()
        this.setState({
            innerTimer: false
        })
        setTimeout(() => {
            this.props.changeShowStatus()
        }, 10)
    }
    render() {
        const { innerTimer } = this.state
        const navArr = [
            { icon: Iconpath.messages, name: '我的消息' },
            { icon: Iconpath.people, name: '我的好友' },
            { icon: Iconpath.recorder, name: '听歌识别' },
            { icon: Iconpath.clothes, name: '个性装扮' }
        ]
        const toolArr = [
            { icon: Iconpath.ticket, name: '演出', explain: '莫文蔚北京', explainImg: '', url: '' },
            { icon: Iconpath.shopCart, name: '商城', explain: '数显tws 109', explainImg: '', url: '' },
            { icon: Iconpath.address, name: '附近人', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.game, name: '游戏推荐', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.small_bell, name: '口袋彩铃', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.order, name: '我的订单', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.alarm_clock_2, name: '定时播放停止', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.scan, name: '扫一扫', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.alarm_clock_1, name: '音乐闹钟', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.listen_music, name: '在线听歌免流量', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.coupon, name: '优惠券', explain: '', explainImg: '', url: '' },
            { icon: Iconpath.security, name: '青年模式', explain: '', explainImg: '', url: '' }
        ]
        return (
            <div className='drawer' onClick={this.onClose}>
                <div className='inner' style={{ transform: `translateX(${innerTimer ? '0' : '-100'}rem)` }}>
                    <div className='inner-box'>

                        {/* header */}
                        <div className='header'>
                            <div className='unlogin'>
                                <p className='title'>登录网易云音乐</p>
                                <p className='title'>手机电脑多端同步，尽享海量高品质音乐</p>
                                <Link className='login-btn' to='/login'>立即登录</Link>
                            </div>
                            
                            {/* <div className='login'>
                                <div className='avatar'>
                                    <img src={Iconpath.defalut_avatar} alt />
                                </div>
                                <div className='da'>
                                    <span className='nickname'>dengzy遥仔仔</span>
                                    <span className='level'>Lv.0</span>
                                    <p className='integral-box da-e'>
                                        <span className='integral da'>
                                            <img src={Iconpath.integral} alt />
                                            <b>签到</b>
                                        </span>
                                    </p>
                                </div>
                            </div> */}
                        </div>

                        {/* 开通黑胶VIP */}
                        <div className='openVip da'>
                            <p className='price ddc-h'>
                                <span className='name'>开通黑胶VIP</span>
                                <span className='explain'>新客仅5元</span>
                            </p>
                            <p className='title'>天气之子原声大碟</p>
                            <img className='coverImg' src={require('../../static/weather.jpg')} alt=''/>
                        </div>

                        {/* nav */}
                        <div className='nav da'>
                            {
                                navArr.map((item, index) => {
                                    return (
                                        <Link className='nav-item dd-vh' key={index} to=''>
                                            <img className='icon' src={item.icon} alt='' />
                                            <span className='name'>{item.name}</span>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                        {/* 列表 */}
                        <div className='tool-ul'>
                            <ul>
                                {
                                    toolArr.map((item, index) => {
                                        return (
                                            <li className='tool-li' key={index}>
                                                <Link to={item.url} className='da'>
                                                    <img className='icon' src={item.icon} alt />
                                                    <span className='name'>{item.name}</span>
                                                    <span className='explain'>{item.explain}</span>
                                                    {item.explainImg && <img className='explainImg' src={item.explainImg} alt=''/>}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        {/* footer */}
                        <div className='footer da'>
                            <Link className='footer-item da' to=''>
                                <img className='icon' src={Iconpath.night_mode} alt='' />
                                <span className='name'>夜间模式</span>
                            </Link>
                            <Link className='footer-item da' to=''>
                                <img className='icon' src={Iconpath.settings} alt='' />
                                <span className='name'>设置</span>
                            </Link>
                            <Link className='footer-item da' to=''>
                                <img className='icon' src={Iconpath.quit} alt='' />
                                <span className='name'>退出</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Drawer)