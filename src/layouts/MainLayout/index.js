import React from 'react';
import './index.css';
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
        const { match, children, history } = this.props;
        return (
            <div className='mainLayout'>
                <Header />
                {children}
                <PlayTab history={history}/>
            </div>
        );
    }
}
export default MainLayout;