import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import './index.css';
import Drawer from '@/components/Drawer'
import Iconpath from '@/utils/iconpath'

class Header extends React.Component {
    state = {
        showDrawer: false
    }
    changeShowStatus = () => {
        this.setState(state => ({
            showDrawer: !state.showDrawer
        }))
    }
    render() {
        const { showDrawer } = this.state
        const tabs = [
            { title: '我的', url: '/myCenter' },
            { title: '发现', url: '/find' },
            { title: '云村', url: '/square' },
            { title: '视频', url: '/video' }
        ];
        return (
            <div className='myHeader da'>
                <img className='menu_icon' src={Iconpath.menu} onClick={this.changeShowStatus} alt=''/>
                <div className='center da'>
                    {
                        tabs.map((item, index) => <NavLink className='link' activeClassName='selected' key={index} to={item.url}>{item.title}</NavLink>)
                    }
                </div>
                <Link to='/search'><img className='search_icon' src={Iconpath.search} alt=''/></Link>

                {/* 显示Drawer */}
                <Drawer 
                    show={showDrawer}
                    closeFN={this.changeShowStatus} 
                />
            </div>
        )
    }
}

export default Header;