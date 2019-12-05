import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';

class BlankLayout extends React.Component {
    componentDidMount(){
        // 监听路由变化
        this.props.history.listen(route => {
            document.body.style = ''
        })
    }
    render() {
        const { children } = this.props
        return (
            <div className='blankLayout'>
                {children}
            </div>
        );
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(BlankLayout)