import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import Header from '@/components/Header'
import PlayTab from '@/components/PlayTab'

class MainLayout extends React.Component {
    componentDidMount(){
        // 监听路由变化
        this.props.history.listen(route => {
            document.body.style = ''
        })
    }
    render() {
        const { children, history, curPlaySong } = this.props;
        return (
            <div className='mainLayout'>
                <Header />
                {children}
                { Object.keys(curPlaySong).length != 0 && <PlayTab history={history}/> }
            </div>
        );
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(MainLayout)