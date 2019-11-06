import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import { Toast } from 'antd-mobile';

class PhoneLogin extends React.Component {
    state = {
        phone: '',
        password: '',
        changePassword: '',
        captcha: '',
        countDown: 60,
        showModule: 0,  // 0： 显示 输入手机号码    1：显示输入密码     2：显示输入要修改密码     3：显示输入验证码
    }
    componentDidUpdate(){
        this.onFcous()
    }
    onInput = (event) => {
        if (event.target.name == 'captcha' && event.target.value.length == 4) this.modifyPassword(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onClose = () =>{
        this.setState({ phone: '' })
    }
    onSelected(curIndex){
        if (curIndex == 1 && !(/^1[3456789]\d{9}$/.test(this.state.phone))) {
            Toast.info('手机号码有误'); 
            return
        }
        this.setState({
            showModule: curIndex
        })
    }
    // 登录
    onLogin = () =>{
        const { phone, password } = this.state
        if(!password){
            Toast.info('请输入密码'); 
            return
        }
        http.phoneLogin({ phone, password }).then(res =>{
            Toast.success('登录成功')
            this.props.saveUserInfo(res.profile)
            setTimeout(() => {
                this.props.history.push('/find')
            }, 2000);
        })
    }
    // 发送验证码
    sentCaptchaCode = () =>{
        const { phone, changePassword } = this.state
        if(!changePassword){
            Toast.info('请输入要修改的密码'); 
            return
        }
        http.sentVerify({ phone }).then(res =>{
            this.setState({ showModule: 3 })
            const timer = setInterval(() => {
                this.setState(state => ({
                    countDown: state.countDown - 1
                }))
                if (this.setState.countDown == 1) clearInterval(timer)
            }, 1000)
            Toast.success('发送成功');
        })
    }
    // 修改密码
    modifyPassword = (captcha) =>{
        const { phone, changePassword } = this.state
        http.register({
            phone,
            captcha,
            password: changePassword,
            nickname: this.props.userInfo ? this.props.userInfo.nickname : phone
        }).then(res => {
            Toast.success('修改成功');
            setTimeout(() => {
                this.props.history.push('/login')
            }, 2000);
        })
    }
    // 聚焦input
    onFcous = () =>{
        if (this.state.showModule == 3) this.captchaInput.focus()
    }
    render(){
        const { showModule, phone, password, changePassword, captcha, countDown } = this.state
        console.log('captcha===', captcha)
        return(
            <div className='phoneLogin'>
                {
                    showModule == 0? // 输入手机号码模块
                    <div className='phoneModule'>
                        <p className='tip'>未注册手机号登陆后将自动创建账号</p>
                        <div className='onInput da'>
                            <span className='area' style={{color: phone? '#333':''}}>+86</span>
                            <input className='input' onChange={this.onInput} type='number' maxLength='11' value={phone} name='phone'  placeholder='请输入手机号'/>
                            { phone && <img className='close' src={Iconpath.close_$ccc} alt='' onClick={this.onClose}/>}
                        </div>
                        <button className='btn' onClick={this.onSelected.bind(this, 1)}>下一步</button>
                    </div> :
                    showModule == 1? // 输入密码模块
                    <div className='passwordModule'>
                        <div className='onInput da'>
                            <input className='input' onChange={this.onInput} type='password' value={password} name='password' placeholder='请输入密码'/>
                            <button className='forget' onClick={this.onSelected.bind(this, 2)}>忘记密码？</button>
                        </div>
                        <button className='btn' onClick={this.onLogin}>登陆</button>
                    </div> : 
                    showModule == 2? // 输入需要修改的密码模块
                     <div className='passwordModule'>
                        <div className='onInput da'>
                            <input className='input' onChange={this.onInput} type='password' maxLength='11' value={changePassword} name='changePassword' placeholder='设置登录密码，不少于6位'/>
                        </div>
                        <button className='btn' onClick={this.sentCaptchaCode}>下一步</button>
                    </div> :
                    showModule == 3? // 输入验证码模块
                    <div className='verifyCodeModule' onClick={this.onFcous}>
                        <p className='title'>验证码已发送至</p>
                        <p className='info dbc'>
                            <span className='phone'>+86 {phone}</span>
                            <span className={`limit ${countDown? '':'active'}`} onClick={this.sentCaptchaCode}>{countDown? countDown : '重新发送'}</span>
                        </p>
                        <div className='inputBox'>
                            <input className='passwordItem' type='password' value={captcha[0] ? captcha[0] : ''} disabled/>
                            <input className='passwordItem' type='password' value={captcha[1] ? captcha[1] : ''} disabled/>
                            <input className='passwordItem' type='password' value={captcha[2] ? captcha[2] : ''} disabled/>
                            <input className='passwordItem' type='password' value={captcha[3] ? captcha[3]: ''} disabled/>
                            <input className='hideInput' onChange={this.onInput} name='captcha' ref={input => this.captchaInput = input} maxLength='4' value={captcha}/>
                        </div>
                    </div> : ''
                }
            </div>
        )
    }
}
    
export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PhoneLogin)