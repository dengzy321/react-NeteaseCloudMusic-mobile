import React from 'react';
import './index.css';
import Header from '../../components/Header'

class MainLayout extends React.Component {

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