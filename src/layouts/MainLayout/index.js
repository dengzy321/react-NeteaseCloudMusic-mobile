import React from 'react';
import { NavLink } from 'react-router-dom'
import './index.css';

class MainLayout extends React.Component {
    render() {
        const tabs = [
            { title: '我的', url: '/myCenter' },
            { title: '发现', url: '/find' },
            { title: '云村', url: '/square' },
            { title: '视频', url: '/video' }
        ];
        const { match, children } = this.props;
        return (
            <div className='mainLayout'>
                <div className='header da'>
                    <img className='menu_icon' src={require('../../assets/menu.png')} />
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
            </div>
        );
    }
}
export default MainLayout;