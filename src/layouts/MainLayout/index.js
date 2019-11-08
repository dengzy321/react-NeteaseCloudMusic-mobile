import React from 'react';
import './index.css';
import Header from '@/components/Header'

class MainLayout extends React.Component {
    componentDidMount(){
        // 监听路由变化
        this.props.history.listen(route => {
            document.body.style = ''
        })
    }
    render() {
        const { match, children } = this.props;
        return (
            <div className='mainLayout'>
                <Header />
                {children}
            </div>
        );
    }
}
export default MainLayout;