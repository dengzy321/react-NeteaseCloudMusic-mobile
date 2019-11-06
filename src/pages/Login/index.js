import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import Radio from '@/components/Radio'

class Login extends React.Component {
    render(){
        return(
            <div className='myLogin'>
                <img className='logo' src={Iconpath.logo} alt='' />
                <div className='login-box'>
                    <Link to='/phoneLogin' className='phoneLogin-btn'>手机号登陆</Link>
                    <Link to='/myCenter' className='immediately'>立即体验</Link>
                    <div className='dbc loginType'>
                        <img src={Iconpath.weixin} alt='' />
                        <img src={Iconpath.qq} alt='' />
                        <img src={Iconpath.weibo} alt='' />
                        <img src={Iconpath.wangyi} alt='' />
                    </div>
                    <div className='clause dcc'>
                        <div className='da'>
                            <Radio size='0.7' />
                            <span className='comfirm'>同意</span>
                        </div>
                        <Link className='link' to='#'>《用户协议》</Link>
                        <Link className='link' to='#'>《隐私政策》</Link>
                        <Link className='link' to='#'>《儿童隐私政策》</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Login)