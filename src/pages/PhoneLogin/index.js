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
        verifyCode: '',
        showLevel: 0,  // 0： 显示 输入手机号码    1：显示输入密码     2：显示输入要修改密码     3：显示输入验证码
    }
    componentDidUpdate(){
        this.onFcous()
    }
    onChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onClose = () =>{
        this.setState({ phone: '' })
    }
    onSelected(curIndex){
        if(curIndex == 1 && !this.state.phone) {
            Toast.info('请输入手机号码'); 
            return
        }
        this.setState({
            showLevel: curIndex
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
    sentVerifyCode = () =>{
        const { phone, changePassword } = this.state
        if(!changePassword){
            Toast.info('请输入要修改的密码'); 
            return
        }

        this.setState({ showLevel: 3 }); return
        http.sentVerify({ phone }).then(res =>{
            this.setState({ showLevel: 3 })
            Toast.success('发送成功');
        })
    }
    // 修改密码
    modifyPassword = () =>{
        
    }

    // 输入验证码
    inputVerify = (event) =>{
        this.setState({
            verifyCode: event.target.value
        })
    }
    // 聚焦input
    onFcous = () =>{
        if(this.state.showLevel == 3) this.verifyInput.focus()
    }
    PhoneModule = () =>{
        const { phone } = this.state
        return(
            <div className='phoneModule'>
                <p className='tip'>未注册手机号登陆后将自动创建账号</p>
                <div className='onInput da'>
                    <span className='area' style={{color: phone? '#333':''}}>+86</span>
                    <input className='input' onChange={this.onChange} type='number' maxLength='11' value={phone} name='phone'  placeholder='请输入手机号'/>
                    { phone && <img className='close' src={Iconpath.close_$ccc} alt='' onClick={this.onClose}/>}
                </div>
                <button className='btn' onClick={this.onSelected.bind(this, 1)}>下一步</button>
            </div>
        )
    }
    PasswordModule = () =>{
        const { password } = this.state
        return(
            <div className='passwordModule phoneModule'>
                <div className='onInput da'>
                    <input className='input' onChange={this.onChange} type='password' value={password} name='password' placeholder='请输入密码'/>
                    <button className='forget' onClick={this.onSelected.bind(this, 2)}>忘记密码？</button>
                </div>
                <button className='btn' onClick={this.onLogin}>登陆</button>
            </div>
        )
    }
    ModifyPasswordModule = () =>{
        const { changePassword } = this.state
        return(
            <div className='passwordModule phoneModule'>
                <div className='onInput da'>
                    <input className='input' onChange={this.onChange} type='password' maxLength='11' value={changePassword} name='changePassword' placeholder='设置登录密码，不少于6位'/>
                </div>
                <button className='btn' onClick={this.sentVerifyCode}>下一步</button>
            </div>
        )
    }
    VerifyCodeModule = () =>{
        const { phone, verifyCode } = this.state
        // let encrypt = phone 
        return(
            <div className='inputVerifyCode' onClick={this.onFcous}>
                <p className='title'>验证码已发送至</p>
                <p className='info dbc'>
                    <span className='phone'>+86 17725999414</span>
                    <span className='limit'>59</span>
                </p>
                <div className='inputBox'>
                    <input className='passwordItem' type='password' value={verifyCode[0]} disabled/>
                    <input className='passwordItem' type='password' value={verifyCode[1]} disabled/>
                    <input className='passwordItem' type='password' value={verifyCode[2]} disabled/>
                    <input className='passwordItem' type='password' value={verifyCode[3]} disabled/>
                    <input className='hideInput' onChange={this.inputVerify} ref={input => this.verifyInput = input} maxLength='4' value={verifyCode}/>
                </div>
            </div>
        )
    }
    render(){
        const { showLevel } = this.state
        return(
            <div className='phoneLogin'>
                { showLevel == 0? this.PhoneModule() : showLevel == 1? this.PasswordModule() : showLevel == 2? this.ModifyPasswordModule() : this.VerifyCodeModule() }
            </div>
        )
    }
}
    
export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PhoneLogin)