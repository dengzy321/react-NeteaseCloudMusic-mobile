import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '../../utils/iconpath'
import { Toast } from 'antd-mobile';

class PhoneLogin extends React.Component {
    state = {
        phone: '',
        password: '',
        verificationCode: '',
        show_1: false,
        show_2: false
    }
    onChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onClose = (event) =>{
        this.setState({
            [event.target.name]: ''
        })
    }
    onSelected(param){
        this.setState(state =>({
            
        }))
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
                    <input className='input' onChange={this.onChange} type='number' maxLength='11' value={password} name='password' placeholder='请输入密码'/>
                    <button className='forget' onClick={this.onSelected.bind(this, 2)}>忘记密码？</button>
                </div>
                <button className='btn'>登陆</button>
            </div>
        )
    }
    VerificationCodeModule = () =>{
        const { verificationCode } = this.state
        return(
            <div className='passwordModule phoneModule'>
                <div className='onInput da'>
                    <input className='input' onChange={this.onChange} type='number' maxLength='11' value={verificationCode} name='verificationCode' placeholder='请输入密码'/>
                </div>
                <button className='btn'>下一步</button>
            </div>
        )
    }
    render(){
        const { showPassword, showVerificationCode } = this.state
        return(
            <div className='phoneLogin'>
                {showPassword? this.PasswordModule() : showVerificationCode? this.VerificationCodeModule() : this.PhoneModule()}
            </div>
        )
    }
}
    
export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(PhoneLogin)