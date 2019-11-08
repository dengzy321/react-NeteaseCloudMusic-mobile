import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'


/**
 * Modal调用说明：   
 *              参数                	说明                	                         类型                    	        默认值
 * 
 *              @param show         [是否显示弹窗]                                       Boolean                            false
 *              @param title        [标题]                                              String                              -
 *              @param content      [显示内容(必传)_当存在content时_children无效]         String | React.components() 
 *              @param showCancel   [显示取消按钮(默认为true)]                            Boolean                             -
 *              @param cancelTxt    [取消按钮自定义]                                      String                             取消
 *              @param comfirnTxt   [确定按钮自定义]                                      String                             确定
 *              @param comfirnFN    [确定按钮回调]                                        Function                            -
 *              @param cancelFN     [取消按钮回调]                                        Function                            -
 *              @param closeFN      [关闭Modal回调]                                       Function                            -
 * 
 *
 * 
 * */


class Modal extends React.Component {
    state = {
        show: false,
        innerAni: false
    }
    componentWillReceiveProps(nextProps){
        setTimeout(() => {
            this.setState({ innerAni: nextProps.show })
        }, 10);
        if(nextProps.show){
            document.body.style.position = 'fixed'
            document.body.style.top = 0
            document.body.style.left = 0
            document.body.style.right = 0
            document.body.style.overflow = 'hidden'
        }else document.body.style = ''
    }
    // 点击蒙层回调
    onClose = () =>{
        const { closeFN = () => { } } = this.props
        closeFN()
    }
    // 点击确定回调
    onComfirn = () =>{
        const { comfirnFN = () => { } } = this.props
        comfirnFN()
    }
    // 点击取消回调
    onCancel = () =>{
        const { cancelFN = () => { } } = this.props
        cancelFN()
    }
    render() {
        const {
            show,
            title,
            content,
            children,
            showCancel = true,
            cancelTxt,
            comfirnTxt,
        } = this.props
        return (
            <div>
                {show &&
                    <div className='myModal dd-vh' onClick={this.onClose}>
                        <div className={`inner ${this.state.innerAni? 'showActive':''}`} >
                            {
                                title &&
                                <div className='header dcc'>
                                    <p className='title'>{title}</p>
                                </div>
                            }
                            <div className='content da'>{content ? content : children}</div>
                            <div className='footer da-e'>
                                {showCancel && <span onClick={this.onCancel} className='cancel'>{cancelTxt ? cancelTxt : '取消'}</span>}
                                <span onClick={this.onComfirn} className='comfirn'>{comfirnTxt ? comfirnTxt : '确定'}</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Modal)