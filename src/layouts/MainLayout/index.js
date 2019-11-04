import React from 'react';
import { NavLink } from 'react-router-dom'
import './index.css';
import Drawer from '../../components/Drawer'

class MainLayout extends React.Component {
    state = {
        showDrawer: false
    }
    changeShowStatus = () => {
        this.setState(state => ({
            showDrawer: !state.showDrawer
        }))
    }
    render() {
        const tabs = [
            { title: '我的', url: '/myCenter' },
            { title: '发现', url: '/find' },
            { title: '云村', url: '/square' },
            { title: '视频', url: '/video' }
        ];
        const { match, children } = this.props;
        const { showDrawer } = this.state
        return (
            <div className='mainLayout'>
                <div className='ml-header da'>
                    <img className='menu_icon' src={require('../../assets/menu.png')} onClick={this.changeShowStatus}/>
                    <div className='center dbc'>
                        {
                            tabs.map((item, index) => {
                                return <NavLink activeClassName='selected' key={index} to={item.url}>{item.title}</NavLink>
                            })
                        }
                    </div>
                    <img className='search_icon' src={require('../../assets/search.png')} />
                </div>                                                          
                {children}

                {/* 显示Drawer */}
                {showDrawer && <Drawer showDrawer={showDrawer} changeShowStatus={this.changeShowStatus}/>}
            </div>
        );
    }
}
export default MainLayout;